# Localization (i18n)

How the DigiBoom landing goes multilingual, why we made the choices we did, and how
we keep seven languages from becoming seven maintenance headaches.

This doc has two halves: a **general plan** (the what and why, readable by anyone) and a
**technical plan** (the how, with implementation detail). Read the first half before the
second.

> **As-built note (Phase 1 shipped).** This plan proposed **next-intl**. When it came time
> to build, reading the bundled Next 16 docs made the framework's own recommended pattern —
> a plain `getDictionary(locale)` **dictionary loader** with `app/[locale]/` routes — the
> lower-risk choice for a static export: zero dependencies, no library whose static-export
> setup shifts between versions, and no locale middleware (which cannot run under
> `output: export` anyway). So Phase 1 ships on the native dictionary pattern instead of
> next-intl. The *architecture* the plan describes — per-locale static routes, English as
> source of truth, deep-merge fallback, hreflang, a client root redirect, a CI key-diff — is
> exactly what was built; only the message-plumbing tool changed. Sections **2.2, 2.4–2.7,
> 2.11** and the **Part 7 checklist** below are updated to match the code; the rest of the
> plan (general plan, fonts, SEO, switcher, workflow, risks) stands as written. **Live now:
> all seven** — `en`, `de`, `fr`, `es`, `pt`, `ja`, `ru`. The Cyrillic (Oswald) and CJK
> (Noto Sans JP) fonts from §2.8 are wired (see the as-built note there). Translations for
> `de`/`fr`/`es`/`pt`/`ja`/`ru` are a solid first pass, pending native review.

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

### 1.4 Phasing

The expensive part is the plumbing, not the languages, so we build for all seven up front
and turn them on in waves:

- **Phase 1** — machinery + `en`, `de`, `fr`, `es` (all Latin, low-risk).
- **Phase 2** — `pt`, plus `ja` and `ru` once the font work and native review are done.

The architecture supports all seven from day one; a language "off" simply means its
message file isn't complete yet (and it falls back to English until it is).

---

## Part 2 — Technical plan

### 2.1 The constraint that drives the design

The site is a **Next.js static export** (`output: "export"`) on GitHub Pages. Two
consequences:

- Next's built-in `i18n` routing config and any locale **middleware do not run** (no
  server). So no automatic Accept-Language redirect.
- Everything must be **pre-rendered at build**. We use the App Router's
  `app/[locale]/` segment with `generateStaticParams`, which writes `de/index.html`,
  `ja/index.html`, and so on.

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

### 2.3 URL structure and root redirect

```
/            → tiny client redirect page (detect + forward)
/en/  /es/  /de/  /ja/  /fr/  /ru/  /pt/   → pre-rendered landing per locale
```

- Every locale is prefixed, including the default, so `hreflang` is uniform and there's no
  "which page is English" ambiguity.
- The root `/` is a minimal client page (`public/index.html`): read the saved choice
  (`localStorage['digiboom-locale']`), else negotiate `navigator.languages` against our list,
  else fall back to `en`, then `location.replace('/<locale>/')`. It's one fast hop and the
  choice is remembered. This
  replaces the middleware we can't run.

### 2.4 Project structure (as-built)

```
app/
  [locale]/
    layout.tsx                # ROOT layout: <html lang>, @next/font declarations, fonts on
                              # <body>, generateStaticParams(), generateMetadata (hreflang)
    page.tsx                  # the landing; loads the dictionary, passes slices to sections
  globals.css                 # (unchanged) @theme tokens, keyframes
  icon.svg                    # favicon (metadata file, app-root)
i18n/
  config.ts                   # locales list + default + isLocale + endonyms; the ONE source
  dictionaries.ts             # getDictionary(locale): merge locale over en (fallback)
messages/
  en.json                     # SOURCE OF TRUTH (defines the key shape / TS type)
  de.json  fr.json  es.json   # Phase 1 translations (pt/ja/ru added in Phase 2)
components/
  rich.tsx                    # inline-tag renderer for <mark>/<strong>/<accent> + \n
  LangSwitcher.tsx            # client dropdown of locales (links to /<locale>/)
  ... (sections take a typed `copy` prop; see 2.11)
public/
  index.html                  # root "/" redirect (detect + forward); see 2.3
scripts/
  i18n-check.mjs              # CI: diff each locale's keys against en.json (npm run i18n:check)
```

Notes on what changed from the original sketch:

- **There is no top-level `app/layout.tsx`.** With a static export we want `<html lang>` set
  per locale, so the root layout lives at `app/[locale]/layout.tsx` (a pattern the Next i18n
  doc explicitly allows). Everything else lives under `[locale]`.
