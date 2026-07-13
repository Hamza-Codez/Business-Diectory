export type CategorySlug =
  | "businesses-trades"
  | "health-medical"
  | "education"
  | "food-beverages"
  | "digital-media-it"
  | "shops-marts"
  | "shopping-malls"
  | "real-estate"
  | "arts-entertainment"
  | "transport-logistics"
  | "beauty-wellness"
  | "hotels-stays"
  | "e-commerce"
  | "finance-legal";

export interface Category {
  slug: CategorySlug;
  name: string;
  geoapifyKeys: string[];
  listingCount?: number;
}

export interface Business {
  id: string; // provider id, prefixed: "geo_…", "hp_…", "gbiz_…"
  source: "geoapify" | "hotpepper" | "gbizinfo";
  name: string;
  category: CategorySlug;
  address: {
    formatted: string;
    city?: string;
    prefecture?: string;
    postalCode?: string;
  };
  geo?: { lat: number; lng: number };
  phone?: string;
  website?: string;
  hours?: string; // raw opening-hours string, shown verbatim in mono
  budget?: string; // Hot Pepper only
  image?: string; // Hot Pepper photo; others use category fallback image
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  banner: string;
  publishedAt: string; // ISO
  category: string;
}
