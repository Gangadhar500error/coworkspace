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
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Power,
  PowerOff,
  Star,
  StarOff,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { Property, getStartingPrice } from "@/types/property";
import { mockProperties, filterProperties, filterByWorkspaceType, filterByStatus, filterByVerificationStatus } from "@/data/properties";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function ManagerPropertyListingPage() {
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
    workspaceType: "" as "" | "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office",
    propertyStatus: "" as "" | "draft" | "active" | "inactive",
    verificationStatus: "" as "" | "approved" | "pending",
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
    router.push(`/manager/property-listing/${property.id}`);
  };

  const handleEdit = (property: Property) => {
    router.push(`/manager/property-listing/${property.id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Delete property:", id);
      // Implement delete functionality
    }
  };

  const handleToggleStatus = (id: number, currentStatus: Property["propertyStatus"]) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    if (confirm(`Are you sure you want to ${newStatus === "active" ? "enable" : "disable"} this property?`)) {
      console.log(`Toggle property status: ${id} -> ${newStatus}`);
      // Implement toggle functionality
    }
  };

  const handleToggleFeatured = (id: number, currentFeatured: Property["featuredProperty"]) => {
    const newFeatured = currentFeatured === "yes" ? "no" : "yes";
    console.log(`Toggle featured: ${id} -> ${newFeatured}`);
    // Implement toggle functionality
  };

  const handleAddProperty = () => {
    router.push("/manager/property-listing/add");
  };

  // Apply filters
  const applyFilters = (properties: Property[]) => {
    let filtered = properties;
    
    if (filters.workspaceType) {
      filtered = filterByWorkspaceType(filtered, filters.workspaceType);
    }
    if (filters.propertyStatus) {
      filtered = filterByStatus(filtered, filters.propertyStatus);
    }
    if (filters.verificationStatus) {
      filtered = filterByVerificationStatus(filtered, filters.verificationStatus);
    }
    
    return filtered;
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
      workspaceType: "",
      propertyStatus: "",
      verificationStatus: "",
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

  const getStatusColor = (status: Property["propertyStatus"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getVerificationColor = (status: Property["verificationStatus"]) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const formatPrice = (price: number, currency: string = "USD") => {
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
              Property Listing
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage your property listings and their details
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
                onFilterChange={handleFilterChange as any}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                getStatusColor={getStatusColor as any}
                getVerificationColor={getVerificationColor as any}
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
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-16 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  S.No
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Workspace Type
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  City
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className={`px-4 py-12 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <p className="text-sm font-medium">No properties found</p>
                    <p className="text-xs mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property, idx) => {
                  const isExpanded = expandedRows.has(property.id);
                  const startingPrice = getStartingPrice(property);
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <Fragment key={property.id}>
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`transition-colors ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
                      >
                        {/* S.No */}
                        <td className={`px-4 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <span className="text-sm font-medium">{serialNumber}</span>
                        </td>

                        {/* Property Image & Name */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="flex items-start gap-3">
                            {/* Property Image */}
                            {property.coverImage ? (
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 border-gray-200 dark:border-gray-700">
                                <Image
                                  src={property.coverImage}
                                  alt={property.propertyName}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <div className={`w-16 h-16 rounded-lg shrink-0 border-2 flex items-center justify-center ${
                                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
                              }`}>
                                <Building2 className={`w-6 h-6 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                              </div>
                            )}
                            {/* Property Name & Brand */}
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-sm md:text-base truncate">{property.propertyName}</div>
                              {property.brandOperatorName && (
                                <div className={`text-xs mt-0.5 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  {property.brandOperatorName}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Workspace Type */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
                          }`}>
                            {property.workspaceType}
                          </span>
                        </td>

                        {/* City */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="flex items-center gap-2">
                            <MapPin className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <span className="text-sm font-medium">{property.city}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className={`px-4 py-4`}>
                          <div className="flex items-center justify-center gap-1">
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

                        {/* Expand Button */}
                        <td className={`px-4 py-4 text-center`}>
                          <button
                            onClick={() => toggleRow(property.id)}
                            className={`p-1.5 md:p-2 rounded-lg transition-all ${
                              isDarkMode
                                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            }`}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.div>
                          </button>
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
                            <td colSpan={6} className={`px-4 py-6 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6"
                              >
                                {/* Status & Verification Badges */}
                                <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Status:
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.propertyStatus)}`}>
                                      {property.propertyStatus.charAt(0).toUpperCase() + property.propertyStatus.slice(1)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Verification:
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getVerificationColor(property.verificationStatus)}`}>
                                      {property.verificationStatus === "approved" ? "✓ Approved" : "Pending"}
                                    </span>
                                  </div>
                                  {property.featuredProperty === "yes" && (
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        Featured:
                                      </span>
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                        isDarkMode ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30" : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                      }`}>
                                        <Star className="w-3 h-3" />
                                        Yes
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  {/* Location Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <MapPin className="w-4 h-4" />
                                      Location Details
                                    </div>
                                    <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="font-medium">{property.fullAddress}</div>
                                      <div>{property.areaLocality}</div>
                                      <div>{property.city}, {property.state}</div>
                                      {property.pincode && <div>Pincode: {property.pincode}</div>}
                                      <div className="text-xs mt-2">{property.country}</div>
                                    </div>
                                  </div>

                                  {/* Contact Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Building2 className="w-4 h-4" />
                                      Contact Details
                                    </div>
                                    <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="font-medium">{property.contactPersonName}</div>
                                      <div className="flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{property.phoneNumber}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span className="break-all">{property.emailId}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Pricing & Info */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <DollarSign className="w-4 h-4" />
                                      Pricing & Info
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div>
                                        <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Starting Price</div>
                                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {startingPrice > 0 ? formatPrice(startingPrice) : "N/A"}
                                        </div>
                                      </div>
                                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Created Date</div>
                                        <div className="flex items-center gap-1.5">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>{formatDate(property.createdAt)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Description */}
                                {property.shortDescription && (
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <FileText className="w-4 h-4" />
                                      Description
                                    </div>
                                    <div className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      {property.shortDescription}
                                    </div>
                                  </div>
                                )}

                                {/* Additional Actions */}
                                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800 flex-wrap">
                                  <button
                                    onClick={() => handleView(property)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                    }`}
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleEdit(property)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30"
                                        : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200"
                                    }`}
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit Property
                                  </button>
                                  <button
                                    onClick={() => handleToggleStatus(property.id, property.propertyStatus)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      property.propertyStatus === "active"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                                          : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                                        : isDarkMode
                                        ? "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 border border-gray-500/30"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                                    }`}
                                  >
                                    {property.propertyStatus === "active" ? (
                                      <>
                                        <PowerOff className="w-4 h-4" />
                                        Disable
                                      </>
                                    ) : (
                                      <>
                                        <Power className="w-4 h-4" />
                                        Enable
                                      </>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleToggleFeatured(property.id, property.featuredProperty)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      property.featuredProperty === "yes"
                                        ? isDarkMode
                                          ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30"
                                          : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200"
                                        : isDarkMode
                                        ? "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 border border-gray-500/30"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                                    }`}
                                  >
                                    <Star className={`w-4 h-4 ${property.featuredProperty === "yes" ? "fill-current" : ""}`} />
                                    {property.featuredProperty === "yes" ? "Remove Featured" : "Mark Featured"}
                                  </button>
                                  <button
                                    onClick={() => handleDelete(property.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                                        : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                    }`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })
              )}
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
