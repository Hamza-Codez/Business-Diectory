import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/types";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group block border border-line bg-primary-dark transition-colors duration-700 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-video">
        <Image
          src={blog.banner}
          alt={blog.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-mono text-sm text-white/80">
          {formatDate(blog.publishedAt)} · {blog.category}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-white transition-colors duration-500">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-white/80">
          {blog.excerpt}
        </p>
      </div>
    </Link>
  );
}
