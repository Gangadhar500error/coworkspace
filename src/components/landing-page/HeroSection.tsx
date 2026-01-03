"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FeatureCards from "./FeatureCards";
import WorkspaceTypeModal from "../WorkspaceTypeModal";
import { allCities } from "@/data/cities";

export default function HeroSection() {
  const [selectedCity, setSelectedCity] = useState<{ name: string; slug: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const citySlug = e.target.value;
    if (citySlug) {
      const city = allCities.find((c) => c.slug === citySlug);
      if (city) {
        setSelectedCity({ name: city.name, slug: city.slug });
        setModalOpen(true);
      }
    }
  };

  return (
    <section className="relative w-full bg-white pt-0 md:py-10 lg:pt-20 lg:pb-14 overflow-hidden">
      {/* Dotted Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Mobile Hero Banner - Full Width, Outside Container */}
      <div className="block lg:hidden">
        {/* Hero Section with Background Image - Full Width */}
        <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden">
          {/* Background Image */}
          <Image
            src="/assets/coworking-space-design-03.jpg"
            alt="Modern Coworking Space"
            fill
            className="object-cover"
            priority
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          
          {/* Content Overlay - Centered */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-heading text-white leading-tight mb-3">
              Find Your Perfect Workspace
            </h1>
            
            {/* Subheading */}
            <p className="text-white/80 text-sm mb-6 max-w-md">
              Discover flexible workspaces designed for productivity and collaboration
            </p>
            
            {/* City Dropdown - Centered */}
            <div className="relative w-full max-w-sm">
              <select
                value={selectedCity?.slug || ""}
                onChange={handleCityChange}
                className="w-full px-4 py-3.5 pr-10 bg-white border-2 border-white/30 rounded-xl text-gray-900 font-semibold text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF5A22] focus:border-[#FF5A22] shadow-xl hover:bg-gray-50 transition-colors"
              >
                <option value="">Select Your City</option>
                {allCities.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
        {/* Mobile Design - Only visible on small screens */}
        <div className="block lg:hidden">

          {/* Workspace Types Section */}
          <div className="space-y-3 mb-6 mt-5">
            <h2 className="text-lg font-bold text-gray-900">Explore Workspace Types</h2>
            <div className="w-full overflow-x-auto scrollbar-hide scroll-smooth -mx-4 px-4">
              <div className="flex gap-3 min-w-max">
                {/* 1. Cowork Space */}
                <a href="/coworking" className="shrink-0 group">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden shadow-lg mb-2 transition-transform group-hover:scale-105">
                    <Image
                      src="/assets/cowork.jpg"
                      alt="Cowork Space"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-bold drop-shadow-lg">Cowork Space</p>
                    </div>
                  </div>
                </a>

                {/* 2. Meeting */}
                <a href="/meeting-room" className="shrink-0 group">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden shadow-lg mb-2 transition-transform group-hover:scale-105">
                    <Image
                      src="/assets/eventspace.webp"
                      alt="Meeting Room"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-bold drop-shadow-lg">Meeting Rooms</p>
                    </div>
                  </div>
                </a>

                {/* 3. Virtual Office */}
                <a href="/virtual-office" className="shrink-0 group">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden shadow-lg mb-2 transition-transform group-hover:scale-105">
                    <Image
                      src="/assets/virtual.webp"
                      alt="Virtual Office"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-bold drop-shadow-lg">Virtual Office</p>
                    </div>
                  </div>
                </a>

                {/* 4. Private Office */}
                <a href="/private-office" className="shrink-0 group">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden shadow-lg mb-2 transition-transform group-hover:scale-105">
                    <Image
                      src="/assets/privateoffice.jpg"
                      alt="Private Office"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-bold drop-shadow-lg">Private Office</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full border-t border-gray-300 my-8 hidden lg:block"></div>

          {/* Feature Cards Component */}
          <FeatureCards />

          {/* Workspace Type Modal */}
          {selectedCity && (
            <WorkspaceTypeModal
              isOpen={modalOpen}
              onClose={() => {
                setModalOpen(false);
                setSelectedCity(null);
              }}
              cityName={selectedCity.name}
              citySlug={selectedCity.slug}
            />
          )}
        </div>

        {/* Desktop Design - Only visible on large screens */}
        <div className="hidden lg:block w-full">
          <h1 className="text-[113px] leading-[1.1] font-heading">
              {/* First Line */}
              <span className="block">
              <span className="text-gradient-animate">Future-Ready Work.</span>
                {/* First Decorative Element - Floating Image Card */}
                <span className="inline-block ml-3 md:ml-4 lg:ml-6 align-middle">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 transition-all duration-300 hover:scale-105 hover:-rotate-2">
                    {/* Shadow layer */}
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{ 
                        backgroundColor: '#F5E6D3',
                        transform: 'translate(4px, 4px)',
                        opacity: 0.3
                      }}
                    />
                    {/* Main card */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-xl">
                      <Image
                        src="/assets/cowork.jpg"
                        alt="Workspace"
                        fill
                        className="object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                    </div>
                  </div>
                </span>
                {/* Coworking Image - Irregular/Cloud shape - Enhanced */}
                <span className="inline-block ml-3 md:ml-4 lg:ml-6 align-middle">
                  <div className="relative w-24 h-20 md:w-36 md:h-28 lg:w-48 lg:h-36 xl:w-56 xl:h-44">
                    <div 
                      className="relative w-full h-full overflow-hidden shadow-2xl transition-transform hover:scale-105"
                      style={{
                        clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Image
                        src="/assets/coworking-space-design-03.jpg"
                        alt="Coworking space"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </span>
              </span>

              {/* Second Line - Cascading Overlapping Images */}
              <span className="block">
                <span className="inline-flex items-center align-middle ml-3 md:ml-4 lg:ml-6">
                  {/* Cascading Image Group */}
                  <span className="relative inline-flex items-center mr-2 md:mr-3 lg:mr-4">
                    {/* First Image - Largest, fully visible */}
                    <span className="relative z-30 inline-block w-12 h-16 md:w-16 md:h-20 lg:w-20 lg:h-26 xl:w-24 xl:h-32 transition-transform hover:scale-105">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50">
                        <Image
                          src="/assets/basil-speaking-705x571.jpg"
                          alt="Team member"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </span>
                    
                    {/* Second Image - Medium, overlaps first by half */}
                    <span className="relative z-20 inline-block -ml-6 md:-ml-8 lg:-ml-10 xl:-ml-12 w-11 h-15 md:w-15 md:h-19 lg:w-19 lg:h-25 xl:w-23 xl:h-31 transition-transform hover:scale-105">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50">
                        <Image
                          src="/assets/monthly.webp"
                          alt="Workspace"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </span>
                    
                    {/* Third Image - Smallest, overlaps second by half */}
                    <span className="relative z-10 inline-block -ml-6 md:-ml-8 lg:-ml-10 xl:-ml-12 w-10 h-14 md:w-14 md:h-18 lg:w-18 lg:h-24 xl:w-22 xl:h-30 transition-transform hover:scale-105">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50">
                        <Image
                          src="/assets/cowork.jpg"
                          alt="Coworking"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </span>
                  </span>
                  
                  {/* Text - Right side of images */}
                  <span className="inline-block whitespace-nowrap align-middle text-gradient-animate">Human-Focused Spaces.</span>
                </span>
              </span>
            </h1>

          {/* Separator Line */}
          <div className="w-full border-t border-gray-300 my-10 md:my-12 lg:my-10 "></div>

          {/* Feature Cards Component */}
          <FeatureCards />
        </div>
      </div>
    </section>
  );
}
