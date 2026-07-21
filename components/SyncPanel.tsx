import { ArrowRight, Check, Loader } from "lucide-react";

type State = "connected" | "created" | "creating";

const PLATFORMS: { name: string; handle: string; logo: string; state: State }[] = [
  { name: "Etsy", handle: "etsy.com/shop/yourstore", logo: "/logos/etsy.svg", state: "connected" },
  { name: "Shopify", handle: "yourstore.myshopify.com", logo: "/logos/shopify.svg", state: "created" },
  { name: "Gumroad", handle: "gumroad.com/yourstore", logo: "/logos/gumroad.svg", state: "creating" },
];

function StateChip({ state }: { state: State }) {
  if (state === "connected")
    return (
      <span className="font-mono text-[11px] uppercase tracking-wider text-bomb-500 border border-bomb-300 rounded px-2 py-0.5">
        your shop
      </span>
    );
  if (state === "created")
    return (
      <span className="font-mono text-[11px] uppercase tracking-wider text-white bg-ink rounded px-2 py-0.5 inline-flex items-center gap-1.5">
        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
        store live
      </span>
    );
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider text-white bg-blast rounded px-2 py-0.5 inline-flex items-center gap-1.5">
      <Loader className="h-3 w-3 sync-dot" strokeWidth={3} aria-hidden="true" />
      setting up
    </span>
  );
}

export default function SyncPanel() {
  return (
    <div className="rounded-2xl border-[3px] border-ink bg-white comic-shadow overflow-hidden text-left">
      {/* window chrome */}
      <div className="flex items-center gap-2 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-bomb-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-bomb-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-bomb-700" />
        <span className="ml-2 font-mono text-[11px] text-bomb-400">digiboom — store expansion</span>
      </div>

      {/* the catalog being expanded */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-bomb-200">
        <div
          className="h-11 w-11 rounded-lg border-2 border-ink shrink-0"
          style={{ background: "radial-gradient(circle at 30% 26%, #FF9A5C 0%, #EE5C0B 60%, #C24204 100%)" }}
        />
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">Your Etsy catalog — 48 products</p>
          <p className="font-mono text-[11px] text-bomb-500 truncate">files · descriptions · tags · prices</p>
        </div>
      </div>

      {/* storefronts */}
      <div className="divide-y divide-bomb-200">
        {PLATFORMS.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt=""
                aria-hidden="true"
                className="h-7 w-7 rounded-md border border-bomb-300 bg-white object-contain p-1 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-sm leading-tight">{p.name}</p>
                <p className="font-mono text-[11px] text-bomb-500 truncate">{p.handle}</p>
              </div>
            </div>
            <StateChip state={p.state} />
          </div>
        ))}
      </div>

      {/* status bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-bomb-100 border-t border-bomb-200">
        <span className="font-mono text-[11px] text-bomb-600 inline-flex items-center gap-1.5">
          1 shop <ArrowRight className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" /> 3 storefronts
        </span>
        <span className="font-mono text-[11px] text-ink font-semibold">3× the places buyers can find you</span>
      </div>
    </div>
  );
}
