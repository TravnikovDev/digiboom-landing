import type { Messages } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import BombLogo from "./BombLogo";
import LangSwitcher from "./LangSwitcher";

export default function Nav({ copy, locale }: { copy: Messages["nav"]; locale: Locale }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-6 flex items-center justify-between relative z-20">
      <a href={`/${locale}/`} className="flex items-center gap-2.5">
        <BombLogo />
        <span className="font-display text-2xl tracking-widest text-white">DIGIBOOM</span>
      </a>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] text-ink bg-white/90 border-2 border-ink rounded-md px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember sync-dot shrink-0" aria-hidden="true" />
          {copy.badge}
        </span>
        <LangSwitcher current={locale} label={copy.langLabel} />
        <a
          href="#signup"
          className="hidden sm:inline-flex bg-ink text-white text-sm font-semibold rounded-full px-5 py-2.5 border-2 border-ink hover:-translate-y-0.5 transition-transform"
        >
          {copy.cta}
        </a>
      </div>
    </header>
  );
}
