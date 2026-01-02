"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Filter } from "lucide-react";
import { useTheme } from "../_components/ThemeProvider";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: "" | "completed" | "cancelled" | "pending" | "confirmed";
    propertyType: "" | "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office";
    paymentStatus: "" | "paid" | "pending" | "failed" | "refunded";
    customerId: string;
  };
  onFilterChange: (key: keyof FilterDropdownProps["filters"], value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export default function FilterDropdown({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
}: FilterDropdownProps) {
  const { isDarkMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const propertyTypeOptions = [
    { value: "", label: "All Types" },
    { value: "Coworking", label: "Coworking" },
    { value: "Private Office", label: "Private Office" },
    { value: "Meeting Room", label: "Meeting Room" },
    { value: "Virtual Office", label: "Virtual Office" },
  ];

  const paymentStatusOptions = [
    { value: "", label: "All Payment Status" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
    { value: "refunded", label: "Refunded" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Dropdown */}
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed right-4 top-20 w-80 rounded-xl border shadow-xl z-50 ${
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <div className="flex items-center gap-2">
                <Filter className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                <h3 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </h3>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Status Filter */}
              <div>
                <label className={`block text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Booking Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange("status", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label className={`block text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => onFilterChange("propertyType", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {propertyTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Status Filter */}
              <div>
                <label className={`block text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Payment Status
                </label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) => onFilterChange("paymentStatus", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {paymentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Filter */}
              <div>
                <label className={`block text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Customer ID {filters.customerId && <span className="text-[#FF5A22]">(Active)</span>}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter customer ID"
                    value={filters.customerId}
                    onChange={(e) => onFilterChange("customerId", e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {filters.customerId && (
                    <button
                      onClick={() => onFilterChange("customerId", "")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDarkMode
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                          : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      }`}
                      title="Clear customer filter"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-between p-4 border-t gap-2 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <button
                onClick={onClearFilters}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isDarkMode
                    ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                    : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                }`}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

