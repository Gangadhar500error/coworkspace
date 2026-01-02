"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  Eye,
  ChevronDown,
  DollarSign,
  Calendar,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Search,
  FileText,
  Download,
  Building2,
  User,
} from "lucide-react";
import { Booking } from "@/types/booking";
import { mockCompletedBookings } from "@/data/bookings";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function ManagerPaymentPage() {
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
    paymentStatus: "" as "" | "paid" | "pending" | "failed" | "refunded",
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

  const handleView = (booking: Booking) => {
    router.push(`/manager/bookings/${booking.id}`);
  };

  // Extract payments from bookings
  const payments = mockCompletedBookings.map((booking) => ({
    id: booking.id,
    bookingId: booking.bookingId,
    transactionId: booking.payment.transactionId || `TXN-${booking.id}`,
    invoiceNumber: booking.invoiceNumber,
    customerName: booking.seeker.name,
    customerEmail: booking.seeker.email,
    propertyName: booking.property.name,
    propertyType: booking.property.type,
    amount: booking.billing.total,
    method: booking.payment.method,
    status: booking.payment.status,
    date: booking.payment.paidAt || booking.createdAt,
    currency: booking.billing.currency,
    paymentGateway: booking.payment.paymentGateway,
  }));

  // Apply filters
  const applyFilters = (paymentsList: typeof payments) => {
    let filtered = paymentsList;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (payment) =>
          payment.transactionId.toLowerCase().includes(term) ||
          payment.bookingId.toLowerCase().includes(term) ||
          payment.customerName.toLowerCase().includes(term) ||
          payment.propertyName.toLowerCase().includes(term) ||
          payment.invoiceNumber?.toLowerCase().includes(term)
      );
    }

    // Apply payment status filter
    if (filters.paymentStatus) {
      filtered = filtered.filter((payment) => payment.status === filters.paymentStatus);
    }

    // Apply payment method filter
    if (filters.paymentMethod) {
      filtered = filtered.filter((payment) => payment.method === filters.paymentMethod);
    }

    return filtered;
  };

  const filteredPayments = applyFilters(payments);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

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
      paymentStatus: "",
      paymentMethod: "",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set()); // Close all expanded rows when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
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

  const getPaymentMethodLabel = (method: string) => {
    return method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Calculate stats
  const totalRevenue = filteredPayments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = filteredPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const failedAmount = filteredPayments.filter((p) => p.status === "failed").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-4">
        {/* Top Row - Heading and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Side - Heading */}
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Payments
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all payment transactions and their details
            </p>
          </div>

          {/* Right Side - Filter Icon */}
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
                filters={filters}
                onFilterChange={handleFilterChange}
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
                  {filteredPayments.length}
                </p>
              </div>
              <div className={`w-px h-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Paid:</p>
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {filteredPayments.filter((p) => p.status === "paid").length}
                </p>
              </div>
              <div className={`w-px h-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending:</p>
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {filteredPayments.filter((p) => p.status === "pending").length}
                </p>
              </div>
              <div className={`w-px h-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className="flex items-center gap-2">
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Revenue:</p>
                <p className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatPrice(totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Search (Reduced Width) */}
          <div className="sm:w-80 lg:w-96 shrink-0">
            <div className={`rounded-lg border p-2.5 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="relative">
                <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  placeholder="Search payments..."
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
                  Transaction ID
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Customer
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Property
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Method
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Amount
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className={`px-4 py-12 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <p className="text-sm font-medium">No payments found</p>
                    <p className="text-xs mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment, idx) => {
                  const isExpanded = expandedRows.has(payment.id);
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <Fragment key={payment.id}>
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

                        {/* Transaction ID */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="font-semibold text-sm">{payment.transactionId}</div>
                          <div className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {formatDate(payment.date)}
                          </div>
                        </td>

                        {/* Customer - Hidden on mobile */}
                        <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{payment.customerName}</div>
                            <div className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {payment.customerEmail}
                            </div>
                          </div>
                        </td>

                        {/* Property - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="flex items-center gap-2">
                            <Building2 className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">{payment.propertyName}</div>
                              <div className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {payment.propertyType}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Method - Hidden on mobile */}
                        <td className={`hidden md:table-cell px-4 py-4 text-center ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <CreditCard className={`w-3.5 h-3.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <span className="text-xs">{getPaymentMethodLabel(payment.method)}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>

                        {/* Amount - Hidden on mobile/tablet */}
                        <td className={`hidden lg:table-cell px-4 py-4 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="font-bold text-sm">{formatPrice(payment.amount, payment.currency)}</div>
                        </td>

                        {/* Expand Button */}
                        <td className={`px-4 py-4 text-center`}>
                          <button
                            onClick={() => toggleRow(payment.id)}
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
                                {/* Booking Details */}
                                <div className="space-y-3">
                                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Booking Details
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <FileText className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <div>
                                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Booking ID</p>
                                        <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {payment.bookingId}
                                        </p>
                                      </div>
                                    </div>
                                    {payment.invoiceNumber && (
                                      <div className="flex items-center gap-2">
                                        <FileText className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                        <div>
                                          <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Invoice</p>
                                          <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                            {payment.invoiceNumber}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Payment Details */}
                                <div className="space-y-3">
                                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Payment Details
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <CreditCard className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <div>
                                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Method</p>
                                        <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {getPaymentMethodLabel(payment.method)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <div>
                                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Date</p>
                                        <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {formatDateTime(payment.date)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Amount & Actions */}
                                <div className="space-y-3">
                                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Amount
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <DollarSign className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                      <div>
                                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Amount</p>
                                        <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {formatPrice(payment.amount, payment.currency)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Button */}
                              <div className="mt-6 flex justify-end">
                                <button
                                  onClick={() => {
                                    const booking = mockCompletedBookings.find((b) => b.id === payment.id);
                                    if (booking) handleView(booking);
                                  }}
                                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                                    isDarkMode
                                      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                                      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                  }`}
                                >
                                  <Eye className="w-4 h-4" />
                                  View Booking Details
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
          totalItems={filteredPayments.length}
          itemsPerPage={itemsPerPage}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
