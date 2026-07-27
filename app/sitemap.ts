import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

// Required for metadata routes under `output: export` (otherwise the build errors).
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

/**
 * One entry per locale URL, each carrying the full hreflang alternates map (plus x-default).
 * Static-export friendly: with no generateSitemaps this emits a single static
 * out/sitemap.xml at build. Trailing slashes match the emitted directory-style URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}/`]),
  );
  languages["x-default"] = `${SITE_URL}/en/`;

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.8,
    alternates: { languages },
  }));
}
