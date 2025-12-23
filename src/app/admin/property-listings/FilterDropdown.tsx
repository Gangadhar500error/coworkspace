"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Filter } from "lucide-react";
import { useTheme } from "@/app/admin/_components/ThemeProvider";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    workspaceType: string;
    propertyStatus: string;
    verificationStatus: string;
  };
  onFilterChange: (key: "workspaceType" | "propertyStatus" | "verificationStatus", value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  getStatusColor: (status: string) => string;
  getVerificationColor: (status: string) => string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function FilterDropdown({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
  getStatusColor,
  getVerificationColor,
  buttonRef,
}: FilterDropdownProps) {
  const { isDarkMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside and ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, buttonRef]);

  const getWorkspaceTypeColor = (type: string) => {
    switch (type) {
      case "Coworking":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "Private Office":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      case "Meeting Room":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Virtual Office":
        return "bg-orange-500/10 text-orange-500 border-orange-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <>
      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 z-50 w-full sm:w-[500px] md:w-[600px] lg:w-[700px]"
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`rounded-xl shadow-2xl border overflow-hidden ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between p-4 border-b ${
                  isDarkMode ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isDarkMode
                        ? "bg-[#FF5A22]/10 text-[#FF5A22]"
                        : "bg-[#FF5A22]/10 text-[#FF5A22]"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className={`text-base font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Search & Filters
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded-lg transition-all ${
                    isDarkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="Close dropdown"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className={`p-4 space-y-4 max-h-[70vh] overflow-y-auto ${
                isDarkMode ? "scrollbar-dark" : "scrollbar-light"
              }`}>
                {/* Search Bar */}
                <div className="space-y-2">
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wide ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Search
                  </label>
                  <div className="relative">
                    <Search
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search by property name, city, area, brand..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-all ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                      }`}
                    />
                  </div>
                </div>

                {/* Active Filter Chips */}
                {activeFiltersCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <label
                      className={`block text-xs font-semibold uppercase tracking-wide ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Active Filters ({activeFiltersCount})
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {filters.workspaceType && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getWorkspaceTypeColor(
                            filters.workspaceType
                          )}`}
                        >
                          Type: {filters.workspaceType}
                          <button
                            onClick={() => onFilterChange("workspaceType", "")}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Remove workspace type filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {filters.propertyStatus && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            filters.propertyStatus
                          )}`}
                        >
                          Status: {filters.propertyStatus}
                          <button
                            onClick={() => onFilterChange("propertyStatus", "")}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Remove status filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {filters.verificationStatus && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getVerificationColor(
                            filters.verificationStatus
                          )}`}
                        >
                          Verification: {filters.verificationStatus}
                          <button
                            onClick={() => onFilterChange("verificationStatus", "")}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Remove verification filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Filters Grid */}
                <div className="space-y-3">
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wide ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Filter Options
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Workspace Type Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dropdown-workspaceType"
                        className={`block text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Workspace Type
                      </label>
                      <select
                        id="dropdown-workspaceType"
                        value={filters.workspaceType}
                        onChange={(e) => onFilterChange("workspaceType", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                        }`}
                      >
                        <option value="">All Types</option>
                        <option value="Coworking">Coworking</option>
                        <option value="Private Office">Private Office</option>
                        <option value="Meeting Room">Meeting Room</option>
                        <option value="Virtual Office">Virtual Office</option>
                      </select>
                    </div>

                    {/* Property Status Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dropdown-propertyStatus"
                        className={`block text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Property Status
                      </label>
                      <select
                        id="dropdown-propertyStatus"
                        value={filters.propertyStatus}
                        onChange={(e) => onFilterChange("propertyStatus", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                        }`}
                      >
                        <option value="">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Verification Status Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dropdown-verificationStatus"
                        className={`block text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Verification Status
                      </label>
                      <select
                        id="dropdown-verificationStatus"
                        value={filters.verificationStatus}
                        onChange={(e) => onFilterChange("verificationStatus", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                        }`}
                      >
                        <option value="">All Verification</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              {activeFiltersCount > 0 && (
                <div
                  className={`flex items-center justify-end gap-2 p-4 border-t ${
                    isDarkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={onClearFilters}
                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-all ${
                      isDarkMode
                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                        : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                    }`}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
