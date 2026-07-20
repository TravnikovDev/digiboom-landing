import BombLogo from "./BombLogo";

export default function Nav() {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-6 flex items-center justify-between relative z-20">
      <a href="#" className="flex items-center gap-2.5">
        <BombLogo />
        <span className="font-display text-2xl tracking-widest text-white">DIGIBOOM</span>
      </a>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-white border-2 border-white/70 rounded-full px-3 py-1.5 -rotate-2">
          <span className="h-2 w-2 rounded-full bg-white fuse-burning" /> In development · MVP 2026
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
