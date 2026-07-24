import { PackageOpen, RefreshCw, Store } from "lucide-react";
import Reveal from "./Reveal";
import SyncPanel from "./SyncPanel";

const FEATURES = [
  {
    icon: Store,
    label: "more_places_to_be_found",
    title: "Be where the buyers already are",
    text: "Opening a store used to cost you weeks, so you never did it. DigiBoom does the account, branding, categories and policies for you — you're live on a new marketplace in an afternoon, in front of a fresh audience.",
  },
  {
    icon: PackageOpen,
    label: "ready_to_sell",
    title: "Every listing lands ready to sell",
    text: "Files, descriptions, variants, tags and licenses move with each product, mapped to each platform's format — not just titles and prices. Nothing to re-upload, so every new store earns from day one.",
  },
  {
    icon: RefreshCw,
    label: "grow_without_the_grind",
    title: "Grow without the extra work",
    text: "Change a price or drop a new version once — every storefront updates in seconds. The upkeep that used to eat your week disappears, so more stores never means more hours.",
  },
];

export default function Product() {
  return (
    <section className="relative bg-bomb-200 pt-20 pb-20 tech-grid-ink">
      <div className="mx-auto max-w-6xl px-5">
        {/* header — top-left, consistent with every other section */}
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">What you get</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl leading-[0.95]">
          You bring one shop. We open the rest.
        </h2>
        <p className="mt-3 text-bomb-600 max-w-2xl leading-relaxed">
          Most sellers list on one marketplace. The ones who grow are on three or four — <strong className="text-ink">3–4×
          the storefronts a buyer can discover you on</strong>, for a fraction of the effort. DigiBoom does the expanding for
          you, semi-automatically, with your approval at every step.
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="relative z-10">
            <SyncPanel />
          </Reveal>
          <div className="space-y-6">
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
    </section>
  );
}
