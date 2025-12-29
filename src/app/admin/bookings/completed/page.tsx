"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../_components/ThemeProvider";
import {
  ChevronDown,
  User,
  Phone,
  Mail,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  CreditCard,
  FileText,
  Receipt,
  X,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react";
import { Booking } from "@/types/booking";
import { mockCompletedBookings, filterBookings } from "@/data/bookings";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function BookingsCompletedPage() {
  const { isDarkMode } = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  // Filter states
  const [filters, setFilters] = useState({
    paymentStatus: "" as "" | "paid" | "pending" | "failed" | "refunded",
    propertyType: "" as "" | "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office",
    invoiceStatus: "" as "" | "generated" | "not_generated",
    paymentMethod: "" as "" | "credit_card" | "debit_card" | "bank_transfer" | "upi" | "wallet" | "cash",
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

  const handleRaiseTaxInvoice = (booking: Booking) => {
    if (confirm(`Generate tax invoice for booking ${booking.bookingId}?`)) {
      console.log("Raise tax invoice for booking:", booking.id);
      // Implement raise tax invoice functionality
    }
  };

  const handleCancelBooking = (booking: Booking) => {
    if (confirm(`Are you sure you want to cancel booking ${booking.bookingId}? This action cannot be undone.`)) {
      console.log("Cancel booking:", booking.id);
      // Implement cancel booking functionality
    }
  };

  // Apply filters
  const applyFilters = (bookings: Booking[]) => {
    return filterBookings(bookings, searchTerm, filters);
  };

  const filteredBookings = applyFilters(mockCompletedBookings);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set()); // Close all expanded rows when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      paymentStatus: "",
      propertyType: "",
      invoiceStatus: "",
      paymentMethod: "",
    });
  };

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter((f) => f !== "").length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: { [key: string]: string } = {
      credit_card: "Credit Card",
      debit_card: "Debit Card",
      bank_transfer: "Bank Transfer",
      upi: "UPI",
      wallet: "Wallet",
      cash: "Cash",
    };
    return labels[method] || method;
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      case "refunded":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
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
              Bookings Completed
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View all completed bookings and manage invoices
            </p>
          </div>

          {/* Right Side - Filter */}
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
                getPaymentStatusColor={getPaymentStatusColor}
                buttonRef={filterButtonRef}
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
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  S.No
                </th>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Booking ID
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Seeker
                </th>
                <th className={`hidden lg:table-cell px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Amount Paid
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Payment Status
                </th>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedBookings.map((booking, idx) => {
                const isExpanded = expandedRows.has(booking.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={booking.id}>
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

                      {/* Booking ID */}
                      <td className={`px-3 md:px-4 lg:px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 flex items-center justify-center ${
                            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"
                          }`}>
                            <Receipt className={`w-4 h-4 md:w-5 md:h-5 text-[#FF5A22]`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm truncate">{booking.bookingId}</div>
                            <div className={`text-xs truncate hidden md:block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {formatDate(booking.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Seeker - Hidden on small screens */}
                      <td className={`hidden md:table-cell px-4 lg:px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="flex items-center gap-2">
                          <User className={`w-4 h-4 shrink-0 text-blue-500`} />
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{booking.seeker.name}</div>
                            <div className={`text-xs truncate ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                              {booking.seeker.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Property - Hidden on small/medium screens */}
                      <td className={`hidden lg:table-cell px-4 lg:px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="flex items-center gap-2">
                          <Building2 className={`w-4 h-4 shrink-0 text-[#FF5A22]`} />
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{booking.property.name}</div>
                            <div className={`text-xs truncate ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                              {booking.property.type}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Amount Paid - Hidden on small screens */}
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {formatCurrency(booking.billing.total, booking.billing.currency)}
                          </div>
                          <div className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                            {booking.billing.currency}
                          </div>
                        </div>
                      </td>

                      {/* Payment Status - Hidden on small screens */}
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
                          {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
                        </span>
                      </td>

                      {/* Expand Button */}
                      <td className="px-3 md:px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-end md:justify-center gap-1.5 md:gap-0">
                          <button
                            onClick={() => toggleRow(booking.id)}
                            className={`flex items-center gap-1.5 px-2 py-1.5 md:p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "hover:bg-gray-800 text-gray-400 hover:text-[#FF5A22]"
                                : "hover:bg-gray-100 text-gray-500 hover:text-[#FF5A22]"
                            }`}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <span className="md:hidden text-xs font-semibold">
                              #{serialNumber}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                          key={`expanded-${booking.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.16, 1, 0.3, 1],
                            opacity: { duration: 0.3 }
                          }}
                          className={`overflow-hidden ${isDarkMode ? "bg-gray-800/30" : "bg-gray-50"}`}
                        >
                          <td colSpan={7} className="px-3 md:px-4 lg:px-6 py-6 md:py-8">
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.1,
                                ease: [0.16, 1, 0.3, 1]
                              }}
                              className="space-y-5 md:space-y-6"
                            >
                              {/* Mobile-only: Seeker, Property, Amount, Payment Status */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                                {/* Seeker */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Seeker
                                  </div>
                                  <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {booking.seeker.name}
                                  </div>
                                  <div className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                                    {booking.seeker.email}
                                  </div>
                                </div>

                                {/* Property */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Property
                                  </div>
                                  <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {booking.property.name}
                                  </div>
                                  <div className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                                    {booking.property.type}
                                  </div>
                                </div>

                                {/* Amount Paid */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Amount Paid
                                  </div>
                                  <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    {formatCurrency(booking.billing.total, booking.billing.currency)}
                                  </div>
                                </div>

                                {/* Payment Status */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Payment Status
                                  </div>
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
                                    {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
                                  </span>
                                </div>
                              </div>

                              {/* Large Screen: Clean Layout */}
                              <div className="hidden md:block space-y-4 pt-3">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Seeker Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <User className="w-4 h-4 text-blue-500" />
                                      Seeker Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="font-medium">{booking.seeker.name}</div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span className="break-all">{booking.seeker.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{booking.seeker.phone}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Provider Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Building2 className="w-4 h-4 text-[#FF5A22]" />
                                      Provider Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="font-medium">{booking.provider.name}</div>
                                      {booking.provider.company && (
                                        <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                                          {booking.provider.company}
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span className="break-all">{booking.provider.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{booking.provider.phone}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Booking Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Calendar className="w-4 h-4 text-indigo-500" />
                                      Booking Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Property: </span>
                                        <span className="font-medium">{booking.property.name}</span>
                                      </div>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Type: </span>
                                        <span>{booking.property.type}</span>
                                      </div>
                                      {booking.bookingDetails.workspaceType && (
                                        <div>
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Workspace: </span>
                                          <span>{booking.bookingDetails.workspaceType}</span>
                                        </div>
                                      )}
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Duration: </span>
                                        <span>{booking.bookingDetails.duration}</span>
                                      </div>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Start: </span>
                                        <span>{formatDate(booking.bookingDetails.startDate)}</span>
                                      </div>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>End: </span>
                                        <span>{formatDate(booking.bookingDetails.endDate)}</span>
                                      </div>
                                      {booking.bookingDetails.numberOfSeats && (
                                        <div>
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Seats: </span>
                                          <span>{booking.bookingDetails.numberOfSeats}</span>
                                        </div>
                                      )}
                                      <div className="flex items-start gap-2">
                                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                        <span>{booking.property.address}, {booking.property.city}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Billing Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <DollarSign className="w-4 h-4 text-green-500" />
                                      Billing Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="flex justify-between">
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Subtotal:</span>
                                        <span>{formatCurrency(booking.billing.subtotal, booking.billing.currency)}</span>
                                      </div>
                                      {booking.billing.discount && booking.billing.discount > 0 && (
                                        <div className="flex justify-between">
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Discount:</span>
                                          <span className="text-green-500">-{formatCurrency(booking.billing.discount, booking.billing.currency)}</span>
                                        </div>
                                      )}
                                      <div className="flex justify-between">
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Tax:</span>
                                        <span>{formatCurrency(booking.billing.tax, booking.billing.currency)}</span>
                                      </div>
                                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-center">
                                          <span className="font-semibold">Total:</span>
                                          <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                            {formatCurrency(booking.billing.total, booking.billing.currency)}
                                          </span>
                                        </div>
                                      </div>
                                      {booking.billing.billingAddress && (
                                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                          <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Billing Address:</div>
                                          <div className="text-xs">{booking.billing.billingAddress}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Payment Details */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <CreditCard className="w-4 h-4 text-purple-500" />
                                      Payment Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Method: </span>
                                        <span>{getPaymentMethodLabel(booking.payment.method)}</span>
                                      </div>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Status: </span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
                                          {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
                                        </span>
                                      </div>
                                      {booking.payment.transactionId && (
                                        <div>
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Transaction ID: </span>
                                          <span className="font-mono text-xs">{booking.payment.transactionId}</span>
                                        </div>
                                      )}
                                      {booking.payment.paymentGateway && (
                                        <div>
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Gateway: </span>
                                          <span>{booking.payment.paymentGateway}</span>
                                        </div>
                                      )}
                                      {booking.payment.paidAt && (
                                        <div>
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Paid At: </span>
                                          <span>{formatDateTime(booking.payment.paidAt)}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Timestamps & Invoice Info */}
                                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Clock className="w-4 h-4 text-orange-500" />
                                      Timestamps & Invoice
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Created: </span>
                                        <span>{formatDateTime(booking.createdAt)}</span>
                                      </div>
                                      <div>
                                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Updated: </span>
                                        <span>{formatDateTime(booking.updatedAt)}</span>
                                      </div>
                                      {booking.completedAt && (
                                        <div>
                                          <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>Completed: </span>
                                          <span>{formatDateTime(booking.completedAt)}</span>
                                        </div>
                                      )}
                                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        {booking.invoiceGenerated ? (
                                          <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <div>
                                              <div className="text-xs font-medium">Invoice Generated</div>
                                              {booking.invoiceNumber && (
                                                <div className="text-xs font-mono">{booking.invoiceNumber}</div>
                                              )}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-yellow-500" />
                                            <span className="text-xs">Invoice Not Generated</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Mobile/Tablet: Box Layout */}
                              <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Seeker Details */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Seeker Details
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="font-medium">{booking.seeker.name}</div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <Mail className="w-3 h-3" />
                                      <span className="break-all">{booking.seeker.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <Phone className="w-3 h-3" />
                                      <span>{booking.seeker.phone}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Provider Details */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Provider Details
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="font-medium">{booking.provider.name}</div>
                                    {booking.provider.company && (
                                      <div className="text-xs">{booking.provider.company}</div>
                                    )}
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <Mail className="w-3 h-3" />
                                      <span className="break-all">{booking.provider.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                      <Phone className="w-3 h-3" />
                                      <span>{booking.provider.phone}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Booking Details */}
                                <div className={`p-3 rounded-lg border sm:col-span-2 ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Booking Details
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div><span className="text-xs">Property: </span><span className="font-medium">{booking.property.name}</span></div>
                                    <div><span className="text-xs">Type: </span><span>{booking.property.type}</span></div>
                                    <div><span className="text-xs">Duration: </span><span>{booking.bookingDetails.duration}</span></div>
                                    <div><span className="text-xs">Dates: </span><span>{formatDate(booking.bookingDetails.startDate)} - {formatDate(booking.bookingDetails.endDate)}</span></div>
                                  </div>
                                </div>

                                {/* Billing Details */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Billing Details
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex justify-between text-xs">
                                      <span>Subtotal:</span>
                                      <span>{formatCurrency(booking.billing.subtotal, booking.billing.currency)}</span>
                                    </div>
                                    {booking.billing.discount && booking.billing.discount > 0 && (
                                      <div className="flex justify-between text-xs text-green-500">
                                        <span>Discount:</span>
                                        <span>-{formatCurrency(booking.billing.discount, booking.billing.currency)}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-xs">
                                      <span>Tax:</span>
                                      <span>{formatCurrency(booking.billing.tax, booking.billing.currency)}</span>
                                    </div>
                                    <div className="pt-1 border-t border-gray-200 dark:border-gray-700 mt-1">
                                      <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>{formatCurrency(booking.billing.total, booking.billing.currency)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment Details */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Payment Details
                                  </div>
                                  <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div><span className="text-xs">Method: </span><span>{getPaymentMethodLabel(booking.payment.method)}</span></div>
                                    <div><span className="text-xs">Status: </span>
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
                                        {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
                                      </span>
                                    </div>
                                    {booking.payment.transactionId && (
                                      <div className="text-xs font-mono">{booking.payment.transactionId}</div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <button
                                  onClick={() => handleRaiseTaxInvoice(booking)}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isDarkMode
                                      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                                      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                  }`}
                                >
                                  <FileText className="w-4 h-4" />
                                  {booking.invoiceGenerated ? "View Tax Invoice" : "Raise Tax Invoice"}
                                </button>
                                <button
                                  onClick={() => handleCancelBooking(booking)}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isDarkMode
                                      ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                                      : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                  }`}
                                >
                                  <X className="w-4 h-4" />
                                  Cancel Booking
                                </button>
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

      {/* Pagination */}
      {filteredBookings.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredBookings.length}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <Receipt className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No completed bookings found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {searchTerm ? "Try adjusting your search criteria" : "No bookings have been completed yet"}
          </p>
        </div>
      )}
    </div>
  );
}
