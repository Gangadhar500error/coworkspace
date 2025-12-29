"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  ChevronDown,
  CreditCard,
  Edit,
  Trash2,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  User,
  Receipt,
} from "lucide-react";
import { Transaction } from "@/types/transaction";
import { mockTransactions, filterTransactions } from "@/data/transactions";
import { Pagination } from "@/components/pagination";

export default function TransactionsPage() {
  const { isDarkMode } = useTheme();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    type: "" as "" | "payment" | "refund" | "withdrawal" | "deposit" | "commission",
    status: "" as "" | "completed" | "pending" | "failed" | "cancelled" | "refunded",
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

  const filteredTransactions = filterTransactions(mockTransactions, searchTerm, filters);
  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

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
      type: "",
      status: "",
      paymentMethod: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter((f) => f !== "").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowDownRight className="w-4 h-4 text-green-500" />;
      case "refund":
        return <ArrowUpRight className="w-4 h-4 text-blue-500" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-orange-500" />;
      case "deposit":
        return <ArrowDownRight className="w-4 h-4 text-purple-500" />;
      case "commission":
        return <DollarSign className="w-4 h-4 text-indigo-500" />;
      default:
        return <Receipt className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      case "cancelled":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      case "refunded":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getPaymentMethodLabel = (method: string) => {
    return method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Transactions
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View and manage all financial transactions
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search transactions..."
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
                      Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange("type", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All Types</option>
                      <option value="payment">Payment</option>
                      <option value="refund">Refund</option>
                      <option value="withdrawal">Withdrawal</option>
                      <option value="deposit">Deposit</option>
                      <option value="commission">Commission</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Payment Method
                    </label>
                    <select
                      value={filters.paymentMethod}
                      onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">All Methods</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="upi">UPI</option>
                      <option value="wallet">Wallet</option>
                      <option value="cash">Cash</option>
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
                  Transaction ID
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  User
                </th>
                <th className={`hidden lg:table-cell px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Type
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Amount
                </th>
                <th className={`hidden md:table-cell px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedTransactions.map((transaction, idx) => {
                const isExpanded = expandedRows.has(transaction.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={transaction.id}>
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
                        <div className="flex items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"
                          }`}>
                            {getTypeIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{transaction.transactionId}</div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {formatDate(transaction.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={`hidden md:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="text-sm font-medium">{transaction.userName}</div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                              {transaction.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className={`hidden lg:table-cell px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
                        }`}>
                          {getTypeLabel(transaction.type)}
                        </span>
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <div className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                        {transaction.fee && transaction.fee > 0 && (
                          <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                            Fee: {formatCurrency(transaction.fee, transaction.currency)}
                          </div>
                        )}
                      </td>

                      <td className="hidden md:table-cell px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => toggleRow(transaction.id)}
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
                          key={`expanded-${transaction.id}`}
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
                                  User Details
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Name:</span> {transaction.userName}</div>
                                  <div><span className="font-medium">Email:</span> {transaction.userEmail}</div>
                                  {transaction.bookingId && (
                                    <div><span className="font-medium">Booking:</span> {transaction.bookingId}</div>
                                  )}
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Amount Details
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Amount:</span> {formatCurrency(transaction.amount, transaction.currency)}</div>
                                  {transaction.fee && transaction.fee > 0 && (
                                    <div><span className="font-medium">Fee:</span> {formatCurrency(transaction.fee, transaction.currency)}</div>
                                  )}
                                  <div><span className="font-medium">Net:</span> {formatCurrency(transaction.netAmount, transaction.currency)}</div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  Payment Details
                                </div>
                                <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  <div><span className="font-medium">Method:</span> {getPaymentMethodLabel(transaction.paymentMethod)}</div>
                                  {transaction.paymentGateway && (
                                    <div><span className="font-medium">Gateway:</span> {transaction.paymentGateway}</div>
                                  )}
                                  {transaction.gatewayTransactionId && (
                                    <div className="text-xs font-mono">{transaction.gatewayTransactionId}</div>
                                  )}
                                </div>
                              </div>

                              {transaction.description && (
                                <div className={`p-4 rounded-lg border md:col-span-2 lg:col-span-3 ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Description
                                  </div>
                                  <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {transaction.description}
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

      {filteredTransactions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredTransactions.length}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          isDarkMode={isDarkMode}
        />
      )}

      {filteredTransactions.length === 0 && (
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <CreditCard className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No transactions found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {searchTerm ? "Try adjusting your search criteria" : "No transactions have been recorded yet"}
          </p>
        </div>
      )}
    </div>
  );
}

