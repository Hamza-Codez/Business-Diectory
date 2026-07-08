// scripts/slice-images.mjs
// Slices an AI-generated contact sheet (uniform grid) into square WebP tiles
// and drops them into public/images/categories/<slug>/.
//
// Usage:
//   node scripts/slice-images.mjs sheets/food-beverages.png food-beverages
//   node scripts/slice-images.mjs sheets/education.png education --rows 3 --cols 3 --gutter 10 --inset 6 --size 800
//
// Flags:
//   --rows / --cols   grid dimensions               (default 3 x 3)
//   --gutter          gutter width in px between cells (default 0)
//   --inset           extra px trimmed inside each cell edge, hides
//                     imperfect AI gutters (default 4)
//   --size            output tile size, square       (default 800)

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [, , input, slug] = process.argv;

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : def;
};

const rows = arg("rows", 3);
const cols = arg("cols", 3);
const gutter = arg("gutter", 0);
const inset = arg("inset", 4);
const size = arg("size", 800);

if (!input || !slug) {
  console.error(
    "Usage: node scripts/slice-images.mjs <sheet.png> <category-slug> [--rows 3 --cols 3 --gutter 0 --inset 4 --size 800]"
  );
  process.exit(1);
}

const { width, height } = await sharp(input).metadata();
const tileW = Math.floor((width - gutter * (cols - 1)) / cols);
const tileH = Math.floor((height - gutter * (rows - 1)) / rows);

const outDir = path.join("public", "images", "categories", slug);
await mkdir(outDir, { recursive: true });

let n = 1;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    await sharp(input)
      .extract({
        left: c * (tileW + gutter) + inset,
        top: r * (tileH + gutter) + inset,
        width: tileW - inset * 2,
        height: tileH - inset * 2,
      })
      .resize(size, size, { fit: "cover" })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, `${n}.webp`));
    n++;
  }
}

console.log(`Sliced ${n - 1} tiles from ${input} → ${outDir}/`);
