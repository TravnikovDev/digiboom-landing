import type { Locale } from "./config";
import en from "../messages/en.json";
import de from "../messages/de.json";
import fr from "../messages/fr.json";
import es from "../messages/es.json";
import pt from "../messages/pt.json";
import ja from "../messages/ja.json";
import ru from "../messages/ru.json";

/**
 * The message shape is derived from English, which is the source of truth: every other
 * locale is a (possibly partial) override that gets deep-merged onto it, so a key that
 * has not been translated yet falls back to the English string instead of rendering
 * `undefined`. `npm run i18n:check` flags those gaps in CI.
 */
export type Messages = typeof en;

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

const overrides: Record<Locale, DeepPartial<Messages>> = {
  en,
  de: de as DeepPartial<Messages>,
  fr: fr as DeepPartial<Messages>,
  es: es as DeepPartial<Messages>,
  pt: pt as DeepPartial<Messages>,
  ja: ja as DeepPartial<Messages>,
  ru: ru as DeepPartial<Messages>,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Merge `override` onto `base`, recursing into plain objects. Arrays are replaced whole. */
function mergeInto(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const o = override[key];
    if (o === undefined) continue;
    const b = out[key];
    out[key] = isPlainObject(b) && isPlainObject(o) ? mergeInto(b, o) : o;
  }
  return out;
}

/**
 * Build-time only: all locale JSON is statically imported so the static export inlines
 * every string at compile time. The dictionaries are consumed by server components, so
 * nothing here ships to the browser beyond the strings a page actually renders.
 */
export function getDictionary(locale: Locale): Messages {
  if (locale === "en") return en;
  return mergeInto(en as Record<string, unknown>, overrides[locale] as Record<string, unknown>) as Messages;
}
