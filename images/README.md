# Image Manifest — public/images/

Source or generate these before the build. All images: **square corners, warm-neutral grading** so the brand red `#8F1D21` is the only saturated voice on the page. Rendered via `next/image` with explicit `sizes` and meaningful `alt`.

---

## 1. `hero.jpg` — Hero (section 5.2)

- **Usage:** full-bleed background, `fill` + `object-cover`, `priority`. Sits under a flat `ink/60` overlay — must stay readable with white text on top.
- **Aspect / size:** landscape, ≥ 2400×1600 (covers `min-h-[80svh]` at 1440px+).
- **Direction:** traditional element (torii gate, paper lanterns, shrine edge) framed against modern Japanese cityscape, dusk tones.

**Generation prompt:**
> A red torii gate and glowing paper lanterns in the foreground, framed against modern Tokyo high-rise architecture at dusk. Cinematic photography, warm neutral tones, muted colors, soft dusk light, slightly dark exposure suitable for white text overlay. No people in focus, no text or signage legible. 3:2 landscape.

---







---

## 3. `connect.jpg` — Connect With More Customers (section 5.5)

- **Usage:** right-column photo inside an 8px `ink` frame, flat `surface` rectangle offset behind it.
- **Aspect / size:** roughly 4:3 or 5:4, ≥ 1600×1200.
- **Direction:** human moment — Japanese shopkeeper or craftsman with a customer.

**Generation prompt:**
> A Japanese shopkeeper warmly greeting a customer across the counter of a small traditional shop, natural window light, candid documentary style. Warm neutral grading, muted tones, shallow depth of field, authentic and unposed. 4:3.

---

## 4a. `whyBack.png` — Why Choose Us, back layer (section 5.8)

Save to `frontend/public/assets/whyBack.png`.

- **Usage:** back layer of the two-photo overlap, positioned up-left. Displayed **grayscale** via CSS (`grayscale` class) — supply the image in color.
- **Aspect / size:** ~4:3, ≥ 1400×1050 (rendered at 65% × 62% of a 5:4 container).
- **Direction:** Japanese business street scene, consistent with the hero.

**Generation prompt:**
> A busy Japanese commercial street with small storefronts and awnings, daytime, documentary photography, strong composition with clear architectural lines. Muted warm-neutral tones, no legible text, no recognizable faces. Will be displayed in grayscale, so prioritize contrast and texture over color. 4:3.

---

## 4b. `whyFront.png` — Why Choose Us, front layer (section 5.8)

Save to `frontend/public/assets/whyFront.png`.

- **Usage:** full-color front layer overlapping the back layer down-right by ~30%, edged with a 4px `primary` red left border — the section's only accent.
- **Aspect / size:** ~4:3, ≥ 1400×1050.
- **Direction:** Japanese business interior detail.

**Generation prompt:**
> Interior detail of a modern Japanese small business — craftsman's hands at work at a wooden counter, or a minimal shop interior with careful product display. Warm neutral grading, muted palette with one subtle deep-red accent, natural light, intimate framing, no legible text, no recognizable faces. 4:3.

---

## 5. Article covers — Recent Articles (section 5.7)

Save to `frontend/public/assets/`. One cover per article in `content/articles/articles.json`.

- **Usage:** featured card renders 16:9; small rows crop the same file to `w-24 h-20` — the subject must survive a tiny thumbnail crop, so keep one clear central subject.
- **Aspect / size:** 16:9, ≥ 1600×900.
- **Shared style (append to every prompt):** documentary photography, warm neutral grading, muted desaturated colors, natural light, no legible text, no recognizable faces, one clear central subject. 16:9.

### `articleSupplier.png` — "How to verify a Japanese supplier before your first order"
> Inside a small Japanese workshop or factory floor: neatly stacked cardboard shipping boxes and a clipboard resting on a wooden workbench, morning light through frosted windows.

### `articleAddress.png` — "Reading a Japanese address: from prefecture to block number"
> A weathered Japanese residential street corner with a blue enamel address plaque on a wall beside a doorway, plaque characters softly out of focus, textured plaster and wood.

### `articleHours.png` — "What 定休日 means for your visit: opening hours in Japan"
> The entrance of a small Japanese shop at dusk with a fabric noren curtain hanging in the doorway and a wooden closed shutter beside it, warm lantern light.

### `articleShotengai.png` — "Tokyo's shotengai: where neighborhood business still thrives"
> A covered Japanese shotengai shopping arcade stretching into the distance, small storefronts with awnings on both sides, banners softly blurred, gentle daylight through the arcade roof.

### `articleRegistry.png` — "The 2026 corporate registry update and what it changes for lookups"
> A minimal Japanese office desk scene: a stack of official documents with a hanko seal stamp and its red ink pad resting on top, clean modern surfaces, shallow depth of field.

---

## Sections with no static imagery

- **Header / Footer** — text wordmark with a red mark; no logo image in v1.
- **Featured Categories** — lucide icons only.
- **Popular Categories** — text-only rows.
- **Food & Beverages listings** — photos arrive at runtime from the Hot Pepper API (`Business.image`); everything else falls back to category imagery.
