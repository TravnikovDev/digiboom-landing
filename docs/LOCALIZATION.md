# Localization (i18n)

How the DigiBoom landing goes multilingual, why we made the choices we did, and how
we keep seven languages from becoming seven maintenance headaches.

This doc has two halves: a **general plan** (the what and why, readable by anyone) and a
**technical plan** (the how, with implementation detail). Read the first half before the
second.

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

### 2.2 Library: `next-intl`

We use **next-intl**. Rationale:

- Purpose-built for the App Router; first-class `generateStaticParams` + static rendering
  via `setRequestLocale`.
- ICU message format (plurals, numbers, dates) — useful for counts like "2 / 6 shipped".
- Strong TypeScript story (typed message keys).
- Clean upgrade path to a translation-management tool later.

**Static-export caveat:** next-intl's locale-detection middleware won't run under
`output: export`. We therefore use next-intl *without* its middleware — only for the
`[locale]` pages and message loading — and handle first-visit locale detection with a
small client-side redirect at the root (see 2.5).

Alternatives considered and why not (now):

- **Paraglide JS (inlang)** — compiler-based, smallest bundle, excellent static story.
  A strong pick if bundle size becomes the priority; message format is simpler than ICU.
- **i18next / react-i18next** — deepest ecosystem and TMS integrations; heavier and more
  manual on the App Router. Revisit if the landing grows into a full app.
- **next-i18next** — Pages-Router tool. Not applicable.

> Verify the exact next-intl API against the version installed and the Next docs bundled
> in `node_modules/next/dist/docs/` before writing code — this Next version has breaking
> changes, and next-intl's static-export setup has shifted across its own versions.

### 2.3 URL structure and root redirect

```
/            → tiny client redirect page (detect + forward)
/en/  /es/  /de/  /ja/  /fr/  /ru/  /pt/   → pre-rendered landing per locale
```

- Every locale is prefixed, including the default, so `hreflang` is uniform and there's no
  "which page is English" ambiguity.
- The root `/` is a minimal client page: read `localStorage.locale`, else negotiate
  `navigator.languages` against our list, else fall back to `en`, then
  `location.replace('/<locale>/')`. It's one fast hop and the choice is remembered. This
  replaces the middleware we can't run.

### 2.4 Project structure

```
app/
  layout.tsx                  # root: <html> shell, all @next/font declarations
  page.tsx                    # root redirect (client component)
  [locale]/
    layout.tsx                # setRequestLocale, <html lang>, per-locale <body> font class,
                              # NextIntlClientProvider, generateMetadata (hreflang)
    page.tsx                  # the landing; generateStaticParams() -> the 7 codes
i18n/
  routing.ts                  # locales list + default; single source for the set
  request.ts                  # getRequestConfig: load + deep-merge messages (fallback)
messages/
  en.json                     # SOURCE OF TRUTH (defines the key shape)
  es.json  de.json  ja.json  fr.json  ru.json  pt.json
lib/
  fonts.ts                    # all @next/font faces incl. Oswald (Cyrillic) + Noto Sans JP
scripts/
  i18n-check.mjs              # CI: diff each locale's keys against en.json
types/
  messages.d.ts               # augment next-intl Messages type from en.json
```

Adding or removing a language = edit `i18n/routing.ts` and add/remove a `messages/*.json`.
Nothing else hardcodes the list.

### 2.5 Setup, step by step

1. **Install:** `npm i next-intl`.
2. **`i18n/routing.ts`** — export `locales = ['en','es','de','ja','fr','ru','pt']` and
   `defaultLocale = 'en'`.
3. **`i18n/request.ts`** — `getRequestConfig(async ({requestLocale}) => {...})` that loads
   `messages/{locale}.json`, **deep-merges it onto `en.json`** (English as the base layer),
   and returns `{ locale, messages }`. The deep-merge is our fallback: any key absent in a
   locale resolves to English. Also set `getMessageFallback` so a truly missing key returns
   a readable string, not a thrown error, in production.
4. **`next.config.ts`** — wrap the existing config with
   `createNextIntlPlugin('./i18n/request.ts')`. Keep `output: 'export'`.
5. **`app/[locale]/layout.tsx`:**
   - `export function generateStaticParams()` → `locales.map(locale => ({locale}))`.
   - Call `setRequestLocale(locale)` first thing (opts the subtree into static rendering).
   - `const messages = await getMessages()`.
   - Render `<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>`.
   - Set `<html lang={locale}>` and the per-locale font body class (see 2.8).
   - `export async function generateMetadata({params})` → localized title/description +
     `alternates.languages` hreflang map (see 2.9).
