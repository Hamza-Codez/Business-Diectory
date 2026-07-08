import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryTile from "@/components/cards/CategoryTile";
import { CATEGORIES } from "@/constants/categories";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export default async function FeaturedCategories() {
  const lang = await getLang();
  const m = MESSAGES[lang];

  return (
    <section id="categories" className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          tone="primary"
          eyebrow="カテゴリー — CATEGORIES"
          title={m.featured.title}
          subtitle={m.featured.subtitle}
        />
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <CategoryTile key={category.slug} category={category} lang={lang} />
          ))}
        </div>
      </Container>
    </section>
  );
}
