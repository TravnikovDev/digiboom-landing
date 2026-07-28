import { Building2, LucideIcon, Package, Rocket, Store } from "lucide-react";
import type { Messages } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

// Presentation per plan, matched by position to copy.plans[].
const META: { icon: LucideIcon; iconBg: string; iconColor: string; dark: boolean; popular?: boolean }[] = [
  { icon: Store, iconBg: "bg-bomb-100", iconColor: "text-ink", dark: false },
  { icon: Rocket, iconBg: "bg-blast", iconColor: "text-white", dark: false, popular: true },
  { icon: Package, iconBg: "bg-bomb-200", iconColor: "text-ink", dark: false },
  { icon: Building2, iconBg: "bg-blast", iconColor: "text-white", dark: true },
];

export default function Pricing({ copy }: { copy: Messages["pricing"] }) {
  return (
    <section className="relative bg-blast pt-24 pb-20">
      <TornEdge className="-top-8" fill="#EE5C0B" />
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-1 inline-block">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">{copy.heading}</h2>
        <p className="mt-3 text-ink max-w-2xl font-medium">{copy.intro}</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.plans.map((plan, i) => {
            const meta = META[i];
            const Icon = meta.icon;
            const showPerMonth = plan.price.startsWith("$");
            return (
              <Reveal
                key={plan.name}
                delay={i * 0.08}
                className={`relative border-[3px] border-ink rounded-2xl p-6 ${
                  meta.dark ? "bg-ink comic-shadow-invert" : "bg-white comic-shadow"
                }`}
              >
                {meta.popular && (
                  <span className="absolute -top-4 right-4 font-comic text-lg bg-ink text-white px-3 py-0.5 rounded-full rotate-3">
                    {copy.mostPopular}
                  </span>
                )}
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl border-2 ${
                    meta.dark ? "border-white" : "border-ink"
                  } ${meta.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${meta.iconColor}`} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className={`mt-3 font-display text-3xl ${meta.dark ? "text-white" : ""}`}>{plan.name}</h3>
                <p className={`font-mono text-[11px] ${meta.dark ? "text-bomb-400" : "text-bomb-500"}`}>{plan.cap}</p>
                <p className={`mt-3 text-3xl font-bold ${meta.dark ? "text-white" : ""}`}>
                  {plan.price}
                  {showPerMonth && <span className="text-base font-medium text-bomb-500">{copy.perMonth}</span>}
                </p>
                <p className={`mt-2 text-sm ${meta.dark ? "text-bomb-300" : "text-bomb-600"}`}>{plan.blurb}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
