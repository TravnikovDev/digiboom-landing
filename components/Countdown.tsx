import { Check, Loader } from "lucide-react";
import type { Messages } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

type Status = "done" | "active" | "planned";

// Milestone status is fixed program state; titles/text/when come from the dictionary, by position.
const STATUSES: Status[] = ["done", "active", "planned", "planned", "planned", "planned"];
const DONE = STATUSES.filter((s) => s !== "planned").length;

function Node({ status }: { status: Status }) {
  if (status === "done")
    return (
      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border-[3px] border-bomb-400 bg-bomb-400 text-ink">
        <Check className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  if (status === "active")
    return (
      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border-[3px] border-white bg-blast text-white">
        <Loader className="h-5 w-5 sync-dot" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  return <span className="relative z-10 block h-11 w-11 rounded-xl border-[3px] border-dashed border-bomb-600 bg-ink" />;
}

export default function Countdown({ copy }: { copy: Messages["countdown"] }) {
  const total = copy.milestones.length;
  const statusLabel = (s: Status) =>
    s === "done" ? copy.statusDone : s === "active" ? copy.statusActive : copy.statusPlanned;

  return (
    <section id="status" className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-16 lg:items-end">
          <div>
            <p className="font-comic text-2xl tracking-wide text-blast -rotate-1 inline-block">{copy.eyebrow}</p>
            <h2 className="mt-2 font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">{copy.heading}</h2>
          </div>
          <div className="lg:pb-3">
            <p className="text-bomb-300 leading-relaxed">{copy.intro}</p>
            {/* fuse-progress bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-2.5 flex-1 rounded-full bg-bomb-700 overflow-hidden">
                <div className="h-full rounded-full bg-blast" style={{ width: `${(DONE / total) * 100}%` }} />
              </div>
              <span className="font-mono text-[11px] text-bomb-400 whitespace-nowrap">
                {DONE} / {total} {copy.shipped}
              </span>
            </div>
          </div>
        </div>

        <ol className="mt-14">
          {copy.milestones.map((m, i) => {
            const status = STATUSES[i];
            const planned = status === "planned";
            const last = i === total - 1;
            const railStyle = !planned
              ? { background: "#EE5C0B" }
              : { backgroundImage: "repeating-linear-gradient(to bottom, #4E555F 0 6px, transparent 6px 12px)" };
            return (
              <li key={m.title} className="relative flex gap-4 pb-4 last:pb-0">
                {/* continuous rail: from this node's centre down to the next node */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[22px] top-[22px] -bottom-[10px] w-[3px] -translate-x-1/2 rounded"
                    style={railStyle}
                  />
                )}
                {/* short tick linking the node to its card */}
                <span
                  aria-hidden="true"
                  className="absolute left-11 top-[22px] h-[3px] w-4 -translate-y-1/2"
                  style={railStyle}
                />
                <Node status={status} />
                <Reveal
                  delay={i * 0.05}
                  className={`flex-1 rounded-2xl p-5 ${
                    status === "active"
                      ? "border-2 border-blast bg-blast/10"
                      : planned
                        ? "border border-white/10 bg-white/[0.02]"
                        : "border border-white/10 bg-white/[0.05]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className={`font-bold text-lg ${planned ? "text-bomb-300" : "text-white"}`}>{m.title}</h3>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-wider rounded px-2 py-0.5 ${
                        status === "done"
                          ? "bg-bomb-400 text-ink"
                          : status === "active"
                            ? "bg-blast text-white"
                            : "bg-bomb-700 text-bomb-300"
                      }`}
                    >
                      {statusLabel(status)}
                    </span>
                    <span className="font-mono text-[11px] text-bomb-500">{m.when}</span>
                  </div>
                  <p className={`mt-1.5 text-sm leading-relaxed ${planned ? "text-bomb-400" : "text-bomb-300"}`}>{m.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
