import type { Metadata } from "next";
import BombStatic from "@/components/BombStatic";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import TornEdge from "@/components/TornEdge";
import { getPosts, type PostMeta } from "@/lib/blog";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";

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

function Meta({ post, dark = false }: { post: PostMeta; dark?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] ${
        dark ? "text-bomb-400" : "text-bomb-500"
      }`}
    >
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </div>
  );
}

export default function BlogIndex() {
  const posts = getPosts();
  const [featured, ...rest] = posts;
  const t = getDictionary(defaultLocale);

  return (
    <>
      {/* Hero band — same blast + tech-grid language as the landing */}
      <section className="relative bg-blast overflow-hidden pt-10 pb-24">
        <div className="absolute inset-0 tech-grid mask-fade pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-1 inline-block">The blog</p>
            <h1 className="mt-2 font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">
              Selling digital products
              <br />
              <span className="text-ink">in more than one place</span>
            </h1>
            <p className="mt-5 text-ink text-lg max-w-xl font-medium leading-relaxed">
              Notes from building DigiBoom, and guides for the thing we are building it for: getting
              your digital products off one marketplace and onto several, without doubling your
              workload.
            </p>
          </div>
          <div className="hidden lg:flex justify-center">
            <BombStatic className="w-56 h-56" label="The DigiBoom bomb mascot with a lit fuse" />
          </div>
        </div>
      </section>

      {/* Posts band */}
      <section className="relative bg-bomb-100 pt-20 pb-24 tech-grid-ink">
        <TornEdge className="-top-8" fill="#f2f3f5" />
        <div className="relative mx-auto max-w-6xl px-5">
          {posts.length === 0 ? (
            <p className="font-mono text-sm text-bomb-500">Nothing published yet. Soon.</p>
          ) : (
            <>
              {/* Featured: the newest post gets the weight */}
              <Reveal>
                <a
                  href={`/blog/${featured.slug}/`}
                  className="group block bg-ink border-[3px] border-ink rounded-2xl p-7 sm:p-10 comic-shadow-invert hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-blast text-white rounded px-2 py-0.5">
                      Latest
                    </span>
                    <Meta post={featured} dark />
                  </div>
                  <h2 className="mt-3 font-display text-white text-4xl sm:text-5xl leading-[0.95]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-bomb-300 leading-relaxed max-w-2xl">{featured.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-comic text-2xl text-blast">
                    Read it <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </a>
              </Reveal>

              {rest.length > 0 && (
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {rest.map((post, i) => (
                    <Reveal
                      key={post.slug}
                      delay={i * 0.08}
                      className={`h-full ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
                    >
                      <a
                        href={`/blog/${post.slug}/`}
                        className="group flex h-full flex-col bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow hover:-translate-y-0.5 transition-transform"
                      >
                        <Meta post={post} />
                        <h2 className="mt-2 font-display text-ink text-3xl leading-[0.98]">{post.title}</h2>
                        <p className="mt-2 text-bomb-600 leading-relaxed">{post.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold text-ember">
                          Read <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </a>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Someone arriving here from search should be able to sign up without clicking a post */}
          <div className="mt-16 bg-white border-[3px] border-ink rounded-2xl p-7 sm:p-10 comic-shadow text-center">
            <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">Early access</p>
            <h2 className="mt-2 font-display text-ink text-4xl sm:text-5xl leading-[0.95]">
              We are building the tool these posts describe
            </h2>
            <p className="mt-3 text-bomb-600 leading-relaxed max-w-xl mx-auto">
              DigiBoom opens your other storefronts and keeps every listing in sync. It is in
              development, in the open. Join the waitlist and you will hear when it opens.
            </p>
            <SignupForm
              inputId="email-blog-index"
              signup={t.signup}
              buttonLabel={t.hero.signupButton}
              defaultNote={t.signupSection.note}
              center
            />
          </div>
        </div>
      </section>
    </>
  );
}
