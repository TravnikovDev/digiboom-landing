import { Building2, Package, Rocket, Store } from "lucide-react";
import Reveal from "./Reveal";
import TornEdge from "./TornEdge";

export default function Pricing() {
  return (
    <section className="relative bg-blast pt-24 pb-20">
      <TornEdge className="-top-8" fill="#EE5C0B" />
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-1 inline-block">Planned pricing</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">Flat monthly plans, no credits</h2>
        <p className="mt-3 text-ink max-w-2xl font-medium">
          Priced by catalog size, not per sync. Waitlist members lock in launch pricing before anyone else.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Reveal className="bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-bomb-100">
              <Store className="h-5 w-5 text-ink" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-3xl">Starter</h3>
            <p className="font-mono text-[11px] text-bomb-500">up to 50 products</p>
            <p className="mt-3 text-3xl font-bold">
              $10<span className="text-base font-medium text-bomb-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-bomb-600">For solo creators expanding to a second marketplace.</p>
          </Reveal>
          <Reveal delay={0.08} className="relative bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow -translate-y-2">
            <span className="absolute -top-4 right-4 font-comic text-lg bg-ink text-white px-3 py-0.5 rounded-full rotate-3">
              Most popular
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-blast">
              <Rocket className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-3xl">Pro</h3>
            <p className="font-mono text-[11px] text-bomb-500">up to 200 products</p>
            <p className="mt-3 text-3xl font-bold">
              $30<span className="text-base font-medium text-bomb-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-bomb-600">For active stores selling across three or more platforms.</p>
          </Reveal>
          <Reveal delay={0.16} className="bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-bomb-200">
              <Package className="h-5 w-5 text-ink" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-3xl">Business</h3>
            <p className="font-mono text-[11px] text-bomb-500">up to 500 products</p>
            <p className="mt-3 text-3xl font-bold">
              $50<span className="text-base font-medium text-bomb-500">/mo</span>
            </p>
            <p className="mt-2 text-sm text-bomb-600">For studios and teams managing a large catalog.</p>
          </Reveal>
          <Reveal delay={0.24} className="bg-ink border-[3px] border-ink rounded-2xl p-6 comic-shadow">
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white bg-blast">
              <Building2 className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-3xl text-white">Enterprise</h3>
            <p className="font-mono text-[11px] text-bomb-400">unlimited products</p>
            <p className="mt-3 text-3xl font-bold text-white">Custom</p>
            <p className="mt-2 text-sm text-bomb-300">Unlimited products, API access, tailored integrations.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
