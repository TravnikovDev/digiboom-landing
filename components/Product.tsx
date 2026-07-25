import { PackageOpen, RefreshCw, Store } from "lucide-react";
import Reveal from "./Reveal";
import SyncPanel from "./SyncPanel";

const FEATURES = [
  {
    icon: Store,
    label: "more_places_to_be_found",
    title: "Be where the buyers already are",
    text: "Opening a store used to cost you a week you did not have, so you never bothered. We handle the account, the branding, the categories, the fine print. You are live on a new marketplace by dinner, in front of people who have never heard of you.",
  },
  {
    icon: PackageOpen,
    label: "ready_to_sell",
    title: "Every listing lands ready to sell",
    text: "Files, descriptions, variants, tags, licences. All of it travels with the product, shaped to fit each platform, not just the title and a price. Nothing to re-upload. Every new store is open for business on day one.",
  },
  {
    icon: RefreshCw,
    label: "more_stores_not_more_hours",
    title: "More stores, not more hours",
    text: "Change a price once. Ship a new version once. Every storefront catches up in seconds. The busywork that used to swallow your week is simply gone, so you can go as wide as you like and keep your evenings.",
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
          Most sellers list in one place. The ones who grow list in three or four. That is{" "}
          <strong className="text-ink">three or four times the storefronts a buyer can trip over you on</strong>, for a sliver
          of the work. DigiBoom does the expanding. You approve each step, we do the rest.
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
