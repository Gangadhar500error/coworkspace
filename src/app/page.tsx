import HeroSection from "@/components/landing-page/HeroSection";
import ImageScroller from "@/components/landing-page/ImageScroller";
import Coworkspace from "@/components/landing-page/Coworkspace";
import Pricing from "@/components/landing-page/Pricing";
import SpacesSection from "@/components/landing-page/SpacesSection";
import Services from "@/components/landing-page/Services";
import CTASection from "@/components/landing-page/CTASection";
import AboutUs from "@/components/landing-page/AboutUs";
import { generateSEOMetadata, generateHomeStructuredData } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "CoworkSpace - Modern Workspace Solutions | Flexible Coworking Spaces",
  description:
    "Discover premium coworking spaces, dedicated desks, private offices, virtual offices, meeting rooms, and event spaces. CoworkSpace offers flexible workspace solutions for businesses and professionals across multiple cities.",
  keywords: [
    "coworking spaces",
    "dedicated desk",
    "private office",
    "virtual office",
    "meeting rooms",
    "event spaces",
    "flexible workspace",
    "business workspace",
    "shared office space",
    "professional workspace",
  ],
  canonical: "/",
  ogImage: "/assets/cowork.jpg",
});

export default function Home() {
  const structuredData = generateHomeStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  );
}
