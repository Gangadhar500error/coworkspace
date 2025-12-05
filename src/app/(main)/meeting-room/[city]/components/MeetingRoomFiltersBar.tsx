"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface MeetingRoomFilterState {
  city: string;
  capacity: string;
  price_range: string;
  room_features: string[];
  booking_type: string;
}

interface MeetingRoomFiltersBarProps {
  filters: MeetingRoomFilterState;
  onFilterChange: (filters: MeetingRoomFilterState) => void;
}

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-50", label: "Under $50/hr" },
  { value: "50-100", label: "$50 - $100/hr" },
  { value: "100-200", label: "$100 - $200/hr" },
  { value: "200+", label: "$200+/hr" }
];

const capacityOptions = [
  { value: "all", label: "All Capacities" },
  { value: "1-4", label: "1-4 People" },
  { value: "5-10", label: "5-10 People" },
  { value: "11-20", label: "11-20 People" },
  { value: "21-50", label: "21-50 People" },
  { value: "50+", label: "50+ People" }
];

const bookingTypes = [
  { value: "all", label: "All Booking Types" },
  { value: "hourly", label: "Hourly" },
  { value: "half_day", label: "Half Day" },
  { value: "full_day", label: "Full Day" },
  { value: "monthly", label: "Monthly" }
];

const roomFeatures = [
  { id: "projector", label: "Projector" },
  { id: "whiteboard", label: "Whiteboard" },
  { id: "video_conferencing", label: "Video Conferencing" },
  { id: "phone_booth", label: "Phone Booth" },
  { id: "catering", label: "Catering" },
  { id: "wifi", label: "WiFi" },
  { id: "ac", label: "AC" },
  { id: "natural_light", label: "Natural Light" }
];

export default function MeetingRoomFiltersBar({ filters, onFilterChange }: MeetingRoomFiltersBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handlePriceChange = (value: string) => {
    onFilterChange({ ...filters, price_range: value });
    setOpenDropdown(null);
  };

  const handleCapacityChange = (value: string) => {
    onFilterChange({ ...filters, capacity: value });
    setOpenDropdown(null);
  };

  const handleBookingTypeChange = (value: string) => {
    onFilterChange({ ...filters, booking_type: value });
    setOpenDropdown(null);
  };

  const toggleRoomFeature = (feature: string) => {
    const newFeatures = filters.room_features.includes(feature)
      ? filters.room_features.filter(f => f !== feature)
      : [...filters.room_features, feature];
    onFilterChange({ ...filters, room_features: newFeatures });
  };

  const clearAllFilters = () => {
    onFilterChange({
      city: filters.city, // Keep city as it's usually from URL
      capacity: "all",
      price_range: "all",
      room_features: [],
      booking_type: "all"
    });
  };

  const hasActiveFilters = 
    filters.capacity !== "all" ||
    filters.price_range !== "all" ||
    filters.booking_type !== "all" ||
    filters.room_features.length > 0;

  // Get selected filter labels
  const getSelectedFilters = () => {
    const selected: Array<{ label: string; onRemove: () => void }> = [];
    
    if (filters.capacity !== "all") {
      selected.push({
        label: capacityOptions.find(c => c.value === filters.capacity)?.label || "",
        onRemove: () => handleCapacityChange("all")
      });
    }
    
    if (filters.price_range !== "all") {
      selected.push({
        label: priceRanges.find(r => r.value === filters.price_range)?.label || "",
        onRemove: () => handlePriceChange("all")
      });
    }
    
    if (filters.booking_type !== "all") {
      selected.push({
        label: bookingTypes.find(b => b.value === filters.booking_type)?.label || "",
        onRemove: () => handleBookingTypeChange("all")
      });
    }
    
    filters.room_features.forEach(feature => {
      const featureLabel = roomFeatures.find(f => f.id === feature)?.label || feature;
      selected.push({
        label: featureLabel,
        onRemove: () => toggleRoomFeature(feature)
      });
    });
    
    return selected;
  };

  const selectedFilters = getSelectedFilters();

  return (
    <div className="w-full">
      {/* Single Row: All Filter Buttons, Selected Chips, and Clear Button */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
        {/* Capacity Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "capacity" ? null : "capacity")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.capacity !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Capacity
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "capacity" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "capacity" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {capacityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleCapacityChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.capacity === option.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

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

        {/* Booking Type Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "booking_type" ? null : "booking_type")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.booking_type !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Booking Type
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "booking_type" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "booking_type" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {bookingTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleBookingTypeChange(type.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.booking_type === type.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Room Features Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "room_features" ? null : "room_features")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.room_features.length > 0 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Features
            {filters.room_features.length > 0 && (
              <span className="bg-[#FF5A22] text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">
                {filters.room_features.length}
              </span>
            )}
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "room_features" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "room_features" && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto">
              {roomFeatures.map((feature) => (
                <label
                  key={feature.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.room_features.includes(feature.id)}
                    onChange={() => toggleRoomFeature(feature.id)}
                    className="w-4 h-4 text-[#4ECDC4] border-gray-300 rounded focus:ring-[#4ECDC4] transition-colors"
                  />
                  <span className="text-sm text-gray-700">{feature.label}</span>
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
