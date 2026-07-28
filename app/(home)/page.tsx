import Landing from "@/components/Landing";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";

// The English landing at `/`. Non-English locales live under app/[locale].
export default function HomePage() {
  return <Landing t={getDictionary(defaultLocale)} locale={defaultLocale} />;
}
