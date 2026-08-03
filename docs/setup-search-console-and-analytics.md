# Setting up Search Console and analytics (B2 and B1)

Two accounts, roughly 20 minutes of your time in total. They are the two items blocking
the most other work, and neither needs any code from you.

**Do Search Console first**, even though the TODO lists it second. Indexing is slow: Google
has to discover, crawl and then index 35 URLs across 7 languages, and that takes days to
weeks. Analytics starts counting the moment it is installed, so a day's delay there costs
you one day of numbers. A day's delay on Search Console pushes the whole indexing timeline
back. Start the slow clock first.

What is already done and needs nothing from you:

- `https://digiboom.biz/robots.txt` is live, allows everything, and points at the sitemap.
- `https://digiboom.biz/sitemap.xml` is live with 35 URLs: 7 landing pages, 7 blog indexes,
  and 21 posts, each carrying its full hreflang alternates.

---

## Part 1 — Google Search Console

### 1.1 Pick the property type (this decision matters)

Search Console offers two kinds of property, and the choice changes what you have to do.

| | Domain property | URL-prefix property |
|---|---|---|
| Covers | `digiboom.biz` and every subdomain, http and https | only the exact prefix you type |
| Verify by | DNS TXT record only | HTML tag, HTML file, DNS, Google Analytics |
| Needs code from me | no | yes, I add a meta tag and redeploy |

**Choose Domain.** You control DNS at Namecheap, it covers everything in one property, and
it needs no code change, which means no waiting on me and no extra deploy. The rest of this
guide assumes Domain.

If DNS gives you trouble, fall back to URL-prefix with the HTML tag method and send me the
tag. That is item C7 and takes me about two minutes, but it does mean a redeploy.

### 1.2 Add the property

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Sign in with the Google account you want to own this long term. Use one you will still
   have access to in two years, not a throwaway.
3. If this is your first property you land straight on the "Select property type" screen.
   Otherwise use the property dropdown at the top left, then **Add property**.
4. In the **Domain** box (the left one), type exactly:

   ```
   digiboom.biz
   ```

   No `https://`, no `www`, no trailing slash. If you type a full URL it will create a
   URL-prefix property instead, which is not what you want here.
5. Click **Continue**. Google shows you a TXT record that looks like:

   ```
   google-site-verification=SOME_LONG_RANDOM_STRING
   ```

   Leave this browser tab open. You need that string in the next step, and the dialog is
   where you will click Verify afterwards.

### 1.3 Add the TXT record at Namecheap

