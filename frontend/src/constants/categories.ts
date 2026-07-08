import {
  BedDouble,
  Briefcase,
  Building2,
  GraduationCap,
  MonitorSmartphone,
  Palette,
  Scale,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/types";

export type CategoryDef = {
  slug: CategorySlug;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  icon: LucideIcon;
  /** Indicative Geoapify Places category keys — verify against the official
      supported-categories list during API setup (spec 6.4). */
  geoapifyKeys: string[];
};

export function categoryLabel(
  def: Pick<CategoryDef, "name" | "nameJa">,
  lang: "en" | "ja",
): string {
  return lang === "ja" ? def.nameJa : def.name;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "businesses-trades",
    name: "Businesses & Trades",
    nameJa: "ビジネス・職人",
    description: "Professional services and trades",
    descriptionJa: "専門サービスと職人",
    icon: Briefcase,
    geoapifyKeys: ["service", "commercial.trade"],
  },
  {
    slug: "health-medical",
    name: "Health & Medical",
    nameJa: "医療・健康",
    description: "Hospitals, clinics, and pharmacies",
    descriptionJa: "病院、クリニック、薬局",
    icon: Stethoscope,
    geoapifyKeys: ["healthcare"],
  },
  {
    slug: "education",
    name: "Education",
    nameJa: "教育",
    description: "Schools, universities, and tutors",
    descriptionJa: "学校、大学、家庭教師",
    icon: GraduationCap,
    geoapifyKeys: ["education"],
  },
  {
    slug: "food-beverages",
    name: "Food & Beverages",
    nameJa: "飲食",
    description: "Restaurants, cafes, and bars",
    descriptionJa: "レストラン、カフェ、バー",
    icon: UtensilsCrossed,
    geoapifyKeys: ["catering"],
  },
  {
    slug: "digital-media-it",
    name: "Digital Media & IT",
    nameJa: "デジタル・IT",
    description: "Tech companies and media",
    descriptionJa: "テクノロジー企業とメディア",
    icon: MonitorSmartphone,
    geoapifyKeys: ["office.it", "office.company"],
  },
  {
    slug: "shops-marts",
    name: "Shops & Marts",
    nameJa: "店舗・マート",
    description: "Retail stores and supermarkets",
    descriptionJa: "小売店とスーパーマーケット",
    icon: Store,
    geoapifyKeys: ["commercial.supermarket", "commercial.convenience"],
  },
  {
    slug: "shopping-malls",
    name: "Shopping & Malls",
    nameJa: "ショッピングモール",
    description: "Large shopping centers",
    descriptionJa: "大型ショッピングセンター",
    icon: ShoppingBag,
    geoapifyKeys: ["commercial.shopping_mall"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    nameJa: "不動産",
    description: "Agencies and property management",
    descriptionJa: "不動産業者と物件管理",
    icon: Building2,
    geoapifyKeys: ["office.estate_agent"],
  },
  {
    slug: "arts-entertainment",
    name: "Arts & Entertainment",
    nameJa: "アート・エンタメ",
    description: "Theaters, museums, and venues",
    descriptionJa: "劇場、博物館、会場",
    icon: Palette,
    geoapifyKeys: ["entertainment"],
  },
  {
    slug: "transport-logistics",
    name: "Transport & Logistics",
    nameJa: "運輸・物流",
    description: "Shipping and transport services",
    descriptionJa: "配送と輸送サービス",
    icon: Truck,
    geoapifyKeys: ["office.logistics", "service.vehicle"],
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    nameJa: "美容・ウェルネス",
    description: "Salons, spas, and wellness centers",
    descriptionJa: "サロン、スパ、ウェルネスセンター",
    icon: Sparkles,
    geoapifyKeys: ["service.beauty"],
  },
  {
    slug: "hotels-stays",
    name: "Hotels & Stays",
    nameJa: "ホテル・宿泊",
    description: "Accommodations and lodging",
    descriptionJa: "宿泊施設とロッジング",
    icon: BedDouble,
    geoapifyKeys: ["accommodation"],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    nameJa: "Eコマース",
    description: "Online shopping and marketplaces",
    descriptionJa: "オンラインショッピングと市場",
    icon: ShoppingCart,
    geoapifyKeys: ["commercial.marketplace"],
  },
  {
    slug: "finance-legal",
    name: "Finance & Legal",
    nameJa: "金融・法律",
    description: "Banks, lawyers, and financial services",
    descriptionJa: "銀行、弁護士、金融サービス",
    icon: Scale,
    geoapifyKeys: ["service.financial", "office.lawyer"],
  },
];
