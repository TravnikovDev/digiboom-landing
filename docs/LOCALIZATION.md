# Localization (i18n)

How the DigiBoom landing goes multilingual, why we made the choices we did, and how
we keep seven languages from becoming seven maintenance headaches.

This doc has two halves: a **general plan** (the what and why, readable by anyone) and a
**technical plan** (the how, with implementation detail). Read the first half before the
second.

> **Status — all seven languages live** (`en`, `de`, `fr`, `es`, `pt`, `ja`, `ru`). This doc
> began as a plan and is now the as-built reference; the technical sections describe the code
> that shipped. Two decisions ended up different from the first draft, each called out inline
> where it matters:
>
> 1. **Native dictionaries, not `next-intl`** (§2.2). Next 16's own recommended
>    `getDictionary(locale)` pattern is lower-risk for a static export — zero dependencies, no
>    library whose static-export setup drifts between versions, and next-intl's locale
>    middleware can't run under `output: export` anyway. The *architecture* the plan describes
>    is unchanged; only the message-plumbing tool is.
> 2. **Default locale at the site root, no auto-redirect** (§2.3). The first cut prefixed every
>    locale and made `/` a language redirect; that wasted the apex URL and is discouraged for
>    SEO, so English is now served directly at `/`.
>
> The non-English copy is a solid first pass (AI-assisted), **pending native review** — the one
> substantive item left, alongside per-locale OG images (see Part 7).

---

## Part 1 — General plan

### 1.1 Goal

Serve the landing in the seven most common languages of the web, each with its own
crawlable URL, so the page can be found and understood by non-English buyers. English
stays the canonical version and the source of truth for every string.

### 1.2 The seven languages

Chosen by share of web content (not by our Etsy-buyer mix, which skews more Western).

| Code | Language   | Script   | Notes                                       |
|------|------------|----------|---------------------------------------------|
| `en` | English    | Latin    | Default. Source of truth.                   |
| `es` | Spanish    | Latin    |                                             |
| `de` | German     | Latin    | Watch text expansion (~30% longer).         |
| `ja` | Japanese   | CJK      | Needs a CJK font; brand type won't map 1:1. |
| `fr` | French     | Latin    |                                             |
| `ru` | Russian    | Cyrillic | Display/comic fonts need a Cyrillic swap.   |
| `pt` | Portuguese | Latin    |                                             |

Honest caveat, recorded so nobody relitigates it later: our actual audience (Etsy and the
digital-goods marketplaces) is English-first with a European tail. Japanese and Russian
rank high on the *web* but are minor for *our* buyers, and they carry the most cost (fonts,
review). We ship them because the brief is "web top 7," not because the ROI is obvious.
If priorities change, dropping `ja`/`ru` is a one-line change (see 2.4).

### 1.3 Guiding principles

1. **English is the single source of truth.** Every new or changed string lands in the
   English messages first. Nothing else is edited against a moving target.
2. **Fallback, never breakage.** A missing translation renders the English string, not a
   blank or a build failure. We can ship English changes immediately and backfill later.
3. **SEO-first architecture.** Every language is a real, pre-rendered URL with correct
   `lang` and `hreflang`, because being found is the landing's whole job.
4. **Protect the voice.** The English copy has personality (the bomb puns, "Light the
   fuse," "before we come to our senses"). Machine translation flattens that. Marketing
   lines get a native review pass; brand words (DigiBoom, BOOM) stay English.

### 1.4 Phasing (done)

The expensive part is the plumbing, not the languages, so we built the machinery for all
seven up front and turned them on in waves:

- **Wave 1** — machinery + `en`, `de`, `fr`, `es` (all Latin, low-risk). ✅
- **Wave 2** — `pt` (Latin), then `ja` and `ru` with their CJK/Cyrillic fonts. ✅

All seven are now live. The architecture still supports the "off" state for free: a locale
with an incomplete message file falls back to English key-by-key until it's filled, so a new
language can ship the moment its machinery lands and be translated afterwards. What remains is
copy quality (native review) and per-locale OG images, not machinery — see Part 7.

---

## Part 2 — Technical plan

### 2.1 The constraint that drives the design

The site is a **Next.js static export** (`output: "export"`) on GitHub Pages. Two
consequences:

- Next's built-in `i18n` routing config and any locale **middleware do not run** (no
  server). So no automatic Accept-Language redirect — which, as it turns out, we don't want
  anyway (§2.3).
