import SignupForm from "@/components/SignupForm";
import TornEdge from "@/components/TornEdge";
import type { Post } from "@/lib/blog";
import type { Messages } from "@/i18n/dictionaries";
import { blogIndexPath, blogPath, localeNames, type Locale } from "@/i18n/config";

/** A blog post, shared by the English (`/blog/...`) and localized (`/<locale>/blog/...`) routes. */
export default function BlogPostView({
  post,
  others,
  translations,
  locale,
  t,
}: {
  post: Post;
  others: Post[];
  /** locale → slug, for the languages this article actually exists in. */
  translations: Partial<Record<Locale, string>>;
  locale: Locale;
  t: Messages;
}) {
  const b = t.blog;
  const date = (iso: string) =>
    iso ? new Date(iso).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" }) : "";

  const otherLanguages = (Object.keys(translations) as Locale[]).filter((l) => l !== locale);

  return (
    <>
      <header className="relative bg-blast overflow-hidden pt-8 pb-24">
        <div className="absolute inset-0 tech-grid mask-fade pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-5">
          <a
            href={blogIndexPath(locale)}
            className="inline-flex items-center gap-2 font-mono text-xs text-ink hover:underline"
          >
            ← {b.allPosts}
          </a>
          <h1 className="mt-4 font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-ink">
            <time dateTime={post.date}>{date(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingMinutes} {b.readingTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>Roman Travnikov</span>
          </div>

          {/* Only languages this article really exists in — never a link to a page we did not write. */}
          {otherLanguages.length > 0 && (
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-ink">
              <span className="opacity-70">{b.alsoIn}:</span>
              {otherLanguages.map((l) => (
                <a
                  key={l}
                  href={blogPath(l, translations[l]!)}
                  hrefLang={l}
                  className="underline underline-offset-2 hover:no-underline"
                >
                  {localeNames[l]}
                </a>
              ))}
            </p>
          )}
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

          <aside className="mt-10 bg-ink border-[3px] border-ink rounded-2xl p-7 sm:p-10 comic-shadow-invert">
            <p className="font-comic text-2xl tracking-wide text-blast -rotate-1 inline-block">
              {t.signupSection.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-white text-3xl sm:text-4xl leading-[0.95]">{b.ctaHeadingPost}</h2>
            <p className="mt-3 text-bomb-300 leading-relaxed">{b.ctaText}</p>
            <div className="on-dark">
              <SignupForm
                inputId={`email-blog-${post.key}`}
                signup={t.signup}
                buttonLabel={t.hero.signupButton}
                defaultNote={t.signupSection.note}
                onDark
              />
            </div>
          </aside>

          {others.length > 0 && (
            <div className="mt-14">
              <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">{b.keepReading}</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-5">
                {others.map((other) => (
                  <a
                    key={other.key}
                    href={blogPath(locale, other.slug)}
                    className="group flex h-full flex-col bg-white border-[3px] border-ink rounded-2xl p-5 comic-shadow-sm hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="font-mono text-[11px] text-bomb-500">
                      {other.readingMinutes} {b.readingTime}
                    </span>
                    <h3 className="mt-1 font-display text-2xl text-ink leading-[1]">{other.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs font-semibold text-ember">
                      {b.read} <span className="group-hover:translate-x-1 transition-transform">→</span>
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
