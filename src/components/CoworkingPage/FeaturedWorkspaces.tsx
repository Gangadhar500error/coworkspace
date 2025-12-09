"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Workspace } from "@/app/(main)/coworking/[city]/data/workspaces";
import { getBadgeColor } from "./utils";
import { useState, useRef, useEffect } from "react";

interface FeaturedWorkspacesProps {
  featuredWorkspaces: Workspace[];
}

export default function FeaturedWorkspaces({ featuredWorkspaces }: FeaturedWorkspacesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [featuredWorkspaces]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector(".carousel-card") as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // gap-6 = 24px
        const scrollAmount = cardWidth + gap;
        
        container.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section id="featured-workspaces" className="bg-white py-10 lg:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Featured Coworking Spaces
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Explore our top-rated coworking spaces across major US cities.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative px-14">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 transition-all duration-300 ${
              canScrollLeft ? "opacity-100 cursor-pointer hover:scale-110 active:scale-95 hover:text-orange-600" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Previous workspaces"
          >
            <ChevronLeft className="w-8 h-8 text-orange-500" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 transition-all duration-300 ${
              canScrollRight ? "opacity-100 cursor-pointer hover:scale-110 active:scale-95 hover:text-orange-600" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Next workspaces"
          >
            <ChevronRight className="w-8 h-8 text-orange-500" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredWorkspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="carousel-card group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 shrink-0 w-[calc(33.333%-16px)]"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={workspace.image}
                    alt={workspace.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {workspace.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold z-20 ${getBadgeColor(workspace.badge)}`}>
                      {workspace.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 font-display">
                    {workspace.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-body">{workspace.area}, {workspace.city}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{workspace.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-body">
                      ({workspace.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workspace.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-body"
                      >
                        {amenity}
                      </span>
                    ))}
                    {workspace.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-body">
                        +{workspace.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 font-display">
                        ${workspace.price}
                      </span>
                      <span className="text-sm text-gray-600 font-body">/month</span>
                    </div>
                    <Link
                      href={`/coworking/${workspace.city.toLowerCase().replace(" ", "-")}`}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors font-body"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
