import { Plug, ScanLine, Store, TrendingUp, Upload } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    icon: Plug,
    title: "Connect your shop",
    text: "Authorize the store you already have — Etsy, Shopify or Gumroad — through the official API. Revoke access whenever you want.",
    span: "lg:col-span-2",
  },
  {
    n: "02",
    icon: ScanLine,
    title: "Import your catalog",
    text: "DigiBoom reads your listings, digital files and metadata, then maps what can move to each platform's format.",
    span: "lg:col-span-2",
  },
  {
    n: "03",
    icon: Store,
    title: "Open new storefronts",
    text: "Guided setup on the platforms you're missing: account, branding, categories and policies, mostly filled in for you.",
    span: "lg:col-span-2",
  },
  {
    n: "04",
    icon: Upload,
    title: "Publish everywhere",
    text: "Your catalog lands on each new store with files, descriptions, tags and licenses intact — no re-uploading by hand.",
    span: "lg:col-span-3",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 halftone">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">How it works</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl">From one shop to a storefront network</h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 0.07}
              className={`${step.span} h-full bg-white border-[3px] border-ink rounded-2xl p-6 comic-shadow`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="h-12 w-12 rounded-xl bg-ink grid place-items-center shrink-0">
                  <step.icon className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="font-display text-5xl leading-none text-bomb-300">{step.n}</span>
              </div>
              <h3 className="mt-4 font-bold text-lg">{step.title}</h3>
              <p className="mt-1.5 text-sm text-bomb-600 leading-relaxed">{step.text}</p>
            </Reveal>
          ))}

          {/* the payoff — inverted so the destination reads differently from the steps */}
          <Reveal
            delay={0.28}
            className="lg:col-span-3 h-full bg-ink border-[3px] border-ink rounded-2xl p-6 comic-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="h-12 w-12 rounded-xl bg-blast grid place-items-center shrink-0">
                <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-display text-5xl leading-none text-bomb-600">05</span>
            </div>
            <h3 className="mt-4 font-comic text-3xl tracking-wide text-blast">Multiply your reach</h3>
            <p className="mt-1.5 text-sm text-bomb-300 leading-relaxed">
              Same catalog, several times the shelf space — in front of every marketplace&apos;s audience instead of just one.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
