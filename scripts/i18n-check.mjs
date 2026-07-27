#!/usr/bin/env node
/**
 * Keeps every locale in lockstep with English, the source of truth.
 *
 * For each messages/<locale>.json it reports:
 *   - missing keys   (present in en, absent here → would fall back to English)
 *   - extra keys     (present here, absent in en → typo or stale key)
 *   - array length   (a translated array of the wrong length breaks the
 *                     position-based mapping the components rely on)
 *
 * Exits non-zero on any discrepancy so CI fails loudly. Run: npm run i18n:check
 */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(here, "..", "messages");
const SOURCE = "en";

function load(locale) {
  return JSON.parse(readFileSync(join(messagesDir, `${locale}.json`), "utf8"));
}

/** Flatten to a map of dot-path → "leaf" | "array:<len>". */
function flatten(value, prefix = "", out = new Map()) {
  if (Array.isArray(value)) {
    out.set(prefix, `array:${value.length}`);
    value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out.set(prefix, "leaf");
  }
  return out;
}

const source = flatten(load(SOURCE));
const locales = readdirSync(messagesDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((l) => l !== SOURCE)
  .sort();

let failed = false;

for (const locale of locales) {
  const target = flatten(load(locale));
  const missing = [];
  const extra = [];
  const arrayMismatch = [];

  for (const [key, kind] of source) {
    if (!target.has(key)) {
      missing.push(key);
    } else if (kind.startsWith("array:") && target.get(key) !== kind) {
      arrayMismatch.push(`${key} (en ${kind}, ${locale} ${target.get(key)})`);
    }
  }
  for (const key of target.keys()) {
    if (!source.has(key)) extra.push(key);
  }

  if (missing.length || extra.length || arrayMismatch.length) {
    failed = true;
    console.log(`\n✗ ${locale}.json`);
    if (missing.length) console.log(`  missing (${missing.length}): ${missing.join(", ")}`);
    if (extra.length) console.log(`  extra (${extra.length}): ${extra.join(", ")}`);
    if (arrayMismatch.length) console.log(`  array length: ${arrayMismatch.join("; ")}`);
  } else {
    console.log(`✓ ${locale}.json — in sync with ${SOURCE}.json`);
  }
}

if (failed) {
  console.log("\ni18n check failed. Bring the locale files in line with messages/en.json.");
  process.exit(1);
}
console.log("\nAll locales in sync.");