6. **`app/[locale]/page.tsx`** — the landing. Call `setRequestLocale(locale)`; render the
   sections. Server components read strings via `getTranslations`; client components via
   `useTranslations` (works because they're inside the provider).
7. **`app/page.tsx`** — the root redirect described in 2.3 (a `'use client'` component with
   a `useEffect`; also render a `<noscript>` link to `/en/` and a `<link rel="canonical">`).
8. **Delete** the current root `app/page.tsx` landing (its content moves under `[locale]`).

### 2.6 Messages and type safety

- Messages are namespaced JSON, e.g.:
  ```json
  {
    "hero": { "headline": "We'll explode your sales. In a good way.", "cta": "Light the fuse" },
    "pricing": { "roi": "One extra sale a month covers it..." }
  }
  ```
- `types/messages.d.ts` augments next-intl so `useTranslations('hero')` autocompletes keys
  and flags typos at build:
  ```ts
  import en from '../messages/en.json';
  declare module 'next-intl' { interface AppConfig { Messages: typeof en } }
  ```
- Because the type is derived from `en.json`, English is authoritative for the *shape* as
  well as the content.

### 2.7 Fallback strategy

Cross-locale fallback (missing `de` key → English) is done by **deep-merging `en` as the
base** in `i18n/request.ts`:

```ts
const messages = deepmerge(en, (await import(`../messages/${locale}.json`)).default);
```

This is what lets Phase-1 languages ship partial and still render a complete page. The CI
check (2.13) reports what's still on English so it doesn't hide forever.

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

### 2.9 Metadata and SEO

- `generateMetadata` per locale sets translated `<title>`/`description` and the alternates:
  ```ts
  alternates: {
    canonical: `${SITE}/${locale}/`,
    languages: { en: `${SITE}/en/`, de: `${SITE}/de/`, /* ...all 7... */ 'x-default': `${SITE}/en/` }
  }
  ```
- `<html lang={locale}>` per page (also drives the font CSS in 2.8).
- Add a **sitemap** listing all seven URLs (`app/sitemap.ts`, static-export friendly).
- OG image: keep the single English card for launch. Per-locale OG cards are a Phase-2
  nice-to-have (regenerate the `next/og` route per locale, or one static PNG each).

### 2.10 Language switcher

- A dropdown in the nav (and footer) listing the seven languages by endonym (Deutsch,
  Français, 日本語, Русский, …).
- Each item links to the **same route in the target locale** and writes
  `localStorage.locale` so the root redirect honours the choice next time.
- Mark the current one; keyboard-accessible; `hreflang` on the links.

### 2.11 Component refactor

Every component currently hardcodes English. The refactor:

- Move all visible strings into `messages/en.json` under section namespaces
  (`hero`, `problem`, `product`, `howItWorks`, `payoff`, `platforms`, `status`,
  `pricing`, `faq`, `signup`, `nav`, `footer`, `syncPanel`).
- Replace literals with `useTranslations('<namespace>')` (client) or `getTranslations`
  (server). Arrays (feature lists, FAQ items, milestones) use indexed keys or `t.rich`
  for the few strings with inline `<strong>`.
- Keep non-text props (icons, colors, logos, `stage` flags) in the component; only *text*
  moves to messages.
- The mono `snake_case` labels (e.g. `guided_setup`) are decorative and can stay as-is or
  move to messages if we want them localized (recommend: leave them, they read as code).

### 2.12 OG images (Phase 2)

Deferred. When done: either parametrize a `next/og` route by locale (re-add a dynamic
route, force-static, one per locale via `generateStaticParams`) or hand-make one static
PNG per language. Watch CJK/Cyrillic font embedding in the generator.

### 2.13 CI translation check

`scripts/i18n-check.mjs`, run in the deploy workflow before build:

- Load `en.json` and each locale; compute the flat key set of each.
- Report per locale: keys missing (still English) and keys present that English lacks
  (stale/renamed). Print a summary like `de: 3 missing, fr: complete`.
- Non-blocking by default (fallback covers gaps); can be made blocking for `en` integrity.
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

- [ ] Install next-intl; add `i18n/routing.ts`, `i18n/request.ts`, wrap `next.config.ts`.
- [ ] Move landing under `app/[locale]/`; add `generateStaticParams` + `setRequestLocale`.
- [ ] Add root redirect at `app/page.tsx`.
- [ ] Extract all strings to `messages/en.json`; add typed `Messages` augmentation.
- [ ] Refactor components to `useTranslations` / `getTranslations`.
- [ ] Add fonts (Oswald, Noto Sans JP) + per-`lang` CSS variable overrides.
- [ ] `generateMetadata` per locale + `sitemap.ts` + hreflang.
- [ ] Language switcher in nav/footer.
- [ ] `scripts/i18n-check.mjs` wired into the deploy workflow.
- [ ] Phase 1 translations: de, fr, es (+ en). Phase 2: pt, ja, ru with native review.
- [ ] Per-locale OG images (Phase 2).
