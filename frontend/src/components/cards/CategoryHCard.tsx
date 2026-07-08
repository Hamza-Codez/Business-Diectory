import Link from "next/link";
import Image from "next/image";
import { type CategoryDef, categoryLabel } from "@/constants/categories";
import type { Lang } from "@/constants/messages";

export default function CategoryHCard({
  category,
  lang = "en",
}: {
  category: CategoryDef;
  lang?: Lang;
}) {
  const imgSrc = `/images/categories/${category.slug}/1.webp`;

  return (
    <Link
      href={`/search?category=${category.slug}`}
      className="group flex flex-col items-center w-full transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* Top Black Bar with Text */}
      <div className="w-[80%] min-h-10 sm:min-h-12 bg-ink flex items-center justify-center p-2 text-center rounded-t-sm">
        <span className="text-white font-medium text-[10px] sm:text-xs tracking-wide transition-colors duration-200 group-hover:text-primary-light line-clamp-2">
          {categoryLabel(category, lang)}
        </span>
      </div>
      
      {/* Middle Red Bar with Image */}
      <div className="w-full bg-primary p-2 flex justify-center items-center">
        <div className="relative w-full aspect-[5/4] bg-white overflow-hidden shadow-sm">
          <Image
            src={imgSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 100px, 150px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      
      {/* Bottom Black Bar with Description */}
      <div className="w-[80%] min-h-10 sm:min-h-12 bg-ink flex items-center justify-center p-2 text-center rounded-b-sm">
        <span className="text-white/80 text-[10px] sm:text-[11px] leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-white">
          {lang === "ja" ? category.descriptionJa : category.description}
        </span>
      </div>
    </Link>
  );
}
