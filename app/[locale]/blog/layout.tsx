import BlogNav from "@/components/BlogNav";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Blog chrome for the non-default locales. Inherits <html lang={locale}> and the fonts
 * from app/[locale]/layout.tsx; each page paints its own bands, so no background here.
 */
export default async function LocaleBlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <BlogNav locale={locale} label={t.blog.navLabel} cta={t.nav.cta} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer copy={t.footer} locale={locale} langLabel={t.nav.langLabel} blogLabel={t.blog.navLabel} />
    </div>
  );
}
