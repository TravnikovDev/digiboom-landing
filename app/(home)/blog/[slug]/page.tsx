import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs, getPosts } from "@/lib/blog";
import SignupForm from "@/components/SignupForm";
import TornEdge from "@/components/TornEdge";
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
  const others = getPosts().filter((p) => p.slug !== slug).slice(0, 2);

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Title band, in the site's hero language */}
      <header className="relative bg-blast overflow-hidden pt-8 pb-24">
        <div className="absolute inset-0 tech-grid mask-fade pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-5">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-ink hover:underline"
          >
            ← all posts
          </a>
          <h1 className="mt-4 font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-ink">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>Roman Travnikov</span>
          </div>
        </div>
      </header>

      <div className="relative bg-bomb-100 pt-16 pb-24 tech-grid-ink">
        <TornEdge className="-top-8" fill="#f2f3f5" flip />
        <div className="relative mx-auto max-w-3xl px-5">
          {/* Article on white paper: better contrast than body text on grey, and it reads
              as an object on the page like every other card on the site. */}
          <article className="bg-white border-[3px] border-ink rounded-2xl p-6 sm:p-10 comic-shadow">
            <div className="prose-digiboom" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>

          {/* Waitlist */}
          <aside className="mt-10 bg-ink border-[3px] border-ink rounded-2xl p-7 sm:p-10 comic-shadow-invert">
            <p className="font-comic text-2xl tracking-wide text-blast -rotate-1 inline-block">Early access</p>
            <h2 className="mt-2 font-display text-white text-3xl sm:text-4xl leading-[0.95]">
              We are building the tool this post describes
            </h2>
            <p className="mt-3 text-bomb-300 leading-relaxed">
              DigiBoom opens your other storefronts and keeps every listing in sync. It is in
              development. Join the waitlist and you will hear when it opens.
            </p>
            <div className="on-dark">
              <SignupForm
                inputId={`email-blog-${slug}`}
                signup={t.signup}
                buttonLabel={t.hero.signupButton}
                defaultNote={t.signupSection.note}
                onDark
              />
            </div>
          </aside>

          {/* Keep readers in the blog */}
          {others.length > 0 && (
            <div className="mt-14">
              <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">Keep reading</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-5">
                {others.map((other) => (
                  <a
                    key={other.slug}
                    href={`/blog/${other.slug}/`}
                    className="group flex h-full flex-col bg-white border-[3px] border-ink rounded-2xl p-5 comic-shadow-sm hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="font-mono text-[11px] text-bomb-500">{other.readingMinutes} min read</span>
                    <h3 className="mt-1 font-display text-2xl text-ink leading-[1]">{other.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs font-semibold text-ember">
                      Read <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
