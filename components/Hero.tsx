import type { Messages } from "@/i18n/dictionaries";
import { rich } from "./rich";
import BombCanvas from "./BombCanvas";
import SignupForm from "./SignupForm";

const PLATFORMS = ["Etsy", "Shopify", "Gumroad"];

export default function Hero({
  copy,
  signup,
  mascot,
}: {
  copy: Messages["hero"];
  signup: Messages["signup"];
  mascot: Messages["mascot"];
}) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20">
      {/* full-bleed decorative layers, so there's no seam where a centred box would end */}
      <div className="absolute inset-0 tech-grid mask-fade pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 72% 42%, rgba(255,255,255,.14) 0%, rgba(255,255,255,0) 48%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-1 inline-block">{copy.eyebrow}</p>
          <h1 className="mt-2 font-display text-white leading-[0.95] text-6xl sm:text-7xl lg:text-8xl">
            {rich(copy.headline, { accent: (c, k) => <span key={k} className="text-ink">{c}</span> })}
          </h1>
          <p className="mt-5 text-ink text-lg max-w-md font-medium leading-loose">{rich(copy.paragraph)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-ink border-2 border-ink rounded-md px-2.5 py-1.5 bg-white">
              {PLATFORMS[0]} <span className="text-bomb-600">· {copy.chipYours}</span>
            </span>
            <span className="font-comic text-xl text-ink" aria-hidden="true">
              →
            </span>
            {PLATFORMS.slice(1).map((name) => (
              <span
                key={name}
                className="font-mono text-xs text-ink bg-white border-2 border-dashed border-ink rounded-md px-2.5 py-1.5"
              >
                {name} <span className="text-bomb-500">· {copy.chipWeSetup}</span>
              </span>
            ))}
            <a
              href="#platforms"
              className="font-mono text-xs font-semibold text-ink bg-white border-2 border-ink rounded-md px-2.5 py-1.5 hover:-translate-y-0.5 transition-transform"
            >
              {copy.chipMore} →
            </a>
          </div>

          <SignupForm
            inputId="email-hero"
            signup={signup}
            buttonLabel={copy.signupButton}
            defaultNote={copy.signupNote}
          />
        </div>

        {/* Bomb mascot — three.js scene, padded so the orbit never clips. */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-[520px] h-[400px] sm:h-[560px] px-6">
            <BombCanvas staticLabel={mascot.static} liveLabel={mascot.live} />
          </div>
        </div>
      </div>
    </section>
  );
}
