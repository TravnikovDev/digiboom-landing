import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndexView from "@/components/BlogIndexView";
import { getPosts, localesWithPosts } from "@/lib/blog";
import { blogIndexMetadata } from "@/lib/blog-metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

/** Only locales that actually have posts get a blog index. */
export function generateStaticParams() {
  return localesWithPosts()
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return blogIndexMetadata(locale, localesWithPosts());
}

export default async function LocaleBlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  return <BlogIndexView posts={getPosts(locale)} locale={locale} t={getDictionary(locale)} />;
}
