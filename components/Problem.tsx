import Reveal from "./Reveal";

const CARDS = [
  {
    label: "platform_lock_in",
    title: "Locked into one storefront",
    text: "Your files, listings and reviews live inside a single marketplace. Expanding to another means rebuilding the whole catalog by hand.",
    tilt: "-rotate-1",
  },
  {
    label: "single_point_of_failure",
    title: "One algorithm decides your income",
    text: "A ranking change, a policy update or a suspension can cut your traffic overnight — with nowhere else for buyers to find you.",
    tilt: "rotate-1",
  },
  {
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
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">Selling in one place is a single point of failure</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.label}
              delay={i * 0.1}
              className={`bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow ${card.tilt}`}
            >
              <span className="font-comic text-4xl text-ember">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-mono text-[11px] text-bomb-500">{card.label}</p>
              <h3 className="mt-1 font-bold text-lg">{card.title}</h3>
              <p className="mt-2 text-bomb-600 leading-relaxed">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
