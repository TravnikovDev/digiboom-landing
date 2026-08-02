# Writing guideline

**Read this before writing or editing any user-facing text**: landing copy, blog posts,
`messages/*.json`, launch/community posts, emails. It applies to every language, not just
English.

Two jobs: keep the DigiBoom voice, and avoid writing that reads as machine-generated. The
second half is adapted from Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
which catalogues the patterns LLMs fall into. Those patterns are the default this project
is written against.

Run `npm run writing:check` before committing text. It catches the mechanical tells; the
rest is judgement.

---

## 1. The voice

DigiBoom sounds like a person who has done this job and is slightly tired of it. Concretely:

- **Short declaratives.** "One shelf, one shop, and you already know how that story goes."
- **Concrete over abstract.** "Re-uploaded by hand" beats "manual data entry processes."
- **Say the unflattering true thing.** "It is in development. Zero users." Admitting the
  gap buys more trust than hiding it.
- **Dry, not zany.** The bomb puns carry the humour. The sentences stay flat.
- **Second person, present tense.** You sell. We open. It syncs.
- **No exclamation marks** outside the BOOM burst.

Brand terms stay English everywhere: DigiBoom, BOOM.

---

## 2. Words we do not use

These are the words LLMs over-produce. Almost all have a plainer synonym that is simply
better writing. Banned unless there is a real reason:

> delve, crucial, pivotal, showcase, underscore, tapestry, testament, vibrant, robust,
> seamless, realm, foster, garner, meticulous, intricate, enhance, leverage, bolster,
> myriad, plethora, holistic, paradigm, synergy, elevate, unlock, empower, transformative,
> cutting-edge, groundbreaking, renowned, boasts, nestled, in the heart of, diverse array,
> rich (figurative), landscape (figurative), commitment to, dive into, navigate (figurative)

Use instead: has, is, uses, helps, more, real, whole, big, careful, detailed, show, back.

Also avoid the stiff-synonym reflex. Prefer the short word:

| Not this | This |
|---|---|
| utilize | use |
| authored | wrote |
| relocated | moved |
| attempted | tried |
| passed away | died |
| purchase | buy |
| additional | more |
| numerous | many |
| in order to | to |
| a wide range of | many, or name them |

---

## 3. Sentence patterns to avoid

**Participle tails that add nothing.** The single most reliable tell. A sentence ends, then
an "-ing" clause explains its significance.

> ✗ We open your other storefronts, ensuring your catalog reaches more buyers and
> highlighting the value of multichannel selling.
> ✓ We open your other storefronts. More places to be found.

**Significance padding.** Nothing "stands as a testament to", "plays a crucial role in",
"marks a pivotal moment for", or "reflects a broader shift in". If a thing matters, say what
it does.

**Negative parallelism.** "Not just X, but Y." "It's not X, it's Y." "No X, no Y, just Z."
One in a piece is a stylistic choice; two is a signature. The site currently uses none,
which is the right number.

**Rule of three.** Three adjectives, or three parallel clauses, over and over. Vary the
count: two, then four, then one.

**Avoiding "is".** LLMs replace plain copulas with "serves as", "stands as", "functions as",
"represents", "boasts", "features", "offers". Just write **is** and **has**.

> ✗ Gallery 825 serves as our exhibition space and features four separate rooms.
> ✓ Gallery 825 is our exhibition space. It has four rooms.

**Vague attribution.** No "experts argue", "industry reports suggest", "studies show",
"it is widely regarded". Name the source or drop the claim. We sell to sceptical people.

**Didactic disclaimers.** No "it's important to note", "it's worth remembering", "keep in
mind that". Just say the thing.

**Summary sections.** No "In summary", "In conclusion", "Overall". A blog post ends on its
last real point and the CTA.

**The challenges/outlook formula.** "Despite these challenges, X continues to…" is a shape,
not a thought.

---

## 4. Formatting tells

**Em dashes.** Do not use them in English. Use a comma, a colon, parentheses, or a full
stop. This has been an explicit project rule since the first copy pass.
*Exception:* in Russian the em dash is correct native punctuation (`Одна загрузка — вот
это и есть BOOM`) and stays. Japanese uses `、` and `。` normally.

