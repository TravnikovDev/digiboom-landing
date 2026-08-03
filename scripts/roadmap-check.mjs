#!/usr/bin/env node
/**
 * A public roadmap that promises a quarter and then sails past it, still marked "planned",
 * does more damage than having no dates at all. The page says "this page changes as the
 * work does", so a stale date makes the whole claim look untended.
 *
 * This failed for real: the MVP was dated "Q1 to Q2" and closed beta "Q3", both read as
 * 2026, and both were still "planned" in August 2026.
 *
 * Two rules, checked against every locale because each writes its own `when` strings:
 *
 *   1. A milestone whose `when` names a quarter already past must be marked done.
 *   2. A milestone naming a quarter must name its year. "Q3" alone is ambiguous, which is
 *      exactly how the original slip went unnoticed.
 *
 * Run: npm run roadmap:check
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Status is program state and lives in the component, not the dictionaries.
const component = readFileSync(join(ROOT, "components", "Countdown.tsx"), "utf8");
const statusMatch = component.match(/const STATUSES:\s*Status\[\]\s*=\s*\[([^\]]+)\]/);
if (!statusMatch) {
  console.error("✗ Could not read STATUSES from components/Countdown.tsx.");
  process.exit(1);
}
const statuses = [...statusMatch[1].matchAll(/"(done|active|planned)"/g)].map((m) => m[1]);

const now = new Date();
const nowYear = now.getUTCFullYear();
const nowQuarter = Math.floor(now.getUTCMonth() / 3) + 1;
const isPast = (y, q) => y < nowYear || (y === nowYear && q < nowQuarter);

// "Q4 2025", "T4 2025", "2025 Q4" — quarter and year in either order, Q or T.
const WITH_YEAR = /(?:([QT])([1-4])\s*(\d{4}))|(?:(\d{4})\s*([QT])([1-4]))/g;
// A quarter token with no year anywhere in the string.
const BARE_QUARTER = /(?<![\d])[QT][1-4](?![\d])/;

let failed = false;

for (const file of readdirSync(join(ROOT, "messages")).filter((f) => f.endsWith(".json"))) {
  const locale = file.replace(/\.json$/, "");
  const milestones = JSON.parse(readFileSync(join(ROOT, "messages", file), "utf8"))?.countdown?.milestones ?? [];

  milestones.forEach((m, i) => {
    const when = String(m.when ?? "");
    const status = statuses[i] ?? "planned";
    const problems = [];

    const dated = [...when.matchAll(WITH_YEAR)].map((g) =>
      g[1] ? { q: Number(g[2]), y: Number(g[3]) } : { q: Number(g[6]), y: Number(g[4]) },
    );

    for (const { q, y } of dated) {
      if (isPast(y, q) && status !== "done") {
        problems.push(`claims ${y} Q${q}, which has passed, but is still "${status}"`);
      }
    }

    if (!dated.length && BARE_QUARTER.test(when)) {
      problems.push(`names a quarter with no year ("${when}"), which is ambiguous`);
    }

    for (const p of problems) {
      failed = true;
      console.log(`✗ ${file} — milestone ${i + 1} "${m.title}"\n    ${p}`);
    }
  });
}

if (failed) {
  console.log(
    `\nRoadmap check failed (today is ${nowYear} Q${nowQuarter}).\n` +
      "Either mark the milestone done in components/Countdown.tsx, or move the date in\n" +
      "messages/*.json to one you still believe. Do not leave a date you have missed.",
  );
  process.exit(1);
}

console.log(`✓ Roadmap dates are consistent with today (${nowYear} Q${nowQuarter}).`);
