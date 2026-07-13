export type NavKey = "home" | "categories" | "blogs" | "pricing" | "contact";

export const NAV_LINKS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "categories", href: "/categories" },
  { key: "blogs", href: "/blogs" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
];

export const CTA_HREF = "/add-business";
