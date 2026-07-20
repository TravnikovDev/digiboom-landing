const LINE = "ETSY ✦ SHOPIFY ✦ GUMROAD ✦ ONE BOMB — THREE MARKETPLACES ✦ EDIT ONCE — PUBLISH EVERYWHERE ✦ ";

export default function Marquee() {
  return (
    <div className="bg-ink py-4 overflow-hidden border-y-4 border-ink">
      <div className="marquee-track flex whitespace-nowrap gap-10 w-max">
        <span className="font-display text-2xl tracking-widest text-white/90">{LINE}</span>
        <span className="font-display text-2xl tracking-widest text-white/90" aria-hidden="true">
          {LINE}
        </span>
      </div>
    </div>
  );
}
