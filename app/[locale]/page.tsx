import { notFound } from "next/navigation";
import Landing from "@/components/Landing";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <Landing t={getDictionary(locale)} locale={locale} />;
}
