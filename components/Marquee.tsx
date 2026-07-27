import type { Messages } from "@/i18n/dictionaries";

function Line({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <span className="flex items-center gap-8 shrink-0 pr-8" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-8">
          <span className="font-mono text-sm uppercase tracking-widest text-white/80">{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-blast" />
        </span>
      ))}
    </span>
  );
}

export default function Marquee({ copy }: { copy: Messages["marquee"] }) {
  return (
    <div className="marquee relative z-10 bg-ink py-5 overflow-hidden">
      <div className="marquee-track flex w-max">
        <Line items={copy.items} />
        <Line items={copy.items} hidden />
      </div>
    </div>
  );
}
