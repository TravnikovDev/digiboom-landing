import Reveal from "./Reveal";

type Status = "armed" | "burning" | "awaiting";

const MILESTONES: { title: string; text: string; status: Status }[] = [
  {
    title: "Concept & white paper",
    text: "Idea validated and documented in the DigiBoom white paper.",
    status: "armed",
  },
  {
    title: "Landing & waitlist",
    text: "You're looking at it. Sign up and you're officially in the blast radius.",
    status: "burning",
  },
  {
    title: "Seller community",
    text: "Telegram & Discord groups for early sellers who shape the MVP.",
    status: "awaiting",
  },
  {
    title: "MVP — Etsy ↔ Shopify sync",
    text: "The first real detonation: two-way sync of digital products between platforms.",
    status: "awaiting",
  },
  {
    title: "Closed beta",
    text: "Waitlist members get in first. Another reason to light the fuse today.",
    status: "awaiting",
  },
];

function Dot({ status }: { status: Status }) {
  if (status === "armed")
    return <span className="absolute -left-[14px] top-0 h-6 w-6 rounded-full bg-bomb-400 border-[3px] border-ink ring-2 ring-bomb-400" />;
  if (status === "burning")
    return <span className="absolute -left-[14px] top-0 h-6 w-6 rounded-full bg-blast border-[3px] border-white fuse-burning" />;
  return <span className="absolute -left-[14px] top-0 h-6 w-6 rounded-full bg-bomb-700 border-[3px] border-bomb-600" />;
}

function Badge({ status }: { status: Status }) {
  if (status === "armed")
    return <span className="text-xs font-bold uppercase tracking-wider bg-bomb-400 text-ink rounded-full px-3 py-1">Armed ✓</span>;
  if (status === "burning")
    return <span className="text-xs font-bold uppercase tracking-wider bg-blast text-white rounded-full px-3 py-1">Fuse burning</span>;
  return <span className="text-xs font-bold uppercase tracking-wider bg-bomb-700 text-bomb-300 rounded-full px-3 py-1">Awaiting boom</span>;
}

export default function Countdown() {
  return (
    <section id="status" className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-blast text-xl -rotate-1">Detonation countdown</p>
        <h2 className="mt-1 font-display text-white text-5xl sm:text-6xl">The fuse is already burning</h2>
        <p className="mt-3 text-bomb-300 max-w-2xl leading-relaxed">
          DigiBoom is being built in the open. Here&apos;s exactly where the spark is right now — watch it crawl toward the big
          boom.
        </p>

        <ol className="mt-12 relative border-l-4 border-dashed border-bomb-600 ml-3 space-y-10">
          {MILESTONES.map((m) => (
            <li key={m.title} className="pl-8 relative">
              <Dot status={m.status} />
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className={`font-bold text-lg ${m.status === "awaiting" ? "text-bomb-300" : "text-white"}`}>{m.title}</h3>
                  <Badge status={m.status} />
                </div>
                <p className={`mt-1 text-sm leading-relaxed ${m.status === "awaiting" ? "text-bomb-400" : "text-bomb-300"}`}>
                  {m.text}
                </p>
              </Reveal>
            </li>
          ))}
          <li className="pl-8 relative">
            <span className="absolute -left-[16px] top-0">
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                <path
                  d="M17 1 L20 10 L29 5 L25 14 L33 17 L25 20 L29 29 L20 24 L17 33 L14 24 L5 29 L9 20 L1 17 L9 14 L5 5 L14 10 Z"
                  fill="#FF6B1A"
                  stroke="#fff"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <Reveal>
              <h3 className="font-comic text-blast text-2xl tracking-wide">Public launch — BOOM!</h3>
              <p className="mt-1 text-bomb-400 text-sm leading-relaxed">Open subscriptions, then Gumroad and analytics join the blast.</p>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
