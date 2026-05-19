import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import BasketsFeature from "./components/BasketsFeature";
import TeamSection from "./components/TeamSection";
import WhyMelers from "./components/WhyMelers";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <Services />
      <BasketsFeature />
      <TeamSection />
      <Testimonials />
      <WhyMelers />
      <ContactCTA />
      <Footer />
    </>
  );
}
