import { CATEGORIES } from "@/constants/categories";
import { KEYWORD_MAP } from "@/constants/keywords";
import type { Business, CategorySlug } from "@/types";

const PLACES_URL = "https://api.geoapify.com/v2/places";
const GEOCODE_URL = "https://api.geoapify.com/v1/geocode/search";
const PLACE_DETAILS_URL = "https://api.geoapify.com/v2/place-details";

/** Keeps results inside Japan when no location filter is given (spec 6.3) */
const JAPAN_RECT = "rect:122.93,24.04,153.99,45.55";

export type Coords = { lat: number; lng: number };

export type ApiResult = 
  | { status: "ok"; businesses: Business[]; relaxed?: boolean; radiusKm?: number }
  | { status: "error"; reason: "quota" | "network" | "bad_request" };

type GeoapifyFeature = {
  properties: {
    place_id?: string;
    name?: string;
    formatted?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
    lat?: number;
    lon?: number;
    categories?: string[];
    website?: string;
    opening_hours?: string;
    contact?: { phone?: string };
    datasource?: { raw?: Record<string, unknown> };
  };
};

function rawString(raw: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = raw?.[key];
  return typeof value === "string" ? value : undefined;
}

function inferCategory(featureCategories: string[]): CategorySlug {
  for (const def of CATEGORIES) {
    if (def.geoapifyKeys.some((key) => featureCategories.some((c) => c === key || c.startsWith(`${key}.`)))) {
      return def.slug;
    }
  }
  return "businesses-trades";
}

function toBusiness(feature: GeoapifyFeature, categorySlug?: CategorySlug): Business | null {
  const p = feature.properties;
  if (!p.name || !p.formatted) return null;
  const raw = p.datasource?.raw;

  return {
    id: `geo_${p.place_id ?? p.name}`,
    source: "geoapify",
    name: p.name,
    category: categorySlug ?? inferCategory(p.categories ?? []),
    address: {
      formatted: p.formatted,
      city: p.city,
      prefecture: p.state,
      postalCode: p.postcode,
    },
    geo: p.lat !== undefined && p.lon !== undefined ? { lat: p.lat, lng: p.lon } : undefined,
    phone: p.contact?.phone ?? rawString(raw, "phone") ?? rawString(raw, "contact:phone"),
    website: p.website ?? rawString(raw, "website") ?? rawString(raw, "contact:website"),
    hours: p.opening_hours ?? rawString(raw, "opening_hours"),
  };
}

function parseCoords(text: string): Coords | undefined {
  const match = text.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!match) return undefined;
  return { lat: Number(match[1]), lng: Number(match[2]) };
}

async function geoapifyFetch(url: string, revalidate: number = 300): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, { next: { revalidate }, signal: controller.signal });
      clearTimeout(id);
      return res;
    } catch (e: any) {
      clearTimeout(id);
      lastError = e;
    }
  }
  throw lastError;
}

let japanPlaceIdCache: string | null = null;

async function getJapanPlaceId(): Promise<string | null> {
  if (japanPlaceIdCache) return japanPlaceIdCache;
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) return null;

  try {
    const params = new URLSearchParams({
      text: "Japan",
      type: "country",
      filter: "countrycode:jp",
      limit: "1",
      apiKey,
    });
    const res = await fetch(`${GEOCODE_URL}?${params}`, { cache: "force-cache" });
    if (!res.ok) return null;
    const data = (await res.json()) as { features?: GeoapifyFeature[] };
    const pid = data.features?.[0]?.properties?.place_id;
    if (pid) {
      japanPlaceIdCache = pid;
      return pid;
    }
  } catch (e) {
    console.warn("Failed to fetch Japan place_id:", e);
  }
  return null;
}

export async function resolveLocation(location?: string): Promise<Coords | undefined> {
  if (!location?.trim()) return undefined;

  const direct = parseCoords(location);
  if (direct) return direct;

  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) return undefined;

  try {
    const params = new URLSearchParams({
      text: location,
      filter: "countrycode:jp",
      limit: "1",
      apiKey,
    });
    const res = await geoapifyFetch(`${GEOCODE_URL}?${params}`);
    if (!res.ok) return undefined;
    const data = (await res.json()) as { features?: GeoapifyFeature[] };
    const p = data.features?.[0]?.properties;
    if (p?.lat === undefined || p.lon === undefined) return undefined;
    return { lat: p.lat, lng: p.lon };
  } catch {
    return undefined;
  }
}

