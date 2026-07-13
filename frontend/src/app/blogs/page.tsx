import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/cards/BlogCard";
import { getAllBlogs } from "@/lib/blogs";
import { formatDate } from "@/lib/utils";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blogs | Japan Business Directory",
  description: "Guides to finding, reaching, and working with businesses in Japan.",
  alternates: {
    canonical: "/blogs",
  },
};

export default async function BlogsPage() {
  const lang = await getLang();
  const blogs = getAllBlogs(lang);
  const m = MESSAGES[lang];

  if (blogs.length === 0) {
    return (
      <main className="flex-1 py-12 lg:py-20 bg-surface">
        <Container>
          <p>{m.blogsPage.empty}</p>
        </Container>
      </main>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <main className="flex-1 py-12 lg:py-20 bg-surface min-h-[80svh]">
      <Container>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted font-mono uppercase tracking-wider">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">{m.breadcrumb.home}</Link>
            </li>
            <li>/</li>
            <li className="text-ink" aria-current="page">{m.breadcrumb.blogs}</li>
          </ol>
        </nav>

        {/* Heading */}
        <SectionHeading
          align="left"
          eyebrow={m.blogsPage.eyebrow}
          title={m.blogsPage.title}
          subtitle={m.blogsPage.subtitle}
        />

        <div className="mt-12 space-y-8 lg:space-y-12">
          {/* Featured Blog */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="group block border border-line bg-white transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="relative w-full overflow-hidden aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={featured.banner}
                alt={featured.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 lg:p-10">
              <p className="font-mono text-sm text-muted">
                {formatDate(featured.publishedAt)} · {featured.category}
              </p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-ink transition-colors duration-200 group-hover:text-primary">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-muted">
                {featured.excerpt}
              </p>
            </div>
          </Link>

          {/* Grid of Remaining Blogs */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {rest.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
