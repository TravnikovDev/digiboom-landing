<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Writing any user-facing text? Read docs/WRITING.md first.

**This is not optional and it is not only for big copy jobs.** Before writing or editing
anything a visitor can read — landing copy, `messages/*.json` in any language, blog posts
in `content/blog/`, launch and community posts, emails — open
**[docs/WRITING.md](docs/WRITING.md)** and follow it.

It covers the DigiBoom voice and, more importantly, the writing patterns that make text
read as machine-generated (adapted from Wikipedia's *Signs of AI writing*). The short
version, which is still no substitute for reading the file:

- No AI-vocabulary words: delve, crucial, pivotal, showcase, underscore, seamless, robust,
  leverage, foster, enhance, vibrant, testament, tapestry, boasts, and the rest of §2.
- **No em dashes in English.** In Russian they are correct native punctuation and stay.
- No participle tails that explain significance (", highlighting its importance").
- No "not just X, but Y" beyond the one deliberate use in the hero.
- Write `is` and `has`, not "serves as" / "boasts" / "features".
- Sentence case headings, straight quotes, boldface only for real emphasis.
- No bold-header bullet lists (`- **Name** — description`).
- Never invent numbers, sources or authority.

Then run both checks before committing:

```bash
npm run writing:check   # mechanical AI-writing tells
npm run i18n:check      # translation structure
```

`writing:check` is wired into the deploy workflow, so a regression fails CI rather than
reaching the site.
