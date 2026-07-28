# Architecture

The whole technical picture of the DigiBoom landing: what it's built on, why, how it's
laid out, how it ships, and what's left to do. For the multilingual plan see
[LOCALIZATION.md](./LOCALIZATION.md).

---

## 1. What this is

A single-page marketing landing for DigiBoom, a (pre-launch) SaaS that helps digital-goods
sellers expand from one marketplace to many. The page's job is to explain the idea, sell
the outcome, and collect early-access emails. It is a **static site** — no backend, no
database — deployed free on GitHub Pages behind `digiboom.biz`.

---

## 2. Stack and why

| Layer      | Choice                         | Why |
|------------|--------------------------------|-----|
| Framework  | **Next.js 16** (App Router)    | Component model, `@next/font`, `next/og`, metadata API, static export. |
| Language   | **TypeScript 5**               | Type safety across a growing component set. |
| Styling    | **Tailwind CSS v4**            | Utility-first, theme tokens in `@theme`, no runtime CSS. |
| 3D         | **three.js + @react-three/fiber + drei** | The hero bomb mascot. |
| Icons      | **lucide-react** (UI) + **simple-icons** (brand logos) | UI glyphs vs real platform marks. |
| Hosting    | **GitHub Pages** via Actions   | Free static hosting, custom domain, HTTPS. |

Versions live in `package.json` (Next 16.2.10, React 19.2.4, three 0.185, r3f 9.6, drei
10.7, lucide 1.25, tailwind v4). Node **22** is used in CI.

> `AGENTS.md` warns that this Next version has breaking changes from older docs. Before
> writing framework code, read the docs bundled in `node_modules/next/dist/docs/`.

---

## 3. Static export — the decision that shapes everything

`next.config.ts` sets `output: "export"`. `next build` emits a fully static `out/` folder
(HTML/CSS/JS), no server required.

**Why:** free hosting anywhere, trivial deploy, great load performance, good SEO. Right for
a pre-launch landing.

**What it rules out:** server components that need a request, server actions, image
optimization at runtime, `next/og` on-request, i18n middleware, and Accept-Language
redirects. We work around these:

- OG image and icons are **pre-generated static files**, not live routes (see §8).
- Localization uses the default locale at `/` + `[locale]` static pages for the rest, with
  **no** auto-redirect (Accept-Language redirects can't run anyway, and are discouraged for
  SEO). See LOCALIZATION.md.

If the domain ever moves to a sub-path (e.g. `user.github.io/repo/`), a `basePath` +
`assetPrefix` must be added; on the apex domain it's not needed.

---

## 4. Project structure

```
app/
  (home)/           # route group → the site root "/"
    layout.tsx      # root layout A: <html lang="en">, fonts, static English metadata
    page.tsx        # the English landing at "/"
  [locale]/         # the six non-default locales → /de/, /fr/, ...
    layout.tsx      # root layout B: <html lang={locale}>, fonts, per-locale metadata
    page.tsx        # landing for a non-default locale (params exclude en)
  fonts.ts          # @next/font faces + FONT_VARS, shared by both root layouts
  sitemap.ts        # per-locale URLs + hreflang (force-static); en → /
  globals.css       # Tailwind import, @theme tokens, per-lang font overrides, keyframes
  icon.svg          # favicon (Next file-convention -> /icon.svg)
components/         # one file per section + Landing.tsx (shared composition), see §5, §6
i18n/
  config.ts         # locale set + default + endonyms + localePath() (the one source)
  dictionaries.ts   # getDictionary(locale): merge locale over en (English fallback)
messages/
  en.json           # UI copy, source of truth + TS type; de/fr/es/pt/ja/ru alongside
lib/
  site-metadata.ts  # buildMetadata(locale): title/desc/canonical/hreflang/OG (shared)
  bomb-mark.ts      # bomb SVG as a string/data-URI (used to bake OG + apple icon)
scripts/
  generate-logos.mjs# writes public/logos/*.svg from simple-icons (npm run logos)
  i18n-check.mjs    # verifies locale files match en.json (npm run i18n:check)
public/
  en/index.html     # legacy /en/ → / consolidation (English itself is served at /)
  CNAME             # custom domain for GitHub Pages (digiboom.biz)
  og.png            # 1200x630 social card (pre-generated, static)
  apple-icon.png    # 180x180 touch icon (pre-generated, static)
  logos/*.svg       # platform brand marks + README on sourcing/usage
docs/
  ARCHITECTURE.md   # this file
  LOCALIZATION.md   # i18n design + rollout (Phase 1 shipped)
.github/workflows/
  deploy.yml        # i18n:check + build + deploy to Pages
```

