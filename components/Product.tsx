import Reveal from "./Reveal";
import SyncPanel from "./SyncPanel";

const FEATURES = [
  {
    label: "one_source_of_truth",
    title: "Edit once, everywhere updates",
    text: "Change a price, swap a file, fix a typo in the description — DigiBoom pushes it to every connected store within seconds.",
  },
  {
    label: "full_payload",
    title: "Files, metadata and licenses",
    text: "Not just titles. Digital assets, variants, tags, categories and license terms travel with the product.",
  },
  {
    label: "official_apis",
    title: "OAuth, official APIs, no scraping",
    text: "Connections use each marketplace's public API with tokens you can revoke at any time. Your data stays yours.",
  },
];

export default function Product() {
  return (
    <section className="bg-bomb-200 py-20 tech-grid-ink">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SyncPanel />
          </Reveal>
          <div>
            <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">What you get</p>
            <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl leading-[0.95]">
              One dashboard for every store you sell on
            </h2>
            <div className="mt-8 space-y-6">
              {FEATURES.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.08}>
                  <p className="font-mono text-[11px] text-bomb-500">{f.label}</p>
                  <h3 className="mt-1 font-bold text-lg">{f.title}</h3>
                  <p className="mt-1 text-bomb-600 leading-relaxed">{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
