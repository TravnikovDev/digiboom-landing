import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { hreflangOf, localePath, locales, type Locale } from "@/i18n/config";

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
  const languages = Object.fromEntries(locales.map((l) => [hreflangOf[l], localePath(l)]));

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "DigiBoom",
    // Top terms from keywords/<locale>.csv (the keywords core); keep in sync with it.
    keywords: [
      "digital products",
      "sell digital products",
      "digital downloads",
      "Etsy digital downloads",
      "sell digital products online",
      "Etsy to Shopify",
      "multichannel selling",
      "marketplace sync",
      "Gumroad",
    ],
    authors: [{ name: "Roman Travnikov" }],
    /**
     * `icon` has to be listed explicitly. Declaring an `icons` object at all switches off
     * Next's automatic detection of app/icon.svg, and because this metadata merges down
     * from the root layout, naming only `apple` here silently stripped the favicon link
     * from every page on the site. The 404 page kept one purely because it sits outside
     * this tree, which is what made the omission easy to miss. There is no favicon.ico to
     * fall back on, so without this line browsers showed a blank tab icon.
     */
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
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
