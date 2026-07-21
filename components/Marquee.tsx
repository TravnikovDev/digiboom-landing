const ITEMS = [
  "Etsy",
  "Shopify",
  "Gumroad",
  "digital downloads",
  "print files",
  "templates",
  "presets",
  "fonts",
  "3D assets",
  "courses",
];

function Line({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="flex items-center gap-8 shrink-0 pr-8" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-8">
          <span className="font-mono text-sm uppercase tracking-widest text-white/80">{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-blast" />
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="bg-ink py-4 overflow-hidden border-y-4 border-ink">
      <div className="marquee-track flex w-max">
        <Line />
        <Line hidden />
      </div>
    </div>
  );
}
