import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/blog";
import SignupForm from "@/components/SignupForm";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | DigiBoom`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      siteName: "DigiBoom",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}/`,
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

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const t = getDictionary(defaultLocale);

  // Article structured data: cheap, and blog posts are exactly what it is for.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Roman Travnikov" },
    publisher: { "@type": "Organization", name: "DigiBoom", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}/`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a href="/blog" className="font-mono text-xs text-bomb-500 hover:text-ink">
        ← all posts
      </a>

      <h1 className="mt-4 font-display text-ink text-4xl sm:text-5xl leading-[1.05]">{post.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-bomb-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
        <span aria-hidden="true">·</span>
        <span>Roman Travnikov</span>
      </div>

      <div className="prose-digiboom mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

      {/* Every post ends at the waitlist. */}
      <aside className="mt-16 bg-white border-[3px] border-ink rounded-2xl p-6 sm:p-8 comic-shadow">
        <p className="font-comic text-xl tracking-wide text-ember -rotate-1 inline-block">Early access</p>
        <h2 className="mt-2 font-display text-ink text-3xl sm:text-4xl leading-[0.95]">
          We are building the tool this post describes
        </h2>
        <p className="mt-3 text-bomb-600 leading-relaxed">
          DigiBoom opens your other storefronts and keeps every listing in sync. It is in
          development. Join the waitlist and you will hear when it opens.
        </p>
        <SignupForm
          inputId={`email-blog-${slug}`}
          signup={t.signup}
          buttonLabel={t.hero.signupButton}
          defaultNote={t.signupSection.note}
        />
      </aside>
    </article>
  );
}