async function fetchPlaces(query: URLSearchParams): Promise<ApiResult> {
  try {
    let res = await geoapifyFetch(`${PLACES_URL}?${query}`);
    if (res.status === 429) {
      // Rate limited (free plan: 5 req/s) — back off and retry once
      await new Promise((resolve) => setTimeout(resolve, 1200));
      res = await geoapifyFetch(`${PLACES_URL}?${query}`);
    }
    if (!res.ok) {
      console.warn(`Geoapify Places request failed: ${res.status}`);
      const body = await res.text();
      console.warn(`Geoapify body: ${body}`);
      if (res.status === 401 || res.status === 402 || res.status === 403) return { status: "error", reason: "quota" };
      if (res.status >= 400 && res.status < 500) return { status: "error", reason: "bad_request" };
      return { status: "error", reason: "network" };
    }
    const data = (await res.json()) as { features?: GeoapifyFeature[] };
    const businesses = (data.features ?? [])
      .filter((f) => !f.properties.country_code || f.properties.country_code === "jp")
      .map((f) => toBusiness(f))
      .filter((b): b is Business => b !== null);
    return { status: "ok", businesses };
  } catch (error) {
    console.warn("Geoapify Places request threw:", error);
    return { status: "error", reason: "network" };
  }
}

export async function searchGeoapify(params: {
  categoryKeys: string[];
  categorySlug?: CategorySlug;
  keyword?: string;
  coords?: Coords;
  limit?: number;
}): Promise<ApiResult> {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    console.warn("GEOAPIFY_API_KEY is not set.");
    return { status: "error", reason: "bad_request" };
  }

  let finalCatKeys = params.categoryKeys;
  let useNameFilter = false;
  let keyword = params.keyword?.trim();
  
  if (keyword) {
    const lower = keyword.toLowerCase();
    if (KEYWORD_MAP[lower]) {
      finalCatKeys = KEYWORD_MAP[lower];
      keyword = undefined;
    } else {
      useNameFilter = true;
    }
  }

  const baseQuery = new URLSearchParams({
    categories: finalCatKeys.join(","),
    conditions: "named",
    limit: String(params.limit ?? 20),
    apiKey,
  });

  if (useNameFilter && keyword) {
    baseQuery.set("name", keyword);
  }

  const executeSearch = async (queryArgs: URLSearchParams): Promise<ApiResult> => {
    if (!params.coords) {
      const japanPlaceId = await getJapanPlaceId();
      if (japanPlaceId) {
        queryArgs.set("filter", `place:${japanPlaceId}`);
      } else {
        queryArgs.set("filter", JAPAN_RECT);
      }
      return await fetchPlaces(queryArgs);
    }
    const RADII = [5000, 20000, 50000];
    let lastResult: ApiResult = { status: "ok", businesses: [] };
    for (const r of RADII) {
      queryArgs.set("filter", `circle:${params.coords.lng},${params.coords.lat},${r}`);
      const result = await fetchPlaces(queryArgs);
      if (result.status === "error") return result;
      lastResult = { ...result, radiusKm: r / 1000 };
      if (result.businesses.length >= 5) return lastResult;
    }
    const japanPlaceId = await getJapanPlaceId();
    if (japanPlaceId) {
      queryArgs.set("filter", `place:${japanPlaceId}`);
    } else {
      queryArgs.set("filter", JAPAN_RECT);
    }
    const rectResult = await fetchPlaces(queryArgs);
    if (rectResult.status === "error") return rectResult;
    if (rectResult.businesses.length >= 5) return rectResult;
    return lastResult; // fallback to the 50km radius one if rect still empty, or just rect
  };

  let res = await executeSearch(new URLSearchParams(baseQuery));
  
  if (res.status === "ok" && res.businesses.length === 0 && useNameFilter && keyword) {
    // Retry without name
    baseQuery.delete("name");
    res = await executeSearch(new URLSearchParams(baseQuery));
    
    if (res.status === "ok") {
      const kwLower = keyword.toLowerCase();
      const fuzzyMatched = res.businesses.filter(b => b.name.toLowerCase().includes(kwLower));
      if (fuzzyMatched.length > 0) {
        res.businesses = fuzzyMatched;
      } else {
        res.relaxed = true;
      }
    }
  }

  if (res.status === "ok" && params.categorySlug) {
    res.businesses.forEach((b) => {
      // Force category slug if requested
      if (b.category === "businesses-trades") b.category = params.categorySlug as CategorySlug;
    });
  }

  return res;
}

export async function getPlaceDetails(placeId: string): Promise<Business | null> {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) return null;

  try {
    const params = new URLSearchParams({ id: placeId, apiKey });
    const res = await geoapifyFetch(`${PLACE_DETAILS_URL}?${params}`, 86400);
    if (!res.ok) return null;
    const data = (await res.json()) as { features?: GeoapifyFeature[] };
    const feature = data.features?.[0];
    if (!feature) return null;
    return toBusiness(feature);
  } catch (error) {
    console.warn("Geoapify Place Details threw:", error);
    return null;
  }
}

export function getStaticMapUrl(lat: number, lng: number): string {
  // Static map URLs expose the API key in the img src by design.
  // The key must be domain-restricted in the Geoapify dashboard before production deploy.
  const apiKey = process.env.GEOAPIFY_API_KEY ?? "";
  const params = new URLSearchParams({
    style: "osm-bright-grey",
    width: "600",
    height: "400",
    center: `lonlat:${lng},${lat}`,
    zoom: "15",
    marker: `lonlat:${lng},${lat};color:#8F1D21;size:medium`,
    apiKey,
  });
  return `https://maps.geoapify.com/v1/staticmap?${params.toString()}`;
}
