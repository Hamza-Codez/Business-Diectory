import { unstable_cache } from "next/cache";
import blogsJson from "../../content/blogs/blogs.json";
import { CATEGORIES } from "@/constants/categories";
import { resolveLocation, searchGeoapify, getPlaceDetails, type ApiResult } from "@/lib/adapters/geoapify";
import { searchHotpepper } from "@/lib/adapters/hotpepper";
import type { Blog, Business, Category } from "@/types";

const ALL_GEOAPIFY_KEYS = [
  ...new Set(CATEGORIES.flatMap((c) => c.geoapifyKeys)),
];

export interface SearchQuery {
  query?: string;
  location?: string;
  category?: string;
  /** Max results to return (default 35; 20 places ≈ 1 Geoapify credit) */
  limit?: number;
}

export async function searchBusinesses({
  query,
  location,
  category,
  limit = 35,
}: SearchQuery): Promise<ApiResult> {
  const categoryDef = CATEGORIES.find((c) => c.slug === category);
  const coords = await resolveLocation(location);

  const [geoResult, hotpepperResult] = await Promise.all([
    searchGeoapify({
      categoryKeys: categoryDef?.geoapifyKeys ?? ALL_GEOAPIFY_KEYS,
      categorySlug: categoryDef?.slug,
      keyword: query,
      coords,
      limit: 20, // Spec requires limit=20 for geoapify
    }),
    categoryDef?.slug === "food-beverages"
      ? searchHotpepper({ keyword: query, coords, limit: 20 })
      : Promise.resolve<ApiResult | null>(null),
  ]);

  if (geoResult.status === "error" && (!hotpepperResult || hotpepperResult.status === "error")) {
    return geoResult; // Pass through the error if all applicable providers failed
  }

  // If one fails and the other succeeds, we gracefully degrade
  const hpBiz = hotpepperResult?.status === "ok" ? hotpepperResult.businesses : [];
  const geoBiz = geoResult.status === "ok" ? geoResult.businesses : [];

  // If we ended up with 0 results but one provider failed, treat as error so user can retry
  if (hpBiz.length === 0 && geoBiz.length === 0) {
    if (geoResult.status === "error") return geoResult;
    if (hotpepperResult?.status === "error") return hotpepperResult;
  }

  // Hot Pepper first (photo-rich), then Geoapify; dedupe by normalized name
  const merged: Business[] = [];
  const seen = new Set<string>();
  for (const business of [...hpBiz, ...geoBiz]) {
    const key = business.name.toLowerCase().replace(/\s+/g, "");
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(business);
  }

  // If we only have error from geoapify but hotpepper works, we won't have radiusKm or relaxed
  return { 
    status: "ok", 
    businesses: merged.slice(0, limit),
    relaxed: geoResult.status === "ok" ? geoResult.relaxed : undefined,
    radiusKm: geoResult.status === "ok" ? geoResult.radiusKm : undefined,
  };
}

/** Seed counts until the Geoapify adapter supplies one cached count query
    per category (spec 6.5) — replace when the data layer is wired. */
const SEED_LISTING_COUNTS: Record<string, number> = {
  "food-beverages": 1248,
  "shops-marts": 964,
  "health-medical": 811,
  "businesses-trades": 742,
  "real-estate": 538,
  "education": 497,
  "arts-entertainment": 462,
  "transport-logistics": 391,
  "digital-media-it": 356,
  "beauty-wellness": 428,
  "hotels-stays": 389,
  "finance-legal": 311,
  "shopping-malls": 214,
  "e-commerce": 187,
};

export async function getPopularCategories(): Promise<Category[]> {
  return CATEGORIES.map(({ slug, name, geoapifyKeys }) => ({
    slug,
    name,
    geoapifyKeys,
    listingCount: SEED_LISTING_COUNTS[slug],
  }))
    .sort((a, b) => (b.listingCount ?? 0) - (a.listingCount ?? 0))
    .slice(0, 8);
}

const blogs: Blog[] = blogsJson.map(({ coverImage, ...rest }) => ({
  ...rest,
  banner: coverImage,
}));

export async function getRecentBlogs(): Promise<Blog[]> {
  return [...blogs]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  return blogs.find((blog) => blog.slug === slug);
}

export const getFeaturedPool = unstable_cache(
  async (): Promise<Business[]> => {
    const dateStr = new Date().toISOString().slice(0, 13); // e.g., '2026-07-08T11'

    // Geoapify's free plan allows 5 req/s — a burst of all categories at once
    // gets rate-limited (429), so fetch in small batches with a pause between.
    const results: PromiseSettledResult<Awaited<ReturnType<typeof searchBusinesses>>>[] = [];
    const BATCH_SIZE = 4;
    for (let i = 0; i < CATEGORIES.length; i += BATCH_SIZE) {
      const batch = CATEGORIES.slice(i, i + BATCH_SIZE);
      results.push(
        ...(await Promise.allSettled(
          batch.map((cat) => searchBusinesses({ category: cat.slug, limit: 5 }))
        ))
      );
      if (i + BATCH_SIZE < CATEGORIES.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const pool: Business[] = [];

    results.forEach((res, index) => {
      if (res.status === "fulfilled" && res.value.status === "ok") {
        const slug = CATEGORIES[index].slug;
        const validBiz = res.value.businesses.filter((b) => b.name && b.address.formatted);
        
        if (validBiz.length > 0) {
          const seedStr = `${slug}-${dateStr}`;
          let hash = 0;
          for (let i = 0; i < seedStr.length; i++) {
            hash = (hash << 5) - hash + seedStr.charCodeAt(i);
            hash |= 0;
          }
          hash = Math.abs(hash);
          
          const representative = validBiz[hash % validBiz.length];
          pool.push(representative);
        }
      }
    });

    // Throw rather than cache a failed run: unstable_cache stores successful
    // results only, so the next request retries instead of pinning an empty
    // section for the whole revalidate window.
    if (pool.length < 3) {
      throw new Error(`Featured pool unavailable: only ${pool.length} categories resolved`);
    }

    return pool;
  },
  ["featured-pool"],
  { revalidate: 3600 }
);

export const getBusinessById = unstable_cache(
  async (id: string): Promise<Business | null> => {
    if (id.startsWith("hp_")) {
      const hpId = id.slice(3);
      const res = await searchHotpepper({ id: hpId });
      if (res.status === "ok" && res.businesses.length > 0) {
        return res.businesses[0];
      }
      return null;
    }
    const placeId = id.startsWith("geo_") ? id.slice(4) : id;
    return getPlaceDetails(placeId);
  },
  ["business-by-id"],
  { revalidate: 86400 }
);
