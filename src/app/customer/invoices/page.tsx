"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Search,
  Download,
  Eye,
  Building2,
  Receipt,
} from "lucide-react";
import { customerInvoices } from "../../../data/invoices";
import { Invoice, InvoiceStatus } from "../../../types/invoice";

export default function CustomerInvoicesPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusConfig = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return {
          icon: CheckCircle,
          label: "Paid",
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
      case "overdue":
        return {
          icon: AlertCircle,
          label: "Overdue",
          color: "text-red-600",
          bgColor: "bg-red-50",
          darkBgColor: "dark:bg-red-500/10",
          borderColor: "border-red-200",
          darkBorderColor: "dark:border-red-500/30",
          dotColor: "bg-red-500",
        };
      case "cancelled":
        return {
          icon: XCircle,
          label: "Cancelled",
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          darkBgColor: "dark:bg-gray-500/10",
          borderColor: "border-gray-200",
          darkBorderColor: "dark:border-gray-500/30",
          dotColor: "bg-gray-500",
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
            Invoices
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            View and manage all your invoices
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
              {stats.paid}
            </p>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Paid
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
              Total
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
              placeholder="Search invoices..."
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
            {["all", "paid", "pending", "overdue", "cancelled"].map((status) => {
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

      {/* Invoices List */}
      {filteredInvoices.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <Receipt className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No invoices found
          </p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInvoices.map((invoice, index) => {
            const statusConfig = getStatusConfig(invoice.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={invoice.id}
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
                    {/* Left Section - Invoice Info */}
                    <div className="flex-1 space-y-4">
                      {/* Invoice Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                              <FileText className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                            </div>
                            <div>
                              <h3 className={`text-lg font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                                {invoice.invoiceNumber}
                              </h3>
                              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Invoice: <span className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{invoice.bookingId}</span>
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
                            ${invoice.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Property Info */}
                      <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                          <p className={`text-sm font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {invoice.propertyName}
                          </p>
                        </div>
                      </div>

                      {/* Invoice Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
                            <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                          </div>
                          <div>
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Issue Date</p>
                            <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {formatDate(invoice.issueDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
                            <Calendar className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                          </div>
                          <div>
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Due Date</p>
                            <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {formatDate(invoice.dueDate)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Amount Breakdown */}
                      <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Subtotal</span>
                            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              ${invoice.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Tax</span>
                            <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              ${invoice.tax.toFixed(2)}
                            </span>
                          </div>
                          <div className={`pt-2 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} flex items-center justify-between`}>
                            <span className={`text-base font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>Total</span>
                            <span className={`text-xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                              ${invoice.totalAmount.toFixed(2)}
                            </span>
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
                            Total Amount
                          </p>
                          <p className={`text-3xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                            ${invoice.totalAmount.toFixed(2)}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg ${
                            invoice.status === "paid"
                              ? isDarkMode
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                              : invoice.status === "pending"
                              ? isDarkMode
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                              : invoice.status === "overdue"
                              ? isDarkMode
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-red-600 hover:bg-red-700 text-white"
                              : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                          }`}>
                            <Eye className="w-4 h-4" />
                            View Invoice
                          </button>
                          <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg ${
                            invoice.status === "paid"
                              ? isDarkMode
                                ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                                : "bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                              : invoice.status === "pending"
                              ? isDarkMode
                                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                              : invoice.status === "overdue"
                              ? isDarkMode
                                ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                                : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                              : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                          }`}>
                            <Download className="w-4 h-4" />
                            Download PDF
                          </button>
                        </div>
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
