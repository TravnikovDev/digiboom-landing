import type { Messages } from "@/i18n/dictionaries";
import BombLogo from "./BombLogo";

export default function Footer({ copy }: { copy: Messages["footer"] }) {
  return (
    <footer className="bg-ink py-10">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-bomb-400">
        <div className="flex items-center gap-2">
          <BombLogo size={22} muted />
          <span className="font-display text-lg tracking-widest text-white">DIGIBOOM</span>
        </div>
        <nav className="flex gap-6">
          <a className="hover:text-white inline-flex items-center min-h-11 px-1" href="#platforms">
            {copy.platforms}
          </a>
          <a className="hover:text-white inline-flex items-center min-h-11 px-1" href="#status">
            {copy.roadmap}
          </a>
          <a className="hover:text-white inline-flex items-center min-h-11 px-1" href="#signup">
            {copy.waitlist}
          </a>
        </nav>
        <p>© {new Date().getFullYear()} {copy.rights}</p>
      </div>
    </footer>
  );
}
