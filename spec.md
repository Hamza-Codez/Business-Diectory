# SPEC — Japan Business Directory (Frontend)

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS
**Scope of this spec:** Landing page frontend, API-driven, production-grade structure.
**Design ethos:** Beauty with brains. Every element earns its place or it gets cut.

---

## 1. Hard Rules (Non-Negotiable)

These override everything else in the document.

1. **Zero rounded corners.** No `rounded-*` classes. Border radius is globally disabled in the Tailwind config. Buttons, inputs, cards, images, chips — all square-edged.
2. **Raw text.** Copy is plain, direct, and specific. No marketing filler ("Discover amazing experiences!"), no exclamation-mark enthusiasm, no lorem ipsum in the final build. Buttons say exactly what they do ("Search", "Get in touch", "Add your business").
3. **No useless presentation.** No gradients, no glassmorphism, no drop shadows, no decorative blobs, no floating particles. If a visual element carries no information, delete it. Depth is created with borders, offsets, and flat color only.
4. **Standardized UI.** One button system, one input system, one card system, one section rhythm — reused everywhere. A control never changes behavior or appearance between sections.
5. **Mobile-first.** Every component is styled for the smallest screen first, then enhanced with `sm: md: lg: xl:` — never the reverse. The site must be elegant at 360px and at 1440px.

---

## 2. Design Tokens

Defined once in `tailwind.config.ts` and consumed everywhere. No raw hex values inside components.

### 2.1 Color

| Token          | Value     | Usage                                              |
| -------------- | --------- | -------------------------------------------------- |
| `primary`      | `#8F1D21` | Buttons, icons, active states, key headings, links |
| `primary-dark` | `#6E1519` | Hover/pressed state of primary                     |
| `ink`          | `#111111` | Body headings, footer background, dark blocks      |
| `body`         | `#1F1F1F` | Paragraph text                                     |
| `muted`        | `#5C5C5C` | Secondary text, meta lines, captions               |
| `line`         | `#E5E5E5` | Borders, dividers, input outlines                  |
| `surface`      | `#F7F6F5` | Alternating section background, image backdrops    |
| `white`        | `#FFFFFF` | Page background                                    |

Dark image sections (Hero, Search band) use a flat overlay: `ink` at 55–65% opacity — never a gradient overlay.

### 2.2 Typography

Chosen to carry the Japanese identity, not just decorate it. All loaded via `next/font/google` (self-hosted, zero layout shift).

| Role    | Face                   | Usage                                                        |
| ------- | ---------------------- | ------------------------------------------------------------ |
| Display | **Shippori Mincho**    | H1/H2 section titles — a Japanese mincho serif; used with restraint |
| Body    | **Noto Sans JP**       | Paragraphs, labels, nav, buttons (full JP glyph support)     |
| Utility | **IBM Plex Mono**      | Meta data only: phone numbers, hours, dates, listing counts  |

Type scale (mobile → desktop):

- H1: `text-3xl → text-5xl`, display face, weight 600, tight leading
- H2: `text-2xl → text-4xl`, display face, weight 600
- Section eyebrow: `text-xs`, mono, uppercase tracking-wide, `primary`
- Body: `text-base`, leading-relaxed
- Meta: `text-sm`, mono, `muted`

**Signature device — bilingual eyebrow.** Every section title carries a small red eyebrow above it pairing kanji with English, e.g. `検索 — SEARCH`, `カテゴリー — CATEGORIES`, `記事 — ARTICLES`. This is the site's one recurring identity mark; nothing else competes with it.

### 2.3 Spacing & Layout

- Container: `max-w-7xl`, horizontal padding `px-4 sm:px-6 lg:px-8`
- Section vertical rhythm: `py-16 lg:py-24` — identical for every section, no exceptions
- Grid gaps: `gap-4` mobile, `gap-6 lg:gap-8` desktop
- Breakpoints: Tailwind defaults (`sm 640 / md 768 / lg 1024 / xl 1280`)

