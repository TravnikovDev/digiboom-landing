import { EyeOff, Hourglass, RotateCw } from "lucide-react";
import type { Messages } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

const META = [
  { icon: Hourglass, label: "expansion_is_expensive", tilt: "-rotate-1" },
  { icon: EyeOff, label: "capped_visibility", tilt: "rotate-1" },
  { icon: RotateCw, label: "manual_busywork", tilt: "-rotate-1" },
];

export default function Problem({ copy }: { copy: Messages["problem"] }) {
  return (
    <section className="relative bg-ember pt-24 pb-20">
      <TornEdge className="-top-8" fill="#D14805" flip />
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-white/85 -rotate-1 inline-block">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">{copy.heading}</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {copy.cards.map((card, i) => {
            const Icon = META[i].icon;
            return (
              <Reveal
                key={META[i].label}
                delay={i * 0.1}
                className={`bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow ${META[i].tilt}`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-xl border-2 border-ink bg-bomb-100 grid place-items-center shrink-0">
                    <Icon className="h-5 w-5 text-ember" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="font-comic text-4xl text-ember leading-none">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 font-mono text-[11px] text-bomb-500">{META[i].label}</p>
                <h3 className="mt-1 font-bold text-lg">{card.title}</h3>
                <p className="mt-2 text-bomb-600 leading-relaxed">{card.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
