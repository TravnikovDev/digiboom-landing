import type { Messages } from "@/i18n/dictionaries";
import { blogIndexPath, localePath, type Locale } from "@/i18n/config";
import BombLogo from "./BombLogo";
import LangSwitcher from "./LangSwitcher";

export default function Footer({
  copy,
  locale,
  langLabel,
  blogLabel = "Blog",
}: {
  copy: Messages["footer"];
  locale: Locale;
  langLabel: string;
  blogLabel?: string;
}) {
  return (
    <footer className="bg-ink py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col gap-6 text-sm text-bomb-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <BombLogo size={22} muted />
            <span className="font-display text-lg tracking-widest text-white">DIGIBOOM</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <a className="hover:text-white inline-flex items-center min-h-11 px-1" href={`${localePath(locale)}#platforms`}>
              {copy.platforms}
            </a>
            <a className="hover:text-white inline-flex items-center min-h-11 px-1" href={`${localePath(locale)}#status`}>
              {copy.roadmap}
            </a>
            <a className="hover:text-white inline-flex items-center min-h-11 px-1" href={`${localePath(locale)}#signup`}>
              {copy.waitlist}
            </a>
            <a className="hover:text-white inline-flex items-center min-h-11 px-1" href={blogIndexPath(locale)}>
              {blogLabel}
            </a>
          </nav>
          {/* Language selector lives here, not in the top nav. Opens upward (footer). */}
          <LangSwitcher current={locale} label={langLabel} placement="up" />
        </div>
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {copy.rights}
        </p>
      </div>
    </footer>
  );
}
