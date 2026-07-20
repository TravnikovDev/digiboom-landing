import Reveal from "./Reveal";

const sphere = (light: string, mid: string, dark: string, extra = "") => ({
  background: `radial-gradient(circle at 32% 28%, ${light} 0%, ${mid} 55%, ${dark} 100%)`,
  boxShadow: `inset -3px -5px 7px rgba(27,23,18,.45)${extra}`,
});

export default function Pricing() {
  return (
    <section className="bg-blast py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-white/85 text-xl -rotate-1">Pick your blast size</p>
        <h2 className="mt-1 font-display text-white text-5xl sm:text-6xl">Planned pricing — no tokens, no tricks</h2>
        <p className="mt-3 text-white/90 max-w-2xl font-medium">
          Flat subscriptions. Waitlist members lock in launch pricing before anyone else.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Reveal className="bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <div className="h-8 w-8 rounded-full border-2 border-ink" style={sphere("#AEB5BF", "#697079", "#31363E")} />
            <h3 className="mt-3 font-display text-3xl">Starter</h3>
            <p className="text-bomb-600 text-sm">Firecracker</p>
            <p className="mt-3 text-3xl font-bold">
              $10<span className="text-base font-medium text-bomb-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-bomb-600">Up to 50 products. For small creators lighting their first fuse.</p>
          </Reveal>
          <Reveal delay={0.08} className="relative bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow -translate-y-2">
            <span className="absolute -top-4 right-4 font-comic text-lg bg-ink text-white px-3 py-0.5 rounded-full rotate-3">
              Most boom
            </span>
            <div className="h-10 w-10 rounded-full border-2 border-ink" style={sphere("#9AA1AB", "#4E555F", "#23272D")} />
            <h3 className="mt-3 font-display text-3xl">Pro</h3>
            <p className="text-bomb-600 text-sm">Classic bomb</p>
            <p className="mt-3 text-3xl font-bold">
              $30<span className="text-base font-medium text-bomb-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-bomb-600">Up to 200 products. For active stores ready for a bigger radius.</p>
          </Reveal>
          <Reveal delay={0.16} className="bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <div className="h-12 w-12 rounded-full border-2 border-ink" style={sphere("#7B838E", "#343A42", "#16181C")} />
            <h3 className="mt-3 font-display text-3xl">Business</h3>
            <p className="text-bomb-600 text-sm">Mega bomb</p>
            <p className="mt-3 text-3xl font-bold">
              $50<span className="text-base font-medium text-bomb-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-bomb-600">Up to 500 products. For studios detonating at scale.</p>
          </Reveal>
          <Reveal delay={0.24} className="bg-ink border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <div
              className="h-12 w-12 rounded-full border-2 border-white"
              style={sphere("#FF9A5C", "#FF6B1A", "#C24204", ", 0 0 18px rgba(255,107,26,.5)")}
            />
            <h3 className="mt-3 font-display text-3xl text-white">Enterprise</h3>
            <p className="text-bomb-400 text-sm">Custom payload</p>
            <p className="mt-3 text-3xl font-bold text-white">Custom</p>
            <p className="mt-2 text-sm text-bomb-300">Unlimited products, API access, tailored integrations.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