- **The root `/` redirect is `public/index.html`, not `app/page.tsx`.** Since there's no
  non-`[locale]` route, the export emits no `out/index.html`; a hand-written static redirect
  file fills that slot (no framework layout needed, works with JS off via `<noscript>`).
- **`trailingSlash: true`** in `next.config.ts` so the export emits `out/de/index.html` (not
  `out/de.html`), which is what `/de/` resolves to on GitHub Pages.
- No `i18n/routing.ts`/`request.ts`, no `types/messages.d.ts`, no `lib/fonts.ts` yet — those
  were next-intl / Phase-2-font artifacts. The type lives in `dictionaries.ts` (2.6); fonts
  stay inline in the layout until Phase 2 adds Cyrillic/CJK faces (2.8).

Adding or removing a language = edit `i18n/config.ts`, add/remove a `messages/*.json`, and
(new script only) add a font stack. Nothing else hardcodes the list.

### 2.5 Setup, step by step (as-built)

1. **No install.** Zero i18n dependencies.
2. **`i18n/config.ts`** — export `locales = ['en','de','fr','es'] as const`,
   `defaultLocale = 'en'`, an `isLocale()` guard, and `localeNames` (endonyms for the
   switcher). This is the single source for the locale set.
3. **`i18n/dictionaries.ts`** — statically import every `messages/*.json`, and export
   `getDictionary(locale)` that returns English as-is or **merges the locale over `en`**
   (`mergeInto`, arrays replaced whole). The merge is our fallback: any key absent in a
   locale resolves to English. `Messages = typeof en` is exported here as the type (2.6).
4. **`next.config.ts`** — keep `output: 'export'`; add `trailingSlash: true` so URLs emit as
   `out/<locale>/index.html`.
5. **`app/[locale]/layout.tsx`** (the root layout):
   - `export function generateStaticParams()` → `locales.map(locale => ({locale}))`.
   - `const { locale } = await params` (params is a Promise in this Next version); guard with
     `isLocale` and `notFound()` otherwise.
   - Declare the `@next/font` faces and set `<html lang={locale}>` + the font variable class
     on `<html>`, fonts on `<body>`.
   - `export async function generateMetadata({params})` → `getDictionary(locale)` for
     localized title/description + `alternates.languages` hreflang map + per-locale
     `openGraph` (see 2.9).
6. **`app/[locale]/page.tsx`** — the landing. `await params`, `getDictionary(locale)`, then
   pass each section its **slice** of the dictionary as a typed `copy` prop
   (`<Hero copy={t.hero} signup={t.signup} … />`). Sections stay server components; the one
   client leaf (`SignupForm`) receives plain string props.
7. **`public/index.html`** — the root `/` redirect described in 2.3 (inline script +
   `<noscript>` meta-refresh to `/en/` + `<link rel="canonical">`). Static file, no layout.
8. **Deleted** the old `app/layout.tsx` and `app/page.tsx` (their content moved under
   `[locale]/`).

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

Plan:

- Add **Oswald** (condensed, has Cyrillic) and **Noto Sans JP** via `@next/font/google` in
  `lib/fonts.ts`. Set `preload: false` on Oswald and Noto Sans JP so they are **not**
  fetched for Latin visitors — they load only when their locale's CSS actually applies
  them.
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

**As-built (shipped).** All four extra faces live in `app/[locale]/layout.tsx`, each
`preload: false` and referenced only through `:root:lang(ru|ja)` in `globals.css`, so Latin
pages never fetch them (verified: the `en` page emits no preload for Oswald/Noto):

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

- `generateMetadata` per locale sets translated `<title>`/`description` and the alternates:
  ```ts
  alternates: {
    canonical: `${SITE}/${locale}/`,
    languages: { en: `${SITE}/en/`, de: `${SITE}/de/`, /* ...all 7... */ 'x-default': `${SITE}/en/` }
  }
  ```
- `<html lang={locale}>` per page (also drives the font CSS in 2.8).
- **Sitemap** (`app/sitemap.ts`, shipped) — one entry per locale URL, each with the full
  `hreflang` alternates map + `x-default`. Needs `export const dynamic = "force-static"` to
  emit `out/sitemap.xml` under `output: export`.
- OG image: keep the single English card for launch. Per-locale OG cards are a Phase-2
  nice-to-have (regenerate the `next/og` route per locale, or one static PNG each).

### 2.10 Language switcher (as-built)

