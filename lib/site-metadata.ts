import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, locales, type Locale } from "@/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

// BCP-47 / OpenGraph locale tags per language.
const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_BR",
  ja: "ja_JP",
  ru: "ru_RU",
};

/**
 * Per-locale <head> metadata, shared by the `/` (English) root layout and the `[locale]`
 * layout. Canonical + hreflang use localePath(), so English resolves to `/` (not `/en/`) and
 * there is exactly one canonical URL per language.
 */
export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l)]));

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "DigiBoom",
    keywords: [
      "digital products",
      "Etsy to Shopify",
      "marketplace sync",
      "sell digital downloads",
      "multi-channel selling",
      "Gumroad",
    ],
    authors: [{ name: "Roman Travnikov" }],
    icons: { apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }] },
    alternates: {
      canonical: localePath(locale),
      languages: { ...languages, "x-default": localePath("en") },
    },
    openGraph: {
      type: "website",
      siteName: "DigiBoom",
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}${localePath(locale)}`,
      locale: OG_LOCALE[locale],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}
