# Prompt — Blogs Section: Listing Page + Detail Pages (paste into your coding agent)

Build the dedicated blogs section for my Next.js (App Router) Japan business directory. Stack: TypeScript, Tailwind. Design system: zero border-radius, #8F1D21 primary on white, ink #111, Shippori Mincho display / Noto Sans JP body / IBM Plex Mono for meta, 1px `line` (#E5E5E5) borders, no shadows, mobile-first. Blogs are local markdown files in `content/blogs/*.md` with frontmatter: `title, slug, excerpt, category, publishedAt, banner`. Bodies contain standard markdown with images and italic caption lines directly after images. Requirements:

## 1. Content pipeline

`lib/blogs.ts` using `gray-matter`: `getAllBlogs()` (sorted by publishedAt desc, typed to our `Blog` interface) and `getBlogBySlug(slug)`. Render markdown bodies with `react-markdown` (GFM enabled, raw HTML disabled). Build-time only — no client-side markdown parsing.

## 2. Listing page — `app/blogs/page.tsx`

- Breadcrumb (Home / Blogs), then `SectionHeading` left-aligned: bilingual eyebrow `記事 — ARTICLES`, title "Blogs", subtitle "Guides to finding, reaching, and working with businesses in Japan."
- Layout: the newest blog as a large featured card (full-width banner 16:9, category + date meta line in mono, display-face title, excerpt), then the rest in a `grid sm:grid-cols-2` of standard `BlogCard`s. Mobile: single column.
- Cards: square corners, `1px line` border, hover → border and title turn primary. Entire card is one link to `/blogs/[slug]`.
- Metadata: title "Blogs", indexable, canonical. Add the `Blogs` nav link active state.

## 3. Detail page — `app/blogs/[slug]/page.tsx`

- `generateStaticParams` from all slugs; unknown slug → `notFound()`.
- Header: breadcrumb (Home / Blogs / {title}), category eyebrow in mono red, `h1` title in display face, date in mono muted (format `2026.07.02`).
- **Banner:** frontmatter banner via `next/image`, 16:9, full blog-column width, `priority`, explicit dimensions 1600×900.
- **Blog body column:** `max-w-[720px]`, body face `text-base/loose`, `h2` in display face with generous top spacing, links in primary with underline.
- **Inline images:** rendered via a custom `react-markdown` image component → `next/image` at 1440×960 (3:2), full column width, square corners; the italic line immediately following an image renders as a `figcaption`-style caption: `text-sm`, mono, `muted`, top border `1px line`, small padding. Images lazy-load with correct `sizes` so mobile never downloads desktop weight.
- Footer of blog: thin divider, then "More blogs" — up to 3 `BlogRow` cards excluding the current one.
- Metadata: `generateMetadata` with title/excerpt/OG image from banner; `Blog` JSON-LD (headline, datePublished, image) consistent with our existing JsonLd helper.

## 4. Wiring

- The homepage Recent Blogs section now pulls from `getAllBlogs()` (top 5) and all its cards link into these routes — remove any placeholder data.
- Add blog URLs to `app/sitemap.ts`.
- All 15 referenced images live at `public/images/blogs/<slug>/{banner,inline-1,inline-2}.webp` — if a file is missing at build/render, fall back to a neutral placeholder from `public/images/blogs/fallback.webp` rather than a broken image.

## 5. Test cases to list after implementation

All five blogs render with banner, two inline images, and styled captions; typography matches the design system (display h1/h2, mono meta, zero radius); a wrong slug 404s; homepage Recent Blogs links resolve to real blogs; images lazy-load with proper sizes (verify network tab on mobile emulation); JSON-LD validates for one blog; sitemap includes all five; listing page featured card is always the newest by date; removing one image file shows the fallback, not a broken image; Lighthouse on an blog page ≥90 mobile.
