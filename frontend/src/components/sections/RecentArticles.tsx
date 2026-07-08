import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RecentArticlesGrid from "@/components/sections/RecentArticlesGrid";
import { MESSAGES } from "@/constants/messages";
import { getAllArticles } from "@/lib/articles";
import { getLang } from "@/lib/i18n";

export default async function RecentArticles() {
  const lang = await getLang();
  const articles = getAllArticles(lang).slice(0, 5);
  if (articles.length === 0) return null;

  const m = MESSAGES[lang];

  return (
    <section id="articles" className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="記事 — ARTICLES"
          title={m.articles.title}
        />
        <RecentArticlesGrid articles={articles} />
      </Container>
    </section>
  );
}
