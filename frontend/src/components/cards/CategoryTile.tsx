import Link from "next/link";
import { categoryLabel, type CategoryDef } from "@/constants/categories";
import type { Lang } from "@/constants/messages";

export default function CategoryTile({
  category,
  lang = "en",
}: {
  category: CategoryDef;
  lang?: Lang;
}) {
  const Icon = category.icon;

  return (
    <Link
      href={`/search?category=${category.slug}`}
      className="group flex flex-col items-center gap-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Icon
        size={32}
        aria-hidden="true"
        className="text-primary transition-colors duration-200 group-hover:text-primary-dark"
      />
      <span className="text-center text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-primary-dark lg:text-base">
        {categoryLabel(category, lang)}
        <span
          aria-hidden="true"
          className="mt-1 block h-0.5 scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}
