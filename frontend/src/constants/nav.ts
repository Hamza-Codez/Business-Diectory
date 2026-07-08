export type NavKey = "home" | "categories" | "articles" | "contact";

export const NAV_LINKS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "categories", href: "/categories" },
  { key: "articles", href: "/articles" },
  { key: "contact", href: "/contact" },
];

export const CTA_HREF = "/add-business";
