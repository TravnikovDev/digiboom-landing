import BombCanvas from "./BombCanvas";
import SignupForm from "./SignupForm";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-10 pb-20 lg:pt-16 lg:pb-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 72% 38%, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 55%)" }}
      />
      <div className="absolute top-10 right-0 w-72 h-72 halftone-white rounded-full opacity-60 pointer-events-none" />
      <div className="grid lg:grid-cols-2 gap-10 items-center relative">
        <div>
          <p className="font-comic text-white/90 text-xl tracking-wide -rotate-1 inline-block">Tick... tick... tick...</p>
          <h1 className="mt-2 font-display text-white leading-[0.95] text-6xl sm:text-7xl lg:text-8xl">
            We&apos;ll explode
            <br />
            your sales.
            <br />
            <span className="text-ink">In a good way.</span>
          </h1>
          <p className="mt-5 text-white text-lg max-w-md font-medium leading-relaxed">
            One bomb, three marketplaces. DigiBoom syncs your digital products across <strong className="text-ink">Etsy</strong>,{" "}
            <strong className="text-ink">Shopify</strong> and <strong className="text-ink">Gumroad</strong> — edit once, publish
            everywhere, and boom: customers from every direction.
          </p>
          <SignupForm inputId="email-hero" defaultNote="Free early access for waitlist members. No spam — only booms." />
        </div>

        {/* Bomb mascot — real three.js scene */}
        <div className="relative flex justify-center items-center py-6">
          <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-white/30" />
          <div className="absolute w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] rounded-full border-2 border-white/20" />
          <div className="relative w-[320px] h-[380px] sm:w-[420px] sm:h-[470px]">
            <BombCanvas />
          </div>
          <span className="absolute -bottom-2 right-2 sm:right-10 font-comic text-3xl text-white boom-text rotate-6 select-none">
            BOOM!
          </span>
        </div>
      </div>
    </section>
  );
}
