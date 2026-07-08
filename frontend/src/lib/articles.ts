import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article } from "@/types";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

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

export function getAllArticles(): Article[] {
  // Only process markdown files
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md"));
  } catch (e) {
    console.error("Failed to read articles directory", e);
    return [];
  }

  const articles: Article[] = fileNames.map((fileName) => {
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      id: data.slug || fileName.replace(/\.md$/, ""),
      title: data.title || "",
      slug: data.slug || "",
      excerpt: data.excerpt || "",
      banner: getValidImageUrl(data.banner),
      publishedAt: data.publishedAt 
        ? (data.publishedAt instanceof Date ? data.publishedAt.toISOString() : new Date(data.publishedAt).toISOString())
        : new Date().toISOString(),
      category: data.category || "",
    } as Article;
  });

  // Sort articles by date descending
  return articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticleBySlug(slug: string): { article: Article; content: string } | undefined {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return undefined;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const article: Article = {
      id: data.slug || slug,
      title: data.title || "",
      slug: data.slug || "",
      excerpt: data.excerpt || "",
      banner: getValidImageUrl(data.banner),
      publishedAt: data.publishedAt 
        ? (data.publishedAt instanceof Date ? data.publishedAt.toISOString() : new Date(data.publishedAt).toISOString())
        : new Date().toISOString(),
      category: data.category || "",
    };

    return { article, content };
  } catch (e) {
    console.error(`Error reading article with slug: ${slug}`, e);
    return undefined;
  }
}
