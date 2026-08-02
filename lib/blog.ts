import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { locales, type Locale } from "@/i18n/config";

/**
 * File-backed, multilingual blog.
 *
 *   content/blog/<locale>/<key>.md
 *
 * The **file basename is the key**: it is stable across languages and is what ties
 * translations of the same article together (for hreflang and the language switcher).
 * The **URL slug** can differ per language via a `slug:` frontmatter field, so German
 * readers get /de/blog/digitale-produkte-auf-etsy-verkaufen/ rather than an English URL.
 *
 * Translation is **opt-in per post**: an article exists in exactly the languages that
 * have a file for it. Nothing is auto-generated and nothing falls back to English, because
 * a page that silently serves the wrong language is worse than no page — so a post with
 * only an English file simply does not appear on /de/blog/, and its hreflang set lists
 * only the languages that really exist. That keeps translating a *winning* post cheap and
 * optional instead of forcing all seven up front.
 *
 * Everything is read and rendered at build time, so the static export ships plain HTML and
 * no markdown parser reaches the browser.
 */
export type PostMeta = {
  /** Stable cross-language identifier (the file basename). */
  key: string;
  /** URL segment for this locale (frontmatter `slug`, else the key). */
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-07-29 */
  date: string;
  readingMinutes: number;
  /** Primary keyword from keywords/<locale>.csv, so intent stays traceable. */
  keyword?: string;
};

export type Post = PostMeta & { html: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function localeDir(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

function readKeys(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parse(locale: Locale, key: string): Post {
  const raw = fs.readFileSync(path.join(localeDir(locale), `${key}.md`), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;

  return {
    key,
    slug: String(data.slug ?? key),
    locale,
    title: String(data.title ?? key),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    keyword: data.keyword ? String(data.keyword) : undefined,
    // CJK has no spaces, so word counting undercounts badly; characters/500 is the
    // usual rule of thumb for Japanese.
    readingMinutes:
      locale === "ja"
        ? Math.max(1, Math.round(content.trim().length / 500))
        : Math.max(1, Math.round(words / 200)),
    html: marked.parse(content, { async: false }) as string,
  };
}

/** Posts available in a locale, newest first. */
export function getPosts(locale: Locale): Post[] {
  return readKeys(locale)
    .map((key) => parse(locale, key))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Look a post up by the URL slug used in that locale. */
export function getPostBySlug(locale: Locale, slug: string): Post | null {
  const match = getPosts(locale).find((p) => p.slug === slug);
  return match ?? null;
}

/** Slugs to pre-render for a locale. */
export function getPostSlugs(locale: Locale): string[] {
  return getPosts(locale).map((p) => p.slug);
}

/** Does this locale have at least one post? Drives whether /<locale>/blog/ exists. */
export function localeHasPosts(locale: Locale): boolean {
  return readKeys(locale).length > 0;
}

/** Every locale with at least one post. */
export function localesWithPosts(): Locale[] {
  return locales.filter(localeHasPosts);
}

/**
 * The languages a given article exists in, as locale → slug. Used for hreflang and for
 * the language switcher on a post page, so neither ever points at a page we did not write.
 */
export function translationsOf(key: string): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const locale of locales) {
    if (!readKeys(locale).includes(key)) continue;
    out[locale] = parse(locale, key).slug;
  }
  return out;
}
