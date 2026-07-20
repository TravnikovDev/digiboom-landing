import SignupForm from "./SignupForm";

export default function SignupSection() {
  return (
    <section id="signup" className="bg-blast py-24 relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-72 h-72 halftone-white rounded-full opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-80 h-80 halftone-white rounded-full opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-3xl px-5 text-center relative">
        <p className="font-comic text-white/90 text-2xl -rotate-2">Don&apos;t just stand there!</p>
        <h2 className="mt-2 font-display text-white text-6xl sm:text-7xl leading-[0.95]">
          Get in the
          <br />
          blast radius
        </h2>
        <p className="mt-4 text-white font-medium max-w-xl mx-auto leading-relaxed">
          Be first to hear every boom: progress updates, beta invites, and launch pricing locked in for early birds.
        </p>
        <SignupForm inputId="email-bottom" defaultNote="Unsubscribe anytime. But why would you?" large center />
      </div>
    </section>
  );
}
