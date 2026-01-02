"use client";

import { useParams, useRouter } from "next/navigation";
import { useTheme } from "../../../admin/_components/ThemeProvider";
import { customerInvoices } from "../../../../data/invoices";
import { getCustomerInvoiceById } from "../../../../data/invoices";
import {
  ArrowLeft,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Download,
  Printer,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const invoiceId = parseInt(params.id as string);

  const invoice = getCustomerInvoiceById(invoiceId);

  if (!invoice) {
    return (
      <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Invoice not found
        </p>
        <button
          onClick={() => router.push("/customer/invoices")}
          className={`text-sm text-[#FF5A22] hover:underline`}
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  const statusConfig = getStatusConfig(invoice.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/customer/invoices")}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Invoice Details
            </h1>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {invoice.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
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
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            @page {
              margin: 20mm;
              size: A4;
            }
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              color: black !important;
            }
            .no-print {
              display: none !important;
            }
            .print-area h2,
            .print-area h3,
            .print-area p,
            .print-area span,
            .print-area td,
            .print-area th {
              color: black !important;
            }
            .print-area .border-gray-200,
            .print-area .border-gray-700,
            .print-area .border-gray-800 {
              border-color: #e5e7eb !important;
            }
            .print-area .bg-gray-50,
            .print-area .bg-gray-800,
            .print-area .bg-gray-900 {
              background: #f9fafb !important;
            }
          }
        `}</style>

        <div className="print-area p-8 md:p-12">
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                  <FileText className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    INVOICE
                  </h2>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Invoice Number: {invoice.invoiceNumber}
                  </p>
                </div>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${statusConfig.bgColor} ${statusConfig.darkBgColor} ${statusConfig.color} border ${statusConfig.borderColor} ${statusConfig.darkBorderColor}`}>
                <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></div>
                {statusConfig.label}
              </div>
            </div>

            <div className="mt-4 md:mt-0 text-right">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Issue Date</p>
              <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {formatDate(invoice.issueDate)}
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Due Date</p>
              <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {formatDate(invoice.dueDate)}
              </p>
            </div>
          </div>

          {/* Billing Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Bill To
              </h3>
              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                <p className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Madan
                </p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  madan@example.com
                </p>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Property Information
              </h3>
              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {invoice.propertyName}
                  </p>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Booking ID: {invoice.bookingId}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Invoice Items
            </h3>
            <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <th className={`text-left py-4 px-6 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Description
                    </th>
                    <th className={`text-right py-4 px-6 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`py-4 px-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Booking for {invoice.propertyName}
                    </td>
                    <td className={`text-right py-4 px-6 font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.amount.toFixed(2)}
                    </td>
                  </tr>
                  <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <td className={`py-4 px-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Tax ({((invoice.tax / invoice.amount) * 100).toFixed(1)}%)
                    </td>
                    <td className={`text-right py-4 px-6 font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.tax.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Section */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-96">
              <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Subtotal</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Tax</span>
                    <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${invoice.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className={`pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} flex items-center justify-between`}>
                    <span className={`text-xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                      Total Amount
                    </span>
                    <span className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                      ${invoice.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`pt-8 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
            <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Thank you for your business!
            </p>
            <p className={`text-xs text-center mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              This is an automatically generated invoice. For any queries, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

