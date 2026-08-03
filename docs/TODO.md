# TODO — the road to the first 100 signups

Goal: **100 waitlist emails.** Current: 0. Analytics went live on 3 Aug 2026, so from now
on every visit is counted. Check the Cloudflare Web Analytics dashboard for the real number.

Two lists. Part 1 is work Claude does alone. Part 2 is work only you can do (accounts,
codes, decisions, posting under your name). Items marked **⛔ Bx** are Claude-tasks blocked
until you finish the matching item in Part 2.

**Where things stand:** the build is done. Live in 7 languages, 21 blog posts, founder
proof section, verified in Search Console with the sitemap submitted, analytics counting.

Nothing else on Claude's list changes the outcome. The only thing that does now is people
arriving, which is **B7**. Everything below B7 is polish.

---

## Part 1 — Claude's list (no human needed)

### Done

- [x] **C1. `robots.txt`** ✅ allow all, points at the sitemap.
- [x] **C2. Community milestone copy** ✅ Telegram-only (Discord is banned in Turkey), all
  7 locales.
- [x] **C3. Blog machinery** ✅ `/blog` in the same repo and design system: markdown posts,
  listing page, post template, sitemap entries, nav/footer links. ~~English-only at first~~
  superseded: the blog was made multilingual, so all 3 posts exist in all 7 languages
  (21 posts) with localized slugs and per-post hreflang.
- [x] **C4. First 3 blog posts** ✅ live in 7 languages, from the keywords core:
  1. *How to sell digital products on Etsy*
  2. *Etsy alternatives for digital downloads*
  3. *Selling on Etsy and Shopify at once, without the busywork*
- [x] **C5. Launch copy pack** ✅ in [launch-copy.md](launch-copy.md) — Reddit
  (r/EtsySellers, r/SideProject), Indie Hackers, Product Hunt "Coming soon", BetaList.
  Waiting on you to post it (B7).
- [x] **C6. Analytics wired** ✅ Cloudflare Web Analytics in `components/Analytics.tsx`,
  rendered by both root layouts so all 7 locales and the blog are counted. Cookieless, so
  no consent banner. Verified the beacon loads and fires its `rum` request.
- [x] **C7. Search Console verification tag** ✅ not needed — the Domain property is
  verified by DNS TXT, which requires no code.

### Not tracked before, all shipped

- [x] Writing guideline ([WRITING.md](WRITING.md)) plus `writing:check` in CI.
- [x] Native copy review of all 6 translations, then a second review against the guideline.
- [x] Translation review: Japanese hard-wrapping, French non-breaking spaces, Spanish
  region-neutral wording, Russian script mixing. `fr-punctuation-space` and `ja-hard-wrap`
  added to `writing:check`.
- [x] Self-hosted subset Japanese font. Page CSS went from 75.5 KB to 9.2 KB gzipped
  across all 7 locales. `fonts:check` guards it in CI.
- [x] Setup guide for Search Console and analytics
  ([setup-search-console-and-analytics.md](setup-search-console-and-analytics.md)).

### Unblocked, small, not yet done

These came out of an architecture review and need nothing from you.

- [x] **C18. Fixes from the external LLM copy review** ✅ shipped — four confirmed bugs, all
  7 locales. Portuguese `é problema seu` (read as "that's your problem"); a stale roadmap
  whose MVP quarter had passed while still marked planned; the page contradicting itself by
  claiming "we handle the account" against an FAQ that says the opposite; and the
  "live by dinner" timing promise from a product with no MVP. `roadmap:check` now guards
  the dates in CI. **Most of that review was wrong** and was discarded after checking each
  claim against the actual strings; see the commit for what was debunked.
- [x] **C19. The remaining five confirmed review findings** ✅ shipped — the "second front"
  military metaphor removed in all 7 (Russian «второй фронт» and Japanese 戦線 were the
  worst); the clock now ticks in each language's own onomatopoeia instead of German
  repeating the English string verbatim; Japanese あなた cut from 32 to 14, keeping only
  contrastive and emphatic uses; hreflang and `<html lang>` for Portuguese now declare
  pt-BR, matching the Brazilian copy and the OG locale that already said pt_BR; two
  Peninsular markers removed from otherwise region-neutral Spanish.

- [x] **C16. `/llms.txt`** ✅ shipped — `app/llms.txt/route.ts`, generated at build so the
  blog and locale lists cannot drift. The valuable part is the status paragraph: it states
  outright that DigiBoom is unreleased with no users, so a model summarising the marketing
  copy does not present it as a shipping product or invent a customer count.
