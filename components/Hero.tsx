import BombCanvas from "./BombCanvas";
import SignupForm from "./SignupForm";

const PLATFORMS = ["Etsy", "Shopify", "Gumroad"];

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 lg:pt-14 lg:pb-20">
      <div className="absolute inset-0 tech-grid mask-fade pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 72% 38%, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 55%)" }}
      />
      <div className="grid lg:grid-cols-2 gap-10 items-center relative">
        <div>
          <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-1 inline-block">Tick... tick... tick...</p>
          <h1 className="mt-2 font-display text-white leading-[0.95] text-6xl sm:text-7xl lg:text-8xl">
            We&apos;ll explode
            <br />
            your sales.
            <br />
            <span className="text-ink">In a good way.</span>
          </h1>
          <p className="mt-5 text-white text-lg max-w-md font-medium leading-relaxed">
            Selling on <strong className="text-ink">Etsy</strong> only? DigiBoom sets up your{" "}
            <strong className="text-ink">Shopify</strong> and <strong className="text-ink">Gumroad</strong> storefronts for you,
            moves your catalog over, and keeps it all in sync. One shop becomes three — and your products get found several
            times more often.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-white border border-white/50 rounded-md px-2.5 py-1.5 bg-white/10">
              {PLATFORMS[0]} <span className="text-white/60">· your shop</span>
            </span>
            <span className="font-comic text-xl text-white/90">→</span>
            {PLATFORMS.slice(1).map((name) => (
              <span
                key={name}
                className="font-mono text-xs text-white border border-dashed border-white/50 rounded-md px-2.5 py-1.5"
              >
                {name} <span className="text-white/60">· we set it up</span>
              </span>
            ))}
            <a href="#platforms" className="font-mono text-xs text-white/80 underline underline-offset-4 hover:text-white">
              + 20 more platforms
            </a>
          </div>

          <SignupForm
            inputId="email-hero"
            buttonLabel="Light the fuse"
            defaultNote="Free early access for waitlist members. Product updates only — no spam."
          />
        </div>

        {/* Bomb mascot — three.js scene, padded so the orbit never clips */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-white/25" />
          <div className="relative w-full max-w-[520px] h-[400px] sm:h-[520px] px-6">
            <BombCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
