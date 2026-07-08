import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Business } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCount(count: number): string {
  return count.toLocaleString("en-US");
}

/** ISO date → "2026.07.01" (meta-line format, spec 5.7) */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;
}

/** Returns the business image or a deterministic category placeholder */
export function getBusinessImage(business: Business, variants = 9): string {
  if (business.image) return business.image;
  let hash = 0;
  for (let i = 0; i < business.id.length; i++) {
    hash = (hash << 5) - hash + business.id.charCodeAt(i);
    hash |= 0;
  }
  const index = (Math.abs(hash) % variants) + 1;
  return `/images/categories/${business.category}/${index}.webp`;
}
