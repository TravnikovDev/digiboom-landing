import { Bangers, Bebas_Neue, JetBrains_Mono, Oswald, Rubik } from "next/font/google";

// Shared across both root layouts (the `/` English layout and the `[locale]` layout) so the
// font set is declared once. next/font dedupes identical declarations.

// Latin brand faces — preloaded, used by en/de/fr/es/pt.
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code" });

// Cyrillic faces — preload:false and referenced only via :root:lang(ru) in globals.css, so
// their glyph files are fetched only on Russian pages, never by Latin visitors. Bebas/Bangers
// have no Cyrillic, hence the swaps. Cyrillic is one unicode-range per face, so the CSS these
// add is a few rules, not the ~250 that CJK would.
const oswald = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-oswald", preload: false }); // ru display
const rubikCyr = Rubik({ subsets: ["latin", "cyrillic"], variable: "--font-rubik-cyr", preload: false }); // ru body/comic
const monoCyr = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono-cyr", preload: false }); // ru mono

// Japanese is deliberately absent: next/font would inline ~250 CJK @font-face rules into the
// CSS of every page. It is self-hosted from public/fonts instead — see app/globals.css.
export const FONT_VARS = [bebas, bangers, rubik, mono, oswald, rubikCyr, monoCyr]
  .map((f) => f.variable)
  .join(" ");
