import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * File-backed blog. Posts are markdown in content/blog/<slug>.md with frontmatter;
 * everything is read and rendered at build time, so the static export ships plain HTML
 * and no markdown parser reaches the browser.
 *
 * English only for now: translating every post into seven languages is not sustainable
 * solo. The landing stays multilingual; posts that earn traffic can be translated later
 * (see docs/LOCALIZATION.md).
 */
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-07-29 */
  date: string;
  /** Minutes, computed from word count. */
  readingMinutes: number;
  /** Primary keyword from keywords/en.csv, recorded so intent stays traceable. */
  keyword?: string;
};

export type Post = PostMeta & { html: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parse(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    keyword: data.keyword ? String(data.keyword) : undefined,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    html: marked.parse(content, { async: false }) as string,
  };
}

/** All posts, newest first. */
export function getPosts(): Post[] {
  return readSlugs()
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  return readSlugs().includes(slug) ? parse(slug) : null;
}

export function getPostSlugs(): string[] {
  return readSlugs();
}
