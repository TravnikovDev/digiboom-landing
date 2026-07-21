import { EyeOff, Hourglass, RotateCw } from "lucide-react";
import Reveal from "./Reveal";

const CARDS = [
  {
    icon: Hourglass,
    label: "expansion_is_expensive",
    title: "A second store costs weeks",
    text: "New account, new branding, new categories, then re-uploading every file and description by hand. Most sellers start and give up.",
    tilt: "-rotate-1",
  },
  {
    icon: EyeOff,
    label: "capped_visibility",
    title: "One marketplace, one audience",
    text: "Your products are only ever seen by people already browsing that platform. Every other marketplace's buyers never know you exist.",
    tilt: "rotate-1",
  },
  {
    icon: RotateCw,
    label: "manual_busywork",
    title: "Every update, repeated by hand",
    text: "New file version, new price, new tags — multiplied by every platform you sell on. Hours a week that produce nothing new.",
    tilt: "-rotate-1",
  },
];

export default function Problem() {
  return (
    <section className="bg-ember py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-white/85 -rotate-1 inline-block">The problem</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">
          One shop means one audience — and one bad day away from zero
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.label}
              delay={i * 0.1}
              className={`bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow ${card.tilt}`}
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl border-2 border-ink bg-bomb-100 grid place-items-center shrink-0">
                  <card.icon className="h-5 w-5 text-ember" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="font-comic text-4xl text-ember leading-none">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-3 font-mono text-[11px] text-bomb-500">{card.label}</p>
              <h3 className="mt-1 font-bold text-lg">{card.title}</h3>
              <p className="mt-2 text-bomb-600 leading-relaxed">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
