import type { Messages } from "@/i18n/dictionaries";
import { rich } from "./rich";
import Reveal from "./Reveal";

const SHOP_URL = "https://neurofashion.etsy.com/";

/**
 * The founder note. It sits between the FAQ and the final signup: objections answered,
 * then who is behind this, then the ask.
 *
 * The numbers are deliberately rounded ("more than 500", "more than 10,000") rather than
 * exact. Exact figures rot the moment the shop makes another sale, and rounding down stays
 * true as it grows. Each locale writes its own thousands separator, which is why the stat
 * values are translatable strings rather than formatted here.
 *
 * The last stat is the point of the whole section, so it is the one in blast orange: three
 * numbers that sound like success, then a 1 that is the reason this product exists.
 */
export default function Founder({ copy }: { copy: Messages["founder"] }) {
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="bg-bomb-100 border-[3px] border-ink rounded-3xl p-8 sm:p-12 comic-shadow -rotate-1">
          <div className="rotate-1">
            <p className="font-comic text-2xl tracking-wide text-blast inline-block -rotate-1">{copy.eyebrow}</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">{copy.heading}</h2>

            <p className="mt-6 text-bomb-700 text-lg leading-relaxed">
              {rich(copy.paragraph, {
                accent: (c, k) => (
                  <span key={k} className="font-bold text-ink">
                    {c}
                  </span>
                ),
              })}
            </p>

            <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {copy.stats.map((stat, i) => {
                const isPoint = i === copy.stats.length - 1;
                return (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border-[3px] border-ink px-4 py-4 text-center ${
                      isPoint ? "bg-blast comic-shadow-sm" : "bg-white"
                    }`}
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span
                        className={`block font-display text-3xl sm:text-4xl leading-none ${
                          isPoint ? "text-white" : "text-ink"
                        }`}
                      >
                        {stat.value}
                      </span>
                      <span
                        className={`mt-1.5 block font-mono text-[11px] leading-tight ${
                          isPoint ? "text-white/90" : "text-bomb-500"
                        }`}
                      >
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-5 py-2.5 font-bold text-sm comic-shadow-sm transition-transform hover:-translate-y-0.5"
              >
                {copy.shopLabel}
                <span aria-hidden="true">→</span>
              </a>
              <p className="font-mono text-xs text-bomb-500">{copy.signature}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
