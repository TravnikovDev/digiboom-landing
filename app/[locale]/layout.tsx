import type { Metadata, Viewport } from "next";
import { Bangers, Bebas_Neue, JetBrains_Mono, Noto_Sans_JP, Oswald, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

// Latin brand faces — preloaded, used by en/de/fr/es/pt.
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code" });

// Non-Latin faces — preload:false and referenced only via :root:lang(ru|ja) in globals.css,
// so their (large) glyph files are fetched only on Russian/Japanese pages, never by Latin
// visitors. Bebas/Bangers have no Cyrillic/CJK, hence the swaps.
const oswald = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-oswald", preload: false }); // ru display
const rubikCyr = Rubik({ subsets: ["latin", "cyrillic"], variable: "--font-rubik-cyr", preload: false }); // ru body/comic
const monoCyr = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono-cyr", preload: false }); // ru mono
const notoJP = Noto_Sans_JP({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-noto-jp", preload: false }); // ja everything

const FONT_VARS = [bebas, bangers, rubik, mono, oswald, rubikCyr, monoCyr, notoJP]
  .map((f) => f.variable)
  .join(" ");

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

/** Static export: pre-render one HTML tree per locale. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  // hreflang map, so search engines serve the right language and never flag duplicates.
  // Trailing slashes match the emitted directory-style URLs (trailingSlash: true).
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/`]));

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
      canonical: `/${locale}/`,
      languages: { ...languages, "x-default": "/en/" },
    },
    openGraph: {
      type: "website",
      siteName: "DigiBoom",
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/${locale}/`,
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

export const viewport: Viewport = {
  themeColor: "#EE5C0B",
  colorScheme: "light",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={FONT_VARS}>
      <body className="bg-blast text-ink antialiased font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
