import HeroSection from "@/components/HeroSection";
import ImageScroller from "@/components/ImageScroller";
import Coworkspace from "@/components/Coworkspace";
import Pricing from "@/components/Pricing";
import SpacesSection from "@/components/SpacesSection";
import Services from "@/components/Services";

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
      <SpacesSection />
      <Services />
      <Pricing />
      <ImageScroller />
    </main>
  );
}
