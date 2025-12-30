"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { customerInvoices } from "../../../data/invoices";
import { Invoice, InvoiceStatus } from "../../../types/invoice";

export default function CustomerInvoicesPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "overdue":
        return isDarkMode
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-red-50 text-red-600 border-red-200";
      case "cancelled":
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredInvoices = customerInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.bookingId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customerInvoices.length,
    paid: customerInvoices.filter((inv) => inv.status === "paid").length,
    pending: customerInvoices.filter((inv) => inv.status === "pending").length,
    overdue: customerInvoices.filter((inv) => inv.status === "overdue").length,
    totalAmount: customerInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Invoices
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage and track your invoices
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
                <p className={`text-sm font-bold text-green-600`}>{stats.paid}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Paid</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-yellow-600`}>{stats.pending}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>${(stats.totalAmount / 1000).toFixed(1)}K</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total</p>
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
                    placeholder="Search invoices, properties..."
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
                {["all", "paid", "pending", "overdue", "cancelled"].map((status) => (
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

      {/* Invoices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInvoices.length === 0 ? (
          <div className={`col-span-full rounded-xl border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No invoices found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
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
                      <FileText className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <h3 className={`text-lg font-bold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {invoice.invoiceNumber}
                      </h3>
                    </div>
                    <p className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Booking: {invoice.bookingId}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(invoice.status)}`}
                    >
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </div>
                </div>

                {/* Property Name */}
                <div className="mb-4">
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {invoice.propertyName}
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
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Issue Date</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{invoice.issueDate}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-orange-500/20" : "bg-orange-100"}`}>
                        <Calendar className={`w-4 h-4 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Due Date</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{invoice.dueDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amount Details */}
                <div className={`rounded-lg p-3 mb-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Amount</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Tax</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.tax.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Total</p>
                    <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Footer - Actions */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <button
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      View
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
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

