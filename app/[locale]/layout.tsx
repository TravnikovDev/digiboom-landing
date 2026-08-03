import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { FONT_VARS } from "../fonts";
import Analytics from "@/components/Analytics";
import { buildMetadata } from "@/lib/site-metadata";
import { defaultLocale, hreflangOf, isLocale, locales } from "@/i18n/config";

// Root layout for the prefixed, non-default locales (/de/, /fr/, ...). English is served at
// `/` by app/(home) instead, so it is excluded here — there is no /en/ page.
export function generateStaticParams() {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return buildMetadata(locale);
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
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  return (
    // lang declares the variant, not the URL segment: /pt/ is Brazilian, so pt-BR.
    <html lang={hreflangOf[locale]} className={FONT_VARS}>
      <body className="bg-blast text-ink antialiased font-sans overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
