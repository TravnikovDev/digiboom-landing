import type { Messages } from "@/i18n/dictionaries";
import { localePath, type Locale } from "@/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

/**
 * Structured data for the landing page, one linked @graph rather than several loose
 * script tags so the entities can reference each other by @id.
 *
 * Two things are deliberately absent, and both are the same rule as docs/WRITING.md §6
 * applied to machine-readable data instead of prose:
 *
 * - No `offers`. The pricing section is headed "Planned pricing". Emitting Offer nodes
 *   would assert purchasable products at fixed prices, which do not exist yet.
 * - No `aggregateRating` or `review`. There are no users, so any rating would be invented.
 *   This is also the single most common way sites earn a manual action from Google.
 *
 * FAQPage is included because the answers are genuinely on the page. Worth knowing: Google
 * restricted FAQ rich results to authoritative government and health sites in 2023, so this
 * will not produce stars or dropdowns in search for us. It earns its place by making the
 * answers cleanly extractable for everything else that reads structured data, which now
 * includes AI crawlers.
 */
export function landingJsonLd(locale: Locale, t: Messages) {
  const url = `${SITE_URL}${localePath(locale)}`;
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "DigiBoom",
        url: SITE_URL,
        description: t.meta.description,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/apple-icon.png`,
          width: 180,
          height: 180,
        },
        founder: {
          "@type": "Person",
          name: "Roman Travnikov",
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url,
        name: "DigiBoom",
        description: t.meta.description,
        inLanguage: locale,
        publisher: { "@id": orgId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "DigiBoom",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "E-commerce",
        operatingSystem: "Web browser",
        description: t.meta.description,
        inLanguage: locale,
        publisher: { "@id": orgId },
        author: { "@id": orgId },
        screenshot: `${SITE_URL}/og.png`,
        // In development, not released. Stated rather than implied, so a consumer of this
        // data cannot read the absence of `offers` as an oversight.
        releaseNotes: "In development. Not yet released; early access is by waitlist.",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": siteId },
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}
