# DigiBoom landing

Marketing landing for **DigiBoom** — a pre-launch SaaS that helps digital-goods sellers
expand from one marketplace to many. Live at **[digiboom.biz](https://digiboom.biz)**.

Static Next.js site (App Router, TypeScript, Tailwind v4), deployed to GitHub Pages. The
hero mascot is a three.js bomb; the rest is a single scrolling page with an email capture.
The page ships in four languages (English, German, French, Spanish) at `/en/`, `/de/`,
`/fr/`, `/es/`; `/` redirects to the visitor's best match.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command             | What it does |
|---------------------|--------------|
| `npm run dev`       | Dev server. |
| `npm run build`     | Static export to `./out`. |
| `npm run i18n:check`| Verify every `messages/*.json` is in sync with `en.json` (keys + array lengths). |
| `npm run logos`     | Regenerate `public/logos/*.svg` from `simple-icons`. |

Preview the production build:

```bash
npm run build && cd out && python3 -m http.server 8000
```

## Deploying

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the static
export and publishes it to GitHub Pages behind `digiboom.biz`. Keep the Pages source set to
**GitHub Actions** (not "Deploy from a branch").

## Docs

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — the whole technical solution: stack,
  static-export decisions, page structure, design system, the 3D mascot, signup, deploy,
  and the **roadmap / further steps**. Start here.
- **[docs/LOCALIZATION.md](docs/LOCALIZATION.md)** — how the multilingual setup works
  (Phase 1 shipped: en/de/fr/es on a native dictionary pattern) and the plan for the
  remaining languages (pt/ja/ru).
- **[public/logos/README.md](public/logos/README.md)** — sourcing and usage rules for
  platform brand marks.

## Gotchas

- Verify the 3D mascot on a **real browser** — automated preview tools often show only the
  static SVG fallback.
- No yellow, ever (brand rule). The copy has a deliberate voice; match it and avoid em
  dashes.
- Signups POST to Formspree; there is no backend.
- All UI copy lives in `messages/en.json` (the source of truth) — edit English there, then
  update the other locales and run `npm run i18n:check`. Components take a typed `copy` prop;
  don't hardcode strings.

## Notes for AI assistants

`AGENTS.md` applies: this Next.js version has breaking changes from older training data —
read the docs in `node_modules/next/dist/docs/` before writing framework code.
