import { PackageOpen, RefreshCw, Store } from "lucide-react";
import type { Messages } from "@/i18n/dictionaries";
import { rich } from "./rich";
import Reveal from "./Reveal";
import SyncPanel from "./SyncPanel";

// Icons + the mono "code label" are presentation, kept in order alongside the copy.
const META = [
  { icon: Store, label: "more_places_to_be_found" },
  { icon: PackageOpen, label: "ready_to_sell" },
  { icon: RefreshCw, label: "more_stores_not_more_hours" },
];

export default function Product({
  copy,
  sync,
}: {
  copy: Messages["product"];
  sync: Messages["syncPanel"];
}) {
  return (
    <section className="relative bg-bomb-200 pt-20 pb-20 tech-grid-ink">
      <div className="mx-auto max-w-6xl px-5">
        {/* header — top-left, consistent with every other section */}
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl leading-[0.95]">{copy.heading}</h2>
        <p className="mt-3 text-bomb-600 max-w-2xl leading-relaxed">
          {rich(copy.intro, { strong: (c, k) => <strong key={k} className="text-ink">{c}</strong> })}
        </p>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="relative z-10">
            <SyncPanel copy={sync} />
          </Reveal>
          <div className="space-y-6">
            {copy.features.map((f, i) => {
              const Icon = META[i].icon;
              return (
                <Reveal key={META[i].label} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="h-11 w-11 rounded-xl border-2 border-ink bg-white grid place-items-center shrink-0 comic-shadow-sm">
                      <Icon className="h-5 w-5 text-ember" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] text-bomb-500">{META[i].label}</p>
                      <h3 className="mt-0.5 font-bold text-lg">{f.title}</h3>
                      <p className="mt-1 text-bomb-600 leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
