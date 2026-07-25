import Reveal from "./Reveal";

/** Illustrative order pings — the "customers from every direction" idea made concrete,
 *  without claiming any specific volume or revenue. */
const ORDERS = [
  { platform: "Etsy", logo: "/logos/etsy.svg", product: "Procreate Brush Pack", price: "$18", rot: "-rotate-2" },
  { platform: "Gumroad", logo: "/logos/gumroad.svg", product: "SVG Mega Bundle", price: "$24", rot: "rotate-1" },
  { platform: "Shopify", logo: "/logos/shopify.svg", product: "Lightroom Presets", price: "$32", rot: "-rotate-1" },
  { platform: "Creative Market", letter: "C", color: "#0FA0A0", product: "Notion Template Kit", price: "$15", rot: "rotate-2" },
  { platform: "Payhip", logo: "/logos/payhip.svg", product: "Display Font Family", price: "$29", rot: "-rotate-1" },
];

function OrderChip({ order, i }: { order: (typeof ORDERS)[number]; i: number }) {
  return (
    <Reveal delay={i * 0.12} className={`bg-white rounded-2xl border-[3px] border-ink p-3.5 comic-shadow-sm ${order.rot}`}>
      <div className="flex items-center gap-3">
        {order.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={order.logo}
            alt=""
            aria-hidden="true"
            className="h-9 w-9 rounded-lg border-2 border-bomb-200 bg-white object-contain p-1.5 shrink-0"
          />
        ) : (
          <span
            className="h-9 w-9 rounded-lg border-2 border-ink grid place-items-center font-display text-lg text-white shrink-0"
            style={{ background: order.color }}
            aria-hidden="true"
          >
            {order.letter}
          </span>
        )}
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight">
            New sale <span className="text-bomb-500 font-medium">· {order.platform}</span>
          </p>
          <p className="font-mono text-[11px] text-bomb-500 truncate">
            {order.product} · {order.price}
          </p>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-blast sync-dot shrink-0" aria-hidden="true" />
      </div>
    </Reveal>
  );
}

export default function Payoff() {
  return (
    <section className="relative bg-ink py-24 overflow-hidden">
      {/* explosion glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(238,92,11,.35) 0%, rgba(238,92,11,0) 55%)" }}
      />
      <div className="mx-auto max-w-6xl px-5 relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="font-comic text-2xl tracking-wide text-blast -rotate-1 inline-block">The payoff</p>
          <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">
            Then the orders come from everywhere
          </h2>
          <p className="mt-5 text-bomb-300 text-lg leading-relaxed max-w-md">
            Your catalog goes live across every marketplace you sell on — each one a new place a buyer can stumble onto you,
            each one working while you make the next thing. One upload, selling in every direction at once.{" "}
            <span className="text-white font-medium">That&apos;s the boom.</span>
          </p>
          <p className="mt-5 font-mono text-xs text-bomb-500 leading-relaxed max-w-md">
            Reach is the lever we hand you — three or four times the storefronts, none of the busywork. What you make of it is
            the fun part.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-bomb-400 mb-4">Orders, from every channel</p>
          <div className="space-y-3">
            {ORDERS.map((order, i) => (
              <OrderChip key={order.platform} order={order} i={i} />
            ))}
          </div>
        </div>
      </div>

      <span className="absolute bottom-8 right-6 sm:right-16 font-comic text-4xl text-white boom-text rotate-6 select-none pointer-events-none">
        BOOM!
      </span>
    </section>
  );
}
