import type { Messages } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import Countdown from "@/components/Countdown";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Payoff from "@/components/Payoff";
import Platforms from "@/components/Platforms";
import Pricing from "@/components/Pricing";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import SignupSection from "@/components/SignupSection";

/** The whole landing, driven by a resolved dictionary. Shared by the `/` (English) page and
 *  the `[locale]` page so the composition lives in one place. */
export default function Landing({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <>
      <a href="#main" className="skip-link">
        {t.meta.skip}
      </a>
      <Nav copy={t.nav} locale={locale} />
      <main id="main">
        <Hero copy={t.hero} signup={t.signup} mascot={t.mascot} />
        <Marquee copy={t.marquee} />
        <Product copy={t.product} sync={t.syncPanel} />
        <Problem copy={t.problem} />
        <HowItWorks copy={t.how} />
        <Payoff copy={t.payoff} />
        <Platforms copy={t.platforms} />
        <Countdown copy={t.countdown} />
        <Pricing copy={t.pricing} />
        <Faq copy={t.faq} />
        <SignupSection copy={t.signupSection} signup={t.signup} />
      </main>
      <Footer copy={t.footer} />
    </>
  );
}
