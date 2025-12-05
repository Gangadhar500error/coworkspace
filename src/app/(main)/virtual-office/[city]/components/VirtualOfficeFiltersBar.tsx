"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface VirtualOfficeFilterState {
  city: string;
  plan_type: string;
  gst_support: string;
  mail_handling: string;
}

interface VirtualOfficeFiltersBarProps {
  filters: VirtualOfficeFilterState;
  onFilterChange: (filters: VirtualOfficeFilterState) => void;
}

const planTypes = [
  { value: "all", label: "All Plans" },
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
  { value: "enterprise", label: "Enterprise" }
];

const gstSupportOptions = [
  { value: "all", label: "All GST Support" },
  { value: "yes", label: "GST Supported" },
  { value: "no", label: "No GST" }
];

const mailHandlingOptions = [
  { value: "all", label: "All Mail Handling" },
  { value: "yes", label: "Mail Handling Included" },
  { value: "no", label: "No Mail Handling" }
];

export default function VirtualOfficeFiltersBar({ filters, onFilterChange }: VirtualOfficeFiltersBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handlePlanTypeChange = (value: string) => {
    onFilterChange({ ...filters, plan_type: value });
    setOpenDropdown(null);
  };

  const handleGstSupportChange = (value: string) => {
    onFilterChange({ ...filters, gst_support: value });
    setOpenDropdown(null);
  };

  const handleMailHandlingChange = (value: string) => {
    onFilterChange({ ...filters, mail_handling: value });
    setOpenDropdown(null);
  };

  const clearAllFilters = () => {
    onFilterChange({
      city: filters.city, // Keep city as it's usually from URL
      plan_type: "all",
      gst_support: "all",
      mail_handling: "all"
    });
  };

  const hasActiveFilters = 
    filters.plan_type !== "all" ||
    filters.gst_support !== "all" ||
    filters.mail_handling !== "all";

  // Get selected filter labels
  const getSelectedFilters = () => {
    const selected: Array<{ label: string; onRemove: () => void }> = [];
    
    if (filters.plan_type !== "all") {
      selected.push({
        label: planTypes.find(p => p.value === filters.plan_type)?.label || "",
        onRemove: () => handlePlanTypeChange("all")
      });
    }
    
    if (filters.gst_support !== "all") {
      selected.push({
        label: gstSupportOptions.find(g => g.value === filters.gst_support)?.label || "",
        onRemove: () => handleGstSupportChange("all")
      });
    }
    
    if (filters.mail_handling !== "all") {
      selected.push({
        label: mailHandlingOptions.find(m => m.value === filters.mail_handling)?.label || "",
        onRemove: () => handleMailHandlingChange("all")
      });
    }
    
    return selected;
  };

  const selectedFilters = getSelectedFilters();

  return (
    <div className="w-full">
      {/* Single Row: All Filter Buttons, Selected Chips, and Clear Button */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
        {/* Plan Type Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "plan_type" ? null : "plan_type")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.plan_type !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Plan Type
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "plan_type" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "plan_type" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {planTypes.map((plan) => (
                <button
                  key={plan.value}
                  onClick={() => handlePlanTypeChange(plan.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.plan_type === plan.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {plan.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GST Support Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "gst_support" ? null : "gst_support")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.gst_support !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            GST Support
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "gst_support" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "gst_support" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {gstSupportOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleGstSupportChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.gst_support === option.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mail Handling Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === "mail_handling" ? null : "mail_handling")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
              filters.mail_handling !== "all" 
                ? "border-[#4ECDC4] bg-[#4ECDC4]/10 text-[#4ECDC4]" 
                : "border-gray-300 text-gray-700"
            }`}
          >
            Mail Handling
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === "mail_handling" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "mail_handling" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {mailHandlingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleMailHandlingChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    filters.mail_handling === option.value ? "bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
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
