import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.biz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Blog. Selling digital products in more than one place. | DigiBoom",
  description:
    "Guides for people who sell digital products: opening a second storefront, Etsy alternatives for digital downloads, and keeping listings in sync without the busywork.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    siteName: "DigiBoom",
    title: "DigiBoom blog",
    description: "Guides for people who sell digital products in more than one place.",
    url: `${SITE_URL}/blog/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DigiBoom" }],
  },
  robots: { index: true, follow: true },
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">The blog</p>
      <h1 className="mt-2 font-display text-ink text-5xl sm:text-6xl leading-[0.95]">
        Selling digital products in more than one place
      </h1>
      <p className="mt-4 text-bomb-600 leading-relaxed max-w-2xl">
        Notes from building DigiBoom, and guides for the thing we are building it for: getting your
        digital products off one marketplace and onto several, without doubling your workload.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 font-mono text-sm text-bomb-500">Nothing published yet. Soon.</p>
      ) : (
        <div className="mt-12 space-y-5">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="block bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-bomb-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2 className="mt-2 font-bold text-xl text-ink">{post.title}</h2>
              <p className="mt-2 text-bomb-600 leading-relaxed">{post.description}</p>
              <span className="mt-3 inline-block font-mono text-xs font-semibold text-ember">Read →</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
