import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block border border-line bg-white transition-colors duration-200 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-video">
        <Image
          src={article.banner}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-mono text-sm text-muted">
          {formatDate(article.publishedAt)} · {article.category}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink transition-colors duration-200 group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
