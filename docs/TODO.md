# TODO — the road to the first 100 signups

Goal: **100 waitlist emails.** Current: 0 (page just shipped; no analytics yet).

Two lists. Part 1 is work Claude does alone. Part 2 is work only you can do
(accounts, codes, decisions, posting under your name). Items marked **⛔ Bx** are
Claude-tasks blocked until you finish the matching item in Part 2.

---

## Part 1 — Claude's list (no human needed)

### Done (this batch)

- [x] **C1. `robots.txt`** ✅ shipped — allow all, point at the sitemap. 5 minutes.
- [x] **C2. Fix the community milestone copy** ✅ shipped — the roadmap section promises
  "Telegram and Discord"; Discord is banned in Turkey, so it becomes Telegram-only.
  All 7 locales.
- [x] **C3. Blog machinery** ✅ shipped — `/blog` in the same repo and design system: markdown
  posts, listing page, post template, sitemap entries, nav/footer links. English-only
  at first (translating every post into 7 languages is unsustainable solo; winners get
  translated later).
- [x] **C4. Draft the first 3 blog posts** ✅ drafted (review the voice before publishing) — from the keywords core, in the site voice:
  1. *How to sell digital products on Etsy* (4.4K/mo, relevance 10)
  2. *Etsy alternatives for digital downloads* (720/mo, relevance 9)
  3. *Selling on Etsy and Shopify at once, without the busywork* (crosslisting angle)
  Each ends in the waitlist CTA. **You review the voice before they publish.**
- [x] **C5. Launch copy pack** ✅ drafted in `docs/launch-copy.md` — two Reddit
  posts (r/EtsySellers, r/SideProject flavours), an Indie Hackers post, a Product Hunt
  "Coming soon" tagline + description, a BetaList blurb. Written in your
  founder-building-in-the-open voice; you post them from your accounts (B7).

### Blocked until Part 2 hands something over

- [ ] **C6. Wire the analytics snippet** into the layouts — **⛔ B1** (site code).
- [ ] **C7. Add the Search Console verification tag** (only if you choose the
  HTML-tag method; DNS method needs nothing from me) — **⛔ B2**.
- [ ] **C8. "Built by a seller" proof section** — a small founder note: Neurofashion
  runs on N platforms, synced the hard way, which is why DigiBoom exists. With real
  links — **⛔ B4**.
- [ ] **C9. Telegram link** in the footer + community milestone — **⛔ B5**.
- [ ] **C10. Switch the signup form from Formspree to Buttondown's API** (also kills
  Formspree's 50-submissions/month cap, which sits right under your 100-email goal) —
  **⛔ B6**.
- [ ] **C11. White paper**: link the real document from the FAQ, or soften the
  "the whole plan is in the white paper" line — **⛔ B3** (your call).
- [ ] **C12. Draft monthly update email #1** (subject + body, your voice); you press
  send — **⛔ B6**.

---

## Part 2 — Your list (accounts, codes, decisions)

- [ ] **B1. GoatCounter account** — free, ~5 min. goatcounter.com → sign up → pick a
  code (e.g. `digiboom`) → tell Claude the resulting `*.goatcounter.com` code.
  (Prefer Cloudflare Web Analytics or Plausible instead? Also fine — say which.)
- [ ] **B2. Google Search Console** — ~10 min, the step that makes 7-language
  indexing real. search.google.com/search-console → Add property → type **Domain** →
  `digiboom.biz` → verify with the DNS TXT record it shows you (added in Namecheap →
  Advanced DNS) → once verified, Sitemaps → submit `https://digiboom.biz/sitemap.xml`.
  Optional bonus: Bing Webmaster Tools can import the GSC property in 2 clicks.
- [ ] **B3. Decide on the white paper** — publish it (send the file / say yes) or
  keep it private (Claude softens the FAQ line).
- [ ] **B4. Send the Neurofashion links** — which platforms the shop is live on
  today + the URLs. Optional: 1-2 sentences from you for the founder note.
- [ ] **B5. Create the Telegram channel** — ~5 min in the app → send the t.me link.
- [ ] **B6. Buttondown account** — free up to 100 subscribers (exactly your goal).
  buttondown.com → create newsletter → send Claude the newsletter name/API embed
  details. Later: export the Formspree CSV → import into Buttondown so nobody is lost.
- [ ] **B7. Post the launch pack** (written for you in C5) — r/EtsySellers, r/Etsy,
  Indie Hackers, Product Hunt "Coming soon", BetaList. Your accounts, your name;
  replies from a founder convert, replies from a bot don't.
- [ ] **B8. Monthly rhythm** — review + send the email Claude drafts (C12), roughly
  once a month until release.
- [ ] **B9. Optional** — validate the estimated keyword volumes in Google Keyword
  Planner or eRank's free tier; Claude updates `keywords/*.csv` with real numbers.

---

## Sensible order

1. **B1 + B2 first** (~15 min total) → unblocks C6/C7 the same day → from then on
   every visitor is counted and Google starts indexing all 7 locales properly.
2. **C1–C5 run in parallel** — no waiting on anyone.
3. **B4 / B5 / B6 whenever you get to them** → unblock C8–C10, C12.
4. **B7 last** — post to communities only after the blog + proof section are live,
   so the page is at its most convincing when the traffic spike hits.
