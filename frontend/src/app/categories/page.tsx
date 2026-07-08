import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryShapeCard from "@/components/cards/CategoryShapeCard";
import { CATEGORIES } from "@/constants/categories";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Categories — Japan Business Directory",
};

export default async function CategoriesPage() {
  const lang = await getLang();

  return (
    <main className="flex-1 bg-surface py-12 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="カテゴリー"
          title="All Categories"
          subtitle="Browse all business categories across Japan"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryShapeCard key={category.slug} category={category} lang={lang} />
          ))}
        </div>
      </Container>
    </main>
  );
}
