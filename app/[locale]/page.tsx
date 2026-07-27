import { notFound } from "next/navigation";
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
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

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
