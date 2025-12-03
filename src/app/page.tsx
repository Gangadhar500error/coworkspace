import HeroSection from "@/components/landing-page/HeroSection";
import ImageScroller from "@/components/landing-page/ImageScroller";
import Coworkspace from "@/components/landing-page/Coworkspace";
import Pricing from "@/components/landing-page/Pricing";
import SpacesSection from "@/components/landing-page/SpacesSection";
import Services from "@/components/landing-page/Services";
import CTASection from "@/components/landing-page/CTASection";
import AboutUs from "@/components/landing-page/AboutUs";

export const metadata = {
  title: "CoworkSpace - Modern Workspace Solutions",
  description:
    "CoworkSpace provides modern, flexible workspace solutions for businesses and professionals.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Coworkspace />
      <AboutUs />
      <SpacesSection />
      <CTASection />
      <Services />
      {/* <Pricing /> */}
      <ImageScroller />
    </main>
  );
}
