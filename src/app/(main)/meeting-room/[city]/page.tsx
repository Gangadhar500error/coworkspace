"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MeetingRoomFiltersBar, { MeetingRoomFilterState } from "./components/MeetingRoomFiltersBar";
import LocationChips from "../../coworking/[city]/components/LocationChips";
import ListingGrid from "../../coworking/[city]/components/ListingGrid";
import SortDropdown, { SortOption } from "../../coworking/[city]/components/SortDropdown";
import ComingSoon from "../../coworking/[city]/components/ComingSoon";
import LoadingSkeleton from "../../coworking/[city]/components/LoadingSkeleton";
import Pagination from "../../coworking/[city]/components/Pagination";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import { getWorkspacesByCity, getAreasByCity, Workspace } from "../../coworking/[city]/data/workspaces";
import { generateWorkspaceStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo";

const ITEMS_PER_PAGE = 9;
const WORKSPACE_TYPE = "Meeting Room";

export default function MeetingRoomCityPage() {
  const params = useParams();
  const router = useRouter();
  const city = (params.city as string) || "New York";
  
  // Format city name (e.g., "new-york" -> "New York")
  const formattedCity = city
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [filters, setFilters] = useState<MeetingRoomFilterState>({
    city: formattedCity,
    capacity: "all",
    price_range: "all",
    room_features: [],
    booking_type: "all"
  });

  // Update city in filters when city changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, city: formattedCity }));
  }, [formattedCity]);

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  // Get all workspaces for the city, filtered by workspace type
  const allWorkspaces = useMemo(() => {
    return getWorkspacesByCity(formattedCity).filter(ws => ws.type === WORKSPACE_TYPE);
  }, [formattedCity]);

  // Get available areas from filtered workspaces
  const areas = useMemo(() => {
    const areasList = allWorkspaces.map(ws => ws.area);
    return Array.from(new Set(areasList));
  }, [allWorkspaces]);

  // Filter and sort workspaces
  const filteredAndSortedWorkspaces = useMemo(() => {
    let filtered = [...allWorkspaces];

    // Filter by area
    if (selectedArea) {
      filtered = filtered.filter(ws => ws.area === selectedArea);
    }

    // Filter by capacity (placeholder - would need workspace data to support this)
    // if (filters.capacity !== "all") {
    //   filtered = filtered.filter(ws => ws.capacity === filters.capacity);
    // }

    // Filter by price range
    if (filters.price_range !== "all") {
      filtered = filtered.filter(ws => {
        const [min, max] = filters.price_range.split("-").map(p => 
          p === "+" ? Infinity : parseInt(p.replace(/\D/g, ""))
        );
        if (filters.price_range === "200+") {
          return ws.price >= 200;
        }
        return ws.price >= min && ws.price <= max;
      });
    }

    // Filter by booking type (placeholder - would need workspace data to support this)
    // if (filters.booking_type !== "all") {
    //   filtered = filtered.filter(ws => ws.booking_type === filters.booking_type);
    // }

    // Filter by room features
    if (filters.room_features.length > 0) {
      filtered = filtered.filter(ws =>
        filters.room_features.every(feature => {
          // Map filter feature IDs to workspace amenity strings
          const featureMap: Record<string, string> = {
            "projector": "Projector",
            "whiteboard": "Whiteboard",
            "video_conferencing": "Video Conferencing",
            "phone_booth": "Phone Booth",
            "catering": "Catering",
            "wifi": "WiFi",
            "ac": "AC",
            "natural_light": "Natural Light"
          };
          const featureLabel = featureMap[feature] || feature;
          return ws.amenities.includes(featureLabel);
        })
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating-high":
          return b.rating - a.rating;
        case "recommended":
        default:
          const badgeOrder = { Featured: 3, Popular: 2, "Special Offer": 1 };
          const aBadge = badgeOrder[a.badge as keyof typeof badgeOrder] || 0;
          const bBadge = badgeOrder[b.badge as keyof typeof badgeOrder] || 0;
          if (aBadge !== bBadge) return bBadge - aBadge;
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [allWorkspaces, filters, selectedArea, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedWorkspaces.length / ITEMS_PER_PAGE);
  const paginatedWorkspaces = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedWorkspaces.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedWorkspaces, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: MeetingRoomFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Build query params for backend API
    const url = new URL(window.location.href);
    
    if (newFilters.capacity !== "all") {
      url.searchParams.set("capacity", newFilters.capacity);
    } else {
      url.searchParams.delete("capacity");
    }
    
    if (newFilters.price_range !== "all") {
      url.searchParams.set("price_range", newFilters.price_range);
    } else {
      url.searchParams.delete("price_range");
    }
    
    if (newFilters.booking_type !== "all") {
      url.searchParams.set("booking_type", newFilters.booking_type);
    } else {
      url.searchParams.delete("booking_type");
    }
    
    if (newFilters.room_features.length > 0) {
      url.searchParams.set("room_features", newFilters.room_features.join(","));
    } else {
      url.searchParams.delete("room_features");
    }
    
    router.replace(url.pathname + url.search, { scroll: false });
  };

  const handleAreaSelect = (area: string | null) => {
    setSelectedArea(area);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleGetQuote = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setQuoteModalOpen(true);
  };

  // Generate structured data
  const structuredData = useMemo(() => {
    return [
      generateWorkspaceStructuredData(formattedCity, WORKSPACE_TYPE, filteredAndSortedWorkspaces.length),
      generateBreadcrumbStructuredData([
        { name: "Home", url: "https://www.coworkspace.com" },
        { name: "Meeting Rooms", url: "https://www.coworkspace.com/meeting-room" },
        { name: formattedCity, url: `https://www.coworkspace.com/meeting-room/${params.city}` },
      ]),
    ];
  }, [formattedCity, filteredAndSortedWorkspaces.length, params.city]);

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
      {/* Header */}
      <div className="bg-white pt-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Top Section - Responsive Layout */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 items-start mt-2">
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-3/5">
              <h1 className="text-base lg:text-2xl font-bold text-gray-900 font-display mb-1">
                {WORKSPACE_TYPE}s in <span className="text-orange-500">{formattedCity}</span>
              </h1>

              {/* Location Chips */}
              {areas.length > 0 && (
                <LocationChips
                  areas={areas}
                  selectedArea={selectedArea}
                  onAreaSelect={handleAreaSelect}
                />
              )}
            </div>

            {/* RIGHT FILTER BAR */}
            <div className="w-full lg:w-2/5">
              <MeetingRoomFiltersBar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-2">
        {/* Sort and Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <div className="text-sm text-gray-600 font-body">
            {allWorkspaces.length > 0 ? (
              <>Showing {paginatedWorkspaces.length} of {filteredAndSortedWorkspaces.length} {WORKSPACE_TYPE.toLowerCase()}s</>
            ) : (
              <>No {WORKSPACE_TYPE.toLowerCase()}s available</>
            )}
          </div>
          {allWorkspaces.length > 0 && (
            <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Listings Grid or Coming Soon */}
            {allWorkspaces.length > 0 ? (
              paginatedWorkspaces.length > 0 ? (
                <>
                  <ListingGrid
                    workspaces={paginatedWorkspaces}
                    city={formattedCity}
                    onGetQuote={handleGetQuote}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <div className="text-center py-12 text-gray-600 font-body">
                  No {WORKSPACE_TYPE.toLowerCase()}s match your filters. Try adjusting your search criteria.
                </div>
              )
            ) : (
              <ComingSoon workspaceType={WORKSPACE_TYPE} cityName={formattedCity} />
            )}
          </>
        )}
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => {
          setQuoteModalOpen(false);
          setSelectedWorkspace(null);
        }}
        workspace={selectedWorkspace}
      />
      </div>
    </>
  );
}
