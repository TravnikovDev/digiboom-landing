# Keywords core (semantic core)

The master keyword set the landing targets, one CSV per shipped locale. This is the
research layer behind the copy: wording changes should be checked against these files, and
new keywords land here first, then get worked into copy where they read naturally. No
keyword stuffing; the voice wins ties.

## Files

`en.csv de.csv fr.csv es.csv pt.csv ja.csv ru.csv` — same columns everywhere:

| Column | Meaning |
|---|---|
| `keyword` | The query, in the locale's language, lowercase as typed into search. |
| `english_gloss` | English meaning (`-` in en.csv). |
| `est_monthly_searches` | Estimated monthly searches for the language market, Keyword-Planner-style buckets. **Estimates, not tool exports** (see Data honesty). |
| `popularity_0_100` | Volume relative to the file's biggest keyword (100 = the head term of that language). |
| `relevance_0_10` | How precisely the query matches what DigiBoom sells (10 = "this person is our user today"). Volume and relevance are deliberately separate: `digital content` is huge but a 5; `sync products across platforms` is tiny but a 10. |
| `intent` | `category` (naming the space), `transactional` (wants to sell/buy now), `informational` (how-to/ideas), `comparison` (alternatives), `tool` (looking for software like ours). |
| `where_to_use` | Where the keyword is (or should be) worked into the site: `hero`, `meta`, `platforms`, `marquee`, `roadmap`, or `future blog` for content that doesn't exist yet. |
| `notes` | Anything a copywriter needs to know. |

## Data honesty

The volume numbers are **order-of-magnitude estimates**, compiled from public SEO
writing about the digital-products/Etsy niche and scaled per language market. They are
good for *prioritization* (what to lead with, what's a long-tail) and useless for ad
budgeting. Before spending money on ads or content, validate in Google Keyword Planner or
an Etsy-specific tool (eRank, Alura, EverBee — the standard trio for this niche).

Sources consulted for the landscape (no public per-keyword volumes exist):
- [Printify: How to sell digital downloads on Etsy](https://printify.com/blog/how-to-sell-digital-downloads-on-etsy/)
- [Merch Titans: Etsy digital downloads guide](https://merchtitans.com/blog/etsy-digital-downloads-guide)
- [CLOSO: How to sell digital downloads on Etsy](https://closo.co/blogs/beginner-guides-how-tos/how-to-sell-digital-downloads-on-etsy-2)
- [Practical Ecommerce: Keyword volume, Google vs Semrush vs Ahrefs](https://www.practicalecommerce.com/keyword-volume-google-vs-semrush-vs-ahrefs) (why all volumes are estimates anyway)

## How the core maps into the page (as of this commit)

- The **hero opener** names the category plainly: `digital goods` in English (founder's
  wording), each language's natural head term elsewhere (`digitale Produkte`,
  `produits numériques`, `productos digitales`, `produtos digitais`, `デジタル商品`,
  `цифровые товары` — the last two literally mean "digital goods").
- **`digital products`** anchors the meta description and the Platforms heading, so both
  head variants are on the page.
- **`digital downloads`** appears in the meta description and the marquee.
- The long-tail product words (templates, presets, fonts, 3D assets, courses) live in the
  **marquee**, keeping `sell canva templates` / `sell lightroom presets`-style niches
  represented without cluttering the hero.
- High-relevance informational queries (`how to sell digital products on etsy`,
  `etsy alternatives for digital downloads`, `crosslisting app`) have **no page** yet —
  they're marked `future blog` and are the argument for a content section later.

## Language notes

- **pt/ru**: `infoprodutos` / `инфопродукты` are huge local terms but skew to
  courses/ebooks — relevance capped at 6; don't anchor on them.
- **ja**: `ダウンロード販売` ("download sales") is the established Japanese term for
  exactly our niche — treat it as a co-anchor with `デジタル商品`.
- **ru**: Etsy suspended Russia/Belarus-based sellers in 2022; the RU-language audience
  is largely RU-speaking sellers living elsewhere. Keywords tied to selling *from* Russia
  are marked low relevance.
