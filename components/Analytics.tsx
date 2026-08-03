import Script from "next/script";

/**
 * Cloudflare Web Analytics, rendered by both root layouts so every page in all seven
 * locales is counted (app/(home)/layout.tsx and app/[locale]/layout.tsx).
 *
 * Cookieless, so the site needs no consent banner. That is why it was chosen over the
 * alternatives: four of the seven locales are EU languages.
 *
 * The token is not a secret. It identifies the site to Cloudflare and ships in the HTML of
 * every page by design, which is why it lives in the repo rather than an env var.
 *
 * `afterInteractive` keeps the beacon off the critical path: it loads after hydration, so
 * it cannot delay first paint. Analytics is never worth a slower page.
 */
const CF_BEACON_TOKEN = "03896bbc26cf48469c6a4584fd2c13d4";

export default function Analytics() {
  return (
    <Script
      id="cf-web-analytics"
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  );
}
