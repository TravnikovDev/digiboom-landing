import Reveal from "./Reveal";
import SyncPanel from "./SyncPanel";

const FEATURES = [
  {
    label: "guided_setup",
    title: "We build the storefronts for you",
    text: "DigiBoom walks you through opening a Shopify or Gumroad store, then fills it in automatically — branding, categories, policies, products. You approve each step; the busywork is ours.",
  },
  {
    label: "catalog_transfer",
    title: "Your whole catalog comes along",
    text: "Digital files, descriptions, variants, tags and license terms are mapped to each platform's format — not just titles and prices.",
  },
  {
    label: "stays_in_sync",
    title: "Then it stays in sync, forever",
    text: "Change a price or upload a new file version once. Every storefront you own updates within seconds.",
  },
];

export default function Product() {
  return (
    <section className="bg-bomb-200 py-20 tech-grid-ink">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SyncPanel />
          </Reveal>
          <div>
            <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">What you get</p>
            <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl leading-[0.95]">
              You bring one shop. We open the rest.
            </h2>
            <p className="mt-3 text-bomb-600 leading-relaxed">
              Most sellers never expand because setting up a second storefront means starting from zero. DigiBoom does that
              part for you — semi-automatically, with your approval at every step.
            </p>
            <div className="mt-8 space-y-6">
              {FEATURES.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.08}>
                  <p className="font-mono text-[11px] text-bomb-500">{f.label}</p>
                  <h3 className="mt-1 font-bold text-lg">{f.title}</h3>
                  <p className="mt-1 text-bomb-600 leading-relaxed">{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