**Bold-header bullet lists.** The tell is the **bolded label plus separator** shape:
`- **Name** — description` or `- **Name:** description`. A plain `- Name: description`
list is ordinary writing and is fine. Write the name into a normal sentence instead:

> ✗ - **Gumroad** — the classic, works with any file type.
> ✓ - Gumroad is the classic. Any file type, and you keep more of the sale.

**Boldface.** Only for genuine emphasis, a few times per page. Never to label every item in
a list, never on whole sentences.

**Headings.** Sentence case, not Title Case. "How it works", not "How It Works".

**Quotes and apostrophes.** Straight (`"` and `'`), never curly (`"" ''`). JSON needs
straight quotes anyway.

**Emoji.** Not in product copy or blog posts. Fine in launch posts on social platforms
where they are native.

**Lists vs prose.** If three short items would read fine as a sentence, make them a
sentence.

---

## 5. Never leaks into the product

These come from the assistant side of a chat and must never appear in a file:

- "Of course!", "Certainly!", "I hope this helps", "Let me know if…"
- "As an AI language model…", "As of my last knowledge update…"
- "While specific details are limited in the available sources…"
- Placeholder text: `[Your Name]`, `[Insert X]`, `2025-XX-XX`, `PASTE_URL_HERE`
- Markdown artefacts in the wrong place, or citation junk like `oaicite`, `turn0search0`,
  `[cite: 1]`, `utm_source=chatgpt.com`

---

## 6. Facts and numbers

- **No invented numbers.** No "trusted by 500 sellers" until 500 sellers exist. No
  fabricated percentages, no made-up study.
- **No fake authority.** Do not attribute an opinion to "analysts" to make it sound solid.
- **Volumes and fees change.** Point at the source ("check the current fee page") rather
  than stating a percentage that will rot.
- **Keyword work goes through [keywords/](../keywords/README.md).** Keywords are worked
  into sentences that would exist anyway. If a sentence exists only to hold a keyword,
  delete it.

---

## 7. Translations

- English is the source. Translate meaning and voice, not word order.
- Each language keeps its own natural register. French and German use the informal
  (`tu`, `du`); Russian keeps `вы`, because Russian past tense is gendered and `ты` would
  force a masculine default onto every reader.
- Do not carry English punctuation habits across. Spanish opens questions with `¿`;
  Russian uses em dashes and « » quotes; Japanese uses `、` and `。`.
- **French takes a non-breaking space (U+00A0) before `:` `;` `?` `!` `»`, and after `«`.**
  A plain space is wrong: it lets the punctuation wrap alone onto the next line. `BOOM!` is
  a brand term and keeps no space. `writing:check` enforces this.
- **Japanese paragraphs go on one line. Never hard-wrap them.** A line break inside a
  markdown paragraph renders as a visible space, and Japanese has no inter-word spaces, so
  the break shows up as a gap in the middle of a sentence. Measured in the browser:
  `品切れなし` is 80.00px, `品切れ\nなし` is 83.58px, exactly the same as `品切れ なし`.
  Latin and Cyrillic are unaffected, where a newline should become a space.
  `writing:check` enforces this.
- Keep each language region-neutral where it costs nothing. Spanish uses `tú` and avoids
  Spain-only `vosotros` forms, since most Spanish readers are not in Spain.
- The FAQ questions are the reader speaking to us, so they address the team as an informal
  plural: `ihr` (de), `vous` (fr), `vocês` (pt), `вы` (ru). That `vous` is the plural of
  `tu`, not a formality slip.
- A loanword that the language has genuinely absorbed is fine (German "White Paper").
  An English phrase sitting untranslated in a different script is not: Russian and Japanese
  must never carry raw Latin-script English where a native term exists.
- Watch for words from the wrong language surviving a translation pass. This has happened
  (an English "half" and a Russian "двух" both ended up inside a Japanese post).
- Keep array lengths identical to English or `npm run i18n:check` fails.

---

## 8. Before you commit

```bash
npm run writing:check   # mechanical tells
npm run i18n:check      # translation structure
```

Then read it aloud. If it sounds like a brochure, rewrite it. If a sentence could appear
unchanged in any other company's copy, it is not doing any work.
