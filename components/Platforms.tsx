import Reveal from "./Reveal";

type Stage = "launch" | "planned" | "exploring";

type Platform = {
  name: string;
  /** Brand tile color. Replaced by the real mark once a logo file is dropped in. */
  color: string;
  /** Optional path to an official logo in /public/logos — see public/logos/README.md */
  logo?: string;
  stage: Stage;
};

const GROUPS: { title: string; blurb: string; items: Platform[] }[] = [
  {
    title: "Marketplaces",
    blurb: "Existing audiences already searching for digital goods.",
    items: [
      { name: "Etsy", color: "#F56400", stage: "launch" },
      { name: "Creative Market", color: "#0FA0A0", stage: "planned" },
      { name: "Creative Fabrica", color: "#2E7CF6", stage: "planned" },
      { name: "Design Bundles", color: "#E4405F", stage: "planned" },
      { name: "Envato", color: "#82B440", stage: "planned" },
      { name: "itch.io", color: "#FA5C5C", stage: "exploring" },
      { name: "ArtStation", color: "#13AFF0", stage: "exploring" },
      { name: "CGTrader", color: "#E4573D", stage: "exploring" },
    ],
  },
  {
    title: "Your own storefront",
    blurb: "Stores you control, where you keep the customer relationship.",
    items: [
      { name: "Shopify", color: "#5A863E", stage: "launch" },
      { name: "WooCommerce", color: "#7F54B3", stage: "planned" },
      { name: "Payhip", color: "#2C7BE5", stage: "planned" },
      { name: "Sellfy", color: "#22A6A0", stage: "planned" },
      { name: "Big Cartel", color: "#E0573E", stage: "exploring" },
      { name: "Squarespace", color: "#1B1712", stage: "exploring" },
    ],
  },
  {
    title: "Creator platforms",
    blurb: "Where an audience buys directly from you.",
    items: [
      { name: "Gumroad", color: "#D64FA8", stage: "launch" },
      { name: "Lemon Squeezy", color: "#4B3A8F", stage: "planned" },
      { name: "Ko-fi", color: "#FF5E5B", stage: "planned" },
      { name: "Patreon", color: "#E2574C", stage: "exploring" },
      { name: "Podia", color: "#2B6CB0", stage: "exploring" },
      { name: "Whop", color: "#C2410C", stage: "exploring" },
    ],
  },
  {
    title: "Courses & media",
    blurb: "For sellers whose products are lessons, audio or video.",
    items: [
      { name: "Teachable", color: "#0E7C86", stage: "exploring" },
      { name: "Thinkific", color: "#2A5DB0", stage: "exploring" },
      { name: "BeatStars", color: "#B3202C", stage: "exploring" },
      { name: "Bandcamp", color: "#1DA0C3", stage: "exploring" },
    ],
  },
];

const STAGE_LABEL: Record<Stage, string> = {
  launch: "at launch",
  planned: "planned",
  exploring: "exploring",
};

function StageChip({ stage }: { stage: Stage }) {
  const styles: Record<Stage, string> = {
    launch: "bg-ink text-white border-ink",
    planned: "bg-white text-bomb-600 border-bomb-300",
    exploring: "bg-transparent text-bomb-500 border-dashed border-bomb-300",
  };
  return (
    <span className={`font-mono text-[10px] uppercase tracking-wider rounded border px-1.5 py-0.5 ${styles[stage]}`}>
      {STAGE_LABEL[stage]}
    </span>
  );
}

function PlatformTile({ platform }: { platform: Platform }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-3 py-2.5 comic-shadow-sm">
      {platform.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={platform.logo} alt="" aria-hidden="true" className="h-8 w-8 rounded-lg object-contain shrink-0" />
      ) : (
        <span
          className="h-8 w-8 rounded-lg border-2 border-ink grid place-items-center font-display text-lg text-white shrink-0"
          style={{ background: platform.color }}
          aria-hidden="true"
        >
          {platform.name[0]}
        </span>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-sm leading-tight truncate">{platform.name}</p>
        <StageChip stage={platform.stage} />
      </div>
    </div>
  );
}

export default function Platforms() {
  return (
    <section id="platforms" className="bg-bomb-100 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">Where your products can go</p>
        <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl leading-[0.95]">
          Every place digital goods sell
        </h2>
        <p className="mt-3 text-bomb-600 max-w-2xl leading-relaxed">
          Etsy, Shopify and Gumroad come first — then we keep adding, prioritized by what early members actually sell on. Ask
          for a platform and it moves up the list.
        </p>

        <div className="mt-12 space-y-10">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.06}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-3xl text-ink">{group.title}</h3>
                <p className="text-sm text-bomb-500">{group.blurb}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.items.map((platform) => (
                  <PlatformTile key={platform.name} platform={platform} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs text-bomb-500">
          Selling somewhere that isn&apos;t listed? Tell us on signup and we&apos;ll look at it next.
        </p>
      </div>
    </section>
  );
}
