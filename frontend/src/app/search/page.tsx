import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import BusinessCard from "@/components/cards/BusinessCard";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import SearchBandForm from "@/components/sections/SearchBandForm";
import { searchBusinesses } from "@/lib/api";
import { CATEGORIES, categoryLabel } from "@/constants/categories";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Search — Japan Business Directory",
};

const PAGE_SIZE = 35;
const MAX_SHOW = PAGE_SIZE * 3;

type SearchParams = Promise<{
  query?: string;
  location?: string;
  category?: string;
  show?: string;
}>;

function searchHref(params: {
  query?: string;
  location?: string;
  category?: string;
  show?: number;
}): string {
  const url = new URLSearchParams({
    query: params.query ?? "",
    location: params.location ?? "",
    category: params.category ?? "",
  });
  if (params.show && params.show > PAGE_SIZE) url.set("show", String(params.show));
  return `/search?${url.toString()}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query, location, category, show: showParam } = await searchParams;
  const parsedShow = Number(showParam);
  const show = Number.isFinite(parsedShow)
    ? Math.min(Math.max(parsedShow, PAGE_SIZE), MAX_SHOW)
    : PAGE_SIZE;

  const lang = await getLang();
  const m = MESSAGES[lang];
  const result = await searchBusinesses({
    query,
    location,
    category,
    limit: show,
  });

  const isError = result.status === "error";
  const businesses = result.status === "ok" ? result.businesses : [];
  const relaxed = result.status === "ok" ? result.relaxed : false;
  const radiusKm = result.status === "ok" ? result.radiusKm : undefined;

  const categoryDef = CATEGORIES.find((c) => c.slug === category);
  const criteria = [
    query,
    location,
    categoryDef && categoryLabel(categoryDef, lang),
  ]
    .filter(Boolean)
    .join(" · ");
  const hasHotpepper = businesses.some((b) => b.source === "hotpepper");

  return (
    <main className="flex-1">
      <section className="relative py-10 lg:py-10">
        <Image
          src="/assets/searchResults.png"
          alt="Quiet Japanese side street at early morning"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />
        <Container className="relative">
          <SearchBandForm
            key={`${query}|${location}|${category}|${lang}`}
            tone="dark"
            showPopular={false}
            lang={lang}
            initial={{ query, location, category }}
          />
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            検索結果 — RESULTS
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
            {categoryDef ? categoryLabel(categoryDef, lang) : m.search.results}
          </h1>
          <p className="mt-3 font-mono text-sm text-muted">
            {criteria || m.search.allBusinesses} ·{" "}
            {m.search.found.replace("{n}", String(businesses.length))}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip
              href={searchHref({ query, location, category: "" })}
              active={!categoryDef}
            >
              {m.search.all}
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.slug}
                href={searchHref({ query, location, category: c.slug })}
                active={c.slug === category}
              >
                {categoryLabel(c, lang)}
              </Chip>
            ))}
          </div>

          {isError ? (
            <div className="mt-10">
              <p className="text-base text-muted">Search is temporarily unavailable — try again in a moment.</p>
              <Button href={searchHref({ query, location, category, show })} className="mt-4">
                Retry
              </Button>
            </div>
          ) : businesses.length === 0 ? (
            <div className="mt-10">
              <p className="text-base text-muted">No businesses found for this search.</p>
              <div className="mt-6 flex gap-2">
                <Chip href={searchHref({ category: "food-beverages" })}>Restaurants</Chip>
                <Chip href={searchHref({ category: "businesses-trades" })}>Services</Chip>
                <Chip href={searchHref({ category: "hotels-stays" })}>Hotels</Chip>
              </div>
            </div>
          ) : (
            <>
              {(relaxed || radiusKm) && (
                <div className="mt-6 space-y-1">
                  {radiusKm && (
                    <p className="text-sm text-primary">Showing results within {radiusKm} km.</p>
                  )}
                  {relaxed && categoryDef && (
                    <p className="text-sm text-primary">No exact matches — showing nearby {categoryLabel(categoryDef, lang)} results instead.</p>
                  )}
                </div>
              )}
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} lang={lang} />
                ))}
              </div>
            </>
          )}

          {businesses.length >= show && show < MAX_SHOW && (
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                scroll={false}
                href={searchHref({ query, location, category, show: show + PAGE_SIZE })}
              >
                {m.search.loadMore}
              </Button>
            </div>
          )}

          {hasHotpepper && (
            <p className="mt-8 font-mono text-xs text-muted">
              Powered by Hot Pepper Gourmet Web Service
            </p>
          )}
        </Container>
      </section>
    </main>
  );
}
