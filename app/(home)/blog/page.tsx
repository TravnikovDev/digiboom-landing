import type { Metadata } from "next";
import BlogIndexView from "@/components/BlogIndexView";
import { getPosts, localesWithPosts } from "@/lib/blog";
import { blogIndexMetadata } from "@/lib/blog-metadata";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";

export const metadata: Metadata = blogIndexMetadata(defaultLocale, localesWithPosts());

export default function BlogIndex() {
  return (
    <BlogIndexView
      posts={getPosts(defaultLocale)}
      locale={defaultLocale}
      t={getDictionary(defaultLocale)}
    />
  );
}
