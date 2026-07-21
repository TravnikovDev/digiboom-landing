import Countdown from "@/components/Countdown";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Platforms from "@/components/Platforms";
import Pricing from "@/components/Pricing";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import SignupSection from "@/components/SignupSection";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Product />
      <Problem />
      <HowItWorks />
      <Platforms />
      <Countdown />
      <Pricing />
      <Faq />
      <SignupSection />
      <Footer />
    </>
  );
}
