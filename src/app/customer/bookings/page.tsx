"use client";

import { useState, useEffect, Suspense } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Building2,
  Briefcase,
  Users,
  Globe,
  X
} from "lucide-react";
import { customerBookings, filterCustomerBookings } from "@/data/customer-bookings";

function CustomerBookingsPageContent() {
  const { isDarkMode } = useTheme();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>(searchParams.get("type") || "all");

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
        return <Building2 className="w-4 h-4" />;
      case "Meeting Room":
        return <Users className="w-4 h-4" />;
      case "Private Office":
        return <Briefcase className="w-4 h-4" />;
      case "Virtual Office":
        return <Globe className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  // Update type filter when URL param changes
  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setTypeFilter(typeParam);
    } else {
      setTypeFilter("all");
    }
  }, [searchParams]);

  // Filter bookings using the helper function from data file
  const filteredBookings = filterCustomerBookings(
    customerBookings,
    searchTerm,
    statusFilter,
    typeFilter
  );


  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 text-[#FF5A22]`}>
            My Bookings
          </h1>
        </div>
        <Link
          href="/customer/bookings/new"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            isDarkMode
              ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
              : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
          }`}
        >
          <Plus className="w-4 h-4" />
          New Booking
        </Link>
      </div>


      {/* Search and Filters */}
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
                placeholder="Search bookings, properties, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-transparent border-none outline-none text-sm ${
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
            
            {/* Type Filter */}
            {typeFilter !== "all" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setTypeFilter("all");
                    window.history.pushState({}, "", "/customer/bookings");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isDarkMode
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                      : "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200"
                  }`}
                >
                  {typeFilter}
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {["all", "confirmed", "pending", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
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

      {/* Bookings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBookings.length === 0 ? (
          <div className={`col-span-full rounded-xl border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No bookings found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
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
                <div className="mb-4">
                  {/* Space Name - Simple & Beautiful */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg ${
                        isDarkMode 
                          ? "bg-[#FF5A22]/20 text-[#FF5A22]" 
                          : "bg-[#FF5A22]/10 text-[#FF5A22]"
                      }`}>
                        {getTypeIcon(booking.type)}
                      </div>
                      <h3 className={`text-xl font-bold text-[#FF5A22]`}>
                        {booking.property}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {getTypeIcon(booking.type)}
                        {booking.type}
                      </span>
                    </div>
                  </div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Booking ID: <span className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{booking.bookingId}</span>
                  </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-4">
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                      <MapPin className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Location</p>
                      <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{booking.location}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                        <Calendar className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Date</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{booking.date}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                        <Clock className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Time</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{booking.time}</p>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Footer - Amount and Actions */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {booking.amount}
                      </p>
                      <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Total Amount
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/customer/bookings/${booking.id}`}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-all ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      View Details
                    </Link>
                    {booking.status === "pending" && (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          isDarkMode
                            ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                            : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                        }`}
                      >
                        Pay Now
                      </button>
                    )}
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

export default function CustomerBookingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <CustomerBookingsPageContent />
    </Suspense>
  );
}
