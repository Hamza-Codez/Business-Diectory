"use client";

import { useState, useEffect } from "react";
import ArticleCard from "@/components/cards/ArticleCard";
import ArticleRow from "@/components/cards/ArticleRow";
import type { Article } from "@/types";

export default function RecentArticlesGrid({ articles }: { articles: Article[] }) {
  // Deterministic initial state for SSR matching to prevent hydration errors
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    // Client-side only: pick a random index from 0 to articles.length - 1
    if (articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      setFeaturedIndex(randomIndex);
    }
  }, [articles.length]);

  if (articles.length === 0) return null;

  const featured = articles[featuredIndex];
  const rows = articles.filter((_, i) => i !== featuredIndex);

  return (
    <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8 animate-in fade-in duration-500">
      <div className="order-2 flex flex-col gap-6 lg:order-none lg:col-span-3 lg:justify-center">
        {rows.slice(0, 2).map((article) => (
          <ArticleRow key={article.id} article={article} />
        ))}
      </div>
      <div className="order-1 lg:order-none lg:col-span-6">
        <ArticleCard article={featured} />
      </div>
      <div className="order-3 flex flex-col gap-6 lg:order-none lg:col-span-3 lg:justify-center">
        {rows.slice(2, 4).map((article) => (
          <ArticleRow key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
