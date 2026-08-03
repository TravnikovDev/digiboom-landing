import type { Metadata } from "next";
import type { Post } from "@/lib/blog";
import { getDictionary } from "@/i18n/dictionaries";
import { blogIndexPath, blogPath, defaultLocale, hreflangOf, type Locale } from "@/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

/** Blog index metadata for a locale. `languages` lists only locales that have posts. */
export function blogIndexMetadata(locale: Locale, localesWithPosts: Locale[]): Metadata {
  const t = getDictionary(locale);
  const languages = Object.fromEntries(localesWithPosts.map((l) => [hreflangOf[l], blogIndexPath(l)]));

  return {
    metadataBase: new URL(SITE_URL),
    title: `${t.blog.metaTitle} | DigiBoom`,
    description: t.blog.metaDescription,
    alternates: {
      canonical: blogIndexPath(locale),
      languages: { ...languages, "x-default": blogIndexPath(defaultLocale) },
    },
    openGraph: {
      type: "website",
      siteName: "DigiBoom",
      title: t.blog.metaTitle,
      description: t.blog.metaDescription,
      url: `${SITE_URL}${blogIndexPath(locale)}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "DigiBoom" }],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Post metadata. `translations` is locale → slug for the languages this article exists
 * in, so hreflang never points at a translation we did not write.
 */
export function blogPostMetadata(post: Post, translations: Partial<Record<Locale, string>>): Metadata {
  const languages = Object.fromEntries(
    (Object.entries(translations) as [Locale, string][]).map(([l, slug]) => [hreflangOf[l], blogPath(l, slug)]),
  );
  // x-default only if the article exists in the default locale.
  const xDefault = translations[defaultLocale];

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | DigiBoom`,
    description: post.description,
    alternates: {
      canonical: blogPath(post.locale, post.slug),
      languages: xDefault ? { ...languages, "x-default": blogPath(defaultLocale, xDefault) } : languages,
    },
    openGraph: {
      type: "article",
      siteName: "DigiBoom",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${blogPath(post.locale, post.slug)}`,
      publishedTime: post.date,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

/** BlogPosting structured data. */
export function blogPostJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.locale,
    author: { "@type": "Person", name: "Roman Travnikov" },
    publisher: { "@type": "Organization", name: "DigiBoom", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}${blogPath(post.locale, post.slug)}`,
  };
}
