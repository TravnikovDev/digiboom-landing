import SignupForm from "./SignupForm";

export default function SignupSection() {
  return (
    <section id="signup" className="bg-blast py-24 relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-72 h-72 halftone-white rounded-full opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-80 h-80 halftone-white rounded-full opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-3xl px-5 text-center relative">
        <p className="font-comic text-2xl tracking-wide text-white/90 -rotate-2 inline-block">Early access</p>
        <h2 className="mt-3 font-display text-white text-6xl sm:text-7xl leading-[0.95]">
          Get in before
          <br />
          the first sync
        </h2>
        <p className="mt-4 text-ink font-medium max-w-xl mx-auto leading-relaxed">
          Build updates as they ship, a beta invite ahead of the queue, and launch pricing locked in for early members.
        </p>
        <SignupForm inputId="email-bottom" defaultNote="One email per milestone. Unsubscribe anytime." large center />
      </div>
    </section>
  );
}
