import Reveal from "./Reveal";

const orangeBall = {
  background: "radial-gradient(circle at 32% 28%, #FF9A5C 0%, #FF6B1A 55%, #C24204 100%)",
  boxShadow: "inset -3px -5px 8px rgba(27,23,18,.35), 0 6px 10px rgba(27,23,18,.25)",
};

const inkBall = {
  background: "radial-gradient(circle at 32% 28%, #565E68 0%, #2B2622 60%, #1B1712 100%)",
  boxShadow: "inset -3px -5px 8px rgba(0,0,0,.5), 0 6px 10px rgba(27,23,18,.25)",
};

const STEPS = [
  { n: "1", title: "Connect", text: "Authorize your Etsy, Shopify or Gumroad store through the official API. Revoke anytime." },
  { n: "2", title: "Import", text: "DigiBoom reads your catalog — listings, digital files, metadata — and maps what can move." },
  { n: "3", title: "Publish", text: "Push products to any connected marketplace with files, descriptions, tags and licenses intact." },
  { n: "4", title: "Sync", text: "Edit in one place. Price, files and copy update everywhere automatically." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 halftone">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">How it works</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl">From one store to everywhere in five steps</h2>
        <div className="mt-12 grid md:grid-cols-5 gap-4 relative">
          <div className="hidden md:block absolute top-7 left-[10%] right-[10%] border-t-4 border-dashed border-ink/50" />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} className="relative">
              <div
                className="h-14 w-14 rounded-full border-[3px] border-ink grid place-items-center font-comic text-2xl text-white relative z-10"
                style={orangeBall}
              >
                {step.n}
              </div>
              <h3 className="mt-3 font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-bomb-600 leading-relaxed">{step.text}</p>
            </Reveal>
          ))}
          <Reveal delay={0.32} className="relative">
            <div className="h-14 w-14 rounded-full border-[3px] border-ink grid place-items-center relative z-10" style={inkBall}>
              <span className="font-comic text-white text-2xl">5</span>
            </div>
            <h3 className="mt-3 font-comic text-2xl tracking-wide text-ember">Live everywhere</h3>
            <p className="mt-1 text-sm text-bomb-600 leading-relaxed">
              Your catalog is selling on every connected marketplace — reaching buyers who were never going to find your one
              store.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
