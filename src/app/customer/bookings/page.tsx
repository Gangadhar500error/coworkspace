"use client";

import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, DollarSign, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function CustomerBookingsPage() {
  const { isDarkMode } = useTheme();

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            My Bookings
          </h1>
          <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage and track all your workspace bookings
          </p>
        </div>
        <button
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isDarkMode
              ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
              : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
          }`}
        >
          New Booking
        </button>
      </div>

      {/* Bookings List */}
      <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="p-6">
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {booking.property}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <p className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </p>
                          <p className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            <Calendar className="w-4 h-4" />
                            {booking.date}
                          </p>
                          <p className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                        {booking.type}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {booking.amount}
                      </p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Total
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        View
                      </button>
                      {booking.status === "pending" && (
                        <button
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

