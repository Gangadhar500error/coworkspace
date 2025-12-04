"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import FiltersBar, { FilterState } from "./components/FiltersBar";
import LocationChips from "./components/LocationChips";
import ListingGrid from "./components/ListingGrid";
import SortDropdown, { SortOption } from "./components/SortDropdown";
import EmptyState from "./components/EmptyState";
import ComingSoon from "./components/ComingSoon";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Pagination from "./components/Pagination";
import { getWorkspacesByCity, getAreasByCity, Workspace } from "./data/workspaces";

const ITEMS_PER_PAGE = 9;

export default function CoworkingCityPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const city = (params.city as string) || "New York";
  
  // Format city name (e.g., "new-york" -> "New York")
  const formattedCity = city
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get selected types from query params
  const typesParam = searchParams.get("types");
  const selectedTypesFromUrl = useMemo(() => {
    if (!typesParam) return [];
    return typesParam.split(",").map(t => t.trim()).filter(Boolean);
  }, [typesParam]);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    const initialWorkspaceType = selectedTypesFromUrl.length > 0 
      ? selectedTypesFromUrl.length === 1 
        ? selectedTypesFromUrl[0] 
        : selectedTypesFromUrl
      : "all";
    
    return {
      priceRange: "all",
      workspaceType: initialWorkspaceType,
      rating: "all",
      amenities: []
    };
  });

  // Sync filters when URL params change
  useEffect(() => {
    const newWorkspaceType = selectedTypesFromUrl.length > 0 
      ? selectedTypesFromUrl.length === 1 
        ? selectedTypesFromUrl[0] 
        : selectedTypesFromUrl
      : "all";
    
    setFilters(prev => {
      const currentType = Array.isArray(prev.workspaceType) 
        ? prev.workspaceType 
        : prev.workspaceType !== "all" 
          ? [prev.workspaceType] 
          : [];
      
      const newTypeArray = Array.isArray(newWorkspaceType) 
        ? newWorkspaceType 
        : newWorkspaceType !== "all" 
          ? [newWorkspaceType] 
          : [];
      
      // Only update if different
      const currentStr = currentType.sort().join(",");
      const newStr = newTypeArray.sort().join(",");
      
      if (currentStr !== newStr) {
        return {
          ...prev,
          workspaceType: newWorkspaceType
        };
      }
      return prev;
    });
  }, [selectedTypesFromUrl]);

  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  // Get all workspaces for the city, filtered by selected types from URL
  const allWorkspaces = useMemo(() => {
    const workspaces = getWorkspacesByCity(formattedCity);
    
    // If types are specified in URL, filter by those types
    if (selectedTypesFromUrl.length > 0) {
      return workspaces.filter(ws => selectedTypesFromUrl.includes(ws.type));
    }
    
    // Default: show only Coworking Space if no types specified
    return workspaces.filter(ws => ws.type === "Coworking Space");
  }, [formattedCity, selectedTypesFromUrl]);

  // Get available areas
  const areas = useMemo(() => {
    return getAreasByCity(formattedCity);
  }, [formattedCity]);

  // Filter and sort workspaces
  const filteredAndSortedWorkspaces = useMemo(() => {
    let filtered = [...allWorkspaces];

    // Filter by area
    if (selectedArea) {
      filtered = filtered.filter(ws => ws.area === selectedArea);
    }

    // Filter by price range
    if (filters.priceRange !== "all") {
      filtered = filtered.filter(ws => {
        const [min, max] = filters.priceRange.split("-").map(p => 
          p === "+" ? Infinity : parseInt(p.replace(/\D/g, ""))
        );
        if (filters.priceRange === "700+") {
          return ws.price >= 700;
        }
        return ws.price >= min && ws.price <= max;
      });
    }

    // Filter by workspace type (supports single or multiple types)
    if (filters.workspaceType !== "all") {
      if (Array.isArray(filters.workspaceType)) {
        filtered = filtered.filter(ws => filters.workspaceType.includes(ws.type));
      } else {
        filtered = filtered.filter(ws => ws.type === filters.workspaceType);
      }
    }

    // Filter by rating
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating.replace("+", ""));
      filtered = filtered.filter(ws => ws.rating >= minRating);
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(ws =>
        filters.amenities.every(amenity => ws.amenities.includes(amenity))
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
          // Recommended: Featured > Popular > Special Offer > Others, then by rating
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
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL query params when workspace types change
    const url = new URL(window.location.href);
    
    if (Array.isArray(newFilters.workspaceType) && newFilters.workspaceType.length > 0) {
      url.searchParams.set("types", newFilters.workspaceType.join(","));
    } else if (typeof newFilters.workspaceType === "string" && newFilters.workspaceType !== "all") {
      url.searchParams.set("types", newFilters.workspaceType);
    } else {
      url.searchParams.delete("types");
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
    // TODO: Implement quote functionality
    console.log("Get quote for:", id);
    // Could navigate to a quote page or open a modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-20">
  <div className="container-custom px-4 sm:px-6 lg:px-8">

    {/* Top Section - Responsive Layout */}
    <div className="flex flex-col lg:flex-row justify-between gap-6 items-start  mt-2">

      {/* LEFT CONTENT */}
      <div className="w-full lg:w-3/5">

        <h1 className="text-base lg:text-2xl font-bold text-gray-900 font-display mb-1">
          {selectedTypesFromUrl.length > 0 ? (
            <>
              {selectedTypesFromUrl.length === 1 ? (
                <>
                  {selectedTypesFromUrl[0]}s in <span className="text-orange-500">{formattedCity}</span>
                </>
              ) : (
                <>
                  Workspaces in <span className="text-orange-500">{formattedCity}</span>
                </>
              )}
            </>
          ) : (
            <>
              Coworking Spaces in <span className="text-orange-500">{formattedCity}</span>
            </>
          )}
        </h1>

        {/* Selected Types Display */}
        {selectedTypesFromUrl.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
            {selectedTypesFromUrl.map((type) => (
              <span
                key={type}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200 font-body"
              >
                {type}
              </span>
            ))}
          </div>
        )}

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
        <FiltersBar filters={filters} onFilterChange={handleFilterChange} />
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
              <>Showing {paginatedWorkspaces.length} of {filteredAndSortedWorkspaces.length} workspaces</>
            ) : (
              <>No workspaces available</>
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
            {/* Listings Grid, Empty State, or Coming Soon */}
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
                <EmptyState />
              )
            ) : (
              <ComingSoon 
                workspaceType={
                  selectedTypesFromUrl.length > 0 
                    ? selectedTypesFromUrl.join(" & ") 
                    : "Coworking Space"
                } 
                cityName={formattedCity} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
