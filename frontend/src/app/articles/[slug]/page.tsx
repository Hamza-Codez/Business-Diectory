import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import Container from "@/components/layout/Container";
import ArticleRow from "@/components/cards/ArticleRow";
import { getAllArticles, getArticleBySlug, getValidImageUrl } from "@/lib/articles";

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArticleBySlug(slug);

  if (!data) return {};

  const { article } = data;

  return {
    title: `${article.title} | Japan Business Directory`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.banner,
          width: 1600,
          height: 900,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

// Custom Markdown Components
const MarkdownComponents = {
  h2: ({ node, ...props }: any) => (
    <h2 className="mt-12 mb-6 font-display text-2xl md:text-3xl font-semibold text-ink" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="mt-8 mb-4 font-display text-xl md:text-2xl font-semibold text-ink" {...props} />
  ),
  p: ({ node, ...props }: any) => {
    // ReactMarkdown parses `![alt](src)\n*caption*` as a paragraph containing an img and an em.
    // Detect that shape via the paragraph's hast node, which is much more reliable than inspecting React children.
    
    const hastChildren = (node?.children ?? []).filter(
      (child: any) => child.type !== "text" || (child.value && child.value.trim() !== "")
    );
    
    const imgNode =
      hastChildren[0]?.type === "element" && hastChildren[0].tagName === "img"
        ? hastChildren[0]
        : null;

    if (imgNode) {
      const captionNode =
        hastChildren.length === 2 &&
        hastChildren[1].type === "element" &&
        hastChildren[1].tagName === "em"
          ? hastChildren[1]
          : null;

      if (hastChildren.length === 1 || captionNode) {
        const image = (
          <div className={`relative w-full aspect-[3/2] ${captionNode ? "mb-3" : "my-10"}`}>
            <Image
              src={getValidImageUrl(imgNode.properties?.src ?? "")}
              alt={imgNode.properties?.alt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        );

        if (!captionNode) {
          return image;
        }

        // The rendered caption is the second non-whitespace React child (the <em>).
        const validChildren = React.Children.toArray(props.children).filter(
          (child) => !(typeof child === "string" && child.trim() === "")
        );
        const caption = validChildren[1];

        return (
          <figure className="my-10">
            {image}
            <figcaption className="text-sm font-mono text-muted pt-3 border-t border-line">
              {React.isValidElement(caption) ? (caption.props as any).children : caption}
            </figcaption>
          </figure>
        );
      }
    }

    return <p className="mb-6 text-base leading-loose text-ink/90" {...props} />;
  },
  a: ({ node, ...props }: any) => (
    <a className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors" {...props} />
  ),
  img: ({ node, ...props }: any) => {
    // Fallback for images not handled by the `p` component above (e.g. inline images
    // mixed with text). Must stay a <span>: a <div> inside a <p> is invalid HTML and
    // triggers a hydration error.
    return (
      <span className="relative block w-full aspect-[3/2] my-10">
        <Image
          src={getValidImageUrl(props.src)}
          alt={props.alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
        />
      </span>
    );
  }
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getArticleBySlug(slug);

  if (!data) {
    notFound();
  }

  const { article, content } = data;
  const allArticles = getAllArticles();
  const moreArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);
  
  // Format date correctly: "2026.07.02"
  const dateObj = new Date(article.publishedAt);
  const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(dateObj.getDate()).padStart(2, "0")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: [
      new URL(article.banner, "https://japanbusinessdirectory.com").toString()
    ],
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Japan Business Directory"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 bg-surface pb-16 lg:pb-24">
        {/* Header Section */}
        <Container className="pt-10 md:pt-16">
          <nav aria-label="Breadcrumb" className="mb-6 md:mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted font-mono uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/articles" className="hover:text-primary transition-colors">Articles</Link>
              </li>
              <li>/</li>
              <li className="text-ink line-clamp-1" aria-current="page">{article.title}</li>
            </ol>
          </nav>

          <div className="max-w-[720px] mx-auto text-center mb-10 md:mb-12">
            <p className="font-mono text-sm text-primary uppercase tracking-widest font-semibold mb-4">
              {article.category}
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
              {article.title}
            </h1>
            <p className="font-mono text-sm text-muted">
              {formattedDate}
            </p>
          </div>
        </Container>

        {/* Banner Image */}
        <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 mb-12 md:mb-16">
          <div className="relative w-full aspect-[16/9] bg-white border border-line">
            <Image
              src={article.banner}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <Container>
          <div className="max-w-[720px] mx-auto">
            <div className="prose prose-lg max-w-none text-ink">
              <ReactMarkdown components={MarkdownComponents as any}>
                {content}
              </ReactMarkdown>
            </div>

            {/* Footer / More Articles */}
            <div className="mt-20 pt-12 border-t border-line">
              <h2 className="font-display text-2xl font-semibold text-ink mb-8">
                More articles
              </h2>
              <div className="flex flex-col gap-6">
                {moreArticles.map((item) => (
                  <ArticleRow key={item.id} article={item} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
