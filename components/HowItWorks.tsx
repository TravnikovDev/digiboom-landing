import { Plug, ScanLine, Store, TrendingUp, Upload } from "lucide-react";
import type { Messages } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

const META = [
  { n: "01", icon: Plug, span: "lg:col-span-2" },
  { n: "02", icon: ScanLine, span: "lg:col-span-2" },
  { n: "03", icon: Store, span: "lg:col-span-2" },
  { n: "04", icon: Upload, span: "lg:col-span-3" },
];

export default function HowItWorks({ copy }: { copy: Messages["how"] }) {
  return (
    <section className="bg-white py-20 halftone">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl">{copy.heading}</h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {copy.steps.map((step, i) => {
            const Icon = META[i].icon;
            return (
              <Reveal
                key={META[i].n}
                delay={i * 0.07}
                className={`${META[i].span} h-full bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="h-12 w-12 rounded-xl bg-ink grid place-items-center shrink-0">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="font-display text-5xl leading-none text-bomb-300">{META[i].n}</span>
                </div>
                <h3 className="mt-4 font-bold text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm text-bomb-600 leading-relaxed">{step.text}</p>
              </Reveal>
            );
          })}

          {/* the payoff — inverted so the destination reads differently from the steps */}
          <Reveal delay={0.28} className="lg:col-span-3 h-full bg-ink border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <div className="flex items-start justify-between gap-3">
              <span className="h-12 w-12 rounded-xl bg-blast grid place-items-center shrink-0">
                <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-display text-5xl leading-none text-bomb-600">05</span>
            </div>
            <h3 className="mt-4 font-comic text-3xl tracking-wide text-blast">{copy.payoffTitle}</h3>
            <p className="mt-1.5 text-sm text-bomb-300 leading-relaxed">{copy.payoffText}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
