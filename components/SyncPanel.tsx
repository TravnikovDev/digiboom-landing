const PLATFORMS = [
  { name: "Etsy", handle: "etsy.com/shop/yourstore", state: "source" as const },
  { name: "Shopify", handle: "yourstore.myshopify.com", state: "synced" as const },
  { name: "Gumroad", handle: "gumroad.com/yourstore", state: "syncing" as const },
];

function StateChip({ state }: { state: "source" | "synced" | "syncing" }) {
  if (state === "source")
    return (
      <span className="font-mono text-[11px] uppercase tracking-wider text-bomb-500 border border-bomb-300 rounded px-2 py-0.5">
        source
      </span>
    );
  if (state === "synced")
    return (
      <span className="font-mono text-[11px] uppercase tracking-wider text-white bg-ink rounded px-2 py-0.5">synced</span>
    );
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider text-white bg-blast rounded px-2 py-0.5 inline-flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-white sync-dot" />
      syncing
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
        <span className="ml-2 font-mono text-[11px] text-bomb-400">digiboom — product sync</span>
      </div>

      {/* the product being synced */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-bomb-200">
        <div
          className="h-11 w-11 rounded-lg border-2 border-ink shrink-0"
          style={{ background: "radial-gradient(circle at 30% 26%, #FF9A5C 0%, #FF6B1A 60%, #C24204 100%)" }}
        />
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">Procreate Brush Pack — 48 brushes</p>
          <p className="font-mono text-[11px] text-bomb-500 truncate">brushes-v3.zip · 84 MB · $18.00</p>
        </div>
      </div>

      {/* destinations */}
      <div className="divide-y divide-bomb-200">
        {PLATFORMS.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="h-7 w-7 rounded-md bg-bomb-200 border border-bomb-300 grid place-items-center font-bold text-xs shrink-0">
                {p.name[0]}
              </span>
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
        <span className="font-mono text-[11px] text-bomb-600">files · metadata · tags · licenses</span>
        <span className="font-mono text-[11px] text-ink font-semibold">2 of 3 live · 1.4s</span>
      </div>
    </div>
  );
}
