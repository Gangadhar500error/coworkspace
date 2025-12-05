"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PrivateOfficeFiltersBar, { PrivateOfficeFilterState } from "./components/PrivateOfficeFiltersBar";
import LocationChips from "../../coworking/[city]/components/LocationChips";
import ListingGrid from "../../coworking/[city]/components/ListingGrid";
import SortDropdown, { SortOption } from "../../coworking/[city]/components/SortDropdown";
import ComingSoon from "../../coworking/[city]/components/ComingSoon";
import LoadingSkeleton from "../../coworking/[city]/components/LoadingSkeleton";
import Pagination from "../../coworking/[city]/components/Pagination";
import { getWorkspacesByCity } from "../../coworking/[city]/data/workspaces";

const ITEMS_PER_PAGE = 9;
const WORKSPACE_TYPE = "Private Office";

export default function PrivateOfficeCityPage() {
  const params = useParams();
  const router = useRouter();
  const city = (params.city as string) || "New York";
  
  // Format city name (e.g., "new-york" -> "New York")
  const formattedCity = city
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [filters, setFilters] = useState<PrivateOfficeFilterState>({
    city: formattedCity,
    capacity: "all",
    lockable: "all",
    furnishing: "all",
    contract_term: "all",
    amenities: []
  });

  // Update city in filters when city changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, city: formattedCity }));
  }, [formattedCity]);

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

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

    // Filter by lockable (placeholder - would need workspace data to support this)
    // if (filters.lockable !== "all") {
    //   filtered = filtered.filter(ws => ws.lockable === filters.lockable);
    // }

    // Filter by furnishing (placeholder - would need workspace data to support this)
    // if (filters.furnishing !== "all") {
    //   filtered = filtered.filter(ws => ws.furnishing === filters.furnishing);
    // }

    // Filter by contract term (placeholder - would need workspace data to support this)
    // if (filters.contract_term !== "all") {
    //   filtered = filtered.filter(ws => ws.contract_term === filters.contract_term);
    // }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(ws =>
        filters.amenities.every(amenity => {
          // Map filter amenity IDs to workspace amenity strings
          const amenityMap: Record<string, string> = {
            "ac": "AC",
            "parking": "Parking",
            "wifi": "WiFi",
            "pantry": "Pantry",
            "reception": "Reception",
            "security": "Security",
            "meeting_rooms": "Meeting Rooms",
            "printing": "Printing"
          };
          const amenityLabel = amenityMap[amenity] || amenity;
          return ws.amenities.includes(amenityLabel);
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
  const handleFilterChange = (newFilters: PrivateOfficeFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Build query params for backend API
    const url = new URL(window.location.href);
    
    if (newFilters.capacity !== "all") {
      url.searchParams.set("capacity", newFilters.capacity);
    } else {
      url.searchParams.delete("capacity");
    }
    
    if (newFilters.lockable !== "all") {
      url.searchParams.set("lockable", newFilters.lockable);
    } else {
      url.searchParams.delete("lockable");
    }
    
    if (newFilters.furnishing !== "all") {
      url.searchParams.set("furnishing", newFilters.furnishing);
    } else {
      url.searchParams.delete("furnishing");
    }
    
    if (newFilters.contract_term !== "all") {
      url.searchParams.set("contract_term", newFilters.contract_term);
    } else {
      url.searchParams.delete("contract_term");
    }
    
    if (newFilters.amenities.length > 0) {
      url.searchParams.set("amenities", newFilters.amenities.join(","));
    } else {
      url.searchParams.delete("amenities");
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

  const handleGetQuote = (id: string) => {
    console.log("Get quote for:", id);
  };

  return (
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
              <PrivateOfficeFiltersBar filters={filters} onFilterChange={handleFilterChange} />
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
    </div>
  );
}
