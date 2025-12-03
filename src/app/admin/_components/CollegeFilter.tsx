"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

interface CollegeFilterProps {
  isDarkMode: boolean;
  onFilterChange: (filters: FilterState) => void;
  renderButtonOnly?: boolean;
  renderPanelOnly?: boolean;
  onButtonClick?: () => void;
  isOpen?: boolean;
}

interface FilterState {
  search: string;
  status: string;
  role: string;
  country: string;
  state: string;
  city: string;
}

export default function CollegeFilter({ 
  isDarkMode, 
  onFilterChange, 
  renderButtonOnly = false,
  renderPanelOnly = false,
  onButtonClick,
  isOpen: externalIsOpen
}: CollegeFilterProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    role: "all",
    country: "all",
    state: "all",
    city: "all",
  });
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        // Don't close if clicking inside, let user control it
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      status: "all",
      role: "all",
      country: "all",
      state: "all",
      city: "all",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.search || 
    filters.status !== "all" || 
    filters.role !== "all" || 
    filters.country !== "all" || 
    filters.state !== "all" || 
    filters.city !== "all";

  const FilterButton = () => (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
        isDarkMode
          ? "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-200"
          : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
      } ${hasActiveFilters ? "border-[#FF5A22]" : ""}`}
    >
      <Filter className="w-4 h-4" />
      Filters
      {hasActiveFilters && (
        <span className="ml-1 px-1.5 py-0.5 bg-[#FF5A22] text-white text-xs rounded-full">
          {[filters.search, filters.status, filters.role, filters.country, filters.state, filters.city].filter(f => f && f !== "all").length}
        </span>
      )}
    </button>
  );

  if (renderButtonOnly) {
    return <FilterButton />;
  }

  return (
    <div className="space-y-4" ref={filterRef}>
      {/* Filter Toggle - only show if not rendering panel only */}
      {!renderPanelOnly && (
        <div className="flex items-center justify-between">
          <FilterButton />
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      )}
      
      {/* Clear button for panel only mode */}
      {renderPanelOnly && hasActiveFilters && (
        <div className="flex justify-end mb-2">
          <button
            onClick={clearFilters}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      )}

      {/* Filter Panel */}
      {renderPanelOnly ? (
        <div className={`rounded-xl border p-4 space-y-4 ${
          isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"
        }`}>
              {/* Search */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Search
                </label>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`} />
                  <input
                    type="text"
                    placeholder="Search by name, username, email..."
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  />
                </div>
              </div>

              {/* Filter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilter("status", e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Role Filter */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Role
                  </label>
                  <select
                    value={filters.role}
                    onChange={(e) => updateFilter("role", e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="all">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                {/* Country Filter */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Country
                  </label>
                  <select
                    value={filters.country}
                    onChange={(e) => updateFilter("country", e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="all">All Countries</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                {/* State Filter */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    State
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) => updateFilter("state", e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="all">All States</option>
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                    <option value="Texas">Texas</option>
                    <option value="Florida">Florida</option>
                  </select>
                </div>

                {/* City Filter */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    City
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => updateFilter("city", e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="all">All Cities</option>
                    <option value="Boston">Boston</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                  </select>
                </div>
              </div>
            </div>
      ) : (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className={`rounded-xl border p-4 space-y-4 ${
                isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"
              }`}>
                {/* Search */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Search
                  </label>
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`} />
                    <input
                      type="text"
                      placeholder="Search by name, username, email..."
                      value={filters.search}
                      onChange={(e) => updateFilter("search", e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      }`}
                    />
                  </div>
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => updateFilter("status", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>

                  {/* Role Filter */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Role
                    </label>
                    <select
                      value={filters.role}
                      onChange={(e) => updateFilter("role", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      }`}
                    >
                      <option value="all">All Roles</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  {/* Country Filter */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Country
                    </label>
                    <select
                      value={filters.country}
                      onChange={(e) => updateFilter("country", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      }`}
                    >
                      <option value="all">All Countries</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  {/* State Filter */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      State
                    </label>
                    <select
                      value={filters.state}
                      onChange={(e) => updateFilter("state", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      }`}
                    >
                      <option value="all">All States</option>
                      <option value="California">California</option>
                      <option value="New York">New York</option>
                      <option value="Texas">Texas</option>
                      <option value="Florida">Florida</option>
                    </select>
                  </div>

                  {/* City Filter */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      City
                    </label>
                    <select
                      value={filters.city}
                      onChange={(e) => updateFilter("city", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      }`}
                    >
                      <option value="all">All Cities</option>
                      <option value="Boston">Boston</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

