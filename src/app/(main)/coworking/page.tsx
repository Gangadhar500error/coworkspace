"use client";

import { useState, useMemo } from "react";
import { allCities } from "@/data/cities";
import { workspaces, Workspace } from "../coworking/[city]/data/workspaces";
import HeroSection from "@/components/CoworkingPage/Coworkhero";
import FeatureIconStrip from "@/components/CoworkingPage/FeatureIconStrip";
import TopCoworkingSpaces from "@/components/CoworkingPage/TopCoworkingSpaces";
import FeaturedWorkspaces from "@/components/CoworkingPage/FeaturedWorkspaces";
import CTABanner from "@/components/CoworkingPage/CTABanner";
import CityWorkspaces from "@/components/CoworkingPage/CityWorkspaces";
import FAQContactForm from "@/components/CoworkingPage/FAQContactForm";
import SEOContent from "@/components/CoworkingPage/SEOContent";

export default function CoworkingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  // Get top 6 cities for display
  const topCities = allCities.slice(0, 6);

  // Get featured coworking spaces (filter by type and get top rated)
  const featuredWorkspaces = useMemo(() => {
    return workspaces
      .filter(ws => ws.type === "Coworking Space")
      .sort((a, b) => {
        // Sort by badge priority, then rating
        const badgeOrder = { Featured: 3, Popular: 2, "Special Offer": 1 };
        const aBadge = badgeOrder[a.badge as keyof typeof badgeOrder] || 0;
        const bBadge = badgeOrder[b.badge as keyof typeof badgeOrder] || 0;
        if (aBadge !== bBadge) return bBadge - aBadge;
        return b.rating - a.rating;
      })
      .slice(0, 12); // Show top 12 workspaces
  }, []);

  // Group workspaces by city for featured sections
  const workspacesByCity = useMemo(() => {
    const cities = ["New York", "Los Angeles", "Miami"];
    const grouped: Record<string, Workspace[]> = {};
    
    cities.forEach(city => {
      grouped[city] = workspaces
        .filter(ws => ws.city === city && ws.type === "Coworking Space")
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    });
    
    return grouped;
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection topCities={topCities} />
      <FeatureIconStrip />
      <TopCoworkingSpaces topCities={topCities} />
      <FeaturedWorkspaces featuredWorkspaces={featuredWorkspaces} />
      <CTABanner />
      {(["New York", "Los Angeles", "Miami"] as const).map((city) => {
        const cityWorkspaces = workspacesByCity[city] || [];
        return <CityWorkspaces key={city} city={city} cityWorkspaces={cityWorkspaces} />;
      })}
      <FAQContactForm
        formData={formData}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <SEOContent />
    </div>
  );
}
