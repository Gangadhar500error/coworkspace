"use client";

import { useTheme } from "../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Building2,
  Briefcase,
  Globe,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const { isDarkMode } = useTheme();

  // Primary action cards
  const actionCards = [
    {
      id: 1,
      title: "Book Cowork Space",
      description: "Find and book flexible coworking spaces",
      icon: Building2,
      href: "/customer/bookings/new?type=cowork",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Book Meeting Room",
      description: "Reserve meeting rooms for your team",
      icon: Calendar,
      href: "/customer/bookings/new?type=meeting",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      title: "Book Private Office",
      description: "Get your own dedicated workspace",
      icon: Briefcase,
      href: "/customer/bookings/new?type=office",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      title: "Virtual Office",
      description: "Professional address and mail handling",
      icon: Globe,
      href: "/customer/bookings/new?type=virtual",
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  // Next upcoming booking
  const nextBooking = {
    id: 1,
    property: "Downtown Cowork Space",
    location: "New York, NY",
    date: "Tomorrow, Jan 15",
    time: "9:00 AM - 5:00 PM",
    type: "Coworking Space",
    amount: "$150",
  };

  // Recent bookings
  const recentBookings = [
    {
      id: 2,
      property: "Meeting Room A",
      location: "San Francisco, CA",
      date: "Jan 16",
      time: "2:00 PM - 4:00 PM",
      type: "Meeting Room",
      amount: "$80",
      status: "confirmed",
    },
    {
      id: 3,
      property: "Private Office Suite",
      location: "Los Angeles, CA",
      date: "Jan 17",
      time: "Full Day",
      type: "Private Office",
      amount: "$200",
      status: "confirmed",
    },
  ];

  // Payment reminder (only if pending)
  const pendingPayment = {
    amount: "$1,250",
    invoices: 2,
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      {/* <div className="mb-6">
        <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Dashboard
        </h1>
        <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Welcome back! Here's an overview of your workspace bookings and activities.
        </p>
      </div> */}

      {/* Greeting Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF5A22] via-[#FF7A42] to-[#FF9A62] p-8 lg:p-10 text-white shadow-lg"
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-white/90 text-lg">
                Ready to find your perfect workspace today?
              </p>
            </div>
            <div className="hidden lg:block">
              <Sparkles className="w-12 h-12 text-white/30" />
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </motion.div>

      {/* Payment Reminder - Minimal */}
      {pendingPayment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-xl border p-4 flex items-center justify-between ${isDarkMode ? "bg-yellow-500/10 border-yellow-500/30" : "bg-yellow-50 border-yellow-200"}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-100"}`}>
              <CreditCard className={`w-5 h-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            </div>
            <div>
              <p className={`text-sm font-medium ${isDarkMode ? "text-yellow-300" : "text-yellow-900"}`}>
                Payment Pending
              </p>
              <p className={`text-xs ${isDarkMode ? "text-yellow-400/80" : "text-yellow-700"}`}>
                {pendingPayment.amount} across {pendingPayment.invoices} invoice{pendingPayment.invoices > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Link
            href="/customer/payments"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDarkMode ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"}`}
          >
            Pay Now
          </Link>
        </motion.div>
      )}

      {/* Primary Action Cards */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          What would you like to book?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={card.href}
                  className={`group block rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${isDarkMode ? card.bgColor.replace("50", "500/20") : card.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${isDarkMode ? card.iconColor.replace("600", "400") : card.iconColor}`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {card.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {card.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#FF5A22] group-hover:gap-3 transition-all">
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next Upcoming Booking */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Your Next Booking
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl border p-6 lg:p-8 ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700" : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                  <Calendar className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700"}`}>
                  {nextBooking.type}
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {nextBooking.property}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{nextBooking.location}</span>
                </div>
                <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <Clock className="w-4 h-4" />
                  <span>{nextBooking.date} • {nextBooking.time}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
              <div className="text-right">
                <p className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {nextBooking.amount}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Total
                </p>
              </div>
              <Link
                href={`/customer/bookings/${nextBooking.id}`}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${isDarkMode ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white" : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"}`}
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Recent Bookings
          </h2>
          <Link
            href="/customer/bookings"
            className={`text-sm font-medium flex items-center gap-1 transition-colors ${isDarkMode ? "text-[#FF5A22] hover:text-[#FF5A22]/80" : "text-[#FF5A22] hover:text-[#FF5A22]/80"}`}
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link
                href={`/customer/bookings/${booking.id}`}
                className={`block rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-1 ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {booking.property}
                    </h3>
                    <p className={`text-sm flex items-center gap-1 mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      {booking.location}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${isDarkMode ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-green-50 text-green-600 border border-green-200"}`}>
                    <CheckCircle className="w-3 h-3" />
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {booking.date}
                    </p>
                    <p className="flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {booking.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {booking.amount}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {booking.type}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
