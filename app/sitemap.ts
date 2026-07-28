import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";

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

  return locales.map((locale) => ({
    url: abs(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.8,
    alternates: { languages },
  }));
}
