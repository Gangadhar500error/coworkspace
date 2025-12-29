"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  ChevronDown,
  Star,
  Edit,
  Trash2,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  User,
  Building2,
  Quote,
} from "lucide-react";
import Image from "next/image";
import { Testimonial } from "@/types/testimonial";
import { mockTestimonials, filterTestimonials } from "@/data/testimonials";
import { Pagination } from "@/components/pagination";

export default function TestimonialsPage() {
  const { isDarkMode } = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    isFeatured: "" as "" | "featured" | "not-featured",
    isActive: "" as "" | "active" | "inactive",
    rating: "" as "" | "1" | "2" | "3" | "4" | "5",
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

  const handleEdit = (testimonial: Testimonial) => {
    console.log("Edit testimonial:", testimonial.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      console.log("Delete testimonial:", id);
    }
  };

  const handleAdd = () => {
    console.log("Add new testimonial");
  };

  const filteredTestimonials = filterTestimonials(mockTestimonials, searchTerm, filters);
  
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

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
      isFeatured: "",
      isActive: "",
      rating: "",
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : isDarkMode
            ? "text-gray-600"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Testimonials
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage customer testimonials and reviews
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search testimonials..."
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
                      Featured
                    </label>
                    <select
                      value={filters.isFeatured}
                      onChange={(e) => handleFilterChange("isFeatured", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All</option>
                      <option value="featured">Featured</option>
                      <option value="not-featured">Not Featured</option>
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
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Rating
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange("rating", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
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
              <span className="hidden sm:inline">Add Testimonial</span>
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
                  Author
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Rating
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
              {paginatedTestimonials.map((testimonial, idx) => {
                const isExpanded = expandedRows.has(testimonial.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={testimonial.id}>
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
                          <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${
                            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"
                          }`}>
                            {testimonial.image ? (
                              <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <User className="w-5 h-5 text-[#FF5A22]" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{testimonial.name}</div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {testimonial.designation}
                              {testimonial.company && ` • ${testimonial.company}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {testimonial.propertyName ? (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#FF5A22]" />
                            <span className="text-sm">{testimonial.propertyName}</span>
                          </div>
                        ) : (
                          <span className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>N/A</span>
                        )}
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            testimonial.isActive
                              ? "bg-green-500/10 text-green-500 border-green-500/30"
                              : "bg-gray-500/10 text-gray-500 border-gray-500/30"
                          }`}>
                            {testimonial.isActive ? "Active" : "Inactive"}
                          </span>
                          {testimonial.isFeatured && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              isDarkMode
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                                : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                            }`}>
                              Featured
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEdit(testimonial)}
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
                            onClick={() => handleDelete(testimonial.id)}
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
                          onClick={() => toggleRow(testimonial.id)}
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
                          key={`expanded-${testimonial.id}`}
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
                              className="space-y-4"
                            >
                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`flex items-center gap-2 text-xs font-semibold uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  <Quote className="w-4 h-4" />
                                  Testimonial Content
                                </div>
                                <div className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  "{testimonial.content}"
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Author Details
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div><span className="font-medium">Name:</span> {testimonial.name}</div>
                                    {testimonial.designation && (
                                      <div><span className="font-medium">Designation:</span> {testimonial.designation}</div>
                                    )}
                                    {testimonial.company && (
                                      <div><span className="font-medium">Company:</span> {testimonial.company}</div>
                                    )}
                                  </div>
                                </div>

                                {testimonial.propertyName && (
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Related Property
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="font-medium">{testimonial.propertyName}</div>
                                      {testimonial.propertyId && (
                                        <div className="text-xs mt-1">ID: {testimonial.propertyId}</div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Timestamps
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div><span className="font-medium">Created:</span> {formatDate(testimonial.createdAt)}</div>
                                    <div><span className="font-medium">Updated:</span> {formatDate(testimonial.updatedAt)}</div>
                                  </div>
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

      {filteredTestimonials.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredTestimonials.length}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          isDarkMode={isDarkMode}
        />
      )}

      {filteredTestimonials.length === 0 && (
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <Star className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No testimonials found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {searchTerm ? "Try adjusting your search criteria" : "No testimonials have been added yet"}
          </p>
        </div>
      )}
    </div>
  );
}