### 2.4 Motion

Minimal and functional only:

- Hover: color/border transitions, `duration-200`
- No scroll-triggered animation on v1
- `prefers-reduced-motion` respected globally

---

## 3. File & Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, Header, Footer, metadata
│   ├── page.tsx            # Landing page: composes section components in order
│   ├── globals.css         # Tailwind directives + base resets only
│   └── search/
│       └── page.tsx        # Search results route (stub in v1, receives query params)
├── components/
│   ├── ui/                 # Standardized primitives — the ONLY building blocks
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Chip.tsx
│   │   ├── SectionHeading.tsx   # eyebrow + title + optional subtitle
│   │   └── Skeleton.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx   # client component
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── sections/           # One file per landing section, same order as the page
│   │   ├── Hero.tsx
│   │   ├── FeaturedCategories.tsx
│   │   ├── SearchBand.tsx
│   │   ├── ConnectCta.tsx
│   │   ├── PopularCategories.tsx
│   │   ├── RecentArticles.tsx
│   │   └── WhyChooseUs.tsx
│   └── cards/
│       ├── CategoryTile.tsx
│       ├── ArticleCard.tsx
│       └── ArticleRow.tsx  # compact mobile/side variant
├── lib/
│   ├── api.ts              # Public fetchers the app calls (searchBusinesses, getPopularCategories…)
│   ├── adapters/           # One adapter per external API — the ONLY files that know provider shapes
│   │   ├── geoapify.ts     # Geoapify Places → Business[] (primary provider)
│   │   ├── hotpepper.ts    # Hot Pepper Gourmet → Business[] (Food & Beverages enrichment)
│   │   └── gbizinfo.ts     # gBizINFO → Business (optional corporate lookup, v1.1)
│   └── utils.ts            # cn() class merge, formatters (phone, date, count)
├── types/
│   └── index.ts            # Business, Category, Article, Review
├── constants/
│   ├── nav.ts              # Nav links, footer links
│   └── categories.ts       # Category slugs → lucide icon + Geoapify category keys
content/
└── articles/               # Local article content (MDX/JSON) — see 6.5
public/
└── images/                 # Hero, section, and article fallback imagery
.env.example                # GEOAPIFY_API_KEY, HOTPEPPER_API_KEY, GBIZINFO_API_TOKEN
```

Rules:

- One component per file. Component name = file name (PascalCase).
- Server Components by default. `'use client'` appears **only** in `SearchBand`'s form and `MobileNav`.
- No component imports another section; sections compose only `ui/`, `cards/`, `layout/`.

---

## 4. Standardized Primitives (`components/ui/`)

### Button

- Variants: `primary` (solid `primary` bg, white text), `outline` (1px `line` border, ink text), `ghost` (text only, `primary` text)
- Sizes: `md` (h-11, px-6), `lg` (h-13, px-8)
- States: hover (`primary-dark` / border darkens), focus-visible (2px `primary` outline, 2px offset), disabled (50% opacity)
- Square corners. Text is sentence case. Optional trailing lucide icon at 18px.

### Input / Select

- Height `h-12`, white background, `1px line` border, `px-4`, `text-base`
- Focus: border becomes `primary` (no ring glow)
- Optional leading/trailing icon slot at 20px, `muted` color
- Select uses a native `<select>` styled to match — no custom dropdown library in v1

### Chip

- Square tag, `1px line` border, `px-4 py-2 text-sm`, transparent background
- Hover/active: border and text turn `primary`
- Used for popular searches and category tags

### SectionHeading

- Renders: bilingual eyebrow (mono, red) → title (display face) → optional one-line subtitle (`muted`)
- Prop `align: 'center' | 'left'` — the only two alignments allowed on the site

---

## 5. Landing Page — Section-by-Section Spec

Order on the page (exact):

1. Header
2. Hero
3. Featured Categories
4. Search Band
5. Connect With More Customers
6. Popular Categories
7. Recent Articles
8. Why Choose Us
9. Footer

### 5.1 Header (sticky)

- White background, `1px line` bottom border, no shadow. Height `h-16 lg:h-[72px]`.
- **Left:** wordmark logo — ink text with a single red mark (e.g., a red square or the kanji 目 as the dot). Text-based, no image logo needed for v1.
- **Desktop right:** nav links (Home, Categories, Articles, Contact) in body face, `ink`, hover `primary`; then a `primary` Button: **"Add your business"**.
- **Mobile:** logo + hamburger (24px lucide `Menu`). Opens a full-screen white overlay (`MobileNav`, client component): large stacked links in display face, CTA button at the bottom, close icon top-right. Body scroll locked while open.

### 5.2 Hero

- Full-bleed, `min-h-[70svh] lg:min-h-[80svh]`, content vertically centered, left-aligned inside the container.
- **Background:** one static image via `next/image` (`fill`, `priority`, `object-cover`) — Japanese modern-meets-traditional scene (e.g., a torii gate or lantern street framed against contemporary Tokyo architecture at dusk). Flat `ink/60` overlay above it.
- **Content stack:** bilingual eyebrow → H1 in white, raw and direct: *"Find any business in Japan."* → one supporting line (`text-white/80`, max-w-xl): *"Addresses, phone numbers, hours, and reviews — for suppliers, services, and everything in between."* → `primary` Button **"Start searching"** that smooth-scrolls to the Search Band (anchor link, no JS beyond `scroll-behavior`).
- No carousels, no animated text, no scroll-down arrow.

### 5.3 Featured Categories *(per reference image 1)*

- White background. `SectionHeading` centered: title **"Featured categories"** (title in `primary` per reference), subtitle *"What do you need to find?"*.
- **Grid of CategoryTiles:** `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` (two rows on desktop), `gap-8`.
- **CategoryTile anatomy (top → bottom, centered):** lucide icon 32px in `primary` → label in `ink`, weight 600, `text-sm lg:text-base`. No card chrome — icons and labels sit directly on white, exactly like the reference.
- Categories (icon mapping lives in `constants/categories.ts`): Businesses & Trades, Health & Medical, Education, Food & Beverages, Digital Media & IT, Shops & Marts, Shopping & Malls, Real Estate, Arts & Entertainment, Transport & Logistics.
- Hover: icon and label shift to `primary-dark`; a 2px red underline rule grows under the label (`scale-x` transition). Entire tile is one `<Link>` to `/search?category=<slug>`.

### 5.4 Search Band *(per reference image 3)* — `id="search"`

- Full-bleed band, `py-20 lg:py-28`. Background: static image (dark-toned Japanese workspace / night street) with flat `ink/65` overlay.
- Centered H2 in white: **"Discover your favourite business & places"**.
- **Search form** (client component), max-w-5xl centered:
  - Mobile: fields stacked full-width, `gap-3`, button last and full-width.
  - Desktop (`lg:`): single row — `[ keyword input (flex-1) | location input with crosshair icon (w-56) | category select (w-56) | Search button ]`, all `h-14`, separated by `gap-2`.
  - Keyword placeholder: *"What are you looking for?"* · Location placeholder: *"Location"* with lucide `LocateFixed` trailing icon (tapping it requests browser geolocation and fills the field) · Select default: *"All categories"*.
  - Submit navigates to `/search?query=&location=&category=` via router push. Empty submits are allowed (results page handles it) — no blocking validation, keep the flow frictionless.
- **Below the form:** label **"Popular searches"** (white, body face) followed by Chips in white-outline style: *Restaurant*, *Services*. Clicking a chip runs that search immediately.

### 5.5 Connect With More Customers *(per reference image 2)*

- White background, two-column `lg:grid-cols-2 gap-12 items-center`. Mobile: copy first, image second.
- **Left (copy):** left-aligned `SectionHeading` → H2: **"Connect with more customers."** → two short raw paragraphs, e.g.: *"List your business on Japan's growing directory. Your address, hours, and contact details — visible to people already looking for what you do."* / *"Claim your listing today and start getting found."* → `primary` Button **"Get in touch"**.
- **Right (image):** one photograph of a Japanese business interaction (shopkeeper greeting a customer, craftsman at work) inside a thin `ink` device-style frame (`border-8 border-ink`) — the flat, square-cornered stand-in for the reference's tablet mock. Behind it, exactly one flat `surface` rectangle offset `-top-6 -left-6` for depth. Nothing else — no blobs, no circles (the reference's yellow blob is explicitly dropped per Hard Rule 3).

### 5.6 Popular Categories

- `surface` background band (visual separation via flat color, not decoration).
- Left-aligned `SectionHeading`: **"Popular categories"**, subtitle *"Where people search the most."*
- Content is deliberately text-first (raw-text ethos): a responsive grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4` of rows, each row a `<Link>`:
  - Category name in `ink`, weight 500 — listing count right-aligned in mono `muted`, e.g. **Food & Beverages** `1,248`
  - `1px line` bottom border per row; hover turns name and border `primary`.
