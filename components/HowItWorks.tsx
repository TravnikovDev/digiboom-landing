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
  { n: "1", title: "Connect your shop", text: "Authorize the store you already have — Etsy, Shopify or Gumroad — through the official API." },
  { n: "2", title: "Import your catalog", text: "DigiBoom reads your listings, digital files and metadata, and maps what can move where." },
  { n: "3", title: "Open new storefronts", text: "Guided setup on the platforms you're missing: account, branding, categories and policies, mostly filled in for you." },
  { n: "4", title: "Publish everywhere", text: "Your catalog lands on each new store with files, descriptions, tags and licenses intact." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 halftone">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">How it works</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl">From one shop to a storefront network</h2>
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
            <h3 className="mt-3 font-comic text-2xl tracking-wide text-ember">Multiply your reach</h3>
            <p className="mt-1 text-sm text-bomb-600 leading-relaxed">
              Same catalog, several times the shelf space — in front of every marketplace&apos;s audience instead of just one.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
