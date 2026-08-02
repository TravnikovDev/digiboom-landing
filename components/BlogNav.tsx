import BombLogo from "./BombLogo";

/** Compact nav for blog pages: back to the landing, plus the waitlist CTA. */
export default function BlogNav() {
  return (
    <header className="bg-blast border-b-[3px] border-ink">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5">
          <BombLogo />
          <span className="font-display text-2xl tracking-widest text-white">DIGIBOOM</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="/blog" className="hidden sm:inline font-mono text-xs text-ink hover:underline">
            blog
          </a>
          <a
            href="/#signup"
            className="inline-flex bg-ink text-white text-sm font-semibold rounded-full px-5 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform"
          >
            Get early access
          </a>
        </div>
      </div>
    </header>
  );
}
