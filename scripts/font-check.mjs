#!/usr/bin/env node
/**
 * The Japanese font is self-hosted and subset to the characters the Japanese copy uses
 * (see app/globals.css). If someone writes a kanji the subset does not contain, the
 * browser renders tofu (□) and nobody notices until a reader complains.
 *
 * This compares the characters currently in the Japanese copy against the manifest the
 * subset was built from. No dependencies, so it is safe to run in CI.
 *
 * Fix a failure with: npm run fonts:build
 *
 * Run: npm run fonts:check
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(ROOT, "public", "fonts", "ja-subset.txt");
const LOCALE = "ja";

if (!existsSync(MANIFEST)) {
  console.error(`✗ Missing ${relative(ROOT, MANIFEST)}. Run: npm run fonts:build`);
  process.exit(1);
}

/** Every character the Japanese pages can render, per the subset manifest. */
const covered = new Set([...readFileSync(MANIFEST, "utf8")]);

/** Every character the Japanese copy actually uses, with where it came from. */
const sources = new Map();
function note(char, where) {
  if (!sources.has(char)) sources.set(char, where);
}
function walk(value, where) {
  if (typeof value === "string") for (const c of value) note(c, where);
  else if (Array.isArray(value)) for (const v of value) walk(v, where);
  else if (value && typeof value === "object") for (const v of Object.values(value)) walk(v, where);
}

const messages = join(ROOT, "messages", `${LOCALE}.json`);
walk(JSON.parse(readFileSync(messages, "utf8")), `messages/${LOCALE}.json`);

const blogDir = join(ROOT, "content", "blog", LOCALE);
if (existsSync(blogDir)) {
  for (const file of readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
    // Frontmatter keys and slugs are ASCII plumbing, but titles and descriptions render,
    // so the whole file counts.
    for (const c of readFileSync(join(blogDir, file), "utf8")) {
      note(c, `content/blog/${LOCALE}/${file}`);
    }
  }
}

// Control characters and whitespace never need a glyph.
const missing = [...sources.keys()].filter(
  (c) => c.codePointAt(0) > 31 && !/\s/.test(c) && !covered.has(c),
);

if (missing.length) {
  console.log(`Found ${missing.length} character(s) in Japanese copy that the font subset does not cover.\n`);
  const byFile = new Map();
  for (const c of missing) {
    const where = sources.get(c);
    if (!byFile.has(where)) byFile.set(where, []);
    byFile.get(where).push(`${c} (U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")})`);
  }
  for (const [file, chars] of byFile) console.log(`✗ ${file}\n  ${chars.join(", ")}`);
  console.log("\nThese would render as tofu. Regenerate the subset: npm run fonts:build");
  process.exit(1);
}

console.log(
  `✓ Japanese font subset covers all ${sources.size} characters in the ${LOCALE} copy ` +
    `(${covered.size} glyphs in the subset).`,
);