- Data: top 8–12 categories by `listingCount` from the API.

### 5.7 Recent Articles *(per reference image 5)*

- White background. Centered `SectionHeading`: **"Recent articles"**.
- **Desktop layout (mirrors the reference's center-dominant composition):** 12-column grid —
  - Columns 1–3: two stacked `ArticleRow` cards (small)
  - Columns 4–9: one large **featured** `ArticleCard`
  - Columns 10–12: two stacked `ArticleRow` cards (small)
- **Featured ArticleCard:** 16:9 cover image (square corners) → mono meta line `2026.07.01 · Guides` → title in display face (`text-xl`, hover `primary`) → 2-line excerpt (`muted`, clamped).
- **ArticleRow (small):** thumbnail `w-24 h-20 object-cover` left, text right: mono meta line + title clamped to 2 lines. `1px line` border, white background, no shadow; hover: border `primary`.
- **Mobile:** featured card first, then the four rows stacked vertically.
- All cards link to `/articles/[slug]` (route stub in v1). Data: 5 most recent articles from API.

### 5.8 Why Choose Us *(per reference image 4)*

- White background, two-column `lg:grid-cols-2 gap-12 items-center`.
- **Left (image composition, exactly two layers as in the reference):**
  - Back layer: photo with a flat grayscale treatment (`grayscale`), positioned up-left.
  - Front layer: full-color photo overlapping the back layer down-right by ~30% (`absolute` offset), edged with a 4px `primary` left border as the only accent.
  - Both photos: Japanese business/street scenes consistent with the hero. Square corners.
  - Mobile: the composition scales down but keeps the overlap (container `aspect-[5/4]`, `relative`).
- **Right:** left-aligned `SectionHeading`: **"Why choose us"** → three stacked value blocks reproducing the reference's angled bars:
  - Each block: `ink` background, white text, skewed `-skew-x-6`; inner content wrapper counter-skewed `skew-x-6` so text stays upright.
  - Middle block uses `primary` background for rhythm.
  - Block content: bold one-line claim + one plain supporting line. Raw copy, and every claim must stay true to what the data layer actually delivers (see Section 6): **"Real addresses, real locations"** — *"Every listing carries an address and map coordinates."* / **"Search that respects your time"** — *"Keyword, category, and location — one bar, one click."* / **"Open, verifiable data"** — *"Built on OpenStreetMap and official Japanese sources, not scraped guesses."*
  - Mobile: blocks full-width, `-skew-x-3` (reduced angle so edges don't clip the viewport).
- The skewed-block motif appears **only** in this section — it belongs to the reference, not the whole site.

### 5.9 Footer

- `ink` background, white/gray text, `py-16`. Top area: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10`.
  1. **Brand:** wordmark (white + red mark), one-line description, social icons (20px lucide, `muted` → hover white).
  2. **Explore:** Home, Categories, Articles, Add your business, Contact.
  3. **Top categories:** 5–6 category links.
  4. **Contact:** address, phone, email, hours — all set in mono (directory data is the product; the footer models it).
- Link style: `text-white/70`, hover `text-white`; headings `text-sm uppercase tracking-wide text-white/50`.
- **Bottom bar:** `1px` top border in `white/10`, then `© 2026 <Name>. All rights reserved.` left and Privacy / Terms links right (stacked and centered on mobile).
- **Data attribution (required by providers, see 6.7):** one mono `text-xs text-white/50` line above the bottom bar — *"Business data © Geoapify | © OpenStreetMap contributors · Powered by Hot Pepper Gourmet Web Service"*.

---

## 6. Data & API Layer

### 6.1 Selected APIs (researched, free to use)

| Role | API | Cost / Access | What it provides | Limits & notes |
| ---- | --- | ------------- | ---------------- | -------------- |
| **Primary — all listings & search** | **Geoapify Places API** — `https://api.geoapify.com/v2/places` | Free plan: **3,000 credits/day**, no credit card; 1 credit ≈ 20 places returned | OSM-based POIs across Japan: name, full address, `lat/lng`, ~500 hierarchical categories, and (where mapped in OSM) opening hours, phone, website. GeoJSON responses. | Permissive license — responses **may be cached/stored** (unlike Google Places). Attribution required. Sign up at geoapify.com → project → API key. |
| **Enrichment — Food & Beverages** | **Hot Pepper Gourmet API** (Recruit Web Service) — `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/` | Free with API key (registration at webservice.recruit.co.jp) | Rich, genuinely Japanese restaurant data: name, address, `lat/lng`, genre, **opening hours, budget, shop photos**, shop URL. Supports keyword, area, and lat/lng+range search. `format=json`. | Restaurants only; docs in Japanese; **no CORS** → must be called server-side (our architecture already does this). Requires a visible "Powered by Hot Pepper Gourmet Web Service" credit. |
| **Optional (v1.1) — corporate lookup** | **gBizINFO REST API** (METI, Japanese government) — `https://info.gbiz.go.jp/api/v1/hojin` | Free; token issued by simple application, sent as `X-hojinInfo-api-token` header | ~4M registered Japanese corporations: legal name, corporate number, HQ address, representative, capital, employees, industry, company URL, founding date. | Serves the "find suppliers / B2B" use case. No photos, hours, reviews, or coordinates (addresses need geocoding). API v2 released Jan 2026; v1 still supported — build the adapter against v2. |

Why this combination: Geoapify is the only free option that matches the directory's core search model (keyword + category + geolocation) across **all** our categories with coordinates included; Hot Pepper adds the photo-rich, culturally authentic layer for the highest-traffic category; gBizINFO covers the supplier-lookup use case with authoritative government data. None of the free APIs provide customer reviews — see 6.5.

### 6.2 Architecture — adapter pattern

Sections and pages never talk to providers directly. All provider knowledge is isolated in `lib/adapters/`:

```
Sections / search page (Server Components)
        │  call
        ▼
lib/api.ts            searchBusinesses(params), getPopularCategories(), getRecentArticles()
        │  routes by category / lookup type
        ▼
lib/adapters/         geoapify.ts · hotpepper.ts · gbizinfo.ts
        │  fetch (server-side only, keys never reach the client)
        ▼
External APIs         → each adapter maps the raw response into the unified Business type
```

- All fetching happens in **Server Components** with `next: { revalidate: 3600 }` — landing-page data (popular categories, seeded featured listings) is cached for an hour, which keeps daily usage far below Geoapify's 3,000-credit free quota. Search results use `revalidate: 300`.
- Because Geoapify's license permits storing results, cached/ISR pages are fully compliant.
- Keys live in server-only env vars (no `NEXT_PUBLIC_` prefix), documented in `.env.example`:

```
GEOAPIFY_API_KEY=
HOTPEPPER_API_KEY=
GBIZINFO_API_TOKEN=
```

### 6.3 Search parameter mapping (Geoapify)

The Search Band's three inputs map to Geoapify query parameters:

| UI input | Geoapify parameter |
| -------- | ------------------ |
| Category select | `categories=<mapped keys>` (see 6.4) |
| Location text | Geoapify Geocoding API resolves the text to `lat/lng`, then `filter=circle:lng,lat,10000` (10 km) |
| Geolocate button | Browser coordinates → same `filter=circle` |
| Keyword | `name=<keyword>` filter; results additionally filtered server-side against `name` |
| No location given | `filter=rect:<Japan bounding box>` so results stay within Japan |

Requests always include `limit=20` (1 credit per request at 20 places — predictable quota math).

### 6.4 Category mapping (`constants/categories.ts`)

Our 10 directory categories map to Geoapify category keys. Keys below are indicative — verify each against the official supported-categories list in the Geoapify Places docs during setup, and adjust in one place (this constants file):

| Directory category | Geoapify keys | Enrichment |
| ------------------ | ------------- | ---------- |
| Businesses & Trades | `service`, `commercial.trade` | — |
| Health & Medical | `healthcare` | — |
| Education | `education` | — |
| Food & Beverages | `catering` | **Hot Pepper adapter merged in** |
| Digital Media & IT | `office.it`, `office.company` | — |
| Shops & Marts | `commercial.supermarket`, `commercial.convenience` | — |
| Shopping & Malls | `commercial.shopping_mall` | — |
| Real Estate | `office.estate_agent` | — |
| Arts & Entertainment | `entertainment` | — |
| Transport & Logistics | `office.logistics`, `service.vehicle` | — |

### 6.5 Unified types (`types/index.ts`)

Fields not guaranteed by the free providers are optional; the UI renders them only when present.

```ts
interface Business {
  id: string;                 // provider id, prefixed: "geo_…", "hp_…", "gbiz_…"
  source: 'geoapify' | 'hotpepper' | 'gbizinfo';
  name: string;
  category: CategorySlug;
  address: { formatted: string; city?: string; prefecture?: string; postalCode?: string };
  geo?: { lat: number; lng: number };   // absent for gBizINFO records
  phone?: string;                        // present when mapped in OSM / gBizINFO
  website?: string;
  hours?: string;                        // raw opening-hours string, shown verbatim in mono
  budget?: string;                       // Hot Pepper only
  image?: string;                        // Hot Pepper photo; others use category fallback image
}

interface Category {
  slug: CategorySlug;
  name: string;
  geoapifyKeys: string[];
  listingCount?: number;       // populated by one cached count query per category
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;         // ISO
  category: string;
}
```

**Reviews:** no free provider supplies them. Rating UI is therefore **cut from v1 cards** (an empty star row is useless presentation). The `Review` type and display slot are reserved for v2, when reviews become first-party data.

**Articles:** no external API needed — articles are local MDX/JSON content in the repo (`content/articles/`), typed as `Article`. This keeps the Recent Articles section fully functional without inventing a fake endpoint.

### 6.6 Loading / empty / error states

- Loading: `Skeleton` primitive — flat `surface` rectangles matching final layout (no shimmer animation).
- Empty (e.g., a search with no matches): one plain line in `muted` — *"No businesses found for this search."* — no illustration, no icon.
- Error / quota exceeded: *"Couldn't load this section. Refresh to try again."* Errors state what happened; they don't apologize. Adapters catch failures and return typed empty results; one provider failing never crashes the page.

### 6.7 Attribution & compliance (required, not optional)

- **Geoapify / OpenStreetMap:** footer bottom bar carries *"Business data © Geoapify | © OpenStreetMap contributors"* as plain mono text.
- **Hot Pepper:** the required *"Powered by Hot Pepper Gourmet Web Service"* credit renders wherever Hot Pepper data is displayed (results list footer + site footer).
- **gBizINFO:** cite gBizINFO (METI) as the source when corporate records are shown.

---

## 7. Responsiveness Contract

| Range            | Behavior                                                                 |
| ---------------- | ------------------------------------------------------------------------ |
| `< 640px`        | Single column everywhere; search fields stacked; nav in overlay; category grid 2-col |
| `640–1023px`     | 2–3 column grids; search still stacked or 2×2; articles: featured + 2-col rows |
| `≥ 1024px`       | Full layouts: 5-col category grid, single-row search bar, 12-col article composition, two-column splits |

Verification requirement: every section reviewed at **360px, 768px, and 1280px** before merge. Nothing overflows horizontally at any width.

---

## 8. Code & Quality Standards

- **TypeScript strict mode.** No `any`.
- **Naming:** components `PascalCase`, functions/vars `camelCase`, routes/files in `app/` kebab-case, constants `SCREAMING_SNAKE` only for true constants.
- **Styling:** Tailwind utilities only; no CSS modules, no inline `style` except dynamic image positioning. Shared class logic via `cn()` in `lib/utils.ts`.
- **Images:** `next/image` exclusively, with explicit `sizes`; hero image gets `priority`; all others lazy. Every image has meaningful `alt` text.
- **Accessibility:** semantic landmarks (`header/main/section/footer`), one `h1`, labeled form fields (visually-hidden labels on the search bar), `focus-visible` outlines on all interactive elements, color contrast ≥ 4.5:1 (verify `muted` on `surface`).
- **Performance targets:** Lighthouse ≥ 90 across the board on mobile; no client JS beyond the search form and mobile nav; fonts self-hosted via `next/font`.
- **Tailwind config enforcement:** `borderRadius` theme set to `{ none: '0' }` — rounded corners become impossible, not just discouraged.

---

## 9. Imagery Direction

One coherent set, sourced/generated before build, stored in `public/images/`:

| Slot                  | Direction                                                                 |
| --------------------- | ------------------------------------------------------------------------- |
| Hero                  | Traditional element (torii, lanterns, shrine edge) framed against modern Japanese cityscape, dusk tones that sit well under the dark overlay |
| Search band           | Darker, quieter: night street signage or a workspace with Japanese detail |
| Connect section       | Human moment: Japanese shopkeeper/craftsman with a customer               |
| Why Choose Us (×2)    | Business street scene + interior detail; back layer will be shown grayscale |
| Article fallbacks     | Neutral Japanese urban textures for articles without covers               |

All imagery shares warm-neutral grading so the red `#8F1D21` reads as the only saturated voice on the page.

---

## 10. Acceptance Checklist

- [ ] All 9 sections present, in the specified order, matching the reference layouts
- [ ] Zero border-radius anywhere (enforced by config)
- [ ] No gradients, shadows, or decorative shapes beyond the two specified flat offsets
- [ ] All copy is final raw text — no placeholders, no filler adjectives
- [ ] Search submits to `/search` with query params; chips and category tiles deep-link correctly
- [ ] Search results come from the live Geoapify Places API through `lib/adapters/geoapify.ts`; Food & Beverages results merge Hot Pepper data
- [ ] API keys are server-only env vars — no key ever appears in client bundles or network requests from the browser
- [ ] ISR caching in place (`revalidate: 3600` landing / `300` search) — a normal day of traffic stays under Geoapify's 3,000-credit free quota
- [ ] Provider attribution lines render in the footer (Geoapify/OSM + Hot Pepper credit)
- [ ] Only `SearchBand` form and `MobileNav` are client components
- [ ] Sections render skeleton → data → empty/error states without layout shift; a failing provider never crashes the page
- [ ] Clean at 360 / 768 / 1280 px; no horizontal overflow
- [ ] Lighthouse mobile ≥ 90; hero image `priority`; fonts via `next/font`
- [ ] Folder structure matches Section 3 exactly