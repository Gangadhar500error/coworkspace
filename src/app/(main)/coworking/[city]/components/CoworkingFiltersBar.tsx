"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface CoworkingFilterState {
  city: string;
  price_range: string;
  amenities: string[];
  availability: string;
  seat_type: string;
}

interface CoworkingFiltersBarProps {
  filters: CoworkingFilterState;
  onFilterChange: (filters: CoworkingFilterState) => void;
}

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-300", label: "Under $300" },
  { value: "300-500", label: "$300 - $500" },
  { value: "500-700", label: "$500 - $700" },
  { value: "700+", label: "$700+" }
];

const availabilityOptions = [
  { value: "all", label: "All Availability" },
  { value: "available_now", label: "Available Now" },
  { value: "available_soon", label: "Available Soon" },
  { value: "waitlist", label: "Waitlist" }
];

const seatTypes = [
  { value: "all", label: "All Seat Types" },
  { value: "hot_desk", label: "Hot Desk" },
  { value: "dedicated_desk", label: "Dedicated Desk" },
  { value: "private_cabin", label: "Private Cabin" },
  { value: "meeting_room", label: "Meeting Room Access" }
];

const amenitiesList = [
  { id: "ac", label: "AC" },
  { id: "non_ac", label: "Non-AC" },
  { id: "parking", label: "Parking" },
  { id: "wifi", label: "WiFi" },
  { id: "pantry", label: "Pantry" },
  { id: "24_7_access", label: "24/7 Access" },
  { id: "meeting_rooms", label: "Meeting Rooms" },
  { id: "printing", label: "Printing" }
];

export default function CoworkingFiltersBar({ filters, onFilterChange }: CoworkingFiltersBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handlePriceChange = (value: string) => {
    onFilterChange({ ...filters, price_range: value });
    setOpenDropdown(null);
  };

  const handleAvailabilityChange = (value: string) => {
    onFilterChange({ ...filters, availability: value });
    setOpenDropdown(null);
  };

  const handleSeatTypeChange = (value: string) => {
    onFilterChange({ ...filters, seat_type: value });
    setOpenDropdown(null);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  const clearAllFilters = () => {
    onFilterChange({
      city: filters.city, // Keep city as it's usually from URL
      price_range: "all",
      amenities: [],
      availability: "all",
      seat_type: "all"
    });
  };

  const hasActiveFilters = 
    filters.price_range !== "all" ||
    filters.availability !== "all" ||
    filters.seat_type !== "all" ||
    filters.amenities.length > 0;

  // Get selected filter labels
  const getSelectedFilters = () => {
    const selected: Array<{ label: string; onRemove: () => void }> = [];
    
    if (filters.price_range !== "all") {
      selected.push({
        label: priceRanges.find(r => r.value === filters.price_range)?.label || "",
        onRemove: () => handlePriceChange("all")
      });
    }
    
    if (filters.availability !== "all") {
      selected.push({
        label: availabilityOptions.find(a => a.value === filters.availability)?.label || "",
        onRemove: () => handleAvailabilityChange("all")
      });
    }
    
    if (filters.seat_type !== "all") {
      selected.push({
        label: seatTypes.find(s => s.value === filters.seat_type)?.label || "",
        onRemove: () => handleSeatTypeChange("all")
      });
    }
    
    filters.amenities.forEach(amenity => {
      const amenityLabel = amenitiesList.find(a => a.id === amenity)?.label || amenity;
      selected.push({
        label: amenityLabel,
        onRemove: () => toggleAmenity(amenity)
      });
    });
    
    return selected;
  };

  const selectedFilters = getSelectedFilters();

  return (
    <div className="w-full">
      {/* Single Row: All Filter Buttons, Selected Chips, and Clear Button */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.price_range !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Price
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "price" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "price" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handlePriceChange(range.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.price_range === range.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "availability" ? null : "availability")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.availability !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Availability
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "availability" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "availability" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {availabilityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAvailabilityChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.availability === option.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Seat Type Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "seat_type" ? null : "seat_type")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.seat_type !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Seat Type
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "seat_type" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "seat_type" && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {seatTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleSeatTypeChange(type.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.seat_type === type.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amenities Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "amenities" ? null : "amenities")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.amenities.length > 0 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Amenities
            {filters.amenities.length > 0 && (
              <span className="bg-[#FF5A22] text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">
                {filters.amenities.length}
              </span>
            )}
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "amenities" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "amenities" && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                    className="w-4 h-4 text-[#4ECDC4] border-gray-300 rounded focus:ring-[#4ECDC4] transition-colors"
                  />
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Selected Filter Chips - Inline with filter buttons */}
        {selectedFilters.map((filter, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs rounded-full border border-[#4ECDC4]/20 transition-all hover:bg-[#4ECDC4]/20 animate-in fade-in slide-in-from-left-1 duration-200"
          >
            <span className="truncate max-w-[120px] sm:max-w-none">{filter.label}</span>
            <button
              onClick={filter.onRemove}
              className="hover:text-[#3ab5ad] shrink-0 transition-colors"
              aria-label="Remove filter"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* Clear All Button - At the end */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg transition-all whitespace-nowrap shadow-sm hover:shadow-md ml-auto"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Clear all</span>
            <span className="sm:hidden">Clear</span>
          </button>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}
