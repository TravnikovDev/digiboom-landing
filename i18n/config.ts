/**
 * The set of locales the site ships. Single source of truth: add a code here, add a
 * matching messages/<code>.json, and (for a new script) a font in app/[locale]/layout.
 *
 * Phase 1 ships the Latin four. pt/ja/ru are planned (see docs/LOCALIZATION.md) and get
 * added here once translated and, for ja/ru, once their fonts are wired.
 */
export const locales = ["en", "de", "fr", "es", "pt", "ja", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * The default locale is served at the site root (`/`) with real content — no redirect — so
 * the canonical apex URL is the English page itself. Every other locale is path-prefixed.
 * Use this for every locale-aware link, canonical, and hreflang entry.
 */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

/** Blog index for a locale: `/blog/` for the default, `/<locale>/blog/` otherwise. */
export function blogIndexPath(locale: Locale): string {
  return locale === defaultLocale ? "/blog/" : `/${locale}/blog/`;
}

/** A blog post URL. Slugs are localized, so pass the slug for *that* locale. */
export function blogPath(locale: Locale, slug: string): string {
  return `${blogIndexPath(locale)}${slug}/`;
}

/**
 * BCP-47 tags for hreflang and any other place that declares the language to a machine.
 * Mostly identical to the locale code; Portuguese is the exception, because the copy is
 * Brazilian (você, a gente, arquivos rather than ficheiros) and `pt` alone would offer it
 * to readers in Portugal as if it were written for them. OG_LOCALE already said pt_BR, so
 * this also stops the page contradicting its own metadata.
 *
 * The URL path stays `/pt/`. Only the declared language changes.
 */
export const hreflangOf: Record<Locale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt-BR",
  ja: "ja",
  ru: "ru",
};

/** Endonyms for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
  ja: "日本語",
  ru: "Русский",
};
