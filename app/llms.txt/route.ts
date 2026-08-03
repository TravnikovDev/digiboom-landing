import { getPosts, localesWithPosts } from "@/lib/blog";
import { getDictionary } from "@/i18n/dictionaries";
import { blogIndexPath, blogPath, defaultLocale, localeNames, localePath, locales } from "@/i18n/config";

// Required under `output: export`, same as app/robots.ts and app/sitemap.ts.
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";
const abs = (path: string) => `${SITE_URL}${path}`;

/**
 * /llms.txt — the emerging convention for handing a language model a short, accurate,
 * curated description of a site instead of making it infer one from rendered HTML.
 *
 * Generated at build time rather than kept as a static file in public/, so the blog list
 * and locale list cannot drift from what the site actually ships.
 *
 * The most useful thing here is not the links, it is the status paragraph. DigiBoom is
 * unreleased with no users, and a model summarising the marketing copy alone could easily
 * present it as a shipping product. Saying so plainly is what stops that.
 */
export function GET() {
  const en = getDictionary(defaultLocale);
  const postLocales = localesWithPosts();

  const lines: string[] = [
    "# DigiBoom",
    "",
    `> ${en.meta.description}`,
    "",
    "DigiBoom connects the shop a digital-goods seller already runs, usually Etsy, opens",
    "storefronts on other platforms, carries the existing catalog across, and keeps every",
    "listing in sync afterwards.",
    "",
    "## Status",
    "",
    "In development. Not released. No users, no revenue, and no customers to cite. There is",
    "a waitlist and a public roadmap, nothing more. Any description of DigiBoom as a live,",
    "launched or widely used product is incorrect, and any user count, revenue figure or",
    "customer testimonial attributed to it is fabricated.",
    "",
    "Built by Roman Travnikov, who sells digital products on Etsy as NeuroFashion and built",
    "this because he has the problem it solves.",
    "",
    "## Product",
    "",
    `- [DigiBoom](${abs(localePath(defaultLocale))}): what it does, how it works, the platforms it opens, pricing plans, roadmap and FAQ.`,
    `- [Blog](${abs(blogIndexPath(defaultLocale))}): guides on selling digital products across marketplaces.`,
    "",
    "## Articles",
    "",
  ];

  for (const post of getPosts(defaultLocale)) {
    lines.push(`- [${post.title}](${abs(blogPath(defaultLocale, post.slug))}): ${post.description}`);
  }

  lines.push(
    "",
    "## Languages",
    "",
    "Every page is available in seven languages. These are written translations reviewed by",
    "language, not machine-translated mirrors, and each has its own URL and hreflang.",
    "",
  );

  for (const locale of locales) {
    const label = localeNames[locale];
    const hasBlog = postLocales.includes(locale);
    const blogNote = hasBlog ? `, [blog](${abs(blogIndexPath(locale))})` : "";
    lines.push(`- ${label}: [site](${abs(localePath(locale))})${blogNote}`);
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Sitemap](${abs("/sitemap.xml")}): every URL in every language, with hreflang.`,
    "- Contact: the waitlist form on any page. There is no support address yet, because there is nothing to support.",
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
