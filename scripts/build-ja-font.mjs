#!/usr/bin/env node
/**
 * Rebuilds the self-hosted Japanese font subset in public/fonts.
 *
 * Google serves Noto Sans JP as ~250 unicode-range @font-face rules, and next/font inlines
 * the CSS of every font it imports into every page, so routing Japanese through next/font
 * cost all seven locales 66 KB (gzipped) of CJK @font-face declarations. Self-hosting a
 * subset replaces that with two rules.
 *
 * Run this whenever the Japanese copy gains characters the subset lacks; `npm run
 * fonts:check` tells you when that has happened, and runs in CI so it cannot ship broken.
 *
 * Needs Python with fonttools and brotli (`pip install fonttools brotli`), which is why it
 * is a manual step rather than part of the build. The generated .woff2 files and the
 * manifest are committed, so builds and CI need neither Python nor network.
 *
 * Run: npm run fonts:build
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "fonts");
const LOCALE = "ja";

/**
 * Characters the copy does not use today but that ordinary edits will reach. Kana and
 * punctuation are close to free; kanji are what cost bytes, so those stay demand-driven.
 */
const HEADROOM = [
  [0x0020, 0x007e], // Basic Latin
  [0x00a0, 0x00ff], // Latin-1 punctuation and accents
  [0x2010, 0x201f], // dashes and quotes
  [0x2026, 0x2026], // ellipsis
  [0x3000, 0x303f], // CJK punctuation
  [0x3041, 0x309f], // Hiragana
  [0x30a0, 0x30ff], // Katakana
  [0xff01, 0xff65], // Fullwidth forms
];

// Pinned so a rebuild does not silently pick up a different release than the committed files.
const VERSION = "v56";
const FACES = [
  { weight: 400, name: "regular", url: `https://fonts.gstatic.com/s/notosansjp/${VERSION}/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf` },
  { weight: 700, name: "bold", url: `https://fonts.gstatic.com/s/notosansjp/${VERSION}/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75s.ttf` },
];

function usedCharacters() {
  const chars = new Set();
  const walk = (v) => {
    if (typeof v === "string") for (const c of v) chars.add(c);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(JSON.parse(readFileSync(join(ROOT, "messages", `${LOCALE}.json`), "utf8")));

  const blogDir = join(ROOT, "content", "blog", LOCALE);
  if (existsSync(blogDir)) {
    for (const f of readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
      for (const c of readFileSync(join(blogDir, f), "utf8")) chars.add(c);
    }
  }
  return new Set([...chars].filter((c) => c.codePointAt(0) > 31));
}

const used = usedCharacters();
const headroom = new Set();
for (const [lo, hi] of HEADROOM) {
  for (let cp = lo; cp <= hi; cp++) headroom.add(String.fromCodePoint(cp));
}
const charset = [...new Set([...used, ...headroom])].sort();
const kanji = charset.filter((c) => c.codePointAt(0) >= 0x4e00 && c.codePointAt(0) <= 0x9fff);

console.log(`Japanese copy uses ${used.size} characters; subsetting to ${charset.length} (${kanji.length} kanji).`);

mkdirSync(OUT, { recursive: true });
const unicodes = charset.map((c) => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`).join(",");

for (const face of FACES) {
  const src = join(tmpdir(), `noto-sans-jp-${face.weight}-${VERSION}.ttf`);
  if (!existsSync(src)) {
    console.log(`  downloading ${face.name} (${face.weight})…`);
    execFileSync("curl", ["-sfL", face.url, "-o", src]);
  }
  const out = join(OUT, `noto-sans-jp-${face.name}.subset.woff2`);
  execFileSync("pyftsubset", [
    src,
    `--unicodes=${unicodes}`,
    "--flavor=woff2",
    "--layout-features=*",
    `--output-file=${out}`,
  ]);
  console.log(`  ${relative(ROOT, out)}  ${(statSync(out).size / 1024).toFixed(1)} KB`);
}

// The manifest is the contract fonts:check enforces, so it must match what was just built.
writeFileSync(join(OUT, "ja-subset.txt"), charset.join(""), "utf8");
console.log(`  ${relative(ROOT, join(OUT, "ja-subset.txt"))}  ${charset.length} characters`);
console.log("\nDone. Verify with: npm run fonts:check");
