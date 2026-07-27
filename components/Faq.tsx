import type { Messages } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

export default function Faq({ copy }: { copy: Messages["faq"] }) {
  return (
    <section className="relative bg-ember pt-24 pb-20">
      <TornEdge className="-top-8" fill="#D14805" flip />
      <div className="mx-auto max-w-3xl px-5">
        <p className="font-comic text-2xl tracking-wide text-white/85 -rotate-1 inline-block">{copy.eyebrow}</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">{copy.heading}</h2>
        <div className="mt-8 space-y-4">
          {copy.items.map((item) => (
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