> Two root layouts (no top-level `app/layout.tsx`) so each language gets the correct
> `<html lang>`: `app/(home)/` serves **English at `/`** (the canonical apex — no redirect),
> and `app/[locale]/` serves the other six at `/<locale>/`. `next.config.ts` sets
> `trailingSlash: true` so the export emits `out/<locale>/index.html` (and `out/index.html`
> for `/`). See [LOCALIZATION.md](LOCALIZATION.md) for the full i18n design.

---

## 5. Page structure and narrative

`components/Landing.tsx` (rendered by both the `/` English page and the `[locale]` pages)
loads the locale's dictionary and renders the sections in a deliberate arc (problem →
mechanism → payoff → proof → price → ask), passing each its slice
of the copy as a typed prop:

| Order | Component          | Role |
|------:|--------------------|------|
| —     | `Nav`              | Logo, beta badge, CTA. |
| 1     | `Hero`             | Hook, promise, platform chips, first signup, 3D bomb. |
| 2     | `Marquee`          | Scrolling strip of platforms/product types. |
| 3     | `Product`          | "You bring one shop. We open the rest." + sync panel + benefits. |
| 4     | `Problem`          | Three pains of selling in one place. |
| 5     | `HowItWorks`       | Connect → Import → Open → Publish → Multiply. |
| 6     | `Payoff`           | "Then the orders come from everywhere." The boom, told honestly. |
| 7     | `Platforms`        | 24 platforms, grouped, tagged by integration stage. |
| 8     | `Countdown`        | Build-status timeline (the product roadmap, in the open). |
| 9     | `Pricing`          | Four planned tiers + ROI framing. |
| 10    | `Faq`              | Objection handling (ToS, data, timing, who). |
| 11    | `SignupSection`    | Second, larger email capture. |
| —     | `Footer`           | Nav, credit. |

Shared components: `Reveal` (scroll-in animation via IntersectionObserver), `TornEdge`
(ripped-paper section dividers), `SyncPanel` (the mock product UI in §3), `SignupForm`
(used twice), `BombLogo` (small SVG mark), and the mascot trio (§7).

---

## 6. Design system

Defined as Tailwind `@theme` tokens in `app/globals.css`.

**Palette** (bomb-on-blast-orange, no yellow — a hard brand rule):

- `blast` `#EE5C0B` — the page background and primary accent. Chosen over the original
  `#FF6B1A` specifically to pass **WCAG AA contrast**: white large text hits 3.4:1 and ink
  body text 5.24:1 on it.
- `ember` `#D14805`, `emberdark` `#A33403` — darker oranges for shading/alternating bands.
- `ink` `#1B1712` — near-black for text, comic outlines, dark sections, CTAs.
- `bomb-100…700` — gray ramp for the mascot, cards, UI chrome.

**Type** (via `@next/font/google`, exposed as CSS variables):

- `--font-display` **Bebas Neue** — big condensed headlines.
- `--font-comic` **Bangers** — eyebrows, numerals, "BOOM" accents.
- `--font-sans` **Rubik** — body.
- `--font-mono` **JetBrains Mono** — technical labels, `snake_case` tags, statuses.

Bebas/Bangers are Latin-only, so `:root:lang(ru|ja)` in `globals.css` swaps the semantic
font variables per script: **Oswald** + Cyrillic Rubik/JetBrains for Russian, **Noto Sans
JP** for Japanese. These faces are `preload:false` and referenced only via `:lang`, so Latin
pages never download them. See [LOCALIZATION.md §2.8](LOCALIZATION.md).

**Comic devices:** hard offset shadows (`.comic-shadow`), ripped-paper dividers
(`TornEdge`), a faint film-grain overlay (`body::after`), a blueprint grid (`.tech-grid`),
halftone dots. These carry personality without stock imagery.

**Copy voice:** deliberately un-corporate — lean sentences, dry, no em dashes, no AI
tells. If you edit copy, match it.

---

## 7. The 3D mascot

Three files:

