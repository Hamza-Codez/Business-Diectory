import Link from "next/link";
import Image from "next/image";
import { type CategoryDef, categoryLabel } from "@/constants/categories";
import type { Lang } from "@/constants/messages";

export default function CategoryShapeCard({
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
      className="group flex items-center transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="bg-primary w-14 h-14 sm:w-16 sm:h-16 flex shrink-0 items-center justify-center p-1.5 z-10 shadow-sm">
        <div className="relative h-full w-full rounded-full overflow-hidden bg-white">
          <Image
            src={imgSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="object-cover"
          />
        </div>
      </div>
      
      <div 
        className="bg-ink h-12 sm:h-14 flex-1 flex flex-col justify-center pl-3 pr-6 sm:pl-4 sm:pr-8"
        style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
      >
        <span className="text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors duration-200 group-hover:text-primary-light line-clamp-1">
          {categoryLabel(category, lang)}
        </span>
        <span className="text-white/70 text-[9px] sm:text-[10px] mt-0.5 line-clamp-1">
          {lang === "ja" ? category.descriptionJa : category.description}
        </span>
      </div>
    </Link>
  );
}
