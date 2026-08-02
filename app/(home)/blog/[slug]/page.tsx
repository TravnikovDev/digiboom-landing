import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/BlogPostView";
import { getPostBySlug, getPostSlugs, getPosts, translationsOf } from "@/lib/blog";
import { blogPostJsonLd, blogPostMetadata } from "@/lib/blog-metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";

export function generateStaticParams() {
  return getPostSlugs(defaultLocale).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(defaultLocale, slug);
  if (!post) return {};
  return blogPostMetadata(post, translationsOf(post.key));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(defaultLocale, slug);
  if (!post) notFound();

  const others = getPosts(defaultLocale).filter((p) => p.key !== post.key).slice(0, 2);

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
        locale={defaultLocale}
        t={getDictionary(defaultLocale)}
      />
    </>
  );
}
