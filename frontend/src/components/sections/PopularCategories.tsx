import Link from "next/link";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CATEGORIES, categoryLabel } from "@/constants/categories";
import { MESSAGES } from "@/constants/messages";
import { getPopularCategories } from "@/lib/api";
import { getLang } from "@/lib/i18n";
import { formatCount } from "@/lib/utils";

export default async function PopularCategories() {
  const [categories, lang] = await Promise.all([
    getPopularCategories(),
    getLang(),
  ]);
  const m = MESSAGES[lang];

  return (
    <section className="relative overflow-hidden border-y-2 border-primary bg-surface py-8 lg:py-12">
      {/* Exact Match Decorative Waves */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-5xl pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1000 250"
          preserveAspectRatio="none"
          className="absolute right-0 top-7 -translate-y-12 lg:-translate-y-20 h-[250px] w-full stroke-primary opacity-40 lg:opacity-80"
          fill="none"
          strokeLinecap="round"
        >
          {/* A cluster of 5 carefully plotted cubic bezier paths to mimic the hand-drawn pattern */}
          <path d="M 0,200 C 100,200 200,120 300,120 C 400,120 600,220 700,220 C 800,220 900,135 1000,55" strokeWidth="4.5" />
          <path d="M 0,202 C 100,202 190,110 300,110 C 420,110 590,215 700,215 C 780,215 900,120 1000,40" strokeWidth="2.2" />
          <path d="M 0,198 C 100,198 210,130 300,130 C 430,130 610,225 700,225 C 820,225 900,150 1000,70" strokeWidth="2.8" />
          <path d="M 0,201 C 100,201 220,125 300,125 C 410,125 620,220 700,220 C 810,220 900,100 1000,25" strokeWidth="2.4" />
          <path d="M 0,199 C 100,199 180,115 300,115 C 390,115 580,218 700,218 C 790,218 900,165 1000,85" strokeWidth="2.6" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="mb-8 flex gap-2">
          <div className="size-4 bg-ink" aria-hidden="true" />
          <div className="size-4 bg-primary" aria-hidden="true" />
        </div>
        <SectionHeading
          eyebrow="人気 — POPULAR"
          title={m.popular.title}
          subtitle={m.popular.subtitle}
        />
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const def = CATEGORIES.find((c) => c.slug === category.slug);
            return (
              <Link
                key={category.slug}
                href={`/search?category=${category.slug}`}
                className="group flex items-center justify-between gap-4 border-b border-line py-3 transition-colors duration-200 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 60 100" className="w-3 h-5 fill-ink transition-colors duration-200 group-hover:fill-primary shrink-0" aria-hidden="true">
                    <polygon points="0,0 0,100 60,50" />
                  </svg>
                  <span className="text-base font-medium text-ink transition-colors duration-200 group-hover:text-primary">
                    {def ? categoryLabel(def, lang) : category.name}
                  </span>
                </div>
                {category.listingCount !== undefined && (
                  <span className="font-mono text-sm text-muted">
                    {formatCount(category.listingCount)}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
