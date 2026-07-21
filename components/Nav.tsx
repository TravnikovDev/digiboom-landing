import BombLogo from "./BombLogo";

export default function Nav() {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-6 flex items-center justify-between relative z-20">
      <a href="#" className="flex items-center gap-2.5">
        <BombLogo />
        <span className="font-display text-2xl tracking-widest text-white">DIGIBOOM</span>
      </a>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] text-white border border-white/50 rounded-md px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white sync-dot" /> in development · beta 2026
        </span>
        <a
          href="#signup"
          className="bg-ink text-white text-sm font-semibold rounded-full px-5 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
