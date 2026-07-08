"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocateFixed } from "lucide-react";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { CATEGORIES, categoryLabel } from "@/constants/categories";
import { MESSAGES, type Lang } from "@/constants/messages";
import { cn } from "@/lib/utils";

const POPULAR_SEARCHES = [
  { label: "Restaurant", category: "food-beverages" },
  { label: "Services", category: "businesses-trades" },
  { label: "Hotels", category: "hotels-stays" },
  { label: "Real Estate", category: "real-estate" },
  { label: "Education", category: "education" },
  { label: "Health & Medical", category: "health-medical" }
];

type SearchBandFormProps = {
  /** "dark" for the image band, "light" for the results page */
  tone?: "dark" | "light";
  showPopular?: boolean;
  lang?: Lang;
  initial?: { query?: string; location?: string; category?: string };
};

export default function SearchBandForm({
  tone = "dark",
  showPopular = true,
  lang = "en",
  initial,
}: SearchBandFormProps) {
  const router = useRouter();
  const m = MESSAGES[lang].searchBand;
  const validCategory = CATEGORIES.some((c) => c.slug === initial?.category)
    ? (initial?.category as string)
    : "";
  const [query, setQuery] = useState(initial?.query ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [category, setCategory] = useState(validCategory);

  const [currentChunk, setCurrentChunk] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!showPopular) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentChunk((prev) => (prev === 0 ? 1 : 0));
        setIsFading(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [showPopular]);

  const displayedSearches = POPULAR_SEARCHES.slice(currentChunk * 3, currentChunk * 3 + 3);

  function runSearch(q: string, loc: string, cat: string) {
    const params = new URLSearchParams({ query: q, location: loc, category: cat });
    router.push(`/search?${params.toString()}`);
  }

  function fillLocation() {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query, location, category);
        }}
        className="flex flex-col gap-3 lg:flex-row lg:gap-2"
      >
        <label htmlFor="search-keyword" className="sr-only">
          Keyword
        </label>
        <Input
          id="search-keyword"
          type="text"
          placeholder={m.keywordPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 lg:flex-1"
        />

        <label htmlFor="search-location" className="sr-only">
          Location
        </label>
        <Input
          id="search-location"
          type="text"
          placeholder={m.locationPlaceholder}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-14 lg:w-56"
          trailing={
            <button
              type="button"
              aria-label="Use my location"
              onClick={fillLocation}
              className="text-muted transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <LocateFixed size={20} />
            </button>
          }
        />

        <label htmlFor="search-category" className="sr-only">
          Category
        </label>
        <Select
          id="search-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-14 lg:w-56"
        >
          <option value="">{m.allCategories}</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {categoryLabel(c, lang)}
            </option>
          ))}
        </Select>

        <Button type="submit" size="lg" className="h-14 w-full lg:w-auto">
          {m.search}
        </Button>
      </form>

      {showPopular && (
        <div className="mt-6 flex items-center gap-3">
          <span
            className={
              tone === "dark" ? "text-base text-white shrink-0" : "text-base text-ink shrink-0"
            }
          >
            {m.popular}
          </span>
          <div
            className={cn(
              "flex flex-wrap items-center gap-3 transition-opacity duration-300 min-h-[32px]",
              isFading ? "opacity-0" : "opacity-100"
            )}
          >
            {displayedSearches.map((item) => (
              <Chip
                key={item.label}
                onClick={() => runSearch("", "", item.category)}
                className={
                  tone === "dark"
                    ? "border-white/40 text-white hover:border-white hover:text-white"
                    : undefined
                }
              >
                {item.label}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
