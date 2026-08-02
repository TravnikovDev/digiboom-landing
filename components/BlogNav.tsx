import BombLogo from "./BombLogo";
import { localePath, defaultLocale, type Locale } from "@/i18n/config";

/** Compact nav for blog pages: back to the landing in this language, plus the waitlist CTA. */
export default function BlogNav({
  locale = defaultLocale,
  label = "blog",
  cta = "Get early access",
}: {
  locale?: Locale;
  label?: string;
  cta?: string;
}) {
  return (
    // No background of its own: it sits on the page's own blast hero band.
    <header className="bg-blast relative z-20">
      <div className="mx-auto max-w-6xl px-5 pt-6 flex items-center justify-between gap-4">
        <a href={localePath(locale)} className="flex items-center gap-2.5">
          <BombLogo />
          <span className="font-display text-2xl tracking-widest text-white">DIGIBOOM</span>
        </a>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] text-ink bg-white/90 border-2 border-ink rounded-md px-2.5 py-1.5">
            {label}
          </span>
          <a
            href={`${localePath(locale)}#signup`}
            className="inline-flex bg-ink text-white text-sm font-semibold rounded-full px-5 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform"
          >
            {cta}
          </a>
        </div>
      </div>
    </header>
  );
}
