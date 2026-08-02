import BombStatic from "@/components/BombStatic";
import Reveal from "@/components/Reveal";
import SignupForm from "@/components/SignupForm";
import TornEdge from "@/components/TornEdge";
import { rich } from "@/components/rich";
import type { Post } from "@/lib/blog";
import type { Messages } from "@/i18n/dictionaries";
import { blogPath, type Locale } from "@/i18n/config";

/** The blog listing, shared by the English (`/blog`) and localized (`/<locale>/blog`) routes. */
export default function BlogIndexView({
  posts,
  locale,
  t,
}: {
  posts: Post[];
  locale: Locale;
  t: Messages;
}) {
  const [featured, ...rest] = posts;
  const b = t.blog;

  const date = (iso: string) =>
    iso ? new Date(iso).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <>
      <section className="relative bg-blast overflow-hidden pt-10 pb-24">
        <div className="absolute inset-0 tech-grid mask-fade pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-1 inline-block">{b.eyebrow}</p>
            <h1 className="mt-2 font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">
              {rich(b.heading, { accent: (c, k) => <span key={k} className="text-ink">{c}</span> })}
            </h1>
            <p className="mt-5 text-ink text-lg max-w-xl font-medium leading-relaxed">{b.intro}</p>
          </div>
          <div className="hidden lg:flex justify-center">
            <BombStatic className="w-56 h-56" label={t.mascot.static} />
          </div>
        </div>
      </section>

      <section className="relative bg-bomb-100 pt-20 pb-24 tech-grid-ink">
        <TornEdge className="-top-8" fill="#f2f3f5" />
        <div className="relative mx-auto max-w-6xl px-5">
          {posts.length === 0 ? (
            <p className="font-mono text-sm text-bomb-500">{b.empty}</p>
          ) : (
            <>
              <Reveal>
                <a
                  href={blogPath(locale, featured.slug)}
                  className="group block bg-ink border-[3px] border-ink rounded-2xl p-7 sm:p-10 comic-shadow-invert hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-blast text-white rounded px-2 py-0.5">
                      {b.latest}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-bomb-400">
                      <time dateTime={featured.date}>{date(featured.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>
                        {featured.readingMinutes} {b.readingTime}
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-3 font-display text-white text-4xl sm:text-5xl leading-[0.95]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-bomb-300 leading-relaxed max-w-2xl">{featured.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-comic text-2xl text-blast">
                    {b.readIt} <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </a>
              </Reveal>

              {rest.length > 0 && (
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {rest.map((post, i) => (
                    <Reveal key={post.key} delay={i * 0.08} className={`h-full ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
                      <a
                        href={blogPath(locale, post.slug)}
                        className="group flex h-full flex-col bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow hover:-translate-y-0.5 transition-transform"
                      >
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-bomb-500">
                          <time dateTime={post.date}>{date(post.date)}</time>
                          <span aria-hidden="true">·</span>
                          <span>
                            {post.readingMinutes} {b.readingTime}
                          </span>
                        </div>
                        <h2 className="mt-2 font-display text-ink text-3xl leading-[0.98]">{post.title}</h2>
                        <p className="mt-2 text-bomb-600 leading-relaxed">{post.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold text-ember">
                          {b.read} <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </a>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-16 bg-white border-[3px] border-ink rounded-2xl p-7 sm:p-10 comic-shadow text-center">
            <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">
              {t.signupSection.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-ink text-4xl sm:text-5xl leading-[0.95]">{b.ctaHeadingIndex}</h2>
            <p className="mt-3 text-bomb-600 leading-relaxed max-w-xl mx-auto">{b.ctaText}</p>
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
