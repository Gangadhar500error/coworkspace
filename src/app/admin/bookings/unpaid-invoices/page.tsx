/**
 * Admin Unpaid Invoices Page
 * 
 * Displays all unpaid invoices (bookings with pending/failed payment status and invoice generated).
 * 
 * DATA SOURCE:
 * - Uses mockCompletedBookings from @/data/bookings
 * - Filters bookings where payment.status !== "paid" AND invoiceGenerated === true
 * 
 * FEATURES:
 * - Search by invoice number, booking ID, customer name/email
 * - Filter by property type, customer ID
 * - Expandable rows with detailed invoice information
 * - Pagination
 */

"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../_components/ThemeProvider";
import {
  Eye,
  ChevronDown,
  Building2,
  DollarSign,
  Calendar,
  Filter,
  Clock,
  XCircle,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Search,
  Download,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { Booking } from "@/types/booking";
import { mockCompletedBookings, filterBookings } from "@/data/bookings";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "../FilterDropdown";

export default function UnpaidInvoicesPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  // Get customerId from URL params if present
  const customerIdFromUrl = searchParams.get("customerId");

  // Filter states
  const [filters, setFilters] = useState({
    propertyType: "" as "" | "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office",
    customerId: customerIdFromUrl || "",
  });

  // Update filters when URL param changes
  useEffect(() => {
    if (customerIdFromUrl) {
      setFilters((prev) => ({
        ...prev,
        customerId: customerIdFromUrl,
      }));
    }
  }, [customerIdFromUrl]);

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

  const handleView = (booking: Booking) => {
    router.push(`/admin/bookings/${booking.id}`);
  };

  // Apply filters - only show unpaid invoices
  const applyFilters = (bookings: Booking[]) => {
    // Filter for unpaid invoices only (pending or failed payment, but invoice generated)
    let filtered = bookings.filter(
      (booking) => 
        booking.invoiceGenerated === true && 
        (booking.payment.status === "pending" || booking.payment.status === "failed")
    );

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.invoiceNumber?.toLowerCase().includes(term) ||
          booking.bookingId.toLowerCase().includes(term) ||
          booking.seeker.name.toLowerCase().includes(term) ||
          booking.seeker.email.toLowerCase().includes(term) ||
          booking.property.name.toLowerCase().includes(term)
      );
    }

    // Apply property type filter
    if (filters.propertyType) {
      filtered = filtered.filter((booking) => booking.property.type === filters.propertyType);
    }

    // Apply customer ID filter
    if (filters.customerId) {
      filtered = filtered.filter((booking) => booking.seeker.id.toString() === filters.customerId);
    }

    return filtered;
  };

  const filteredInvoices = applyFilters(mockCompletedBookings);

  // Pagination calculations
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

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
      customerId: "",
    });
    if (customerIdFromUrl) {
      router.push("/admin/bookings/unpaid-invoices");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPaymentStatusColor = (status: Booking["payment"]["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/30";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate total pending amount
  const totalPending = filteredInvoices.reduce((sum, invoice) => sum + invoice.billing.total, 0);
  const pendingCount = filteredInvoices.filter((inv) => inv.payment.status === "pending").length;
  const failedCount = filteredInvoices.filter((inv) => inv.payment.status === "failed").length;

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-4">
        {/* Top Row - Heading and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Side - Heading */}
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Unpaid Invoices
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View all unpaid invoices requiring attention
              {filters.customerId && (
                <span className="ml-2 text-[#FF5A22]">(Filtered by Customer ID: {filters.customerId})</span>
              )}
            </p>
          </div>

          {/* Right Side - Filter Icon */}
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

              {/* Filter Dropdown */}
              <FilterDropdown
                isOpen={showFilterDropdown}
                onClose={() => setShowFilterDropdown(false)}
                filters={{
                  status: "",
                  propertyType: filters.propertyType,
                  paymentStatus: "",
                  customerId: filters.customerId,
                }}
                onFilterChange={(key, value) => {
                  if (key === "propertyType" || key === "customerId") {
                    handleFilterChange(key, value);
                  }
                }}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </div>
        </div>

        {/* Stats and Search Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Left Side - Stats (Single Line) */}
          <div className={`rounded-lg border p-2.5 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total:</p>
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {filteredInvoices.length}
                </p>
              </div>
              <div className={`w-px h-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending:</p>
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {pendingCount}
                </p>
              </div>
              <div className={`w-px h-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Failed:</p>
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {failedCount}
                </p>
              </div>
              <div className={`w-px h-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Amount:</p>
                <p className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatPrice(totalPending)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Search */}
          <div className="sm:w-80 lg:w-96 shrink-0">
            <div className={`rounded-lg border p-2.5 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="relative">
                <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
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
                  Invoice #
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Customer
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Booking ID
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Amount
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className={`px-4 py-12 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <p className="text-sm font-medium">No unpaid invoices found</p>
                    <p className="text-xs mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((invoice, idx) => {
                  const isExpanded = expandedRows.has(invoice.id);
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <Fragment key={invoice.id}>
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

                        {/* Invoice Number */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="flex items-center gap-2">
                            <AlertCircle className={`w-4 h-4 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                            <div>
                              <div className="font-semibold text-sm">{invoice.invoiceNumber}</div>
                              <div className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {formatDate(invoice.createdAt)}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Customer - Hidden on mobile */}
                        <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full overflow-hidden shrink-0 border ${
                              isDarkMode ? "border-gray-700" : "border-gray-200"
                            }`}>
                              {invoice.seeker.image ? (
                                <Image
                                  src={invoice.seeker.image}
                                  alt={invoice.seeker.name}
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center ${
                                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                                }`}>
                                  <User className={`w-4 h-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium truncate">{invoice.seeker.name}</div>
                              <div className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {invoice.seeker.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Property - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="flex items-center gap-2">
                            <Building2 className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">{invoice.property.name}</div>
                              <div className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {invoice.property.city}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Booking ID - Hidden on mobile */}
                        <td className={`hidden md:table-cell px-4 py-4 text-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="text-sm font-medium">{invoice.bookingId}</div>
                        </td>

                        {/* Amount - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="font-bold text-sm text-yellow-600">{formatPrice(invoice.billing.total, invoice.billing.currency)}</div>
                        </td>

                        {/* Payment Status - Hidden on mobile */}
                        <td className="hidden md:table-cell px-4 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(invoice.payment.status)}`}>
                            {invoice.payment.status.charAt(0).toUpperCase() + invoice.payment.status.slice(1)}
                          </span>
                        </td>

                        {/* Expand Button */}
                        <td className={`px-4 py-4 text-center`}>
                          <button
                            onClick={() => toggleRow(invoice.id)}
                            className={`p-1.5 md:p-2 rounded-lg transition-all ${
                              isDarkMode
                                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            }`}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        </td>
                      </motion.tr>

                      {/* Expanded Row */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td colSpan={8} className={`px-4 py-6 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Customer Details */}
                                <div className="space-y-3">
                                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Customer Details
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <User className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {invoice.seeker.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {invoice.seeker.email}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {invoice.seeker.phone}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Invoice Details */}
                                <div className="space-y-3">
                                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Invoice Details
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <FileText className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {invoice.invoiceNumber}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {formatDate(invoice.createdAt)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className={`w-4 h-4 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                                      <span className={`text-sm font-semibold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                                        {invoice.payment.status.charAt(0).toUpperCase() + invoice.payment.status.slice(1)}
                                      </span>
                                    </div>
                                    {invoice.payment.paidAt && (
                                      <div className="flex items-center gap-2">
                                        <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          Due: {formatDateTime(invoice.payment.paidAt)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Payment & Billing */}
                                <div className="space-y-3">
                                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Payment & Billing
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <DollarSign className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                        Total: {formatPrice(invoice.billing.total, invoice.billing.currency)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <CreditCard className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {invoice.payment.method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                      </span>
                                    </div>
                                    {invoice.payment.transactionId && (
                                      <div className="flex items-center gap-2">
                                        <FileText className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                          {invoice.payment.transactionId}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="mt-6 flex justify-end gap-2">
                                <button
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                    isDarkMode
                                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                  }`}
                                >
                                  <Download className="w-4 h-4" />
                                  Download PDF
                                </button>
                                <button
                                  onClick={() => handleView(invoice)}
                                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                                    isDarkMode
                                      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                                      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                  }`}
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </button>
                              </div>
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
          totalItems={filteredInvoices.length}
          itemsPerPage={itemsPerPage}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
