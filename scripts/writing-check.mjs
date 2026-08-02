#!/usr/bin/env node
/**
 * Flags the mechanical "signs of AI writing" in user-facing copy, per docs/WRITING.md.
 * Judgement calls (padding, generic sentences) are still a human job; this only catches
 * what a regex can catch honestly.
 *
 * Scans: messages/*.json, content/blog/<locale>/*.md
 * Run:   npm run writing:check
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Words LLMs over-produce. Plain synonyms are better writing anyway. */
const AI_VOCAB = [
  "delve", "crucial", "pivotal", "showcase", "showcases", "showcasing", "underscore",
  "underscores", "underscoring", "tapestry", "testament", "vibrant", "robust", "seamless",
  "seamlessly", "realm", "foster", "fosters", "fostering", "garner", "garners", "garnered",
  "meticulous", "meticulously", "intricate", "intricacies", "enhance", "enhances",
  "enhancing", "leverage", "leverages", "leveraging", "bolster", "bolsters", "bolstered",
  "myriad", "plethora", "holistic", "paradigm", "synergy", "synergies", "elevate",
  "elevates", "empower", "empowers", "empowering", "transformative", "cutting-edge",
  "groundbreaking", "renowned", "boasts", "nestled", "utilize", "utilizes", "utilizing",
];

/** Assistant-side text that must never reach a file. */
const LEAKS = [
  "as an ai language model", "as of my last knowledge update", "i hope this helps",
  "let me know if", "certainly!", "of course!", "here is a", "oaicite", "contentreference",
  "turn0search", "utm_source=chatgpt", "utm_source=openai", "[cite:", "paste_", "insert_",
  "[your name]",
];

const rules = [
  {
    id: "ai-vocab",
    label: "AI-vocabulary word (docs/WRITING.md §2)",
    test: (line) => {
      const re = new RegExp(`\\b(${AI_VOCAB.join("|")})\\b`, "gi");
      return [...line.matchAll(re)].map((m) => m[0]);
    },
  },
  {
    id: "participle-tail",
    label: "participle tail adding significance (§3)",
    test: (line) =>
      [...line.matchAll(
        /,\s(highlighting|ensuring|reflecting|underscoring|emphasizing|showcasing|fostering|solidifying|cementing|contributing to|demonstrating)\b/gi,
      )].map((m) => m[0].trim()),
  },
  {
    id: "significance-padding",
    label: "significance padding (§3)",
    test: (line) =>
      [...line.matchAll(
        /\b(stands as a|serves as a|is a testament|plays a (crucial|key|vital|pivotal) role|marks a (pivotal|key) |reflects a broader|evolving landscape)\b/gi,
      )].map((m) => m[0].trim()),
  },
  {
    id: "copula-avoidance",
    label: 'avoiding "is"/"has" (§3)',
    test: (line) =>
      [...line.matchAll(/\b(serves as|functions as|operates as|stands as)\b/gi)].map((m) => m[0]),
  },
  {
    id: "vague-attribution",
    label: "vague attribution (§3)",
    test: (line) =>
      [...line.matchAll(
        /\b(experts (argue|say|agree)|studies show|industry reports|observers have|it is widely (regarded|considered))\b/gi,
      )].map((m) => m[0]),
  },
  {
    id: "didactic",
    label: "didactic disclaimer (§3)",
    test: (line) =>
      [...line.matchAll(/\b(it('s| is) (important|worth) (to )?(note|noting|remember)|keep in mind that)\b/gi)]
        .map((m) => m[0]),
  },
  {
    id: "summary-section",
    label: 'summary opener ("In summary/conclusion") (§3)',
    test: (line) => [...line.matchAll(/^\s*(in summary|in conclusion|overall,)/gi)].map((m) => m[0].trim()),
  },
  {
    id: "em-dash",
    label: "em dash in English (§4) — use a comma, colon or full stop",
    // Correct native punctuation in Russian; Japanese does not use it this way either.
    locales: (locale) => locale !== "ru",
    test: (line) => (line.includes("—") ? ["—"] : []),
  },
  {
    id: "bold-header-list",
    label: "bold-header bullet list (§4)",
    test: (line) =>
      [...line.matchAll(/^\s*[-*•]\s*\*\*[^*]+\*\*\s*[—:-]/g)].map(() => "- **Name** — …"),
  },
  {
    id: "curly-quote",
    label: "curly quote/apostrophe (§4)",
    // Legitimate in ja/ru/fr typography; flag for the Latin locales we write straight.
    locales: (locale) => ["en", "de", "es", "pt"].includes(locale),
    test: (line) => [...line.matchAll(/[\u201C\u201D\u2018\u2019]/g)].map((m) => m[0]),
  },
  {
    id: "title-case-heading",
    label: "Title Case heading (§4) - use sentence case",
    // German capitalises every noun, so this test cannot distinguish there.
    locales: (locale) => locale !== "de",
    test: (line) => {
      const m = line.match(/^#{2,6}\s+(.*)$/);
      if (!m) return [];
      const words = m[1].split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
      if (words.length < 3) return [];
      const capped = words.filter((w) => /^[A-Z]/.test(w)).length;
      return capped >= words.length - 1 ? [m[1]] : [];
    },
  },
  {
    id: "assistant-leak",
    label: "assistant/chat text or placeholder leaked into copy (§5)",
    test: (line) => LEAKS.filter((p) => line.toLowerCase().includes(p)),
  },
];

function targets() {
  const out = [];
  const messagesDir = join(ROOT, "messages");
  if (existsSync(messagesDir)) {
    for (const f of readdirSync(messagesDir).filter((f) => f.endsWith(".json"))) {
      out.push({ path: join(messagesDir, f), locale: f.replace(/\.json$/, "") });
    }
  }
  const blogDir = join(ROOT, "content", "blog");
  if (existsSync(blogDir)) {
    for (const locale of readdirSync(blogDir)) {
      const dir = join(blogDir, locale);
      for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        out.push({ path: join(dir, f), locale });
      }
    }
  }
  return out;
}

let findings = 0;
const byRule = new Map();

for (const { path, locale } of targets()) {
  const lines = readFileSync(path, "utf8").split("\n");
  lines.forEach((line, i) => {
    // Skip markdown frontmatter keys and JSON keys, which are not prose.
    for (const rule of rules) {
      if (rule.locales && !rule.locales(locale)) continue;
      const hits = rule.test(line);
      if (!hits.length) continue;
      findings += hits.length;
      if (!byRule.has(rule.id)) byRule.set(rule.id, { label: rule.label, items: [] });
      byRule.get(rule.id).items.push(
        `  ${relative(ROOT, path)}:${i + 1}  ${[...new Set(hits)].join(", ")}`,
      );
    }
  });
}

if (findings === 0) {
  console.log("✓ No mechanical AI-writing tells found.\n  (Judgement calls are still yours: docs/WRITING.md)");
  process.exit(0);
}

console.log(`Found ${findings} possible AI-writing tell(s). See docs/WRITING.md.\n`);
for (const [id, { label, items }] of byRule) {
  console.log(`✗ ${id} — ${label}`);
  for (const item of items.slice(0, 12)) console.log(item);
  if (items.length > 12) console.log(`  … and ${items.length - 12} more`);
  console.log("");
}
process.exit(1);
