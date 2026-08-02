import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/BlogPostView";
import { getPostBySlug, getPosts, localesWithPosts, translationsOf } from "@/lib/blog";
import { blogPostJsonLd, blogPostMetadata } from "@/lib/blog-metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

/** One entry per (locale, slug) that really exists on disk. */
export function generateStaticParams() {
  return localesWithPosts()
    .filter((locale) => locale !== defaultLocale)
    .flatMap((locale) => getPosts(locale).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  const post = getPostBySlug(locale, slug);
  if (!post) return {};
  return blogPostMetadata(post, translationsOf(post.key));
}

export default async function LocaleBlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();

  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const others = getPosts(locale).filter((p) => p.key !== post.key).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }}
      />
      <BlogPostView
        post={post}
        others={others}
        translations={translationsOf(post.key)}
        locale={locale}
        t={getDictionary(locale)}
      />
    </>
  );
}
