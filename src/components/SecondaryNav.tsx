"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import {
  MapPin,
  Building2,
  Landmark,
  Waves,
  Mountain,
  Plane,
  Ship,
  Sun,
  Cloud,
  Zap,
  TreePine,
  Factory,
  Briefcase,
  Building,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SecondaryNavProps {
  isScrolled?: boolean;
}

const navigationItems: NavItem[] = [
  { name: "New York", icon: Building2, href: "/new-york" },
  { name: "Los Angeles", icon: Sun, href: "/los-angeles" },
  { name: "Chicago", icon: Building, href: "/chicago" },
  { name: "Miami", icon: Waves, href: "/miami" },
  { name: "San Francisco", icon: Landmark, href: "/san-francisco" },
  { name: "Boston", icon: Building2, href: "/boston" },
  { name: "Seattle", icon: Cloud, href: "/seattle" },
  { name: "Dallas", icon: Briefcase, href: "/dallas" },
  { name: "Houston", icon: Factory, href: "/houston" },
  { name: "Atlanta", icon: TreePine, href: "/atlanta" },
  { name: "Phoenix", icon: Sun, href: "/phoenix" },
  { name: "Philadelphia", icon: Landmark, href: "/philadelphia" },
  { name: "San Diego", icon: Waves, href: "/san-diego" },
  { name: "Denver", icon: Mountain, href: "/denver" },
  { name: "Washington DC", icon: Landmark, href: "/washington-dc" },
  { name: "Tampa", icon: MapPin, href: "/tampa" },
  { name: "Orlando", icon: Zap, href: "/orlando" },
  { name: "Las Vegas", icon: Zap, href: "/las-vegas" },
];

export default function SecondaryNav({ isScrolled = false }: SecondaryNavProps) {
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollRight, setShowScrollRight] = useState(false);
  const [showScrollLeft, setShowScrollLeft] = useState(false);

  const checkScrollability = useCallback(() => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      // Add a small threshold (5px) to account for rounding
      const canScrollRight = Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5;
      const canScrollLeft = scrollLeft > 5;
      
      setShowScrollRight(canScrollRight);
      setShowScrollLeft(canScrollLeft);
    }
  }, []);

  useEffect(() => {
    // Initial check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      checkScrollability();
      // Ensure we start at the beginning (showing first 10 items)
      if (navScrollRef.current) {
        navScrollRef.current.scrollLeft = 0;
      }
    }, 150);

    window.addEventListener("resize", checkScrollability);
    
    const scrollContainer = navScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollability);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkScrollability);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollability);
      }
    };
  }, [checkScrollability]);

  const scrollNav = (direction: "left" | "right") => {
    if (navScrollRef.current) {
      // Calculate scroll amount based on item width (90px + 40px gap = ~130px per item)
      // Scroll by approximately 2 items at a time for smooth navigation
      const scrollAmount = 260;
      const currentScroll = navScrollRef.current.scrollLeft;
      const newPosition = direction === "right" 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      navScrollRef.current.scrollTo({ 
        left: newPosition, 
        behavior: "smooth" 
      });
      
      // Re-check scrollability after scroll animation
      setTimeout(() => {
        checkScrollability();
      }, 350);
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white relative">
      <div className={`container-custom relative transition-all duration-500 ease-in-out ${
        isScrolled ? "lg:flex lg:items-center lg:gap-4" : "lg:block"
      }`}>
        {/* Search Bar - Only visible when scrolled on large screens */}
        <div className={`hidden lg:block transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "w-[30%] opacity-100 max-w-[30%] min-w-0 relative flex-shrink-0" 
            : "absolute left-0 top-0 w-0 h-0 opacity-0 max-w-0 min-w-0 overflow-hidden pointer-events-none"
        }`} style={!isScrolled ? { margin: 0, padding: 0 } : undefined}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a location"
              className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Navigation Container */}
        <div className={`relative transition-all duration-500 ease-in-out ${
          isScrolled ? "lg:w-[70%] lg:flex-1" : "w-full"
        }`}>
          {/* Left Fade Gradient Overlay */}
          {showScrollLeft && (
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-white via-white to-transparent" />
          )}

          {/* Right Fade Gradient Overlay */}
          {showScrollRight && (
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-white via-white to-transparent" />
          )}

          {/* Left Scroll Arrow - Desktop Only */}
          {showScrollLeft && (
            <button
              aria-label="Scroll left"
              onClick={() => scrollNav("left")}
              className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-50 shadow-lg transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
            </button>
          )}

          <div 
            ref={navScrollRef}
            className={`flex items-center lg:gap-10 gap-5 overflow-x-auto scrollbar-hide py-4 ${
              showScrollLeft ? 'lg:pl-20' : 'lg:pl-4'
            } ${
              showScrollRight ? 'lg:pr-20' : 'lg:pr-4'
            }`}
            onScroll={checkScrollability}
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center gap-3 min-w-[90px] shrink-0 text-gray-700 hover:text-orange-500 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-gray-600 group-hover:text-orange-500 transition-colors stroke-[1.5]" />
                  <span className="text-xs font-medium text-center whitespace-nowrap mb-1">{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Right Scroll Arrow - Desktop Only */}
          {showScrollRight && (
            <button
              aria-label="Scroll right"
              onClick={() => scrollNav("right")}
              className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-600 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-50 shadow-lg transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