- [x] **C17. Structured data on the landing page** ✅ shipped — `lib/landing-jsonld.ts`,
  one linked @graph of Organization, WebSite, SoftwareApplication and FAQPage, per locale,
  with the 6 FAQ answers in that locale's language. Deliberately carries no `offers` (the
  pricing section says "Planned pricing", so those products are not purchasable) and no
  `aggregateRating` (no users, so any rating would be invented). Note that Google
  restricted FAQ rich results to government and health sites in 2023, so this will not
  produce rich results for us; it earns its place with AI crawlers and other structured
  data consumers.

- [ ] **C13. `meta keywords` is English on all 7 locales** while `keywords/*.csv` holds
  per-language research and the code comment claims they are in sync. Google has ignored
  this tag since 2009, so the honest fix is probably to delete the field.
- [ ] **C14. `sitemap.ts` stamps build time** as `lastModified` on 14 URLs, so they claim
  to change on every deploy. Google learns to distrust `lastmod` that is obviously wrong.
- [ ] **C15. GitHub Actions Node 20 deprecation** — four actions are force-run on Node 24.
  Fine today, breaks when GitHub drops the shim. Bump to `@v5`.

### Blocked until Part 2 hands something over

- [x] **C8. "Built by a seller" proof section** ✅ shipped — `components/Founder.tsx`,
  between the FAQ and the final signup, in all 7 languages. Numbers are rounded ("more than
  500", "more than 10,000") so they age upward instead of going stale, and each locale uses
  its own thousands separator. The last stat is the argument: three numbers that sound like
  success, then 1 storefront.
- [ ] **C9. Telegram link** in the footer + community milestone — **⛔ B5**.
- [ ] **C10. Move the signup form from Formspree to Buttondown** — **⛔ B6**.
- [ ] **C11. White paper**: link the real document from the FAQ, or soften the line —
  **⛔ B3**.
- [ ] **C12. Draft monthly update email #1**; you press send — **⛔ B6**.

---

## Part 2 — Your list (accounts, codes, decisions)

> **B1 and B2 have a full guide:**
> [setup-search-console-and-analytics.md](setup-search-console-and-analytics.md).

- [x] **B1. Analytics account** ✅ Cloudflare Web Analytics, token wired up in C6.
- [x] **B2. Google Search Console** ✅ Domain property verified by DNS TXT, sitemap
  submitted. Leave that TXT record in place permanently or the property un-verifies.
- [ ] **B6. Buttondown account** — **do this one next.** Free up to 100 subscribers, which
  is exactly your goal. Formspree's free tier caps at 50 submissions a month, so the cap
  sits at the halfway point of the target and would bite hardest right when a launch post
  works. buttondown.com → create newsletter → send Claude the API/embed details. Later:
  export the Formspree CSV and import it so nobody is lost.
- [x] **B4. Neurofashion links** ✅ done — shop analysed, C8 built from it.
- [ ] **B7. Post the launch pack** (written for you in C5) — r/EtsySellers, r/Etsy, Indie
  Hackers, Product Hunt "Coming soon", BetaList. **This is the only item on either list
  that brings anyone to the site.** Everything else measures traffic or improves what
  visitors find once they arrive.
- [ ] **B5. Create the Telegram channel** — ~5 min → send the t.me link. Unblocks C9.
- [ ] **B3. Decide on the white paper** — publish it or keep it private (Claude softens the
  FAQ line). Unblocks C11.
- [ ] **B8. Monthly rhythm** — review and send the email Claude drafts (C12), roughly
  monthly until release.
- [ ] **B9. Optional** — validate the estimated keyword volumes in Google Keyword Planner
  or eRank's free tier; Claude updates `keywords/*.csv` with real numbers.

---

## Sensible order from here

1. ~~Push the analytics~~ done, live and counting.
2. ~~B4 → C8~~ done. The founder section is live.
3. **B6 (Buttondown)**, or consciously decide to skip it. Deferred once already. The only
   thing that matters is that Formspree's cap is silent when it hits, so if a launch post
   works, check Formspree that same day.
4. **B7, post the launch pack. This is the next real move.** The page is at its most
   convincing and every visitor is counted, so there is nothing left to wait for.

   Before posting to r/EtsySellers or r/Etsy, decide how to handle the shop being
   AI-generated work. Those communities are frequently hostile to it, and the founder
   section links the shop. Leading with the problem rather than the shop is the safer
   framing there. The section itself does not mention AI.
5. **B5, B3** whenever. They unblock nice-to-haves, not structural work.

On timing: indexing is not instant. Landing pages usually appear within days, blog posts
one to three weeks, and non-English trails English. Check the **Pages** report in Search
Console weekly, not daily. Do not wait for indexing before doing B7 — Reddit and Indie
Hackers traffic does not depend on Google.
