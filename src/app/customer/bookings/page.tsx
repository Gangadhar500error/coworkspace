"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
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
  Globe
} from "lucide-react";

export default function CustomerBookingsPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const bookings = [
    {
      id: 1,
      property: "Downtown Cowork Space",
      location: "New York, NY",
      date: "2024-01-15",
      time: "9:00 AM - 5:00 PM",
      status: "confirmed",
      amount: "$150",
      type: "Coworking",
      bookingId: "BK-2024-001",
    },
    {
      id: 2,
      property: "Meeting Room A",
      location: "San Francisco, CA",
      date: "2024-01-16",
      time: "2:00 PM - 4:00 PM",
      status: "pending",
      amount: "$80",
      type: "Meeting Room",
      bookingId: "BK-2024-002",
    },
    {
      id: 3,
      property: "Private Office Suite",
      location: "Los Angeles, CA",
      date: "2024-01-17",
      time: "Full Day",
      status: "confirmed",
      amount: "$200",
      type: "Private Office",
      bookingId: "BK-2024-003",
    },
    {
      id: 4,
      property: "Virtual Office Premium",
      location: "Chicago, IL",
      date: "2024-01-18",
      time: "Monthly",
      status: "confirmed",
      amount: "$120",
      type: "Virtual Office",
      bookingId: "BK-2024-004",
    },
    {
      id: 5,
      property: "Tech Hub Workspace",
      location: "Austin, TX",
      date: "2024-01-19",
      time: "9:00 AM - 6:00 PM",
      status: "confirmed",
      amount: "$175",
      type: "Coworking",
      bookingId: "BK-2024-005",
    },
    {
      id: 6,
      property: "Executive Conference Room",
      location: "Boston, MA",
      date: "2024-01-20",
      time: "10:00 AM - 12:00 PM",
      status: "pending",
      amount: "$95",
      type: "Meeting Room",
      bookingId: "BK-2024-006",
    },
    {
      id: 7,
      property: "Premium Private Office",
      location: "Seattle, WA",
      date: "2024-01-21",
      time: "Full Day",
      status: "confirmed",
      amount: "$250",
      type: "Private Office",
      bookingId: "BK-2024-007",
    },
    {
      id: 8,
      property: "Business Center Virtual",
      location: "Miami, FL",
      date: "2024-01-22",
      time: "Monthly",
      status: "confirmed",
      amount: "$140",
      type: "Virtual Office",
      bookingId: "BK-2024-008",
    },
    {
      id: 9,
      property: "Creative Space CoWork",
      location: "Portland, OR",
      date: "2024-01-23",
      time: "9:00 AM - 5:00 PM",
      status: "confirmed",
      amount: "$160",
      type: "Coworking",
      bookingId: "BK-2024-009",
    },
    {
      id: 10,
      property: "Boardroom Elite",
      location: "Denver, CO",
      date: "2024-01-24",
      time: "3:00 PM - 5:00 PM",
      status: "pending",
      amount: "$110",
      type: "Meeting Room",
      bookingId: "BK-2024-010",
    },
  ];

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

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });


  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
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

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
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
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold mb-2 truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {booking.property}
                    </h3>
                    <p className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Booking ID: {booking.bookingId}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>
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

                {/* Type Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {getTypeIcon(booking.type)}
                    {booking.type}
                  </span>
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
