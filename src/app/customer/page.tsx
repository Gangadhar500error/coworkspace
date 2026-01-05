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
  TrendingUp,
  Sparkles,
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
        gradient: "from-blue-500 via-blue-600 to-blue-700",
        bgGradient: "from-blue-50 to-blue-100/50",
        darkBgGradient: "from-blue-500/10 to-blue-600/5",
        iconBg: "bg-blue-500/10",
        darkIconBg: "bg-blue-400/20",
      },
      {
        id: 2,
        label: "Active Bookings",
        value: activeBookings.toString(),
        change: `${customerBookings.filter(b => b.status === "pending").length} pending`,
        icon: Calendar,
        gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        bgGradient: "from-emerald-50 to-emerald-100/50",
        darkBgGradient: "from-emerald-500/10 to-emerald-600/5",
        iconBg: "bg-emerald-500/10",
        darkIconBg: "bg-emerald-400/20",
      },
      {
        id: 3,
        label: "Total Spent",
        value: `$${totalSpent.toLocaleString()}`,
        change: "All time",
        icon: DollarSign,
        gradient: "from-purple-500 via-purple-600 to-purple-700",
        bgGradient: "from-purple-50 to-purple-100/50",
        darkBgGradient: "from-purple-500/10 to-purple-600/5",
        iconBg: "bg-purple-500/10",
        darkIconBg: "bg-purple-400/20",
      },
      {
        id: 4,
        label: "Saved Spaces",
        value: "8",
        change: "Favorites",
        icon: Star,
        gradient: "from-amber-500 via-amber-600 to-amber-700",
        bgGradient: "from-amber-50 to-amber-100/50",
        darkBgGradient: "from-amber-500/10 to-amber-600/5",
        iconBg: "bg-amber-500/10",
        darkIconBg: "bg-amber-400/20",
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
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/30",
      darkBgGradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
      darkIconColor: "text-blue-400",
    },
    {
      id: 2,
      title: "Meeting Rooms",
      description: `${bookingCounts["Meeting Room"]} booking${bookingCounts["Meeting Room"] !== 1 ? "s" : ""}`,
      count: bookingCounts["Meeting Room"],
      icon: Calendar,
      href: "/customer/bookings?type=Meeting Room",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100/30",
      darkBgGradient: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
      darkIconColor: "text-purple-400",
    },
    {
      id: 3,
      title: "Private Offices",
      description: `${bookingCounts["Private Office"]} booking${bookingCounts["Private Office"] !== 1 ? "s" : ""}`,
      count: bookingCounts["Private Office"],
      icon: Briefcase,
      href: "/customer/bookings?type=Private Office",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100/30",
      darkBgGradient: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-600",
      darkIconColor: "text-emerald-400",
    },
    {
      id: 4,
      title: "Virtual Offices",
      description: `${bookingCounts["Virtual Office"]} booking${bookingCounts["Virtual Office"] !== 1 ? "s" : ""}`,
      count: bookingCounts["Virtual Office"],
      icon: Globe,
      href: "/customer/bookings?type=Virtual Office",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100/30",
      darkBgGradient: "from-orange-500/10 to-orange-600/5",
      iconColor: "text-orange-600",
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
      gradient: "from-blue-500 to-blue-600",
      color: "text-blue-600",
      darkColor: "text-blue-400",
    },
    {
      id: 2,
      title: "Payment History",
      icon: CreditCard,
      href: "/customer/payments",
      gradient: "from-emerald-500 to-emerald-600",
      color: "text-emerald-600",
      darkColor: "text-emerald-400",
    },
    {
      id: 3,
      title: "Invoices",
      icon: FileText,
      href: "/customer/invoices",
      gradient: "from-purple-500 to-purple-600",
      color: "text-purple-600",
      darkColor: "text-purple-400",
    },
    {
      id: 4,
      title: "Settings",
      icon: Settings,
      href: "/customer/settings",
      gradient: "from-gray-500 to-gray-600",
      color: "text-gray-600",
      darkColor: "text-gray-400",
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Section with Stats on Right */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6"
      >
        {/* Left Side - Welcome Text */}
        <div className="flex-1">
          <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Welcome back, Madhan! 👋
          </h1>
          <p className={`text-sm lg:text-base mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Here's an overview of your workspace bookings and activities
          </p>
          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/customer/bookings"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDarkMode
                  ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              View Bookings
            </Link>
            {pendingPayment && (
              <Link
                href="/customer/payments"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isDarkMode
                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Pay Now
              </Link>
            )}
            <Link
              href="/customer/invoices"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDarkMode
                  ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Invoices
            </Link>
          </div>
        </div>

        {/* Right Side - Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 lg:shrink-0">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`rounded-lg p-3 lg:p-4 border transition-all hover:shadow-md ${
                  isDarkMode
                    ? `bg-gradient-to-br ${stat.darkBgGradient} border-gray-800/50`
                    : `bg-gradient-to-br ${stat.bgGradient} border-gray-200/50 shadow-sm`
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 lg:p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-md`}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                </div>
                <p className={`text-lg lg:text-xl font-bold mb-0.5 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {stat.value}
                </p>
                <p className={`text-xs font-medium mb-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {stat.label}
                </p>
                <p className={`text-xs ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}>
                  {stat.change}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Enhanced My Bookings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-800"
                : "bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl md:text-2xl font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  My Bookings
                </h2>
                <p className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Manage your workspace reservations
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actionCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  >
                    <Link
                      href={card.href}
                      className={`group relative overflow-hidden flex items-center gap-4 rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                        isDarkMode
                          ? `bg-gradient-to-br ${card.darkBgGradient} border-gray-700 hover:border-gray-600`
                          : `bg-gradient-to-br ${card.bgGradient} border-gray-200 hover:border-gray-300 shadow-md`
                      }`}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <Icon className={`w-6 h-6 text-white`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base font-bold mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {card.title}
                        </h3>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {card.description}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-400"
                      } group-hover:text-[#FF5A22]`} />
                      {/* Hover gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Next Upcoming Booking */}
          {nextBooking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-blue-800/50"
                  : "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 border border-blue-200 shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold mb-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Next Booking
                  </h2>
                  <p className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Your upcoming reservation
                  </p>
                </div>
                <Link
                  href={`/customer/bookings/${nextBooking.id}`}
                  className={`text-sm font-semibold flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                    isDarkMode
                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className={`relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-xl ${
                  isDarkMode
                    ? "bg-gray-800/80 border-gray-700 backdrop-blur-sm"
                    : "bg-white border-gray-200 shadow-md"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className={`p-3 rounded-xl ${
                        isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                      }`}>
                        <Calendar className={`w-5 h-5 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`} />
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
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : isDarkMode
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        <CheckCircle className="w-4 h-4" />
                        {nextBooking.status}
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {nextBooking.property}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <div className={`flex items-center gap-2 font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          <MapPin className={`w-4 h-4 ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`} />
                          <span>{nextBooking.location}</span>
                        </div>
                        <div className={`flex items-center gap-2 font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          <Clock className={`w-4 h-4 ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`} />
                          <span>{nextBooking.date} • {nextBooking.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`text-center sm:text-right p-4 rounded-xl ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}>
                    <p className={`text-2xl md:text-3xl font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {nextBooking.amount}
                    </p>
                    <Link
                      href={`/customer/bookings/${nextBooking.id}`}
                      className={`text-sm font-semibold text-[#FF5A22] hover:underline inline-flex items-center gap-1`}
                    >
                      View
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Recent Bookings */}
          {recentBookings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-blue-800/50"
                  : "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 border border-blue-200 shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold mb-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Recent Bookings
                  </h2>
                  <p className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Your latest confirmed reservations
                  </p>
                </div>
                <Link
                  href="/customer/bookings"
                  className={`text-sm font-semibold flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                    isDarkMode
                      ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Link
                      href={`/customer/bookings/${booking.id}`}
                      className={`group block rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${
                        isDarkMode
                          ? "bg-gray-800/80 border-gray-700 hover:border-gray-600 backdrop-blur-sm"
                          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className={`text-base md:text-lg font-bold truncate ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {booking.property}
                            </h3>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${
                              isDarkMode
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}>
                              <CheckCircle className="w-4 h-4" />
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                            <span className={`flex items-center gap-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                              <MapPin className={`w-4 h-4 ${
                                isDarkMode ? "text-purple-400" : "text-purple-600"
                              }`} />
                              {booking.location}
                            </span>
                            <span className={`flex items-center gap-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                              <Calendar className={`w-4 h-4 ${
                                isDarkMode ? "text-purple-400" : "text-purple-600"
                              }`} />
                              {booking.date}
                            </span>
                            <span className={`flex items-center gap-2 font-medium ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                              <Clock className={`w-4 h-4 ${
                                isDarkMode ? "text-purple-400" : "text-purple-600"
                              }`} />
                              {booking.time}
                            </span>
                          </div>
                        </div>
                        <div className={`text-left sm:text-right p-4 rounded-xl shrink-0 ${
                          isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                        }`}>
                          <p className={`text-xl md:text-2xl font-bold mb-1 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {booking.amount}
                          </p>
                          <p className={`text-sm font-medium ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}>
                            {booking.type}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Quick Actions & Payment */}
        <div className="space-y-6">
          {/* Enhanced Payment Reminder */}
          {pendingPayment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`relative overflow-hidden rounded-2xl border p-6 ${
                isDarkMode
                  ? "bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-500/30 shadow-lg"
                  : "bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200 shadow-xl"
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg`}>
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-base font-bold mb-1 ${
                      isDarkMode ? "text-amber-300" : "text-amber-900"
                    }`}>
                      Payment Pending
                    </p>
                    <p className={`text-sm font-medium ${
                      isDarkMode ? "text-amber-400/80" : "text-amber-700"
                    }`}>
                      {pendingPayment.amount} • {pendingPayment.invoices} invoice{pendingPayment.invoices > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <Link
                  href="/customer/payments"
                  className={`block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl ${
                    isDarkMode
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                  }`}
                >
                  Pay Now
                </Link>
              </div>
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl" />
            </motion.div>
          )}

          {/* Enhanced Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`relative overflow-hidden rounded-2xl p-6 ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-800"
                : "bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 shadow-lg"
            }`}
          >
            <h2 className={`text-lg md:text-xl font-bold mb-5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Quick Actions
            </h2>
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <Link
                      href={action.href}
                      className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                        isDarkMode
                          ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                          : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} shadow-md group-hover:shadow-lg transition-shadow`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-sm font-semibold flex-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {action.title}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      } group-hover:text-[#FF5A22]`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced Help & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`relative overflow-hidden rounded-2xl p-6 ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-800"
                : "bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 shadow-lg"
            }`}
          >
            <h2 className={`text-lg md:text-xl font-bold mb-5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Support
            </h2>
            <div className="space-y-2">
              <Link
                href="/customer/help"
                className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                    : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md group-hover:shadow-lg transition-shadow">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Help Center
                </span>
                <ArrowRight className={`w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                } group-hover:text-[#FF5A22]`} />
              </Link>
              <Link
                href="/customer/support"
                className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                    : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md group-hover:shadow-lg transition-shadow">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Contact Support
                </span>
                <ArrowRight className={`w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                } group-hover:text-[#FF5A22]`} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
