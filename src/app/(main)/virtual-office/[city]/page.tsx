"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VirtualOfficeHero from "./components/VirtualOfficeHero";
import VirtualOfficeCard from "./components/VirtualOfficeCard";
import ComingSoon from "../../coworking/[city]/components/ComingSoon";
import { getVirtualOfficesByCity } from "./data";
import { generateWorkspaceStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo";

const WORKSPACE_TYPE = "Virtual Office";

export default function VirtualOfficeCityPage() {
  const params = useParams();
  const city = (params.city as string) || "new-york";
  const [isLoading, setIsLoading] = useState(true);
  
  // Format city name (e.g., "new-york" -> "New York")
  const formattedCity = useMemo(() => {
    return city
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [city]);

  // Fetch virtual offices for the selected city
  // TODO: Replace with actual API call
  // Example API call: GET /api/virtual-offices?city={city_slug}
  const virtualOffices = useMemo(() => {
    // Simulate API call delay
    // In real implementation, this would be:
    // const response = await fetch(`/api/virtual-offices?city=${city}`);
    // const data = await response.json();
    // return data.data || [];
    
    // For now, return mock data filtered by city
    // Data structure is maintained in: ./data/virtualOfficeCards.ts
    return getVirtualOfficesByCity(formattedCity);
  }, [formattedCity]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(false);
  }, [formattedCity]);

  const handleGetQuote = (id: string) => {
    // TODO: Handle quote request - could navigate to quote page or open modal
    console.log("Get quote for virtual office:", id);
  };

  // Generate structured data
  const structuredData = useMemo(() => {
    return [
      generateWorkspaceStructuredData(formattedCity, WORKSPACE_TYPE, virtualOffices.length),
      generateBreadcrumbStructuredData([
        { name: "Home", url: "https://www.coworkspace.com" },
        { name: "Virtual Office", url: "https://www.coworkspace.com/virtual-office" },
        { name: formattedCity, url: `https://www.coworkspace.com/virtual-office/${city}` },
      ]),
    ];
  }, [formattedCity, virtualOffices.length, city]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[0]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData[1]) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Always Display */}
      <VirtualOfficeHero cityName={formattedCity} />

      {/* Virtual Offices List */}
      <div id="virtual-offices-section" className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-600">Loading virtual offices...</div>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display mb-2">
                Available Virtual Offices in <span className="text-orange-500">{formattedCity}</span>
              </h2>
              <p className="text-gray-600">
                {virtualOffices.length > 0 
                  ? "Choose from our premium virtual office locations"
                  : "We're expanding our virtual office network"}
              </p>
            </div>

            {/* Virtual Office Cards Grid - 2 cards per row */}
            {virtualOffices.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {virtualOffices.map((office) => (
                  <VirtualOfficeCard
                    key={office.id}
                    office={office}
                    onGetQuote={handleGetQuote}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-[400px]">
                <ComingSoon workspaceType={WORKSPACE_TYPE} cityName={formattedCity} />
              </div>
            )}
          </>
        )}
      </div>
      </div>
    </>
  );
}
