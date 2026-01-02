"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  User,
  ChevronDown,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  X,
} from "lucide-react";
import Image from "next/image";
import { Customer } from "@/types/customer";
import { mockCustomers, filterCustomers } from "@/data/customers";
import { getCustomerBookingStats, getCustomersByPropertyId } from "@/data/bookings";
import { mockProperties } from "@/data/properties";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function AdminCustomersPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;
  const [propertyFilter, setPropertyFilter] = useState<{ id: number; name: string } | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    status: "" as "" | "active" | "inactive" | "pending",
    workspaceType: "" as "" | "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office",
    propertyId: "" as string,
  });

  // Read property filter from URL on mount
  useEffect(() => {
    const propertyId = searchParams.get("propertyId");
    const propertyName = searchParams.get("propertyName");
    if (propertyId && propertyName) {
      setPropertyFilter({ id: parseInt(propertyId), name: decodeURIComponent(propertyName) });
      setFilters((prev) => ({
        ...prev,
        propertyId: propertyId,
      }));
    }
  }, [searchParams]);

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

  const handleView = (customer: Customer) => {
    router.push(`/admin/customers/${customer.id}`);
  };

  // Apply filters
  const applyFilters = (customers: Customer[]) => {
    return customers.filter((customer) => {
      if (filters.status && customer.status !== filters.status) {
        return false;
      }
      if (filters.workspaceType && customer.preferredWorkspaceType !== filters.workspaceType) {
        return false;
      }
      if (filters.propertyId) {
        const propertyId = parseInt(filters.propertyId);
        // Find property from properties list
        const property = mockProperties.find(p => p.id === propertyId);
        if (property) {
          const customerIds = getCustomersByPropertyId(propertyId, property.propertyName, property.workspaceType, property.city);
          if (!customerIds.includes(customer.id)) {
            return false;
          }
        }
      }
      return true;
    });
  };

  // Calculate booking stats for each customer dynamically
  const customersWithStats = mockCustomers.map((customer) => {
    const stats = getCustomerBookingStats(customer.id);
    return {
      ...customer,
      totalBookings: stats.totalBookings,
      totalSpent: stats.totalSpent,
      lastBookingDate: stats.lastBookingDate || customer.lastBookingDate,
    };
  });

  const searchedCustomers = filterCustomers(customersWithStats, searchTerm);
  const filteredCustomers = applyFilters(searchedCustomers);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Count active filters (including property filter)
  const activeFiltersCount = Object.values(filters).filter((f) => f !== "").length;

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === "propertyId" && value === "") {
      setPropertyFilter(null);
      // Remove query params from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("propertyId");
      params.delete("propertyName");
      router.push(`/admin/customers${params.toString() ? `?${params.toString()}` : ""}`);
    }
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      workspaceType: "",
      propertyId: "",
    });
    setPropertyFilter(null);
    // Remove query params from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("propertyId");
    params.delete("propertyName");
    router.push(`/admin/customers${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get properties list for filter dropdown
  const propertiesList = mockProperties.map((p) => ({
    id: p.id,
    name: p.propertyName,
  }));

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Customers
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all customers across the platform
            </p>
            {/* Property Filter Badge */}
            {propertyFilter && (
              <div className="mt-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                }`}>
                  <Building2 className="w-4 h-4" />
                  Filtered by: {propertyFilter.name}
                  <button
                    onClick={() => handleFilterChange("propertyId", "")}
                    className={`ml-1 p-0.5 rounded hover:opacity-70 transition-opacity ${
                      isDarkMode ? "hover:bg-blue-500/20" : "hover:bg-blue-100"
                    }`}
                    title="Clear property filter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-3 relative">
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
                buttonRef={filterButtonRef}
                properties={propertiesList}
              />
            </div>
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
                  Customer
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Contact
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Location
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Bookings
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Total Spent
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className={`px-4 py-12 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <p className="text-sm font-medium">No customers found</p>
                    <p className="text-xs mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((customer, idx) => {
                  const isExpanded = expandedRows.has(customer.id);
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <Fragment key={customer.id}>
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

                        {/* Customer Name & Image */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 ${
                              isDarkMode ? "border-gray-700" : "border-gray-200"
                            }`}>
                              {customer.image ? (
                                <Image
                                  src={customer.image}
                                  alt={customer.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center ${
                                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                                }`}>
                                  <User className={`w-5 h-5 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-sm md:text-base truncate">{customer.name}</div>
                              <div className={`text-xs mt-0.5 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {customer.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contact - Hidden on mobile */}
                        <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Phone className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                              <span className="text-sm truncate">{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className={`w-3.5 h-3.5 shrink-0 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                              <span className="text-xs truncate">{customer.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Location - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {customer.city ? (
                            <div className="flex items-center gap-2">
                              <MapPin className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                              <div>
                                <div className="text-sm font-medium">{customer.city}</div>
                                {customer.location && (
                                  <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {customer.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>N/A</span>
                          )}
                        </td>

                        {/* Status - Hidden on mobile */}
                        <td className="hidden md:table-cell px-4 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </span>
                        </td>

                        {/* Bookings - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 text-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <button
                            onClick={() => router.push(`/admin/bookings?customerId=${customer.id}`)}
                            className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
                            title="View customer bookings"
                          >
                            <span className={`text-sm font-semibold group-hover:text-[#FF5A22] transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {customer.totalBookings}
                            </span>
                            <span className={`text-xs group-hover:text-[#FF5A22] transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {customer.totalBookings === 1 ? "booking" : "bookings"}
                            </span>
                          </button>
                        </td>

                        {/* Total Spent - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-bold">{formatPrice(customer.totalSpent)}</span>
                            {customer.lastBookingDate && (
                              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Last: {formatDate(customer.lastBookingDate)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions - Hidden on mobile */}
                        <td className="hidden md:table-cell px-4 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleView(customer)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "text-blue-400 hover:bg-blue-500/10"
                                  : "text-blue-600 hover:bg-blue-100"
                              }`}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                        {/* Expand Button */}
                        <td className={`px-4 py-4 text-center`}>
                          <button
                            onClick={() => toggleRow(customer.id)}
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
                            key={`expanded-${customer.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              ease: [0.16, 1, 0.3, 1],
                              opacity: { duration: 0.3 }
                            }}
                          >
                            <td colSpan={9} className={`px-4 py-6 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6"
                              >
                                {/* Status & Info Badges */}
                                <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Status:
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                    </span>
                                  </div>
                                  {customer.preferredWorkspaceType && (
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        Preferred Type:
                                      </span>
                                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                        isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
                                      }`}>
                                        {customer.preferredWorkspaceType}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  {/* Contact Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <User className="w-4 h-4" />
                                      Contact Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="flex items-center gap-2">
                                        <Phone className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                                        <span>{customer.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                                        <span className="break-all">{customer.email}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Location Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <MapPin className="w-4 h-4" />
                                      Location
                                    </div>
                                    <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      {customer.city ? (
                                        <>
                                          <div className="font-medium">{customer.city}</div>
                                          {customer.location && (
                                            <div>{customer.location}</div>
                                          )}
                                        </>
                                      ) : (
                                        <div className={`${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Not specified</div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Booking Statistics */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <DollarSign className="w-4 h-4" />
                                      Booking Statistics
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="flex items-center justify-between">
                                        <span>Total Bookings:</span>
                                        <span className="font-semibold">{customer.totalBookings}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>Total Spent:</span>
                                        <span className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {formatPrice(customer.totalSpent)}
                                        </span>
                                      </div>
                                      {customer.lastBookingDate && (
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                                          <span>Last Booking:</span>
                                          <span className="font-medium">{formatDate(customer.lastBookingDate)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Join Date */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Calendar className="w-4 h-4" />
                                      Account Information
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="flex items-center justify-between">
                                        <span>Join Date:</span>
                                        <span className="font-medium">{formatDate(customer.joinDate)}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>Member Since:</span>
                                        <span className="font-medium">
                                          {Math.floor((new Date().getTime() - new Date(customer.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Notes */}
                                  {customer.notes && (
                                    <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        <FileText className="w-4 h-4" />
                                        Notes
                                      </div>
                                      <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {customer.notes}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                                  <button
                                    onClick={() => handleView(customer)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                    }`}
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
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
          totalItems={filteredCustomers.length}
          itemsPerPage={itemsPerPage}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

