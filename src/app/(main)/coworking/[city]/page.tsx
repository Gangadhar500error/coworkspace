"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import CoworkingFiltersBar, { CoworkingFilterState } from "./components/CoworkingFiltersBar";
import LocationChips from "./components/LocationChips";
import ListingGrid from "./components/ListingGrid";
import SortDropdown, { SortOption } from "./components/SortDropdown";
import EmptyState from "./components/EmptyState";
import ComingSoon from "./components/ComingSoon";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Pagination from "./components/Pagination";
import QuoteRequestModal from "@/components/QuoteRequestModal";
import { getWorkspacesByCity, getAreasByCity, Workspace } from "./data/workspaces";
import { generateWorkspaceStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo";

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
  const [filters, setFilters] = useState<CoworkingFilterState>(() => {
    return {
      city: formattedCity,
      price_range: "all",
      amenities: [],
      availability: "all",
      seat_type: "all"
    };
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
    if (filters.price_range !== "all") {
      filtered = filtered.filter(ws => {
        const [min, max] = filters.price_range.split("-").map(p => 
          p === "+" ? Infinity : parseInt(p.replace(/\D/g, ""))
        );
        if (filters.price_range === "700+") {
          return ws.price >= 700;
        }
        return ws.price >= min && ws.price <= max;
      });
    }

    // Filter by workspace type (supports single or multiple types)
    if (selectedTypesFromUrl.length > 0) {
      filtered = filtered.filter(ws => selectedTypesFromUrl.includes(ws.type));
    }

    // Filter by availability (placeholder - would need workspace data to support this)
    // if (filters.availability !== "all") {
    //   filtered = filtered.filter(ws => ws.availability === filters.availability);
    // }

    // Filter by seat type (placeholder - would need workspace data to support this)
    // if (filters.seat_type !== "all") {
    //   filtered = filtered.filter(ws => ws.seat_type === filters.seat_type);
    // }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(ws =>
        filters.amenities.every(amenity => {
          // Map filter amenity IDs to workspace amenity strings
          const amenityMap: Record<string, string> = {
            "ac": "AC",
            "non_ac": "Non-AC",
            "parking": "Parking",
            "wifi": "WiFi",
            "pantry": "Pantry",
            "24_7_access": "24/7 Access",
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
  const handleFilterChange = (newFilters: CoworkingFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Build query params for backend API
    const url = new URL(window.location.href);
    
    // Add filter params
    if (newFilters.price_range !== "all") {
      url.searchParams.set("price_range", newFilters.price_range);
    } else {
      url.searchParams.delete("price_range");
    }
    
    if (newFilters.availability !== "all") {
      url.searchParams.set("availability", newFilters.availability);
    } else {
      url.searchParams.delete("availability");
    }
    
    if (newFilters.seat_type !== "all") {
      url.searchParams.set("seat_type", newFilters.seat_type);
    } else {
      url.searchParams.delete("seat_type");
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

  const handleGetQuote = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setQuoteModalOpen(true);
  };

  const handleRemoveType = (typeToRemove: string) => {
    const updatedTypes = selectedTypesFromUrl.filter(type => type !== typeToRemove);
    
    const url = new URL(window.location.href);
    
    if (updatedTypes.length === 0) {
      // If no types left, remove the types param
      url.searchParams.delete("types");
    } else if (updatedTypes.length === 1) {
      // Single type - set as single value
      url.searchParams.set("types", updatedTypes[0]);
    } else {
      // Multiple types - join with comma
      url.searchParams.set("types", updatedTypes.join(","));
    }
    
    router.replace(url.pathname + url.search, { scroll: false });
    setCurrentPage(1);
  };

  // Generate structured data
  const structuredData = useMemo(() => {
    const workspaceType = selectedTypesFromUrl.length > 0 
      ? selectedTypesFromUrl.join(" & ") 
      : "Coworking Space";
    
    return [
      generateWorkspaceStructuredData(formattedCity, workspaceType, filteredAndSortedWorkspaces.length),
      generateBreadcrumbStructuredData([
        { name: "Home", url: "https://www.coworkspace.com" },
        { name: "Coworking", url: "https://www.coworkspace.com/coworking" },
        { name: formattedCity, url: `https://www.coworkspace.com/coworking/${params.city}` },
      ]),
    ];
  }, [formattedCity, selectedTypesFromUrl, filteredAndSortedWorkspaces.length, params.city]);

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
        {selectedTypesFromUrl.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
            {selectedTypesFromUrl.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200 font-body hover:bg-orange-200 transition-colors"
              >
                {type}
                <button
                  onClick={() => handleRemoveType(type)}
                  className="hover:bg-orange-300 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${type}`}
                >
                  <X className="w-3 h-3" />
                </button>
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
              <CoworkingFiltersBar filters={filters} onFilterChange={handleFilterChange} />
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
