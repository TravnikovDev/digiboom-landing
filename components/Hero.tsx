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
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">
            Multi-marketplace sync for digital products
          </p>
          <h1 className="mt-3 font-display text-white leading-[0.95] text-6xl sm:text-7xl lg:text-8xl">
            Sell everywhere.
            <br />
            <span className="text-ink">Manage in one place.</span>
          </h1>
          <p className="mt-5 text-white text-lg max-w-md font-medium leading-relaxed">
            DigiBoom connects your stores and keeps every listing in sync — files, prices, metadata and licenses. Publish a
            product once, and it goes live across every marketplace you sell on.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {PLATFORMS.map((name) => (
              <span
                key={name}
                className="font-mono text-xs text-white border border-white/50 rounded-md px-2.5 py-1.5 bg-white/10"
              >
                {name}
              </span>
            ))}
            <span className="font-mono text-xs text-white/70">+ more at launch</span>
          </div>

          <SignupForm inputId="email-hero" defaultNote="Free early access for waitlist members. Product updates only — no spam." />
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
