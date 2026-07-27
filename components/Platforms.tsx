import type { Messages } from "@/i18n/dictionaries";
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

// Platform rosters are fixed brand data; their group's title/blurb come from the dictionary,
// matched by position to copy.groups[].
const GROUP_ITEMS: Platform[][] = [
  [
    { name: "Etsy", color: "#F56400", logo: "/logos/etsy.svg", stage: "launch" },
    { name: "Creative Market", color: "#0FA0A0", stage: "planned" },
    { name: "Creative Fabrica", color: "#2E7CF6", stage: "planned" },
    { name: "Design Bundles", color: "#E4405F", stage: "planned" },
    { name: "Envato", color: "#82B440", logo: "/logos/envato.svg", stage: "planned" },
    { name: "itch.io", color: "#FA5C5C", logo: "/logos/itchdotio.svg", stage: "exploring" },
    { name: "ArtStation", color: "#13AFF0", logo: "/logos/artstation.svg", stage: "exploring" },
    { name: "CGTrader", color: "#E4573D", stage: "exploring" },
  ],
  [
    { name: "Shopify", color: "#5A863E", logo: "/logos/shopify.svg", stage: "launch" },
    { name: "WooCommerce", color: "#7F54B3", logo: "/logos/woocommerce.svg", stage: "planned" },
    { name: "Payhip", color: "#2C7BE5", logo: "/logos/payhip.svg", stage: "planned" },
    { name: "Sellfy", color: "#22A6A0", logo: "/logos/sellfy.svg", stage: "planned" },
    { name: "Big Cartel", color: "#E0573E", logo: "/logos/bigcartel.svg", stage: "exploring" },
    { name: "Squarespace", color: "#1B1712", logo: "/logos/squarespace.svg", stage: "exploring" },
  ],
  [
    { name: "Gumroad", color: "#D64FA8", logo: "/logos/gumroad.svg", stage: "launch" },
    { name: "Lemon Squeezy", color: "#4B3A8F", logo: "/logos/lemonsqueezy.svg", stage: "planned" },
    { name: "Ko-fi", color: "#FF5E5B", logo: "/logos/kofi.svg", stage: "planned" },
    { name: "Patreon", color: "#E2574C", logo: "/logos/patreon.svg", stage: "exploring" },
    { name: "Podia", color: "#2B6CB0", stage: "exploring" },
    { name: "Whop", color: "#C2410C", stage: "exploring" },
  ],
  [
    { name: "Teachable", color: "#0E7C86", stage: "exploring" },
    { name: "Thinkific", color: "#2A5DB0", stage: "exploring" },
    { name: "BeatStars", color: "#B3202C", logo: "/logos/beatstars.svg", stage: "exploring" },
    { name: "Bandcamp", color: "#1DA0C3", logo: "/logos/bandcamp.svg", stage: "exploring" },
  ],
];

function StageChip({ stage, copy }: { stage: Stage; copy: Messages["platforms"] }) {
  const styles: Record<Stage, string> = {
    launch: "bg-ink text-white border-ink",
    planned: "bg-white text-bomb-600 border-bomb-300",
    exploring: "bg-transparent text-bomb-500 border-dashed border-bomb-300",
  };
  const labels: Record<Stage, string> = {
    launch: copy.stageLaunch,
    planned: copy.stagePlanned,
    exploring: copy.stageExploring,
  };
  return (
    <span className={`font-mono text-[10px] uppercase tracking-wider rounded border px-1.5 py-0.5 ${styles[stage]}`}>
      {labels[stage]}
    </span>
  );
}

function PlatformTile({ platform, copy }: { platform: Platform; copy: Messages["platforms"] }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-3 py-2.5 comic-shadow-sm">
      {platform.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={platform.logo}
          alt=""
          aria-hidden="true"
          className="h-8 w-8 rounded-lg border-2 border-bomb-200 bg-white object-contain p-1.5 shrink-0"
        />
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
        <StageChip stage={platform.stage} copy={copy} />
      </div>
    </div>
  );
}

export default function Platforms({ copy }: { copy: Messages["platforms"] }) {
  return (
    <section id="platforms" className="bg-bomb-100 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-16 lg:items-end">
          <div>
            <p className="font-comic text-2xl tracking-wide text-ember -rotate-1 inline-block">{copy.eyebrow}</p>
            <h2 className="mt-2 font-display text-ink text-5xl sm:text-6xl lg:text-7xl leading-[0.92]">{copy.heading}</h2>
          </div>
          <p className="text-bomb-600 leading-relaxed lg:pb-3 lg:border-l-4 lg:border-ink lg:pl-6">{copy.intro}</p>
        </div>

        <div className="mt-12 space-y-10">
          {copy.groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.06}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-3xl text-ink">{group.title}</h3>
                <p className="text-sm text-bomb-500">{group.blurb}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {GROUP_ITEMS[gi].map((platform) => (
                  <PlatformTile key={platform.name} platform={platform} copy={copy} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs text-bomb-500">{copy.footnote}</p>
      </div>
    </section>
  );
}
