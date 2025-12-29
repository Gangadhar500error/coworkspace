"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  ChevronDown,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Currency } from "@/types/currency";
import { mockCurrencies, filterCurrencies } from "@/data/currencies";
import { Pagination } from "@/components/pagination";

export default function CurrenciesPage() {
  const { isDarkMode } = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    isActive: "" as "" | "active" | "inactive",
    isBase: "" as "" | "base" | "non-base",
  });

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleEdit = (currency: Currency) => {
    console.log("Edit currency:", currency.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this currency?")) {
      console.log("Delete currency:", id);
    }
  };

  const handleAdd = () => {
    console.log("Add new currency");
  };

  const handleToggleActive = (id: number, currentStatus: boolean) => {
    console.log(`Toggle currency ${id} active status: ${!currentStatus}`);
  };

  const filteredCurrencies = filterCurrencies(mockCurrencies, searchTerm, filters);
  
  const totalPages = Math.ceil(filteredCurrencies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCurrencies = filteredCurrencies.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      isActive: "",
      isBase: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter((f) => f !== "").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatExchangeRate = (rate: number) => {
    return rate.toFixed(4);
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Currencies
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all supported currencies and exchange rates
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              />
            </div>

            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all border ${
                  activeFiltersCount > 0
                    ? isDarkMode
                      ? "bg-[#FF5A22]/10 border-[#FF5A22]/30 text-[#FF5A22] hover:bg-[#FF5A22]/20"
                      : "bg-[#FF5A22]/5 border-[#FF5A22]/20 text-[#FF5A22] hover:bg-[#FF5A22]/10"
                    : isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
                {activeFiltersCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isDarkMode ? "bg-[#FF5A22] text-white" : "bg-[#FF5A22] text-white"
                  }`}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-lg border shadow-lg p-4 space-y-3"
                  style={{ backgroundColor: isDarkMode ? "#1f2937" : "white", borderColor: isDarkMode ? "#374151" : "#e5e7eb" }}>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Status
                    </label>
                    <select
                      value={filters.isActive}
                      onChange={(e) => handleFilterChange("isActive", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Base Currency
                    </label>
                    <select
                      value={filters.isBase}
                      onChange={(e) => handleFilterChange("isBase", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All</option>
                      <option value="base">Base Currency</option>
                      <option value="non-base">Non-Base</option>
                    </select>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                        isDarkMode
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isDarkMode
                  ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                  : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add Currency</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  S.No
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Currency
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Code
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Exchange Rate
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedCurrencies.map((currency, idx) => {
                const isExpanded = expandedRows.has(currency.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={currency.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`transition-colors ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
                    >
                      <td className={`px-4 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <span className="text-sm font-medium">{serialNumber}</span>
                      </td>

                      <td className={`px-4 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"
                          }`}>
                            <DollarSign className="w-5 h-5 text-[#FF5A22]" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{currency.name}</div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {currency.symbol} {currency.symbolPosition === "before" ? "(before)" : "(after)"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <span className="font-mono text-sm font-medium">{currency.code}</span>
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {formatExchangeRate(currency.exchangeRate)}
                          </span>
                        </div>
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            currency.isActive
                              ? "bg-green-500/10 text-green-500 border-green-500/30"
                              : "bg-gray-500/10 text-gray-500 border-gray-500/30"
                          }`}>
                            {currency.isActive ? "Active" : "Inactive"}
                          </span>
                          {currency.isBase && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              isDarkMode
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                : "bg-blue-50 text-blue-600 border border-blue-200"
                            }`}>
                              Base
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEdit(currency)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "text-yellow-400 hover:bg-yellow-500/10"
                                : "text-yellow-600 hover:bg-yellow-100"
                            }`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(currency.id)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "text-red-400 hover:bg-red-500/10"
                                : "text-red-600 hover:bg-red-100"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => toggleRow(currency.id)}
                          className={`p-1.5 rounded-lg transition-all ${
                            isDarkMode
                              ? "hover:bg-gray-800 text-gray-400 hover:text-[#FF5A22]"
                              : "hover:bg-gray-100 text-gray-500 hover:text-[#FF5A22]"
                          }`}
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.div>
                        </button>
                      </td>
                    </motion.tr>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          key={`expanded-${currency.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className={`overflow-hidden ${isDarkMode ? "bg-gray-800/30" : "bg-gray-50"}`}
                        >
                          <td colSpan={7} className="px-4 py-6">
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Symbol Details
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Symbol:</span> {currency.symbol}</div>
                                  <div><span className="font-medium">Position:</span> {currency.symbolPosition}</div>
                                  <div><span className="font-medium">Decimals:</span> {currency.decimalPlaces}</div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Exchange Rate
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div className="text-lg font-bold">{formatExchangeRate(currency.exchangeRate)}</div>
                                  <div className="text-xs">Relative to base currency</div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Timestamps
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Created:</span> {formatDate(currency.createdAt)}</div>
                                  <div><span className="font-medium">Updated:</span> {formatDate(currency.updatedAt)}</div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCurrencies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredCurrencies.length}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          isDarkMode={isDarkMode}
        />
      )}

      {filteredCurrencies.length === 0 && (
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <DollarSign className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No currencies found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {searchTerm ? "Try adjusting your search criteria" : "No currencies have been added yet"}
          </p>
        </div>
      )}
    </div>
  );
}
