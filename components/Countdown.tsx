import Reveal from "./Reveal";

type Status = "done" | "active" | "planned";

const MILESTONES: { title: string; text: string; status: Status; when: string }[] = [
  {
    title: "Concept & white paper",
    text: "Problem validated with sellers, architecture and business model documented.",
    status: "done",
    when: "Q4 2025",
  },
  {
    title: "Landing & waitlist",
    text: "You're looking at it. Sign up and you're first in line for the beta.",
    status: "active",
    when: "Now",
  },
  {
    title: "Seller community",
    text: "Telegram and Discord groups where early users shape what gets built first.",
    status: "planned",
    when: "Next",
  },
  {
    title: "MVP — Etsy ↔ Shopify sync",
    text: "Two-way sync of digital products between the first two marketplaces.",
    status: "planned",
    when: "Q1–Q2",
  },
  {
    title: "Closed beta",
    text: "Waitlist members get invited first, in signup order.",
    status: "planned",
    when: "Q3",
  },
  {
    title: "Public launch",
    text: "Open subscriptions, then Gumroad support and listing analytics.",
    status: "planned",
    when: "Q4",
  },
];

function Dot({ status }: { status: Status }) {
  if (status === "done")
    return <span className="absolute -left-[13px] top-1 h-5 w-5 rounded-full bg-bomb-400 border-[3px] border-ink" />;
  if (status === "active")
    return <span className="absolute -left-[13px] top-1 h-5 w-5 rounded-full bg-blast border-[3px] border-white sync-dot" />;
  return <span className="absolute -left-[13px] top-1 h-5 w-5 rounded-full bg-bomb-700 border-[3px] border-bomb-600" />;
}

function Badge({ status }: { status: Status }) {
  if (status === "done")
    return (
      <span className="font-mono text-[11px] uppercase tracking-wider bg-bomb-400 text-ink rounded px-2 py-0.5">shipped</span>
    );
  if (status === "active")
    return <span className="font-mono text-[11px] uppercase tracking-wider bg-blast text-white rounded px-2 py-0.5">in progress</span>;
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider bg-bomb-700 text-bomb-300 rounded px-2 py-0.5">planned</span>
  );
}

export default function Countdown() {
  return (
    <section id="status" className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-blast -rotate-1 inline-block">Build status</p>
        <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl">Being built in the open</h2>
        <p className="mt-3 text-bomb-300 max-w-2xl leading-relaxed">
          DigiBoom is early — here&apos;s exactly what&apos;s done, what&apos;s in progress, and what&apos;s next. This page
          updates as the work lands.
        </p>

        <ol className="mt-12 relative border-l-2 border-dashed border-bomb-600 ml-3 space-y-9">
          {MILESTONES.map((m) => (
            <li key={m.title} className="pl-8 relative">
              <Dot status={m.status} />
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className={`font-bold text-lg ${m.status === "planned" ? "text-bomb-300" : "text-white"}`}>{m.title}</h3>
                  <Badge status={m.status} />
                  <span className="font-mono text-[11px] text-bomb-500">{m.when}</span>
                </div>
                <p className={`mt-1 text-sm leading-relaxed ${m.status === "planned" ? "text-bomb-400" : "text-bomb-300"}`}>
                  {m.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
