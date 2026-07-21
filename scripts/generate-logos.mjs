/**
 * Generates platform logo SVGs into public/logos from the `simple-icons` package.
 *
 * The icon files in simple-icons are CC0; the trademarks themselves stay owned by each
 * company, so these marks are only used to indicate a real integration — see
 * public/logos/README.md before displaying one for a platform we don't integrate with yet.
 *
 * Re-run after bumping simple-icons:  node scripts/generate-logos.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as simpleIcons from "simple-icons";

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../public/logos");

/** Brand colors we deliberately override (unreadable on white, or off-palette). */
const COLOR_OVERRIDES = {
  lemonsqueezy: "#4B3A8F", // brand yellow is off-palette for DigiBoom
  patreon: "#1B1712",
  squarespace: "#1B1712",
  bigcartel: "#1B1712",
};

const WANTED = [
  "Etsy",
  "Envato",
  "itch.io",
  "ArtStation",
  "Shopify",
  "WooCommerce",
  "Payhip",
  "Sellfy",
  "Big Cartel",
  "Squarespace",
  "Gumroad",
  "Lemon Squeezy",
  "Ko-fi",
  "Patreon",
  "BeatStars",
  "Bandcamp",
];

const byTitle = new Map();
for (const key of Object.keys(simpleIcons)) {
  const icon = simpleIcons[key];
  if (icon?.title && icon?.path) byTitle.set(icon.title.toLowerCase(), icon);
}

mkdirSync(OUT_DIR, { recursive: true });

const written = [];
const missing = [];

for (const title of WANTED) {
  const icon = byTitle.get(title.toLowerCase());
  if (!icon) {
    missing.push(title);
    continue;
  }
  const color = COLOR_OVERRIDES[icon.slug] ?? `#${icon.hex}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${icon.title}"><title>${icon.title}</title><path d="${icon.path}" fill="${color}"/></svg>\n`;
  writeFileSync(resolve(OUT_DIR, `${icon.slug}.svg`), svg);
  written.push(`${icon.slug}.svg  ${color}`);
}

console.log(`Wrote ${written.length} logos to public/logos:`);
for (const line of written) console.log("  " + line);
if (missing.length) console.log(`\nNot in simple-icons (letter tiles stay): ${missing.join(", ")}`);
