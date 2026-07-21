import BombLogo from "./BombLogo";

export default function Nav() {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-6 flex items-center justify-between relative z-20">
      <a href="#" className="flex items-center gap-2.5">
        <BombLogo />
        <span className="font-display text-2xl tracking-widest text-white">DIGIBOOM</span>
      </a>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10px] sm:text-[11px] text-ink bg-white/90 border-2 border-ink rounded-md px-2 sm:px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember sync-dot shrink-0" aria-hidden="true" />
          <span className="sm:hidden">beta 2026</span>
          <span className="hidden sm:inline">in development · beta 2026</span>
        </span>
        <a
          href="#signup"
          className="hidden sm:inline-flex bg-ink text-white text-sm font-semibold rounded-full px-5 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
