"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface PrivateOfficeFilterState {
  city: string;
  capacity: string;
  lockable: string;
  furnishing: string;
  contract_term: string;
  amenities: string[];
}

interface PrivateOfficeFiltersBarProps {
  filters: PrivateOfficeFilterState;
  onFilterChange: (filters: PrivateOfficeFilterState) => void;
}

const capacityOptions = [
  { value: "all", label: "All Capacities" },
  { value: "1-2", label: "1-2 People" },
  { value: "3-5", label: "3-5 People" },
  { value: "6-10", label: "6-10 People" },
  { value: "11-20", label: "11-20 People" },
  { value: "21+", label: "21+ People" }
];

const lockableOptions = [
  { value: "all", label: "All Lockable Options" },
  { value: "yes", label: "Lockable" },
  { value: "no", label: "Not Lockable" }
];

const furnishingOptions = [
  { value: "all", label: "All Furnishing" },
  { value: "fully_furnished", label: "Fully Furnished" },
  { value: "semi_furnished", label: "Semi Furnished" },
  { value: "unfurnished", label: "Unfurnished" }
];

const contractTerms = [
  { value: "all", label: "All Contract Terms" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "half_yearly", label: "Half Yearly" },
  { value: "yearly", label: "Yearly" },
  { value: "flexible", label: "Flexible" }
];

const amenitiesList = [
  { id: "ac", label: "AC" },
  { id: "parking", label: "Parking" },
  { id: "wifi", label: "WiFi" },
  { id: "pantry", label: "Pantry" },
  { id: "reception", label: "Reception" },
  { id: "security", label: "Security" },
  { id: "meeting_rooms", label: "Meeting Rooms" },
  { id: "printing", label: "Printing" }
];

export default function PrivateOfficeFiltersBar({ filters, onFilterChange }: PrivateOfficeFiltersBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleCapacityChange = (value: string) => {
    onFilterChange({ ...filters, capacity: value });
    setOpenDropdown(null);
  };

  const handleLockableChange = (value: string) => {
    onFilterChange({ ...filters, lockable: value });
    setOpenDropdown(null);
  };

  const handleFurnishingChange = (value: string) => {
    onFilterChange({ ...filters, furnishing: value });
    setOpenDropdown(null);
  };

  const handleContractTermChange = (value: string) => {
    onFilterChange({ ...filters, contract_term: value });
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
      capacity: "all",
      lockable: "all",
      furnishing: "all",
      contract_term: "all",
      amenities: []
    });
  };

  const hasActiveFilters = 
    filters.capacity !== "all" ||
    filters.lockable !== "all" ||
    filters.furnishing !== "all" ||
    filters.contract_term !== "all" ||
    filters.amenities.length > 0;

  // Get selected filter labels
  const getSelectedFilters = () => {
    const selected: Array<{ label: string; onRemove: () => void }> = [];
    
    if (filters.capacity !== "all") {
      selected.push({
        label: capacityOptions.find(c => c.value === filters.capacity)?.label || "",
        onRemove: () => handleCapacityChange("all")
      });
    }
    
    if (filters.lockable !== "all") {
      selected.push({
        label: lockableOptions.find(l => l.value === filters.lockable)?.label || "",
        onRemove: () => handleLockableChange("all")
      });
    }
    
    if (filters.furnishing !== "all") {
      selected.push({
        label: furnishingOptions.find(f => f.value === filters.furnishing)?.label || "",
        onRemove: () => handleFurnishingChange("all")
      });
    }
    
    if (filters.contract_term !== "all") {
      selected.push({
        label: contractTerms.find(t => t.value === filters.contract_term)?.label || "",
        onRemove: () => handleContractTermChange("all")
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

        {/* Lockable Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "lockable" ? null : "lockable")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.lockable !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Lockable
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "lockable" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "lockable" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {lockableOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLockableChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.lockable === option.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Furnishing Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "furnishing" ? null : "furnishing")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.furnishing !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Furnishing
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "furnishing" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "furnishing" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {furnishingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFurnishingChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.furnishing === option.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contract Term Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "contract_term" ? null : "contract_term")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.contract_term !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Contract Term
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "contract_term" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "contract_term" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {contractTerms.map((term) => (
                <button
                  key={term.value}
                  onClick={() => handleContractTermChange(term.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.contract_term === term.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {term.label}
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