1. Sign in at [namecheap.com](https://www.namecheap.com), then **Domain List** in the left
   sidebar, then **Manage** next to `digiboom.biz`.
2. Open the **Advanced DNS** tab.
3. Under **Host Records**, click **Add New Record**.
4. Fill it in exactly like this:

   | Field | Value |
   |---|---|
   | Type | `TXT Record` |
   | Host | `@` |
   | Value | the full `google-site-verification=...` string, pasted whole |
   | TTL | `Automatic` |

5. Click the green checkmark to save the row. Namecheap does not save until you do.

Four things that go wrong here, in the order people hit them. The last two are specific to
your domain, because I checked what is already in your DNS.

- **Host must be `@`, not `digiboom.biz`.** `@` means the root domain. Typing the domain
  name gives you `digiboom.biz.digiboom.biz`, which verifies nothing.
- **Paste the whole value including `google-site-verification=`.** The prefix is part of the
  record, not a label.
- **You already have a TXT record. Add a second one, do not edit that one.** Your root
  currently holds an SPF record for Namecheap's email forwarding:

  ```
  v=spf1 include:spf.efwd.registrar-servers.com ~all
  ```

  A domain can hold many TXT records at once, so the Google one sits happily alongside it.
  But if you overwrite the SPF row instead of adding a new one, email forwarding on the
  domain breaks, and it breaks quietly. Click **Add New Record**, do not click into the
  existing TXT row.
- **Leave the four A records alone.** They point at GitHub Pages:

  ```
  185.199.108.153   185.199.109.153   185.199.110.153   185.199.111.153
  ```

  Deleting any of them takes digiboom.biz offline. You are only adding a TXT row here and
  touching nothing else.

### 1.4 Confirm the record is actually live

Do not skip this. Clicking Verify before DNS has propagated is the single most common way
this goes wrong, and repeated failures are slower to recover from than just waiting.

Run this in a terminal:

```bash
dig +short TXT digiboom.biz
```

Right now, before you change anything, that prints one line:

```
"v=spf1 include:spf.efwd.registrar-servers.com ~all"
```

After the record propagates it prints **two** lines, the SPF one and yours:

```
"v=spf1 include:spf.efwd.registrar-servers.com ~all"
"google-site-verification=SOME_LONG_RANDOM_STRING"
```

Two lines is the success condition. If you still see only the SPF line, it has not
propagated yet. Namecheap usually takes a few minutes, occasionally up to an hour. There is
nothing to fix while you wait, so resist editing the record again, which only restarts the
clock.

If you see only your Google line and the SPF line is gone, stop: you overwrote the SPF
record instead of adding a new one. Put it back with the exact value above, as a TXT record
on host `@`.

### 1.5 Verify

Back in the Search Console tab, click **Verify**. On success you get "Ownership verified".

**Leave the TXT record in place forever.** Google re-checks it periodically. Deleting it
later un-verifies the property and you lose access to the data.

### 1.6 Submit the sitemap

Verification alone does not tell Google about your pages. This step does.

1. In the left sidebar, click **Sitemaps** (under Indexing).
2. Under "Add a new sitemap" the domain is already filled in. Type only:

   ```
   sitemap.xml
   ```

3. Click **Submit**.

Status goes to "Success" within minutes to a day, and the discovered-URL count should read
**35**. If it reads 0 or errors, tell me and I will look at the file. If it reads a number
that is not 35, the deploy and your view of it are out of sync, which is also worth telling
me about.

### 1.7 Check Google can reach the non-English pages

This is the step that confirms the whole 7-language premise actually works, and almost
nobody does it.

1. Paste this into the search bar at the very top of Search Console:

   ```
   https://digiboom.biz/ru/
   ```

2. Press Enter. You get the URL Inspection report.
3. It will say "URL is not on Google" at first. That is expected and fine. Click
   **Test live URL** in the top right.
4. After ten or twenty seconds you want **"URL is available to Google"**. That means
   Googlebot can fetch and render the Russian page right now.
5. Repeat for `https://digiboom.biz/ja/`. Japanese is the one worth double-checking,
   because it is the only locale whose font is self-hosted.

If a live test says the URL is *not* available, send me the exact message. That is a real
problem on our side, not something you can fix at Namecheap.

Do not click "Request indexing" on all 35 URLs. The sitemap already told Google about them,
and hammering the button does not speed anything up.

### 1.8 Optional, two minutes

**Bing Webmaster Tools.** [bing.com/webmasters](https://www.bing.com/webmasters) → Import
from Google Search Console → authorize → done in about two clicks. Bing traffic is small
but the import costs nothing, and it also feeds DuckDuckGo.

Deliberately not here: Russian search services. Out of scope for this project by decision,
not oversight. The Russian pages are indexed by Google like every other locale.

---

## Part 2 — Analytics

### 2.1 Pick a tool first

The TODO named GoatCounter, but read this before signing up.

| | Cloudflare Web Analytics | GoatCounter | Plausible |
|---|---|---|---|
| Cost for a commercial site | free | ask them, see below | paid, from ~$9/mo |
| Cookies or consent banner | none needed | none needed | none needed |
| Setup | one script tag | one script tag | one script tag |
| Needs DNS moved to them | no | no | no |

**One thing to know about GoatCounter:** the free hosted tier is offered for non-commercial
use, and the author asks businesses to pay. DigiBoom is a commercial product, even
pre-launch. It is a cheap plan and the tool is good, so paying is a perfectly reasonable
choice, but check the current terms on the signup page rather than assuming the free tier
applies to you.

**My recommendation is Cloudflare Web Analytics.** It is free with no commercial
restriction, cookieless, and needs nothing but a script tag. You do not have to move your
DNS to Cloudflare to use it, which is the thing most people assume and it is not true. The
cookieless part matters more than it sounds: four of your seven locales are EU languages,
and a cookieless analytics tool means the site needs no consent banner at all.

Pick one and follow the matching section. Then send me the snippet.

### 2.2 If you choose Cloudflare Web Analytics

1. Create a free account at [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up),
   or sign in if you have one.
2. In the left sidebar, open **Analytics & Logs**, then **Web Analytics**.
3. Click **Add a site**.
4. Enter `digiboom.biz`.
5. Cloudflare gives you a JavaScript snippet containing a token. It looks roughly like:

   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
   ```

6. **Copy the whole snippet** and send it to me. Do not try to add it to the repo yourself.

### 2.3 If you choose GoatCounter

1. Go to [goatcounter.com](https://www.goatcounter.com) and click **Sign up**.
2. Read the tier terms on that page and decide whether you are on the free or paid plan
   (see 2.1).
3. Choose a site code, for example `digiboom`. Your dashboard becomes
   `https://digiboom.goatcounter.com`.
4. After signup, open **Settings**, then **Site code**, and copy the `<script>` tag.
5. Send me that snippet, or just tell me the site code, which is enough.

### 2.4 What I do with it

Send me the snippet and I do C6: add it to both root layouts, `app/(home)/layout.tsx` and
`app/[locale]/layout.tsx`, so every page in all 7 languages is counted, then deploy.

Both tools load asynchronously and neither blocks rendering, so this does not undo the font
work.

### 2.5 Confirming it actually works

Once I have deployed it:

1. Open `https://digiboom.biz` in a normal window, not incognito, and click through two or
   three pages including one non-English page.
2. Wait about a minute.
3. Open your analytics dashboard. You should see those pageviews with the right paths.

If the dashboard stays empty for more than a few minutes, the usual causes are an ad
blocker on your own machine (test in a different browser), or the wrong token. Tell me what
you see and I will check the deployed HTML.

---

## What this unblocks

Finishing these two closes out C6 and C7 and turns on the two things you currently cannot
do at all: knowing whether anyone visits, and being found in search.

After that, the highest-leverage item left is **B7, posting the launch pack** from
[launch-copy.md](launch-copy.md). It is the only item on either list that actually brings
people to the site. Everything else measures them or improves what they find. Post it after
these two are live, so the traffic is counted and the pages are indexed when it lands.

One thing not to expect: indexing is not instant. Landing pages typically show up in the
Pages report within days, blog posts can take one to three weeks, and the non-English
versions usually trail English. Nothing is wrong if `ru` is still unindexed a week in. Check
the **Pages** report in Search Console every week or so rather than daily.
