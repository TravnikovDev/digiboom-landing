import { Bangers, Bebas_Neue, JetBrains_Mono, Noto_Sans_JP, Oswald, Rubik } from "next/font/google";

// Shared across both root layouts (the `/` English layout and the `[locale]` layout) so the
// font set is declared once. next/font dedupes identical declarations.

// Latin brand faces — preloaded, used by en/de/fr/es/pt.
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-code" });

// Non-Latin faces — preload:false and referenced only via :root:lang(ru|ja) in globals.css,
// so their (large) glyph files are fetched only on Russian/Japanese pages, never by Latin
// visitors. Bebas/Bangers have no Cyrillic/CJK, hence the swaps.
const oswald = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-oswald", preload: false }); // ru display
const rubikCyr = Rubik({ subsets: ["latin", "cyrillic"], variable: "--font-rubik-cyr", preload: false }); // ru body/comic
const monoCyr = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono-cyr", preload: false }); // ru mono
const notoJP = Noto_Sans_JP({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-noto-jp", preload: false }); // ja everything

export const FONT_VARS = [bebas, bangers, rubik, mono, oswald, rubikCyr, monoCyr, notoJP]
  .map((f) => f.variable)
  .join(" ");
