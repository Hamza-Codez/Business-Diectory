import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Blog } from "@/types";
import type { Lang } from "@/constants/messages";

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

/**
 * Resolves the markdown file to read for a given blog base name and language.
 * For Japanese, prefers a `<name>.ja.md` variant and falls back to the English `<name>.md`.
 */
function resolveBlogPath(baseName: string, lang: Lang): string {
  if (lang === "ja") {
    const jaPath = path.join(blogsDirectory, `${baseName}.ja.md`);
    if (fs.existsSync(jaPath)) return jaPath;
  }
  return path.join(blogsDirectory, `${baseName}.md`);
}

/**
 * Validates if an image exists in the public directory.
 * Maps paths from /images/blogs/slug/filename to /assets/blogs/slug/filename
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

  const publicAssetsDirectory = path.join(process.cwd(), "public", "assets", "blogs");
  const dirPath = path.join(publicAssetsDirectory, slug);
  
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    let matchedFile = files.find(f => f.startsWith(baseName + "."));
    
    if (!matchedFile) {
      matchedFile = files.find(f => f.replace("-", "").startsWith(normalizedBase + "."));
    }
    
    if (matchedFile) {
      return `/assets/blogs/${slug}/${matchedFile}`;
    }
  }

  return "/assets/hero.png";
}

/** Parses a frontmatter date (YAML Date object or string) to ISO, falling back to now if invalid. */
function toIsoDate(value: unknown): string {
  const date = value instanceof Date ? value : new Date(String(value ?? ""));
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export function getAllBlogs(lang: Lang = "en"): Blog[] {
  // Only process English markdown files as the source of truth; `.ja.md` are
  // per-language variants keyed to the same base name, not separate blogs.
  let fileNames: string[] = [];
  try {
    fileNames = fs
      .readdirSync(blogsDirectory)
      .filter((file) => file.endsWith(".md") && !file.endsWith(".ja.md"));
  } catch (e) {
    console.error("Failed to read blogs directory", e);
    return [];
  }

  const blogs: Blog[] = fileNames.flatMap((fileName) => {
    const baseName = fileName.replace(/\.md$/, "");
    const fullPath = resolveBlogPath(baseName, lang);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    // Skip markdown files that aren't blogs (e.g. prompts/docs without frontmatter)
    if (!data.slug || !data.title) return [];

    return [{
      id: data.slug,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || "",
      banner: getValidImageUrl(data.banner),
      publishedAt: toIsoDate(data.publishedAt),
      category: data.category || "",
    } as Blog];
  });

  // Sort blogs by date descending
  return blogs.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getBlogBySlug(slug: string, lang: Lang = "en"): { blog: Blog; content: string } | undefined {
  try {
    const fullPath = resolveBlogPath(slug, lang);
    if (!fs.existsSync(fullPath)) return undefined;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const blog: Blog = {
      id: data.slug || slug,
      title: data.title || "",
      slug: data.slug || "",
      excerpt: data.excerpt || "",
      banner: getValidImageUrl(data.banner),
      publishedAt: toIsoDate(data.publishedAt),
      category: data.category || "",
    };

    return { blog, content };
  } catch (e) {
    console.error(`Error reading blog with slug: ${slug}`, e);
    return undefined;
  }
}