- `BombStatic.tsx` — a shaded **SVG** bomb. Renders instantly, works with no WebGL/JS, and
  is the base layer.
- `Bomb3D.tsx` — the **three.js/react-three-fiber** scene: toon-shaded sphere with ink
  outlines, a 3D face, tube fuse with a flickering white-hot spark, instanced embers,
  orbiting "product" cards, contact shadow, a fit-to-viewport camera.
- `BombCanvas.tsx` — orchestrates the two.

**Load strategy (important for perf):** the static SVG shows immediately. three.js
(~900KB) is loaded **only** when: viewport ≥768px, motion is allowed
(`prefers-reduced-motion` not set), and after first paint (`requestIdleCallback`). When the
canvas reports ready (`onCreated`, with a timer fallback), the 3D **cross-fades in** over
the static bomb, which fades out — no pop, no blank. Mobile and reduced-motion keep the
static bomb and download **2KB** of JS instead of 900KB.

**Camera:** `FitCamera` computes the camera distance from the viewport aspect ratio each
resize so the scene fits with margin at any size (no clipping). The bomb is wrapped in a
`1.2×` scale to read larger than the orbiting cards.

**Face geometry (do not regress this):** the eyes/brows/mouth are flat meshes. They must
sit **fully in front of the sphere surface** (eyes z≈1.19, brows≈1.10, mouth≈1.22 for a
radius-1.15 sphere) or they clip into the curve as the face moves and appear to change
shape. The bomb does **not** rotate toward the cursor (rotating a symmetric sphere shows
nothing but warps the flat face); it "looks" by sliding the face across its front. There's
also idle bob/blink, a fuse-spark flicker, and a squash-hop celebration fired by a
`digiboom:signup` event on successful signup.

**Verification gotcha:** the automated preview browser used in development often renders
only the static SVG or fails to capture the WebGL layer. Verify the 3D on a real browser
(the live site), not the preview pane.

---

## 8. Signup flow

Both forms (`SignupForm.tsx`, used in `Hero` and `SignupSection`) POST to **Formspree**
(`https://formspree.io/f/mvzebyqy`). No backend of our own.

- Client-side `fetch` with `Accept: application/json`; on success the form resets and shows
  a confirmation, on failure an error line.
- Hidden fields: `source` (which form — hero vs bottom), `_subject` (email subject),
  `_gotcha` (honeypot for spam; hidden from humans).
- If the endpoint constant were ever reset to the `YOUR_FORM_ID` placeholder, the form
  runs in a local demo mode (confirms without POSTing).
- No reCAPTCHA at this stage; the honeypot is enough for a pre-launch page.

---

## 9. SEO and assets

- `app/[locale]/layout.tsx`'s `generateMetadata` sets per-locale title/description (from the
  dictionary), keywords, OpenGraph (with `og:locale` + `/<locale>/` url) and Twitter cards,
  and `alternates` — canonical `/<locale>/` plus a full `hreflang` map (`en`/`de`/`fr`/`es` +
  `x-default`). `viewport` carries `themeColor`. `NEXT_PUBLIC_SITE_URL` (default
  `https://digiboom.biz`) drives absolute URLs.
- **OG/Twitter image:** `public/og.png` (1200×630), a **static** file. It was originally
  generated with `next/og` but baked to a PNG so the static host serves it with the right
  content-type. Regenerate by hand if the headline changes.
- **Icons:** `app/icon.svg` (favicon, file-convention) + `public/apple-icon.png` (touch
  icon, declared in metadata).
- **Sitemap:** `app/sitemap.ts` emits a static `sitemap.xml` with every locale URL and its
  `hreflang` alternates (`export const dynamic = "force-static"` for the static export). No
  `robots.txt` yet — see roadmap.
- **Keywords core:** `keywords/` holds one CSV per locale (volume, relevance, intent, where
  each term is used on the page) plus a README with methodology. The head category term of
  each language ("digital products" / "digitale Produkte" / "produits numériques" / …) is
  deliberately worked into the hero paragraph, meta description, and Platforms heading —
  keyword changes go through those files first, copy second.

---

## 10. Accessibility

Already in place: WCAG AA color contrast (see §6), visible `:focus-visible` rings (white on
dark surfaces), a skip link, a `<main>` landmark, `prefers-reduced-motion` support (stops
the marquee, sync dots, reveals, and skips the 3D scene), the marquee pauses on
hover/focus, the canvas has an accessible name with the SVG fallback, and touch targets
meet 44px. Keep new UI to the same bar.

