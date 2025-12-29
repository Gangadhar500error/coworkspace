"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  ChevronDown,
  Wifi,
  Edit,
  Trash2,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  Tag,
} from "lucide-react";
import { Amenity } from "@/types/amenity";
import { mockAmenities, filterAmenities } from "@/data/amenities";
import { Pagination } from "@/components/pagination";

export default function AmenitiesPage() {
  const { isDarkMode } = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    category: "" as "" | "basic" | "premium" | "tech" | "wellness" | "food" | "security" | "other",
    isActive: "" as "" | "active" | "inactive",
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

  const handleEdit = (amenity: Amenity) => {
    console.log("Edit amenity:", amenity.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this amenity?")) {
      console.log("Delete amenity:", id);
    }
  };

  const handleAdd = () => {
    console.log("Add new amenity");
  };

  const filteredAmenities = filterAmenities(mockAmenities, searchTerm, filters);
  
  const totalPages = Math.ceil(filteredAmenities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAmenities = filteredAmenities.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      isActive: "",
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basic":
        return isDarkMode
          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
          : "bg-blue-50 text-blue-600 border-blue-200";
      case "premium":
        return isDarkMode
          ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
          : "bg-purple-50 text-purple-600 border-purple-200";
      case "tech":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "wellness":
        return isDarkMode
          ? "bg-pink-500/10 text-pink-400 border-pink-500/30"
          : "bg-pink-50 text-pink-600 border-pink-200";
      case "food":
        return isDarkMode
          ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
          : "bg-orange-50 text-orange-600 border-orange-200";
      case "security":
        return isDarkMode
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-red-50 text-red-600 border-red-200";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Amenities
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all available amenities for properties
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search amenities..."
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
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All Categories</option>
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="tech">Tech</option>
                      <option value="wellness">Wellness</option>
                      <option value="food">Food</option>
                      <option value="security">Security</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
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
              <span className="hidden sm:inline">Add Amenity</span>
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
                  Amenity
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Category
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
              {paginatedAmenities.map((amenity, idx) => {
                const isExpanded = expandedRows.has(amenity.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={amenity.id}>
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
                            {amenity.icon ? (
                              <Wifi className="w-5 h-5 text-[#FF5A22]" />
                            ) : (
                              <Tag className="w-5 h-5 text-[#FF5A22]" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{amenity.name}</div>
                            {amenity.description && (
                              <div className={`text-xs truncate max-w-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {amenity.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(amenity.category)}`}>
                          {getCategoryLabel(amenity.category)}
                        </span>
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          amenity.isActive
                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                            : "bg-gray-500/10 text-gray-500 border-gray-500/30"
                        }`}>
                          {amenity.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEdit(amenity)}
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
                            onClick={() => handleDelete(amenity.id)}
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
                          onClick={() => toggleRow(amenity.id)}
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
                          key={`expanded-${amenity.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className={`overflow-hidden ${isDarkMode ? "bg-gray-800/30" : "bg-gray-50"}`}
                        >
                          <td colSpan={6} className="px-4 py-6">
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Amenity Details
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Name:</span> {amenity.name}</div>
                                  {amenity.icon && (
                                    <div><span className="font-medium">Icon:</span> {amenity.icon}</div>
                                  )}
                                  <div><span className="font-medium">Category:</span> {getCategoryLabel(amenity.category)}</div>
                                </div>
                              </div>

                              {amenity.description && (
                                <div className={`p-4 rounded-lg border md:col-span-2 ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Description
                                  </div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {amenity.description}
                                  </div>
                                </div>
                              )}

                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Timestamps
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Created:</span> {formatDate(amenity.createdAt)}</div>
                                  <div><span className="font-medium">Updated:</span> {formatDate(amenity.updatedAt)}</div>
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

      {filteredAmenities.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredAmenities.length}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          isDarkMode={isDarkMode}
        />
      )}

      {filteredAmenities.length === 0 && (
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <Wifi className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No amenities found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {searchTerm ? "Try adjusting your search criteria" : "No amenities have been added yet"}
          </p>
        </div>
      )}
    </div>
  );
}
