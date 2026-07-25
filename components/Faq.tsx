import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

const ITEMS = [
  {
    q: "Do I need stores on the other platforms already?",
    a: "No. That is the entire point. If Etsy is all you have, we walk you through opening the rest, fill in most of the setup for you, and carry your catalog over.",
  },
  {
    q: "Can it open the accounts entirely on its own?",
    a: "No, and you would not want it to. The marketplaces make you accept the terms and prove who you are, yourself. We prepare everything around those two steps. Branding, categories, policies, listings, files.",
  },
  {
    q: "Is this against the marketplace rules?",
    a: "No. We use the official public APIs with OAuth, the same doors these platforms open to any app developer. No scraping. No handing us your password.",
  },
  {
    q: "Do you keep my files and customer data?",
    a: "Your data stays yours. Files sit encrypted, only for as long as a sync needs them, and you can export or wipe the lot whenever you want.",
  },
  {
    q: "When can I actually try it?",
    a: "The first build, Etsy and Shopify in sync, goes to a closed beta. Waitlist members get in first, in the order they signed up. Join now, thank yourself later.",
  },
  {
    q: "Who is building this?",
    a: "Roman Travnikov. Founder and lead developer, ten-plus years shipping on the web, building DigiBoom out in the open. The whole plan is in the white paper.",
  },
];

export default function Faq() {
  return (
    <section className="relative bg-ember pt-24 pb-20">
      <TornEdge className="-top-8" fill="#D14805" flip />
      <div className="mx-auto max-w-3xl px-5">
        <p className="font-comic text-2xl tracking-wide text-white/85 -rotate-1 inline-block">Before you ask</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">Questions, answered</h2>
        <div className="mt-8 space-y-4">
          {ITEMS.map((item) => (
            <Reveal key={item.q}>
              <details className="bg-white border-[3px] border-ink rounded-2xl comic-shadow-sm group">
                <summary className="cursor-pointer list-none p-5 font-bold flex items-center justify-between">
                  {item.q}
                  <span className="font-comic text-2xl text-ember group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-5 text-bomb-600 leading-relaxed">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