---

## 11. Deploy pipeline

`.github/workflows/deploy.yml`, on every push to `main`:

1. Checkout, Node 22, `npm ci`.
2. `npm run build` with `NEXT_PUBLIC_SITE_URL=https://digiboom.biz` → `out/`.
3. `touch out/.nojekyll` so GitHub Pages doesn't hide the `_next/` folder (Jekyll skips
   underscore dirs).
4. Upload `out/` as a Pages artifact and deploy (`actions/deploy-pages`).

Concurrency is set so a newer push cancels an in-flight deploy. Typical run ~45–60s.

**Domain:** `public/CNAME` pins `digiboom.biz`. DNS (Namecheap) points the apex at GitHub's
Pages IPs with `www` CNAMEd to the Pages host; "Enforce HTTPS" is on. Because it's an apex
domain, the site serves from `/` (no `basePath`).

**Do not** switch Pages source back to "Deploy from a branch" — it must stay "GitHub
Actions" or this workflow stops publishing.

---

## 12. Local development

```bash
npm install
npm run dev        # dev server at http://localhost:3000
npm run build      # static export to ./out
npm run logos      # regenerate public/logos/*.svg from simple-icons
```

Preview the static build with any static server (`cd out && python3 -m http.server 8000`).

Gotchas:
- Verify the **3D mascot on a real browser**, not the automated preview pane (§7).
- The OG image and apple icon are static; they don't change when you edit copy.
- Interactive terminal flags (`git rebase -i`, etc.) aren't used here.

---

## 13. Conventions

- One section = one component in `components/`. Text and layout live together for now
  (until i18n extracts strings — see LOCALIZATION.md).
- Keep the copy voice (§6). No em dashes, no backticks in prose, no corporate filler.
- Brand rule: **no yellow, ever.** Sparks are white-hot, not yellow.
- Data that isn't text (icons, colors, `stage` flags, logo paths) stays in the component.
- Commit messages: imperative, explain the *why*.

---

## 14. Roadmap and further steps

### Launch-blocking (mostly done)
- [x] Wire signup to a real Formspree endpoint.
- [x] Deploy to GitHub Pages behind `digiboom.biz` with HTTPS.
- [x] Share card, favicons, metadata.
- [ ] Confirm the Formspree first-submission activation email (one-time, on Roman's side).

### Landing improvements (next)
- [ ] **Sitemap + robots.txt** (`app/sitemap.ts`, `public/robots.txt`) for SEO.
- [ ] **Analytics** — a privacy-light option (Plausible/Umami) to see traffic and signup
      conversion. None installed yet.
- [ ] **Waitlist social proof** — a real "Join N sellers" counter, added only once there
      are real signups (no fabricated numbers).
- [ ] **White paper link** — the FAQ/roadmap reference a white paper that isn't linked yet;
      host it and wire the links.
- [ ] **Per-locale OG images** — deferred until i18n lands (see LOCALIZATION.md §2.12).

### Bigger visual bets (optional)
- [ ] **Live sync panel** — animate the mock panel (Gumroad row progressing to "store
      live") on scroll, to make the product feel real.
- [ ] **Scroll-linked product story** — a pinned sequence of a product leaving Etsy and
      landing on other stores as you scroll.
- [ ] **Mascot art upgrade** — AI-generated 3D-comic bomb poses as sprites for richer
      stills, reserving realtime three.js for the hero.

### Internationalization
- [x] **Shipped — all seven languages** (en/de/fr/es/pt/ja/ru) on Next's native dictionary
      pattern: `app/[locale]/` static routes, `getDictionary` with English fallback, hreflang
      + per-locale metadata, English at `/` (no redirect), a language switcher, a sitemap, and a blocking CI
      key-diff check. Cyrillic (Oswald) and CJK (Noto Sans JP) fonts load only on ru/ja pages.
- [ ] **Remaining** — native review of the non-English copy, and per-locale OG images. Design
      and maintenance model are in **[LOCALIZATION.md](./LOCALIZATION.md)**.

### Product roadmap
The *product's* roadmap (community → MVP Etsy↔Shopify sync → closed beta → public launch)
is intentionally shown on the page itself, in the `Countdown` "build status" section, and
kept in sync there rather than duplicated here.
