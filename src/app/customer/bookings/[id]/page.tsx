"use client";

import { useParams, useRouter } from "next/navigation";
import { useTheme } from "../../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  Briefcase,
  Users,
  Globe,
  FileText,
  CreditCard,
  Download,
  Printer,
  Mail,
  Phone,
} from "lucide-react";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const bookingId = params.id as string;

  // Mock booking data - in real app, fetch by ID
  const booking = {
    id: parseInt(bookingId),
    property: "Downtown Cowork Space",
    location: "New York, NY",
    address: "123 Main Street, New York, NY 10001",
    date: "2024-01-15",
    time: "9:00 AM - 5:00 PM",
    status: "confirmed",
    amount: "$150",
    type: "Coworking",
    bookingId: "BK-2024-001",
    createdAt: "2024-01-10",
    duration: "8 hours",
    seats: 1,
    amenities: ["Wi-Fi", "Printing", "Coffee", "Parking"],
    provider: {
      name: "CoworkSpace Inc.",
      email: "contact@coworkspace.com",
      phone: "+1 (555) 123-4567",
    },
    billing: {
      subtotal: "$130",
      tax: "$20",
      discount: "$0",
      total: "$150",
    },
    payment: {
      method: "Credit Card",
      status: "Paid",
      transactionId: "TXN-2024-001",
      paidAt: "2024-01-10 10:30 AM",
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "cancelled":
        return isDarkMode
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-red-50 text-red-600 border-red-200";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Coworking":
        return <Building2 className="w-5 h-5" />;
      case "Meeting Room":
        return <Users className="w-5 h-5" />;
      case "Private Office":
        return <Briefcase className="w-5 h-5" />;
      case "Virtual Office":
        return <Globe className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className={`p-2 rounded-lg transition-all ${
            isDarkMode
              ? "hover:bg-gray-800 text-gray-300"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Booking Details
          </h1>
          <p className={`text-sm lg:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Booking ID: {booking.bookingId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Download
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Printer className="w-4 h-4 inline mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Overview */}
          <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                    {getTypeIcon(booking.type)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {booking.property}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
                </div>
                <p className={`text-sm font-medium mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {booking.type} • {booking.duration}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.amount}
                </p>
                <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Total Amount
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                  <MapPin className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Location</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.location}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{booking.address}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                  <Calendar className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Date</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.date}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                  <Clock className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Time</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.time}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-orange-500/20" : "bg-orange-100"}`}>
                  <Users className={`w-4 h-4 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Seats</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.seats}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {booking.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Billing Details */}
          <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Billing Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Subtotal</p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.billing.subtotal}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Tax</p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.billing.tax}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Discount</p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.billing.discount}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Total</p>
                <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.billing.total}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Payment Info */}
          <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Payment Info</h3>
            <div className="space-y-3">
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Method</p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.payment.method}
                </p>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Status</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.payment.status === "Paid"
                      ? isDarkMode
                        ? "bg-green-500/10 text-green-400"
                        : "bg-green-50 text-green-600"
                      : isDarkMode
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  <CreditCard className="w-3 h-3" />
                  {booking.payment.status}
                </span>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Transaction ID
                </p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.payment.transactionId}
                </p>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Paid At</p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.payment.paidAt}
                </p>
              </div>
            </div>
          </div>

          {/* Provider Contact */}
          <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Provider Contact</h3>
            <div className="space-y-4">
              <div>
                <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.provider.name}
                </p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${booking.provider.email}`}
                    className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    <Mail className="w-4 h-4" />
                    {booking.provider.email}
                  </a>
                  <a
                    href={`tel:${booking.provider.phone}`}
                    className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    <Phone className="w-4 h-4" />
                    {booking.provider.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {booking.status === "pending" && (
            <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-yellow-500/10 border-yellow-500/30" : "bg-yellow-50 border-yellow-200"}`}>
              <p className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-yellow-300" : "text-yellow-900"}`}>
                Payment Pending
              </p>
              <button
                className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isDarkMode
                    ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                    : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                }`}
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

