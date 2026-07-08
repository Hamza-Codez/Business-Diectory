import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export default function ArticleRow({ article }: { article: Article }) {
  return (
    <div className="group relative block w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <Link href={`/articles/${article.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read article: {article.title}</span>
      </Link>

      <div className="relative flex items-center h-28 w-full pointer-events-none">
        {/* Dark Box (Background) */}
        <div className="absolute right-0 top-2 bottom-2 left-6 sm:left-8 bg-ink z-0 flex flex-col justify-center pl-[5rem] sm:pl-[5.5rem] pr-3 transition-colors duration-300 group-hover:bg-[#1a1a1a]">
          <h3 className="text-white font-bold text-xs sm:text-sm line-clamp-2 group-hover:text-primary-light transition-colors leading-snug">
            {article.title}
          </h3>
          <div className="relative z-20 pointer-events-auto w-fit mt-1.5 flex items-center gap-1.5">
            <span className="text-primary-light text-[10px] font-mono uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-white/40 text-[10px] font-mono">·</span>
            <span className="text-white/50 text-[10px] font-mono">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>

        {/* Primary Box (Foreground) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-primary p-1.5 z-10 shadow-md transition-transform duration-300 group-hover:-translate-y-1">
          <div className="relative w-full h-full bg-white overflow-hidden shadow-inner">
            <Image
              src={article.banner}
              alt={article.title}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
