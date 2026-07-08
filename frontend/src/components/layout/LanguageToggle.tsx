"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Lang } from "@/constants/messages";

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();

  function setLang(next: Lang) {
    if (next === lang) return;
    document.cookie = `lang=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="flex  items-center border border-line font-mono text-xs">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "px-2.5 py-1.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer",
          lang === "en" ? "bg-primary text-white" : "text-muted hover:text-primary",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ja")}
        aria-pressed={lang === "ja"}
        className={cn(
          "px-2.5 py-1.5 transition-colors cursor-pointer duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          lang === "ja" ? "bg-primary text-white" : "text-muted hover:text-primary",
        )}
      >
        日本語
      </button>
    </div>
  );
}
