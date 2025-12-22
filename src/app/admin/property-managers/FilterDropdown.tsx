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
    status: string;
    mobileVerification: string;
    role: string;
  };
  onFilterChange: (key: "status" | "mobileVerification" | "role", value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  getStatusColor: (status: string) => string;
  getMobileVerificationColor: (verification: string) => string;
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
  getMobileVerificationColor,
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
                      placeholder="Search by name, email, mobile..."
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
                      {filters.status && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            filters.status
                          )}`}
                        >
                          Status: {filters.status}
                          <button
                            onClick={() => onFilterChange("status", "")}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Remove status filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {filters.mobileVerification && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getMobileVerificationColor(
                            filters.mobileVerification
                          )}`}
                        >
                          Verification: {filters.mobileVerification}
                          <button
                            onClick={() =>
                              onFilterChange("mobileVerification", "")
                            }
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Remove verification filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {filters.role && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            isDarkMode
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                          }`}
                        >
                          Role: {filters.role}
                          <button
                            onClick={() => onFilterChange("role", "")}
                            className="hover:opacity-70 transition-opacity"
                            aria-label="Remove role filter"
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
                    {/* Status Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dropdown-status"
                        className={`block text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Status
                      </label>
                      <select
                        id="dropdown-status"
                        value={filters.status}
                        onChange={(e) => onFilterChange("status", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                        }`}
                      >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    {/* Mobile Verification Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dropdown-mobileVerification"
                        className={`block text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Mobile Verification
                      </label>
                      <select
                        id="dropdown-mobileVerification"
                        value={filters.mobileVerification}
                        onChange={(e) =>
                          onFilterChange("mobileVerification", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                        }`}
                      >
                        <option value="">All Verification</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    {/* Role Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dropdown-role"
                        className={`block text-xs font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Role
                      </label>
                      <select
                        id="dropdown-role"
                        value={filters.role}
                        onChange={(e) => onFilterChange("role", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-2 focus:ring-[#FF5A22]/20"
                        }`}
                      >
                        <option value="">All Roles</option>
                        <option value="Senior Property Manager">
                          Senior Property Manager
                        </option>
                        <option value="Property Manager">Property Manager</option>
                        <option value="Junior Property Manager">
                          Junior Property Manager
                        </option>
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

