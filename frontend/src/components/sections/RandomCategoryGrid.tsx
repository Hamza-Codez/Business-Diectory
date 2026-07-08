"use client";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CategoryHCard from "@/components/cards/CategoryHCard";
import { CATEGORIES } from "@/constants/categories";
import { MESSAGES, type Lang } from "@/constants/messages";

export default function RandomCategoryGrid({ lang = "en" }: { lang?: Lang }) {
  const m = MESSAGES[lang].directory;
  return (
    <section className="bg-surface py-12 lg:py-16 border-t border-line">
      <Container>
        <div className="mb-8 flex gap-2">
          <div className="size-4 bg-ink" aria-hidden="true" />
          <div className="size-4 bg-primary" aria-hidden="true" />
        </div>
        <SectionHeading
          eyebrow={m.eyebrow}
          title={m.title}
          subtitle={m.subtitle}
        />

        {/* Scrollable container for 14 items */}
        <div className="mt-10 flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory thin-scrollbar">
          {CATEGORIES.map((category) => (
            <div key={category.slug} className="snap-start shrink-0 w-[180px] sm:w-[220px] lg:w-[260px]">
              <CategoryHCard category={category} lang={lang} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/categories" variant="primary">
            {m.explore}
          </Button>
        </div>
      </Container>
    </section>
  );
}
