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
  Building2,
  Wallet,
  Banknote,
  Smartphone,
  Download,
  Receipt,
  FileText,
  ArrowRight,
  Filter,
} from "lucide-react";
import { customerPayments } from "../../../data/payments";
import { Payment, PaymentStatus, PaymentMethod } from "../../../types/payment";
import Link from "next/link";

export default function CustomerPaymentsPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusConfig = (status: PaymentStatus) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          label: "Completed",
          color: "text-green-600",
          bgColor: "bg-green-50",
          darkBgColor: "dark:bg-green-500/10",
          borderColor: "border-green-200",
          darkBorderColor: "dark:border-green-500/30",
          dotColor: "bg-green-500",
        };
      case "pending":
        return {
          icon: Clock,
          label: "Pending",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          darkBgColor: "dark:bg-yellow-500/10",
          borderColor: "border-yellow-200",
          darkBorderColor: "dark:border-yellow-500/30",
          dotColor: "bg-yellow-500",
        };
      case "failed":
        return {
          icon: XCircle,
          label: "Failed",
          color: "text-red-600",
          bgColor: "bg-red-50",
          darkBgColor: "dark:bg-red-500/10",
          borderColor: "border-red-200",
          darkBorderColor: "dark:border-red-500/30",
          dotColor: "bg-red-500",
        };
      case "refunded":
        return {
          icon: AlertCircle,
          label: "Refunded",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          darkBgColor: "dark:bg-blue-500/10",
          borderColor: "border-blue-200",
          darkBorderColor: "dark:border-blue-500/30",
          dotColor: "bg-blue-500",
        };
      default:
        return {
          icon: Clock,
          label: status,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          darkBgColor: "dark:bg-gray-500/10",
          borderColor: "border-gray-200",
          darkBorderColor: "dark:border-gray-500/30",
          dotColor: "bg-gray-500",
        };
    }
  };

  const getMethodConfig = (method: PaymentMethod) => {
    switch (method) {
      case "credit_card":
        return { icon: CreditCard, label: "Credit Card", color: "text-blue-600" };
      case "debit_card":
        return { icon: CreditCard, label: "Debit Card", color: "text-indigo-600" };
      case "bank_transfer":
        return { icon: Banknote, label: "Bank Transfer", color: "text-green-600" };
      case "upi":
        return { icon: Smartphone, label: "UPI", color: "text-purple-600" };
      case "wallet":
        return { icon: Wallet, label: "Wallet", color: "text-orange-600" };
      case "cash":
        return { icon: Wallet, label: "Cash", color: "text-gray-600" };
      default:
        return { icon: CreditCard, label: method, color: "text-gray-600" };
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
    totalAmount: customerPayments.reduce((sum, p) => sum + (p.status === "completed" ? p.amount : 0), 0),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header Section with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Payment History
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            View and manage all your payment transactions
          </p>
        </div>
        
        {/* Compact Stats on Right */}
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="text-center">
            <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {stats.total}
            </p>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Total
            </p>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className={`text-base font-bold text-green-600`}>
              {stats.completed}
            </p>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Done
            </p>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className={`text-base font-bold text-yellow-600`}>
              {stats.pending}
            </p>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Pending
            </p>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              ${stats.totalAmount.toLocaleString()}
            </p>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Paid
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className={`rounded-2xl p-4 border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5A22] ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["all", "completed", "pending", "failed", "refunded"].map((status) => {
              const isActive = statusFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                    isActive
                      ? "bg-[#FF5A22] text-white shadow-md"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payments List */}
      {filteredPayments.length === 0 ? (
        <div className={`rounded-2xl border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <Receipt className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No payments found
          </p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment, index) => {
            const statusConfig = getStatusConfig(payment.status);
            const methodConfig = getMethodConfig(payment.method);
            const StatusIcon = statusConfig.icon;
            const MethodIcon = methodConfig.icon;

            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left Section - Main Info */}
                    <div className="flex-1 space-y-4">
                      {/* Transaction Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.darkBgColor}`}>
                              <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                            </div>
                            <div>
                              <h3 className={`text-lg font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                                {payment.transactionId}
                              </h3>
                              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Invoice: <span className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{payment.invoiceNumber}</span>
                              </p>
                            </div>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.darkBgColor} ${statusConfig.color} border ${statusConfig.borderColor} ${statusConfig.darkBorderColor}`}>
                            <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></div>
                            {statusConfig.label}
                          </div>
                        </div>
                        {/* Amount - Mobile */}
                        <div className="lg:hidden">
                          <p className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                            ${payment.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Property Info */}
                      <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                          <p className={`text-sm font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {payment.propertyName}
                          </p>
                        </div>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Booking: <span className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{payment.bookingId}</span>
                        </p>
                      </div>

                      {/* Payment Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
                            <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                          </div>
                          <div>
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Date</p>
                            <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {formatDate(payment.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
                            <MethodIcon className={`w-4 h-4 ${methodConfig.color}`} />
                          </div>
                          <div>
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Method</p>
                            <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {methodConfig.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Amount & Actions */}
                    <div className="lg:w-48 shrink-0">
                      <div className="space-y-4">
                        {/* Amount - Desktop */}
                        <div className="hidden lg:block text-right">
                          <p className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Amount Paid
                          </p>
                          <p className={`text-3xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                            ${payment.amount.toFixed(2)}
                          </p>
                        </div>

                        {/* Download Button */}
                        <Link
                          href={`/customer/payments/${payment.id}`}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg ${
                            payment.status === "completed"
                              ? isDarkMode
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                              : payment.status === "pending"
                              ? isDarkMode
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                              : payment.status === "failed"
                              ? isDarkMode
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-red-600 hover:bg-red-700 text-white"
                              : payment.status === "refunded"
                              ? isDarkMode
                                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                              : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          Download Receipt
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
