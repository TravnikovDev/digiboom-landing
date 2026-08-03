import { notFound } from "next/navigation";
import Landing from "@/components/Landing";
import { getDictionary } from "@/i18n/dictionaries";
import { landingJsonLd } from "@/lib/landing-jsonld";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  const t = getDictionary(locale);
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping `<` keeps a future inline tag in the copy from closing this script
        // early. The FAQ answers are plain today, but rich() supports <mark> and friends.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(landingJsonLd(locale, t)).replace(/</g, "\\u003c"),
        }}
      />
      <Landing t={t} locale={locale} />
    </>
  );
}
