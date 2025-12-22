"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  Home,
  User,
  Image as ImageIcon,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { Property } from "@/types/property";
import { mockProperties, filterProperties } from "@/data/properties";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function PropertyListingsPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  // Filter states
  const [filters, setFilters] = useState({
    propertyType: "" as "" | "Residential" | "Commercial" | "Industrial" | "Land" | "Other",
    listingType: "" as "" | "Sale" | "Rent" | "Lease",
    status: "" as "" | "Available" | "Sold" | "Rented" | "Pending" | "Off Market",
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

  const handleView = (property: Property) => {
    const slug = property.slug || property.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    router.push(`/admin/property-listings/${slug}`);
  };

  const handleEdit = (property: Property) => {
    const slug = property.slug || property.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    router.push(`/admin/property-listings/${slug}/edit`);
  };

  const handleAccept = (id: number) => {
    console.log("Accept property:", id);
    // Implement accept functionality
  };

  const handleReject = (id: number) => {
    if (confirm("Are you sure you want to reject this property?")) {
      console.log("Reject property:", id);
      // Implement reject functionality
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Delete property:", id);
      // Implement delete functionality
    }
  };

  const handleAddProperty = () => {
    router.push("/admin/property-listings/add");
  };

  // Apply filters
  const applyFilters = (properties: Property[]) => {
    return properties.filter((property) => {
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }
      if (filters.listingType && property.listingType !== filters.listingType) {
        return false;
      }
      if (filters.status && property.status !== filters.status) {
        return false;
      }
      return true;
    });
  };

  const searchedProperties = filterProperties(mockProperties, searchTerm);
  const filteredProperties = applyFilters(searchedProperties);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter((f) => f !== "").length;

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      propertyType: "",
      listingType: "",
      status: "",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set()); // Close all expanded rows when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Sold":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "Rented":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Off Market":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-4">
        {/* Top Row - Heading and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Side - Heading */}
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Property Listings
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all property listings and their details
            </p>
          </div>

          {/* Right Side - Filter Icon and Add Button */}
          <div className="flex items-center gap-3 relative">
            {/* Filter Icon Button with Dropdown */}
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`relative flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all border ${
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

              {/* Filter Dropdown */}
              <FilterDropdown
                isOpen={showFilterDropdown}
                onClose={() => setShowFilterDropdown(false)}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                getStatusColor={getStatusColor}
                buttonRef={filterButtonRef}
              />
            </div>

            {/* Add Property Button */}
            <button
              onClick={handleAddProperty}
              className={`flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all ${
                isDarkMode
                  ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                  : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add New Property</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  S.No
                </th>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property Details
                </th>
                <th className={`hidden lg:table-cell px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Type
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Updated
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedProperties.map((property, idx) => {
                const isExpanded = expandedRows.has(property.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={property.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`transition-colors ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
                    >
                      {/* S.No */}
                      <td className={`px-3 md:px-4 lg:px-6 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <span className="text-sm font-medium">{serialNumber}</span>
                      </td>

                      {/* Property Details - Left Side */}
                      <td className={`px-3 md:px-4 lg:px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        <div className="flex items-start gap-3 md:gap-4">
                          {/* Image */}
                          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                            {property.images && property.images.length > 0 ? (
                              <Image
                                src={property.images[0]}
                                alt={property.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Home className={`w-8 h-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                              </div>
                            )}
                          </div>
                          
                          {/* Property Info */}
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm md:text-base truncate mb-1">{property.title}</div>
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                              <span className={`text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {property.city}, {property.state}
                              </span>
                            </div>
                            
                            {/* Accept/Reject Buttons */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => handleAccept(property.id)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                                  isDarkMode
                                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                                    : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                                }`}
                                title="Accept"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Accept
                              </button>
                              <button
                                onClick={() => handleReject(property.id)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                                  isDarkMode
                                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                                    : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                }`}
                                title="Reject"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type - Right Side */}
                      <td className={`hidden lg:table-cell px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Building2 className={`w-4 h-4 shrink-0 text-blue-500`} />
                            <span className="text-sm font-medium">{property.propertyType}</span>
                          </div>
                          {property.bedrooms !== null && property.bedrooms !== undefined && (
                            <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                              {property.bedrooms} Bed • {property.bathrooms} Bath
                            </div>
                          )}
                          <div className={`text-sm font-semibold mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {property.listingType === "Sale" 
                              ? formatPrice(property.price, property.currency)
                              : property.monthlyRent 
                              ? formatPrice(property.monthlyRent, property.currency) + "/mo"
                              : formatPrice(property.price, property.currency)
                            }
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getStatusColor(property.status)}`}>
                            {property.status || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Updated Time */}
                      <td className={`hidden md:table-cell px-4 lg:px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <div>
                            <div className="text-sm font-medium">{formatDate(property.listingDate)}</div>
                            {property.listingDate && (
                              <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                                {new Date(property.listingDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Actions - Right Side */}
                      <td className={`hidden md:table-cell px-4 lg:px-6 py-4`}>
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          <button
                            onClick={() => handleView(property)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "text-blue-400 hover:bg-blue-500/10"
                                : "text-blue-600 hover:bg-blue-100"
                            }`}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(property)}
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
                            onClick={() => handleDelete(property.id)}
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

                      {/* Expand Button - Always visible */}
                      <td className={`px-3 md:px-4 lg:px-6 py-4 text-center`}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleRow(property.id)}
                            className={`p-1.5 md:p-2 rounded-lg transition-all ${
                              isDarkMode
                                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            }`}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <span className="md:hidden text-xs font-semibold">
                              #{serialNumber}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="hidden md:block"
                            >
                              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.div>
                          </button>
                        </div>
                      </td>
                    </motion.tr>

                    {/* Expanded Row Details */}
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.tr
                          key={`expanded-${property.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.16, 1, 0.3, 1],
                            opacity: { duration: 0.3 }
                          }}
                        >
                          <td colSpan={6} className={`px-3 md:px-4 lg:px-6 py-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="space-y-4"
                            >
                              {/* Mobile Actions */}
                              <div className="md:hidden space-y-3 pb-3 border-b border-gray-200 dark:border-gray-800">
                                {/* Accept/Reject Buttons */}
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleAccept(property.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                                        : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                                    }`}
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleReject(property.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                                        : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                    }`}
                                  >
                                    <XCircle className="w-3 h-3" />
                                    Reject
                                  </button>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleView(property)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                    }`}
                                  >
                                    <Eye className="w-3 h-3" />
                                    View
                                  </button>
                                  <button
                                    onClick={() => handleEdit(property)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                        : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                                    }`}
                                  >
                                    <Edit className="w-3 h-3" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(property.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                        : "bg-red-50 text-red-600 hover:bg-red-100"
                                    }`}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                  </button>
                                </div>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Location */}
                                <div className="space-y-1">
                                  <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    <MapPin className="w-3 h-3" />
                                    Location
                                  </div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div>{property.address}</div>
                                    <div>{property.city}, {property.state} {property.zipCode}</div>
                                  </div>
                                </div>

                                {/* Property Details */}
                                {(property.bedrooms !== null && property.bedrooms !== undefined) && (
                                  <div className="space-y-1">
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Home className="w-3 h-3" />
                                      Details
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      {property.bedrooms} Bed • {property.bathrooms} Bath
                                      {property.squareFeet && <div>{property.squareFeet.toLocaleString()} sq ft</div>}
                                      {property.yearBuilt && <div>Built: {property.yearBuilt}</div>}
                                    </div>
                                  </div>
                                )}

                                {/* Property Manager */}
                                {property.propertyManagerName && (
                                  <div className="space-y-1">
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <User className="w-3 h-3" />
                                      Manager
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      {property.propertyManagerName}
                                    </div>
                                  </div>
                                )}

                                {/* Listing Info */}
                                <div className="space-y-1">
                                  <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    <Calendar className="w-3 h-3" />
                                    Listing Info
                                  </div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {property.listingDate && (
                                      <div>Listed: {formatDate(property.listingDate)}</div>
                                    )}
                                    {property.availableDate && (
                                      <div>Available: {formatDate(property.availableDate)}</div>
                                    )}
                                    {property.mlsNumber && (
                                      <div>MLS: {property.mlsNumber}</div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              {property.description && (
                                <div className="space-y-1 pt-2 border-t border-gray-200 dark:border-gray-800">
                                  <div className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Description
                                  </div>
                                  <div className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {property.description}
                                  </div>
                                </div>
                              )}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredProperties.length}
          itemsPerPage={itemsPerPage}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
