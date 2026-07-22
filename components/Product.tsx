import { PackageOpen, RefreshCw, Store } from "lucide-react";
import Reveal from "./Reveal";
import SyncPanel from "./SyncPanel";
import TornEdge from "./TornEdge";

const FEATURES = [
  {
    icon: Store,
    label: "guided_setup",
    title: "We build the storefronts for you",
    text: "DigiBoom walks you through opening a Shopify or Gumroad store, then fills it in automatically — branding, categories, policies, products. You approve each step; the busywork is ours.",
  },
  {
    icon: PackageOpen,
    label: "catalog_transfer",
    title: "Your whole catalog comes along",
    text: "Digital files, descriptions, variants, tags and license terms are mapped to each platform's format — not just titles and prices.",
  },
  {
    icon: RefreshCw,
    label: "stays_in_sync",
    title: "Then it stays in sync, forever",
    text: "Change a price or upload a new file version once. Every storefront you own updates within seconds.",
  },
];

export default function Product() {
  return (
    <section className="relative bg-bomb-200 pt-20 pb-20 tech-grid-ink">
      <TornEdge className="-top-10" fill="#E8EAED" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:items-start">
          {/* the panel rises out of its band and layers over the ticker above */}
          <Reveal className="relative z-20 lg:-translate-y-44">
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
                  <div className="flex gap-4">
                    <span className="h-11 w-11 rounded-xl border-2 border-ink bg-white grid place-items-center shrink-0 comic-shadow-sm">
                      <f.icon className="h-5 w-5 text-ember" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] text-bomb-500">{f.label}</p>
                      <h3 className="mt-0.5 font-bold text-lg">{f.title}</h3>
                      <p className="mt-1 text-bomb-600 leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
