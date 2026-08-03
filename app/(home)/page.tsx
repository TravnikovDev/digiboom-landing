import Landing from "@/components/Landing";
import { getDictionary } from "@/i18n/dictionaries";
import { landingJsonLd } from "@/lib/landing-jsonld";
import { defaultLocale } from "@/i18n/config";

// The English landing at `/`. Non-English locales live under app/[locale].
export default function HomePage() {
  const t = getDictionary(defaultLocale);
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping `<` keeps a future inline tag in the copy from closing this script
        // early. The FAQ answers are plain today, but rich() supports <mark> and friends.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(landingJsonLd(defaultLocale, t)).replace(/</g, "\\u003c"),
        }}
      />
      <Landing t={t} locale={defaultLocale} />
    </>
  );
}
