"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import { useTheme } from "../_components/ThemeProvider";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    paymentStatus: "" | "paid" | "pending" | "failed" | "refunded";
    paymentMethod: "" | "credit_card" | "debit_card" | "bank_transfer" | "upi" | "wallet" | "cash";
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

  const paymentStatusOptions = [
    { value: "", label: "All Status" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
    { value: "refunded", label: "Refunded" },
  ];

  const paymentMethodOptions = [
    { value: "", label: "All Methods" },
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "upi", label: "UPI" },
    { value: "wallet", label: "Wallet" },
    { value: "cash", label: "Cash" },
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

              {/* Payment Method Filter */}
              <div>
                <label className={`block text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Payment Method
                </label>
                <select
                  value={filters.paymentMethod}
                  onChange={(e) => onFilterChange("paymentMethod", e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {paymentMethodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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

