import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RecentBlogsGrid from "@/components/sections/RecentBlogsGrid";
import { MESSAGES } from "@/constants/messages";
import { getAllBlogs } from "@/lib/blogs";
import { getLang } from "@/lib/i18n";

export default async function RecentBlogs() {
  const lang = await getLang();
  const blogs = getAllBlogs(lang).slice(0, 5);
  if (blogs.length === 0) return null;

  const m = MESSAGES[lang];

  return (
    <section id="blogs" className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="記事 — ARTICLES"
          title={m.blogs.title}
        />
        <RecentBlogsGrid blogs={blogs} />
      </Container>
    </section>
  );
}