- Everything must be **pre-rendered at build**. The default locale (English) is served at the
  root `/`; the other six use the App Router's `app/[locale]/` segment with
  `generateStaticParams`, which writes `de/index.html`, `ja/index.html`, and so on (§2.3, §2.4).

### 2.2 Approach: native dictionaries (no i18n library)

**As-built.** We use the pattern Next.js's own docs recommend for App-Router
internationalization: a small `getDictionary(locale)` loader over per-locale JSON, wired
through `app/[locale]/` static routes. No i18n dependency. Rationale:

- **Static-export fit.** The dictionaries are consumed by server components and resolved at
  build, so every string is inlined into the pre-rendered HTML. Nothing i18n-related ships
  to the browser except the handful of strings a client component (the signup form) needs,
  which flow in as ordinary props.
- **Lower risk.** A library whose static-export story shifts between its own versions is one
  more thing to keep working under `output: export`; the framework-native pattern has no
  such moving parts.
- **No dead weight.** next-intl's headline features are its locale **middleware** (can't run
  in a static export) and ICU (plurals/dates) — which this copy doesn't use. What we needed
  was string lookup with fallback and typed keys, and that's ~40 lines of our own code.

What we gave up, and how it's covered:

- **ICU plurals/number-format.** Not used by the current copy. The one count ("2 / 6
  shipped") is composed in JSX from plain numbers plus a translated word. If real
  pluralization is needed later, add `Intl.PluralRules` at the call site or reconsider a
  library then.
- **Rich text** (a sentence with inline `<mark>`/`<strong>`, kept whole for translators) is
  handled by a tiny renderer, `components/rich.tsx`, instead of next-intl's `t.rich`.

Alternatives (still valid if constraints change): **next-intl** (adopt if we need ICU or a
TMS integration and grow past a static landing), **Paraglide JS** (compiler-based, smallest
bundle), **i18next** (deepest ecosystem). Revisit if the landing becomes a full app.

> Because there's no library, there's no version-specific API to track — but the Next
> `app/[locale]` + `generateStaticParams` + `trailingSlash` behaviour was still verified
> against the bundled docs in `node_modules/next/dist/docs/` before building.

### 2.3 URL structure — default locale at the root, no auto-redirect

```
/                                  → the English landing (real content, canonical)
/de/ /es/ /fr/ /pt/ /ja/ /ru/      → pre-rendered landing per non-default locale
/en/                               → 301-style consolidation to /  (legacy path)
```

**Revised from the original plan.** The first cut prefixed *every* locale (`/en/` included)
and made `/` a client redirect that detected the browser language and forwarded. That was
wrong on two counts, both SEO:

1. It wasted the apex — the single most important URL on the site — on a content-less
   redirect shell, and bounced English visitors `/` → `/en/` for no reason.
2. Google **advises against** auto-redirecting by language: Googlebot crawls as `en-US` from
   the US, so a language redirect can trap it on one version and hide the rest.

So the default locale (`en`) is now served **directly at `/`** with real content and
`rel="canonical" → /`. The other six stay path-prefixed. **There is no automatic redirect
anywhere** — visitors land on English and choose another language from the switcher (and
`hreflang` tells search engines about every version). `/en/` existed in an earlier deploy, so
`public/en/index.html` consolidates it to `/` (canonical + meta-refresh); this is a
duplicate-URL cleanup, not a language redirect, and `/` itself never bounces.

> If a soft "view in your language?" suggestion is ever wanted for non-English visitors, add
> a dismissible banner — never an automatic redirect.

### 2.4 Project structure (as-built)

```
app/
  (home)/                     # route group (no URL segment) → the site root "/"
    layout.tsx                # root layout A: <html lang="en">, fonts, static en metadata
    page.tsx                  # the English landing at "/"
  [locale]/                   # the six non-default locales → /de/, /fr/, ...
    layout.tsx                # root layout B: <html lang={locale}>, fonts, generateMetadata;
                              # generateStaticParams() excludes the default (en)
    page.tsx                  # the landing for a non-default locale
  fonts.ts                    # all @next/font faces + FONT_VARS, shared by both layouts
  sitemap.ts                  # per-locale URLs + hreflang (force-static); en → /
  globals.css                 # @theme tokens, per-lang font overrides, keyframes
  icon.svg                    # favicon (metadata file, app-root)
i18n/
  config.ts                   # locales + default + isLocale + endonyms + localePath(); ONE source
  dictionaries.ts             # getDictionary(locale): merge locale over en (fallback)
lib/
  site-metadata.ts            # buildMetadata(locale): title/desc/canonical/hreflang/OG, shared
messages/
  en.json + de/fr/es/pt/ja/ru # en is SOURCE OF TRUTH (key shape / TS type); rest translated
components/
  Landing.tsx                 # the section composition, shared by both pages
  rich.tsx                    # inline-tag renderer for <mark>/<strong>/<accent> + \n
  LangSwitcher.tsx            # client dropdown; links via localePath (en → /)
  ... (sections take a typed `copy` prop; see 2.11)
public/
  en/index.html               # legacy /en/ → / consolidation (canonical + meta-refresh)
scripts/
  i18n-check.mjs              # CI: diff each locale's keys against en.json (npm run i18n:check)
```

Notes on the structure:

- **Two root layouts, no top-level `app/layout.tsx`.** Each needs its own `<html lang>`
  (English can't be a nested child of a `<html lang="en">` root and still relabel per locale),
  so `(home)/layout.tsx` owns `/` and `[locale]/layout.tsx` owns the prefixed locales — the
  documented [multiple-root-layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout)
  pattern. Fonts, metadata and the page body are factored into shared modules
  (`app/fonts.ts`, `lib/site-metadata.ts`, `components/Landing.tsx`) so nothing is duplicated.
- **`generateStaticParams` in `[locale]` excludes the default**, so Next never emits `/en/`;
  the only `/en/` is the `public/en/` consolidation redirect (see 2.3).
- **`trailingSlash: true`** in `next.config.ts` so the export emits `out/de/index.html` (not
  `out/de.html`), which is what `/de/` resolves to on GitHub Pages. `/` → `out/index.html`.
- No `i18n/routing.ts`/`request.ts` and no `types/messages.d.ts` — those were next-intl
  artifacts. The message type lives in `dictionaries.ts` (2.6); the fonts (including the
  Cyrillic/CJK faces) live in `app/fonts.ts`, shared by both root layouts (2.8).

Adding or removing a language = edit `i18n/config.ts`, add/remove a `messages/*.json`, and
(new script only) add a font stack. Nothing else hardcodes the list.

### 2.5 Setup, step by step (as-built)

1. **No install.** Zero i18n dependencies.
2. **`i18n/config.ts`** — export `locales = ['en','de','fr','es','pt','ja','ru'] as const`,
   `defaultLocale = 'en'`, an `isLocale()` guard, `localeNames` (endonyms for the switcher),
   and `localePath()` (en → `/`, others → `/<locale>/`). This is the single source for the set.
3. **`i18n/dictionaries.ts`** — statically import every `messages/*.json`, and export
   `getDictionary(locale)` that returns English as-is or **merges the locale over `en`**
   (`mergeInto`, arrays replaced whole). The merge is our fallback: any key absent in a
   locale resolves to English. `Messages = typeof en` is exported here as the type (2.6).
4. **`next.config.ts`** — keep `output: 'export'`; add `trailingSlash: true` so URLs emit as
   `out/<locale>/index.html` (and `/` → `out/index.html`).
5. **Two root layouts + shared modules** (2.3, 2.4):
   - `app/fonts.ts` exports the `@next/font` faces and a joined `FONT_VARS` class string.
   - `lib/site-metadata.ts` exports `buildMetadata(locale)` (title/description/canonical +
     `alternates.languages` hreflang + per-locale `openGraph`, all via `localePath()`; see 2.9).
   - `app/(home)/layout.tsx` sets `<html lang="en">` + `FONT_VARS` and `export const metadata
     = buildMetadata('en')` — static, English, for the root.
   - `app/[locale]/layout.tsx` sets `<html lang={locale}>`, a `generateMetadata` that awaits
     `params` (a Promise in this Next version) and calls `buildMetadata(locale)`, and a
     `generateStaticParams` that **excludes the default** (`locales.filter(l => l !== 'en')`),
     so Next never emits `/en/`.
6. **`app/(home)/` and `app/[locale]/`** — `(home)/page.tsx` renders English at `/`;
   `[locale]/page.tsx` renders a non-default locale. Both delegate to `components/Landing.tsx`,
   which passes each section its **slice** of the dictionary as a typed `copy` prop
   (`<Hero copy={t.hero} signup={t.signup} … />`). Sections stay server components; the one
   client leaf (`SignupForm`) receives plain string props.
7. **`public/en/index.html`** — consolidates the legacy `/en/` path to `/` (canonical +
   meta-refresh). No `/`-level redirect exists; `/` serves English content (see 2.3).
8. There is no top-level `app/layout.tsx` or `app/page.tsx` — the two route branches each
   carry their own root layout.

### 2.6 Messages and type safety

- Messages are namespaced JSON, e.g.:
  ```json
  {
    "hero": { "headline": "We'll explode your sales. In a good way.", "cta": "Light the fuse" },
    "pricing": { "roi": "One extra sale a month covers it..." }
  }
  ```
- The message type is derived from English in `dictionaries.ts`, so `en.json` is
  authoritative for the *shape* as well as the content:
  ```ts
  import en from '../messages/en.json';
  export type Messages = typeof en;   // getDictionary() returns Messages
  ```
- Each section is typed against its slice, so a wrong key is a build error and the props
  autocomplete: `function Hero({ copy }: { copy: Messages['hero'] })`. No `.d.ts` module
  augmentation needed — it's a plain exported type.

### 2.7 Fallback strategy

Cross-locale fallback (missing `de` key → English) is done by **merging the locale over
`en`** in `i18n/dictionaries.ts`:

```ts
export function getDictionary(locale: Locale): Messages {
  if (locale === 'en') return en;
  return mergeInto(en, overrides[locale]) as Messages;  // recurses objects, replaces arrays
}
```

This is what lets a locale ship partial and still render a complete page. Arrays are
replaced whole (not merged element-wise), so a translated array must keep English's length —
`npm run i18n:check` enforces that, since the components map arrays by position (2.11). The
CI check (2.13) also reports what's still on English so gaps don't hide forever.

### 2.8 Fonts per locale

The brand faces are Latin-only. Coverage:

| Font           | Role     | Latin | Cyrillic | CJK |
|----------------|----------|:-----:|:--------:|:---:|
| Bebas Neue     | display  |  ✅   |    ❌    | ❌  |
| Bangers        | comic    |  ✅   |    ❌    | ❌  |
| Rubik          | body     |  ✅   |    ✅    | ❌  |
| JetBrains Mono | labels   |  ✅   |    ✅    | ❌  |

Design:

- Add **Oswald** (condensed, has Cyrillic) and **Noto Sans JP** via `@next/font/google` in
  `app/fonts.ts`. Set `preload: false` on the non-Latin faces so they are **not** fetched for
  Latin visitors — they load only when their locale's CSS actually applies them.
- Expose every face as a CSS variable, then override the semantic variables by `lang` in
  `globals.css`:
  ```css
  :root { --font-display: var(--font-bebas); --font-comic: var(--font-bangers); --font-sans: var(--font-rubik); }
  :root:lang(ru) { --font-display: var(--font-oswald); --font-comic: var(--font-rubik); }
  :root:lang(ja) { --font-display: var(--font-noto-jp); --font-comic: var(--font-noto-jp); --font-sans: var(--font-noto-jp); }
  ```
  Because `<html lang>` is set per page, the right stack applies with zero JS.
- Reality check on Japanese: the condensed all-caps comic identity has no CJK equivalent.
  The `ja` page will use Noto Sans JP with heavy weights for headlines and read as a
  well-set cousin, not a twin. Accept this; don't try to force Bebas onto Japanese.
- Consider trimming Noto Sans JP to the weights actually used (it's a large family).

**As-built (shipped).** All four extra faces live in `app/fonts.ts` (shared by both root
layouts), each `preload: false` and referenced only through `:root:lang(ru|ja)` in
`globals.css`, so Latin pages never fetch them (verified: the `en` page emits no preload for
Oswald/Noto):

- `ru`: **Oswald** (Cyrillic display, `--font-oswald`) for headlines; Cyrillic **Rubik**
  (`--font-rubik-cyr`) for body + comic; Cyrillic **JetBrains Mono** (`--font-mono-cyr`) for
  the mono labels. Bebas/Bangers have no Cyrillic, hence the swaps.
- `ja`: **Noto Sans JP** (`--font-noto-jp`, weights 400/700) for *everything* — display,
  comic, sans and mono — since JetBrains Mono has no CJK either.
- The Tailwind font `@theme` was switched from `inline` to referencing so the utilities
  resolve `var(--font-display)` at runtime and the `:lang()` overrides actually take effect.
- Noto's square glyphs run large at the display sizes tuned for condensed Bebas, so a small
  `:lang(ja)` clamp steps the `h1`/`h2` headings down (in `globals.css`). `pt` is Latin and
  needs none of this — it uses the base brand faces.

### 2.9 Metadata and SEO

- `buildMetadata(locale)` (in `lib/site-metadata.ts`, shared by both root layouts) sets the
  translated `<title>`/`description` and the alternates via `localePath()` (English → `/`):
  ```ts
  alternates: {
    canonical: localePath(locale),                 // en → "/", de → "/de/", ...
    languages: { en: `${SITE}/`, de: `${SITE}/de/`, /* ...all 7... */ 'x-default': `${SITE}/` }
  }
  ```
- `<html lang={locale}>` per page (also drives the font CSS in 2.8).
- **Sitemap** (`app/sitemap.ts`, shipped) — one entry per locale URL, each with the full
  `hreflang` alternates map + `x-default`. Needs `export const dynamic = "force-static"` to
  emit `out/sitemap.xml` under `output: export`.
- OG image: currently one English card for every locale. Per-locale OG cards are still
  **to do** (see 2.12) — regenerate the `next/og` route per locale, or one static PNG each.

### 2.10 Language switcher (as-built)

- `components/LangSwitcher.tsx`: a dropdown **in the footer** (not the top nav — the apex is
  reserved for the product/CTA), listing the active locales (those in `i18n/config.ts`) by
  endonym (English, Deutsch, Français, Español, Português, 日本語, Русский).
- The trigger shows a globe + the **current language's name** (its short code on mobile) + a
  chevron, so it reads unmistakably as a language control. `placement="up"` opens the menu
  above the button (there's no room below it in the footer).
- Each item is a real `<a>` link via `localePath(locale)` — English to `/`, others to
  `/<locale>/` — so it works with JS off. There's no redirect to remember: `/` serves
  English and visitors pick a language here.
- The current locale is marked with a check; the trigger is a focusable `<button>` that
  closes on Escape and outside-click; `hrefLang` is set on each link.

### 2.11 Component refactor

Every component used to hardcode English. As-built refactor:

- All visible strings moved into `messages/en.json` under section namespaces (`meta`, `nav`,
  `hero`, `signup`, `marquee`, `product`, `syncPanel`, `problem`, `how`, `payoff`,
  `platforms`, `countdown`, `pricing`, `faq`, `signupSection`, `footer`, `mascot`).
- **`components/Landing.tsx` (rendered by both the `/` and `[locale]` pages) loads the
  dictionary once and passes each section its slice as a typed `copy` prop.** Sections stay
  **server components** (best for a static export: their text is baked into HTML and no
  per-section JS ships). The only client leaf, `SignupForm`, gets its strings as plain string
  props from its server parent — no context/provider needed.
- **Arrays** (features, cards, steps, milestones, FAQ, platform groups, plans) live in
  messages and are rendered by mapping over `copy.<array>`; the component keeps a parallel
  **presentation array** (icons, colors, tilts, `stage` flags, plan styling) matched **by
  position**. This is why array lengths must stay in lockstep with English (2.7).
- **Inline emphasis** (a sentence with `<mark>`, `<strong>`, or a context-coloured
  `<accent>`, plus `\n` line breaks in headlines) stays one translatable string and is
  rendered with `rich(str, { accent: … })` from `components/rich.tsx` — so translators keep
  full sentences and word order.
- Non-text props (icons, colors, logos, brand names like Etsy/Shopify, example handles) stay
  in the component; only *text* moved to messages. The mono `snake_case` labels (e.g.
  `ready_to_sell`) are decorative and were **left in the component** — they read as code.
- Accessibility text travels too: the mascot `aria-label`s are threaded from `mascot.*` in
  the dictionary through `Hero → BombCanvas → BombStatic/Bomb3D` as props.

### 2.12 OG images (to do)

Not done yet — every locale currently shares the one English share card. When done: either
parametrize a `next/og` route by locale (re-add a dynamic route, force-static, one per locale
via `generateStaticParams`) or hand-make one static PNG per language. Watch CJK/Cyrillic font
embedding in the generator.

### 2.13 CI translation check

`scripts/i18n-check.mjs` (`npm run i18n:check`), wired into the deploy workflow **before**
build:

- Loads `en.json` and each locale; flattens each to a `dot.path → leaf | array:<len>` map.
- Reports per locale: keys **missing** (still English), keys **extra** (present here, absent
  in English — stale/renamed), and **array-length mismatches**.
- **Blocking:** exits non-zero on any discrepancy, so all seven locales stay in lockstep with
  English. (It checks every `messages/*.json` present against `en.json`.)
- Optional later: hash each English string; when a hash changes, flag that key's
  translations as "needs review" so *changed* (not just missing) copy surfaces.

---

## Part 3 — Translation workflow

1. Copy change lands in `messages/en.json` (source of truth) with the English shipped.
2. AI-assisted first pass fills the other locales (grammatically solid, voice flattened).
3. **Native review** on the marketing-critical lines: hero, CTAs, the puns. Decide per
   language whether a pun is localized, replaced with a local equivalent, or left English.
4. Brand terms (DigiBoom, BOOM) stay English everywhere.
5. CI check confirms nothing is silently missing.
6. If this outgrows hand-editing, the `messages/*.json` files drop into Crowdin or Lokalise
   with no format change.

---

## Part 4 — Maintenance model (summary)

- **One source of truth:** `en.json`. Types derive from it; fallback resolves to it.
- **Ship English immediately**, backfill translations; the page is never broken by a gap.
- **CI visibility:** the key-diff report stops silent rot.
- **Staleness:** CI diff + discipline now; per-string hashing later if needed.
- **Adding a language:** edit `i18n/config.ts` (the `locales` array), add `messages/xx.json`,
  and — only for a new script — add a font in `app/fonts.ts` plus a `:root:lang(xx)` block in
  `globals.css`. That's it.

---

## Part 5 — QA checklist (per release)

- [ ] `/` renders English (no redirect); each other locale renders at `/<locale>/`; `/en/`
      consolidates to `/`.
- [ ] `<html lang>` correct; `hreflang` alternates present and pointing at real URLs.
- [ ] **Russian**: headlines/eyebrows render in Oswald/Rubik, not tofu.
- [ ] **Japanese**: everything renders in Noto Sans JP; no missing glyphs.
- [ ] **German**: long words don't break the hero or button layouts.
- [ ] No layout overflow at mobile width in any locale.
- [ ] Latin visitors do **not** download the JP/Cyrillic fonts (check network panel).
- [ ] Signup form and its confirmation/error strings are localized.
- [ ] CI `i18n-check` summary reviewed.

---

## Part 6 — Risks and tradeoffs

- **Maintenance multiplier:** every copy tweak is now up to 7 edits. Mitigated by
  English-first + fallback + CI, but the ongoing cost is real. This is why we phase.
- **Voice loss:** heavy machine translation reads flat. Budget the native-review pass or
  accept flatter non-English copy.
- **Font weight (JP):** Noto Sans JP is large; keep it off Latin pages and subset weights.
- **No language auto-detection:** the default locale is served at `/` and there is no
  automatic redirect (deliberately — see 2.3). A non-English visitor lands on English and
  switches manually; per Google's guidance this is safer for crawling than auto-redirecting.
- **ROI:** for a pre-launch page with an English-first audience, seven languages may be more
  than the moment needs — `ja`/`ru` especially rank high on the web but low for our buyers. All
  seven are shipped because that was the brief; if the ROI never shows, dropping a language is
  a one-line change to `i18n/config.ts` (its `messages/*.json` and font can stay for later).

---

## Part 7 — Rollout checklist

Shipped:

- [x] `i18n/config.ts` (locale set + `localePath`) + `i18n/dictionaries.ts`
      (`getDictionary` + fallback); no library. `next.config.ts`: `trailingSlash: true`,
      `output: 'export'`.
- [x] Default locale served at `/` (real content, no auto-redirect); the other six under
      `app/[locale]/` with `generateStaticParams` (excludes en). `/en/` consolidates to `/`.
- [x] Two root layouts + shared `app/fonts.ts`, `lib/site-metadata.ts`, `components/Landing.tsx`.
- [x] Extract all strings to `messages/en.json`; `Messages = typeof en` type.
- [x] Refactor components to take typed `copy` props; `components/rich.tsx` for inline tags.
- [x] `buildMetadata` per locale + hreflang alternates + per-locale OpenGraph.
- [x] Language switcher (`components/LangSwitcher.tsx`) in the footer, opens upward, shows the
      current language by name.
- [x] `app/sitemap.ts` — all locale URLs with hreflang alternates (force-static).
- [x] `scripts/i18n-check.mjs` wired into the deploy workflow (blocking).
- [x] Translations: `de`, `fr`, `es`, `pt`, `ja`, `ru` (+ `en`) — all seven live.
- [x] Fonts: Oswald (Cyrillic) + Cyrillic Rubik/JetBrains for `ru`, Noto Sans JP for `ja`,
      all `preload:false` with per-`lang` CSS overrides (§2.8).

Remaining:

- [ ] Native review of the marketing-critical non-English lines (hero, CTAs, puns) — the
      current translations are a solid first pass, not native-reviewed.
- [ ] Per-locale OG images.
- [ ] Optional: subset Noto Sans JP weights further if the JP page's font payload matters.
