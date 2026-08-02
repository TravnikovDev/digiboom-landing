import type { MetadataRoute } from "next";
import { blogIndexPath, blogPath, localePath, locales } from "@/i18n/config";
import { getPosts, localesWithPosts, translationsOf } from "@/lib/blog";

// Required for metadata routes under `output: export` (otherwise the build errors).
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";
const abs = (locale: (typeof locales)[number]) => `${SITE_URL}${localePath(locale)}`;

/**
 * One entry per locale URL, each carrying the full hreflang alternates map (plus x-default).
 * English is the root (`/`); the others are prefixed. Static-export friendly: with no
 * generateSitemaps this emits a single static out/sitemap.xml at build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(locales.map((locale) => [locale, abs(locale)]));
  languages["x-default"] = abs("en");

  const localeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: abs(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.8,
    alternates: { languages },
  }));

  // Blog: one index per locale that has posts, and one entry per (locale, post).
  // hreflang lists only the languages an article was actually translated into.
  const blogLocales = localesWithPosts();
  const indexLanguages = Object.fromEntries(
    blogLocales.map((l) => [l, `${SITE_URL}${blogIndexPath(l)}`]),
  );

  const blogEntries: MetadataRoute.Sitemap = [
    ...blogLocales.map((l) => ({
      url: `${SITE_URL}${blogIndexPath(l)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: { languages: indexLanguages },
    })),
    ...blogLocales.flatMap((l) =>
      getPosts(l).map((post) => ({
        url: `${SITE_URL}${blogPath(l, post.slug)}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            (Object.entries(translationsOf(post.key)) as [typeof l, string][]).map(([loc, slug]) => [
              loc,
              `${SITE_URL}${blogPath(loc, slug)}`,
            ]),
          ),
        },
      })),
    ),
  ];

  return [...localeEntries, ...blogEntries];
}
