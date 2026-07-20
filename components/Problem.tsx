import Reveal from "./Reveal";

const CARDS = [
  {
    n: 1,
    title: "Locked in one platform",
    text: "Your files, listings and reviews are trapped in a single marketplace. Moving out by hand? Weeks of copy-paste.",
    tilt: "-rotate-1",
  },
  {
    n: 2,
    title: "Algorithm roulette",
    text: "One ranking change, one policy update, one ban — and your traffic flatlines overnight. You never held the detonator.",
    tilt: "rotate-1",
  },
  {
    n: 3,
    title: "Manual re-listing hell",
    text: "Every price change, every new file version, repeated on every platform. Your time burns like a fuse.",
    tilt: "-rotate-1",
  },
];

export default function Problem() {
  return (
    <section className="bg-ember py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-white/80 text-xl -rotate-1">Meanwhile, in a lonely shop...</p>
        <h2 className="mt-1 font-display text-white text-5xl sm:text-6xl">Selling on one platform is a time bomb</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delay={i * 0.1} className={`bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow ${card.tilt}`}>
              <span className="font-comic text-4xl text-ember">{card.n}</span>
              <h3 className="mt-2 font-bold text-lg">{card.title}</h3>
              <p className="mt-2 text-bomb-600 leading-relaxed">{card.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
