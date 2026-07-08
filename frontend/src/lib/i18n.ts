import { cookies } from "next/headers";
import type { Lang } from "@/constants/messages";

/** Server-side language from the "lang" cookie set by LanguageToggle. */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get("lang")?.value === "ja" ? "ja" : "en";
}
