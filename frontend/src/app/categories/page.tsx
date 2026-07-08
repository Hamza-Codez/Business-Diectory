import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryShapeCard from "@/components/cards/CategoryShapeCard";
import { CATEGORIES } from "@/constants/categories";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Categories — Japan Business Directory",
};

export default async function CategoriesPage() {
  const lang = await getLang();
  const m = MESSAGES[lang].categoriesPage;

  return (
    <main className="flex-1 bg-surface py-12 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow={m.eyebrow}
          title={m.title}
          subtitle={m.subtitle}
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
