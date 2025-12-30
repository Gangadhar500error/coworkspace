"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Building2,
  Wallet,
  Banknote,
  Smartphone,
} from "lucide-react";
import { customerPayments } from "../../../data/payments";
import { Payment, PaymentStatus, PaymentMethod } from "../../../types/payment";

export default function CustomerPaymentsPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "failed":
        return isDarkMode
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-red-50 text-red-600 border-red-200";
      case "refunded":
        return isDarkMode
          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
          : "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "refunded":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return <CreditCard className="w-4 h-4" />;
      case "bank_transfer":
        return <Banknote className="w-4 h-4" />;
      case "upi":
      case "wallet":
        return <Smartphone className="w-4 h-4" />;
      case "cash":
        return <Wallet className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case "credit_card":
        return "Credit Card";
      case "debit_card":
        return "Debit Card";
      case "bank_transfer":
        return "Bank Transfer";
      case "upi":
        return "UPI";
      case "wallet":
        return "Wallet";
      case "cash":
        return "Cash";
      default:
        return method;
    }
  };

  const filteredPayments = customerPayments.filter((payment) => {
    const matchesSearch =
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customerPayments.length,
    completed: customerPayments.filter((p) => p.status === "completed").length,
    pending: customerPayments.filter((p) => p.status === "pending").length,
    failed: customerPayments.filter((p) => p.status === "failed").length,
    totalAmount: customerPayments.reduce((sum, p) => sum + (p.status === "completed" ? p.amount : 0), 0),
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Payments
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            View and track your payment history
          </p>
        </div>
      </div>

      {/* Stats and Search/Filter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side - Stats Cards */}
        <div className="lg:col-span-1">
          <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-center flex-1">
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stats.total}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-green-600`}>{stats.completed}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Completed</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-yellow-600`}>{stats.pending}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>${(stats.totalAmount / 1000).toFixed(1)}K</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Paid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Search and Filters */}
        <div className="lg:col-span-2">
          <div className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1">
                <div className={`relative flex items-center rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <Search className={`absolute left-3 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                  <input
                    type="text"
                    placeholder="Search payments, transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border-none outline-none text-sm ${
                      isDarkMode
                        ? "text-white placeholder-gray-500"
                        : "text-gray-900 placeholder-gray-400"
                    }`}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                {["all", "completed", "pending", "failed", "refunded"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                      statusFilter === status
                        ? isDarkMode
                          ? "bg-[#FF5A22] text-white"
                          : "bg-[#FF5A22] text-white"
                        : isDarkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPayments.length === 0 ? (
          <div className={`col-span-full rounded-xl border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No payments found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-lg border p-5 transition-all hover:shadow-md ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getMethodIcon(payment.method)}
                      <h3 className={`text-lg font-bold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {payment.transactionId}
                      </h3>
                    </div>
                    <p className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Invoice: {payment.invoiceNumber}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </div>
                </div>

                {/* Property Name */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {payment.propertyName}
                    </p>
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Booking: {payment.bookingId}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                        <Calendar className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Date</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{payment.date}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                        {getMethodIcon(payment.method)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Method</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {getMethodLabel(payment.method)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Amount Paid
                      </p>
                      <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        ${payment.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? "bg-green-500/10" : "bg-green-50"}`}>
                      <DollarSign className={`w-5 h-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

