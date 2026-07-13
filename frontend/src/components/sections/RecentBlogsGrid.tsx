"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/cards/BlogCard";
import BlogRow from "@/components/cards/BlogRow";
import type { Blog } from "@/types";

export default function RecentBlogsGrid({ blogs }: { blogs: Blog[] }) {
  // Deterministic initial state for SSR matching to prevent hydration errors
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    // Client-side only: pick a random index from 0 to blogs.length - 1
    if (blogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      setFeaturedIndex(randomIndex);
    }
  }, [blogs.length]);

  if (blogs.length === 0) return null;

  const featured = blogs[featuredIndex];
  const rows = blogs.filter((_, i) => i !== featuredIndex);

  return (
    <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8 animate-in fade-in duration-500">
      <div className="order-2 flex flex-col gap-6 lg:order-none lg:col-span-3 lg:justify-center">
        {rows.slice(0, 2).map((blog) => (
          <BlogRow key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="order-1 lg:order-none lg:col-span-6">
        <BlogCard blog={featured} />
      </div>
      <div className="order-3 flex flex-col gap-6 lg:order-none lg:col-span-3 lg:justify-center">
        {rows.slice(2, 4).map((blog) => (
          <BlogRow key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
