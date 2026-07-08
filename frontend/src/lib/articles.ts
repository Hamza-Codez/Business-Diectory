import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article } from "@/types";
import type { Lang } from "@/constants/messages";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

/**
 * Resolves the markdown file to read for a given article base name and language.
 * For Japanese, prefers a `<name>.ja.md` variant and falls back to the English `<name>.md`.
 */
function resolveArticlePath(baseName: string, lang: Lang): string {
  if (lang === "ja") {
    const jaPath = path.join(articlesDirectory, `${baseName}.ja.md`);
    if (fs.existsSync(jaPath)) return jaPath;
  }
  return path.join(articlesDirectory, `${baseName}.md`);
}

/**
 * Validates if an image exists in the public directory.
 * Maps paths from /images/articles/slug/filename to /assets/articles/slug/filename
 * intelligently matching extensions and minor naming differences (e.g., inline-1 vs inline1).
 */
export function getValidImageUrl(imageUrl: string): string {
  if (!imageUrl) return "/assets/hero.png";
  
  const parts = imageUrl.split("/");
  if (parts.length < 4) return imageUrl;
  
  const slug = parts[parts.length - 2];
  const filename = parts[parts.length - 1];
  const baseName = filename.substring(0, filename.lastIndexOf("."));
  const normalizedBase = baseName.replace("-", "");

  const publicAssetsDirectory = path.join(process.cwd(), "public", "assets", "articles");
  const dirPath = path.join(publicAssetsDirectory, slug);
  
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    let matchedFile = files.find(f => f.startsWith(baseName + "."));
    
    if (!matchedFile) {
      matchedFile = files.find(f => f.replace("-", "").startsWith(normalizedBase + "."));
    }
    
    if (matchedFile) {
      return `/assets/articles/${slug}/${matchedFile}`;
    }
  }

  return "/assets/hero.png";
}

/** Parses a frontmatter date (YAML Date object or string) to ISO, falling back to now if invalid. */
function toIsoDate(value: unknown): string {
  const date = value instanceof Date ? value : new Date(String(value ?? ""));
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export function getAllArticles(lang: Lang = "en"): Article[] {
  // Only process English markdown files as the source of truth; `.ja.md` are
  // per-language variants keyed to the same base name, not separate articles.
  let fileNames: string[] = [];
  try {
    fileNames = fs
      .readdirSync(articlesDirectory)
      .filter((file) => file.endsWith(".md") && !file.endsWith(".ja.md"));
  } catch (e) {
    console.error("Failed to read articles directory", e);
    return [];
  }

  const articles: Article[] = fileNames.flatMap((fileName) => {
    const baseName = fileName.replace(/\.md$/, "");
    const fullPath = resolveArticlePath(baseName, lang);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    // Skip markdown files that aren't articles (e.g. prompts/docs without frontmatter)
    if (!data.slug || !data.title) return [];

    return [{
      id: data.slug,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || "",
      banner: getValidImageUrl(data.banner),
      publishedAt: toIsoDate(data.publishedAt),
      category: data.category || "",
    } as Article];
  });

  // Sort articles by date descending
  return articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticleBySlug(slug: string, lang: Lang = "en"): { article: Article; content: string } | undefined {
  try {
    const fullPath = resolveArticlePath(slug, lang);
    if (!fs.existsSync(fullPath)) return undefined;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const article: Article = {
      id: data.slug || slug,
      title: data.title || "",
      slug: data.slug || "",
      excerpt: data.excerpt || "",
      banner: getValidImageUrl(data.banner),
      publishedAt: toIsoDate(data.publishedAt),
      category: data.category || "",
    };

    return { article, content };
  } catch (e) {
    console.error(`Error reading article with slug: ${slug}`, e);
    return undefined;
  }
}