- `components/LangSwitcher.tsx`: a dropdown **in the nav**, listing the active locales
  (those in `i18n/config.ts`) by endonym (English, Deutsch, Français, Español; later 日本語,
  Русский, …). A **footer** switcher is an easy optional addition — deferred because the nav
  one already covers it and a footer dropdown would need to open upward.
- Each item is a real `<a>` link to `/<locale>/` (works with JS off) and, on click, writes
  `localStorage['digiboom-locale']` so the root redirect honours the choice next time.
- The current locale is marked with a check; the trigger is a focusable `<button>` that
  closes on Escape and outside-click; `hrefLang` is set on each link.

### 2.11 Component refactor

Every component used to hardcode English. As-built refactor:

- All visible strings moved into `messages/en.json` under section namespaces (`meta`, `nav`,
  `hero`, `signup`, `marquee`, `product`, `syncPanel`, `problem`, `how`, `payoff`,
  `platforms`, `countdown`, `pricing`, `faq`, `signupSection`, `footer`, `mascot`).
- **`app/[locale]/page.tsx` loads the dictionary once and passes each section its slice as a
  typed `copy` prop.** Sections stay **server components** (best for a static export: their
  text is baked into HTML and no per-section JS ships). The only client leaf, `SignupForm`,
  gets its strings as plain string props from its server parent — no context/provider needed.
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

### 2.12 OG images (Phase 2)

Deferred. When done: either parametrize a `next/og` route by locale (re-add a dynamic
route, force-static, one per locale via `generateStaticParams`) or hand-make one static
PNG per language. Watch CJK/Cyrillic font embedding in the generator.

### 2.13 CI translation check

`scripts/i18n-check.mjs` (`npm run i18n:check`), wired into the deploy workflow **before**
build:

- Loads `en.json` and each locale; flattens each to a `dot.path → leaf | array:<len>` map.
- Reports per locale: keys **missing** (still English), keys **extra** (present here, absent
  in English — stale/renamed), and **array-length mismatches**.
- **Blocking:** exits non-zero on any discrepancy, so the four shipped locales stay in
  lockstep with English. (Only the locales in `i18n/config.ts` are checked, so Phase-2
  files don't fail CI until they're added to the set.)
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
- **Adding a language:** edit `i18n/routing.ts`, add `messages/xx.json`, add a font stack
  if it's a new script. That's it.

---

## Part 5 — QA checklist (per release)

- [ ] Each locale renders at `/<locale>/` and the root redirect picks the right one.
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
- **Static-export detection:** first-visit root redirect adds one hop and a brief flash;
  acceptable, and the choice is remembered.
- **ROI:** for a pre-launch page with an English-first audience, seven languages may be
  more than the moment needs. The architecture makes it cheap to *turn on* languages, so
  phasing lets us validate demand before completing `ja`/`ru`/`pt`.

---

## Part 7 — Rollout checklist

Phase 1 (done):

- [x] `i18n/config.ts` (locale set) + `i18n/dictionaries.ts` (`getDictionary` + fallback); no
      library. `next.config.ts` gets `trailingSlash: true`, keeps `output: 'export'`.
- [x] Move landing under `app/[locale]/`; `generateStaticParams`; delete old
      `app/layout.tsx` + `app/page.tsx`.
- [x] Root `/` redirect as `public/index.html` (detect + `<noscript>` fallback).
- [x] Extract all strings to `messages/en.json`; `Messages = typeof en` type.
- [x] Refactor components to take typed `copy` props; `components/rich.tsx` for inline tags.
- [x] `generateMetadata` per locale + hreflang alternates + per-locale OpenGraph.
- [x] Language switcher (`components/LangSwitcher.tsx`) in the nav.
- [x] `app/sitemap.ts` — all locale URLs with hreflang alternates (force-static).
- [x] `scripts/i18n-check.mjs` wired into the deploy workflow (blocking).
- [x] Translations: `de`, `fr`, `es`, `pt`, `ja`, `ru` (+ `en`) — all seven live.
- [x] Fonts: Oswald (Cyrillic) + Cyrillic Rubik/JetBrains for `ru`, Noto Sans JP for `ja`,
      all `preload:false` with per-`lang` CSS overrides (§2.8).

Remaining (Phase 2):

- [ ] Native review of the marketing-critical non-English lines (hero, CTAs, puns) — the
      current translations are a solid first pass, not native-reviewed.
- [ ] Per-locale OG images.
- [ ] Optional: a footer language switcher (upward-opening variant).
- [ ] Optional: subset Noto Sans JP weights further if the JP page's font payload matters.
