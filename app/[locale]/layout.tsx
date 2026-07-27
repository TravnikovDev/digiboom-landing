import type { Metadata, Viewport } from "next";
import { Bangers, Bebas_Neue, JetBrains_Mono, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

// BCP-47 / OpenGraph locale tags for the four Latin-script languages we ship first.
const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
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
    <html
      lang={locale}
      className={`${bebas.variable} ${bangers.variable} ${rubik.variable} ${mono.variable}`}
    >
      <body className="bg-blast text-ink antialiased font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
