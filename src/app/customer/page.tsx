"use client";

import { useMemo } from "react";
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
  CreditCard,
  DollarSign,
  CalendarCheck,
  Star,
  Bell,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import { customerBookings } from "@/data/customer-bookings";
import { customerPayments } from "@/data/payments";
import { customerInvoices } from "@/data/invoices";

export default function CustomerDashboardPage() {
  const { isDarkMode } = useTheme();

  // Calculate stats from real data
  const stats = useMemo(() => {
    const totalBookings = customerBookings.length;
    const activeBookings = customerBookings.filter(b => b.status === "confirmed" || b.status === "pending").length;
    const totalSpent = customerPayments
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    
    // Get this month's bookings count
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthBookings = customerBookings.filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate.getMonth() === thisMonth && bookingDate.getFullYear() === thisYear;
    }).length;

    return [
      {
        id: 1,
        label: "Total Bookings",
        value: totalBookings.toString(),
        change: `+${thisMonthBookings} this month`,
        icon: CalendarCheck,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: 2,
        label: "Active Bookings",
        value: activeBookings.toString(),
        change: `${customerBookings.filter(b => b.status === "pending").length} pending`,
        icon: Calendar,
        color: "from-green-500 to-green-600",
      },
      {
        id: 3,
        label: "Total Spent",
        value: `$${totalSpent.toLocaleString()}`,
        change: "All time",
        icon: DollarSign,
        color: "from-purple-500 to-purple-600",
      },
      {
        id: 4,
        label: "Saved Spaces",
        value: "8",
        change: "Favorites",
        icon: Star,
        color: "from-orange-500 to-orange-600",
      },
    ];
  }, []);

  // Calculate booking counts by type
  const bookingCounts = useMemo(() => {
    return {
      Coworking: customerBookings.filter(b => b.type === "Coworking").length,
      "Meeting Room": customerBookings.filter(b => b.type === "Meeting Room").length,
      "Private Office": customerBookings.filter(b => b.type === "Private Office").length,
      "Virtual Office": customerBookings.filter(b => b.type === "Virtual Office").length,
    };
  }, []);

  // My Bookings cards - filter by type with counts
  const actionCards = useMemo(() => [
    {
      id: 1,
      title: "Coworking Spaces",
      description: `${bookingCounts.Coworking} booking${bookingCounts.Coworking !== 1 ? "s" : ""}`,
      count: bookingCounts.Coworking,
      icon: Building2,
      href: "/customer/bookings?type=Coworking",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      darkBgColor: "bg-blue-500/10",
      darkIconColor: "text-blue-400",
    },
    {
      id: 2,
      title: "Meeting Rooms",
      description: `${bookingCounts["Meeting Room"]} booking${bookingCounts["Meeting Room"] !== 1 ? "s" : ""}`,
      count: bookingCounts["Meeting Room"],
      icon: Calendar,
      href: "/customer/bookings?type=Meeting Room",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      darkBgColor: "bg-purple-500/10",
      darkIconColor: "text-purple-400",
    },
    {
      id: 3,
      title: "Private Offices",
      description: `${bookingCounts["Private Office"]} booking${bookingCounts["Private Office"] !== 1 ? "s" : ""}`,
      count: bookingCounts["Private Office"],
      icon: Briefcase,
      href: "/customer/bookings?type=Private Office",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      darkBgColor: "bg-green-500/10",
      darkIconColor: "text-green-400",
    },
    {
      id: 4,
      title: "Virtual Offices",
      description: `${bookingCounts["Virtual Office"]} booking${bookingCounts["Virtual Office"] !== 1 ? "s" : ""}`,
      count: bookingCounts["Virtual Office"],
      icon: Globe,
      href: "/customer/bookings?type=Virtual Office",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      darkBgColor: "bg-orange-500/10",
      darkIconColor: "text-orange-400",
    },
  ], [bookingCounts]);

  // Get next upcoming booking (pending or confirmed, sorted by date)
  const nextBooking = useMemo(() => {
    const upcoming = customerBookings
      .filter(b => b.status === "pending" || b.status === "confirmed")
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    
    if (!upcoming) return null;

    const bookingDate = new Date(upcoming.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let dateDisplay = "";
    if (bookingDate.toDateString() === today.toDateString()) {
      dateDisplay = "Today";
    } else if (bookingDate.toDateString() === tomorrow.toDateString()) {
      dateDisplay = "Tomorrow";
    } else {
      dateDisplay = bookingDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    return {
      id: upcoming.id,
      property: upcoming.property,
      location: upcoming.location,
      date: dateDisplay,
      time: upcoming.time,
      type: upcoming.type,
      amount: upcoming.amount,
      status: upcoming.status,
    };
  }, []);

  // Get recent bookings (last 2 confirmed bookings)
  const recentBookings = useMemo(() => {
    return customerBookings
      .filter(b => b.status === "confirmed")
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2)
      .map(b => {
        const bookingDate = new Date(b.date);
        return {
          id: b.id,
          property: b.property,
          location: b.location,
          date: bookingDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          time: b.time,
          type: b.type,
          amount: b.amount,
          status: b.status,
        };
      });
  }, []);

  // Calculate pending payment from invoices
  const pendingPayment = useMemo(() => {
    const pendingInvoices = customerInvoices.filter(inv => inv.status === "pending");
    const totalAmount = pendingInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    
    return pendingInvoices.length > 0 ? {
      amount: `$${totalAmount.toLocaleString()}`,
      invoices: pendingInvoices.length,
    } : null;
  }, []);

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: "View All Bookings",
      icon: CalendarCheck,
      href: "/customer/bookings",
      color: "text-blue-600",
      darkColor: "text-blue-400",
    },
    {
      id: 2,
      title: "Payment History",
      icon: CreditCard,
      href: "/customer/payments",
      color: "text-green-600",
      darkColor: "text-green-400",
    },
    {
      id: 3,
      title: "Invoices",
      icon: FileText,
      href: "/customer/invoices",
      color: "text-purple-600",
      darkColor: "text-purple-400",
    },
    {
      id: 4,
      title: "Settings",
      icon: Settings,
      href: "/customer/settings",
      color: "text-gray-600",
      darkColor: "text-gray-400",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Simple Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Welcome back, Madan! 👋
        </h1>
        <p className={`text-sm lg:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Here's an overview of your workspace bookings and activities
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`rounded-lg p-5 transition-all hover:shadow-md ${
                isDarkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`text-2xl font-bold mb-0.5 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {stat.value}
                  </p>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
              <p className={`text-xs mt-3 pt-3 border-t ${isDarkMode ? "text-gray-500 border-gray-800" : "text-gray-500 border-gray-200"}`}>
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Bookings Actions */}
          <div className={`rounded-xl p-5 ${
            isDarkMode
              ? "bg-gray-900/50 border border-gray-800"
              : "bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-200"
          }`}>
            <h2 className={`text-xl font-bold mb-5 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              My Bookings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actionCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={card.href}
                      className={`group flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-lg ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl ${
                        isDarkMode ? card.darkBgColor : card.bgColor
                      } flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className={`w-7 h-7 ${isDarkMode ? card.darkIconColor : card.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {card.title}
                        </h3>
                        <p className={`text-sm truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {card.description}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 shrink-0 ${isDarkMode ? "text-gray-500" : "text-gray-400"} group-hover:text-[#FF5A22] transition-colors`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Next Upcoming Booking */}
          {nextBooking && (
            <div className={`rounded-xl p-5 ${
              isDarkMode
                ? "bg-gray-900/50 border border-gray-800"
                : "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100"
            }`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Next Booking
                </h2>
                <Link
                  href={`/customer/bookings/${nextBooking.id}`}
                  className={`text-sm font-semibold flex items-center gap-1.5 transition-colors text-[#FF5A22] hover:text-[#FF5A22]/80`}
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`rounded-xl border p-6 transition-all hover:shadow-lg ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                        <Calendar className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                      </div>
                      <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        {nextBooking.type}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        nextBooking.status === "confirmed"
                          ? isDarkMode
                            ? "bg-green-500/10 text-green-400 border border-green-500/30"
                            : "bg-green-50 text-green-600 border border-green-200"
                          : isDarkMode
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                          : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                      }`}>
                        <CheckCircle className="w-4 h-4" />
                        {nextBooking.status}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {nextBooking.property}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className={`flex items-center gap-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <MapPin className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                        <span>{nextBooking.location}</span>
                      </div>
                      <div className={`flex items-center gap-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <Clock className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                        <span>{nextBooking.date} • {nextBooking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {nextBooking.amount}
                    </p>
                    <Link
                      href={`/customer/bookings/${nextBooking.id}`}
                      className={`text-sm font-semibold text-[#FF5A22] hover:underline`}
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Recent Bookings */}
          {recentBookings.length > 0 && (
            <div className={`rounded-xl p-5 ${
              isDarkMode
                ? "bg-gray-900/50 border border-gray-800"
                : "bg-gradient-to-br from-gray-50 to-purple-50/30 border border-gray-200"
            }`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Recent Bookings
                </h2>
                <Link
                  href="/customer/bookings"
                  className={`text-sm font-semibold flex items-center gap-1.5 transition-colors text-[#FF5A22] hover:text-[#FF5A22]/80`}
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    href={`/customer/bookings/${booking.id}`}
                    className={`block rounded-xl border p-5 transition-all hover:shadow-lg ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className={`text-base font-bold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {booking.property}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${
                            isDarkMode
                              ? "bg-green-500/10 text-green-400 border border-green-500/30"
                              : "bg-green-50 text-green-600 border border-green-200"
                          }`}>
                            <CheckCircle className="w-4 h-4" />
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                          <span className={`flex items-center gap-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <MapPin className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                            {booking.location}
                          </span>
                          <span className={`flex items-center gap-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <Calendar className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                            {booking.date}
                          </span>
                          <span className={`flex items-center gap-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <Clock className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                            {booking.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {booking.amount}
                        </p>
                        <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {booking.type}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Quick Actions & Payment */}
        <div className="space-y-5">
          {/* Payment Reminder */}
          {pendingPayment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className={`rounded-xl border p-5 ${
                isDarkMode
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-yellow-50 border-yellow-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-100"}`}>
                  <CreditCard className={`w-5 h-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold mb-1 ${isDarkMode ? "text-yellow-300" : "text-yellow-900"}`}>
                    Payment Pending
                  </p>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-yellow-400/80" : "text-yellow-700"}`}>
                    {pendingPayment.amount} • {pendingPayment.invoices} invoice{pendingPayment.invoices > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <Link
                href="/customer/payments"
                className={`block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isDarkMode
                    ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }`}
              >
                Pay Now
              </Link>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className={`rounded-xl p-5 ${
            isDarkMode
              ? "bg-gray-900/50 border border-gray-800"
              : "bg-gradient-to-br from-gray-50 to-green-50/30 border border-gray-200"
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Quick Actions
            </h2>
            <div className={`rounded-xl border p-4 space-y-2 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-sm"
            }`}>
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link
                      href={action.href}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isDarkMode ? action.darkColor : action.color}`} />
                      <span className={`text-sm font-semibold flex-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {action.title}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Help & Support */}
          <div className={`rounded-xl p-5 ${
            isDarkMode
              ? "bg-gray-900/50 border border-gray-800"
              : "bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-200"
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Support
            </h2>
            <div className={`rounded-xl border p-4 space-y-2 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-sm"
            }`}>
              <Link
                href="/customer/help"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <HelpCircle className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Help Center
                </span>
              </Link>
              <Link
                href="/customer/support"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <Bell className={`w-5 h-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Contact Support
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
