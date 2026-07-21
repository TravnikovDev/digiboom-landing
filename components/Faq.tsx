import Reveal from "./Reveal";

const ITEMS = [
  {
    q: "Is this against marketplace rules?",
    a: "No. DigiBoom uses official public APIs with OAuth authorization — the same integrations marketplaces offer to any app developer. No scraping, no password sharing.",
  },
  {
    q: "Do you keep my files and customer data?",
    a: "Your data stays yours. Files are stored encrypted only as needed for syncing, and you can export or wipe everything at any time.",
  },
  {
    q: "When can I actually try it?",
    a: "The MVP with Etsy ↔ Shopify sync goes to closed beta first — waitlist members get invited in signup order. Join now to skip the queue later.",
  },
  {
    q: "Who's building this?",
    a: "Roman Travnikov — founder and lead developer, 10+ years in web development, building DigiBoom in the open. The full plan is in the DigiBoom white paper.",
  },
];

export default function Faq() {
  return (
    <section className="bg-ember py-20">
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
