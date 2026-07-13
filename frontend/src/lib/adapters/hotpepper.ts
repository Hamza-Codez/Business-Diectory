import type { Business } from "@/types";
import type { Coords, ApiResult } from "@/lib/adapters/geoapify";

const GOURMET_URL = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

/** Fallback center (Tokyo Station) when neither keyword nor location is given */
const DEFAULT_COORDS: Coords = { lat: 35.6812, lng: 139.7671 };

type HotpepperShop = {
  id: string;
  name: string;
  address?: string;
  lat?: number | string;
  lng?: number | string;
  open?: string;
  budget?: { average?: string; name?: string };
  photo?: { pc?: { l?: string } };
  urls?: { pc?: string };
};

function toBusiness(shop: HotpepperShop): Business {
  const lat = Number(shop.lat);
  const lng = Number(shop.lng);

  return {
    id: `hp_${shop.id}`,
    source: "hotpepper",
    name: shop.name,
    category: "food-beverages",
    address: { formatted: shop.address ?? "" },
    geo: Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : undefined,
    website: shop.urls?.pc,
    hours: shop.open,
    budget: shop.budget?.average || shop.budget?.name || undefined,
    image: shop.photo?.pc?.l,
  };
}

/**
 * Hot Pepper Gourmet search → Business[] (Food & Beverages enrichment, spec 6.1).
 * Server-side only — the API has no CORS. Returns null on hard failure.
 */
export async function searchHotpepper(params: {
  keyword?: string;
  id?: string;
  coords?: Coords;
  limit?: number;
}): Promise<ApiResult> {
  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    console.warn("HOTPEPPER_API_KEY is not set — skipping Hot Pepper enrichment.");
    return { status: "error", reason: "bad_request" };
  }

  try {
    const query = new URLSearchParams({
      key: apiKey,
      format: "json",
      count: String(Math.min(params.limit ?? 20, 100)),
    });
    if (params.keyword?.trim()) query.set("keyword", params.keyword.trim());
    if (params.id) query.set("id", params.id);

    const coords = params.coords ?? ((params.keyword?.trim() || params.id) ? undefined : DEFAULT_COORDS);
    if (coords) {
      query.set("lat", String(coords.lat));
      query.set("lng", String(coords.lng));
      query.set("range", "5"); // 3,000 m radius
    }

    const res = await fetch(`${GOURMET_URL}?${query}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.warn(`Hot Pepper request failed: ${res.status}`);
      return { status: "error", reason: "network" };
    }

    const data = (await res.json()) as {
      results?: {
        shop?: HotpepperShop[];
        error?: { code?: number; message?: string }[];
      };
    };
    // Hot Pepper reports errors (e.g. bad key) inside a 200 response
    if (data.results?.error?.length) {
      console.warn("Hot Pepper API error:", data.results.error[0]?.message);
      return { status: "error", reason: "bad_request" };
    }
    return { status: "ok", businesses: (data.results?.shop ?? []).map(toBusiness) };
  } catch (error) {
    console.warn("Hot Pepper request threw:", error);
    return { status: "error", reason: "network" };
  }
}
