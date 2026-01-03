"use client";

import { useState } from "react";
import { useTheme } from "./_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { mockCompletedBookings } from "@/data/bookings";
import { mockCustomers } from "@/data/customers";
import { customerProperties } from "@/data/customer-properties";

export default function ManagerDashboardPage() {
  const { isDarkMode } = useTheme();

  // Calculate real statistics
  const totalProperties = customerProperties.length;
  const activeProperties = customerProperties.filter((p) => p.status === "active").length;
  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter((c) => c.status === "active").length;
  const totalBookings = mockCompletedBookings.length;
  const pendingBookings = mockCompletedBookings.filter((b) => b.status === "pending").length;
  const completedBookings = mockCompletedBookings.filter((b) => b.status === "completed").length;
  const totalRevenue = mockCompletedBookings.reduce((sum, b) => sum + b.billing.total, 0);
  const monthlyRevenue = mockCompletedBookings
    .filter((b) => {
      const bookingDate = new Date(b.createdAt);
      const now = new Date();
      return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, b) => sum + b.billing.total, 0);

  // Get recent bookings (last 5)
  const recentBookings = [...mockCompletedBookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get recent customers (last 5)
  const recentCustomers = [...mockCustomers]
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 5);

  // Get top properties by revenue
  const topProperties = [...customerProperties]
    .sort((a, b) => {
      const revenueA = parseFloat(a.totalRevenue.replace(/[^0-9.]/g, "")) || 0;
      const revenueB = parseFloat(b.totalRevenue.replace(/[^0-9.]/g, "")) || 0;
      return revenueB - revenueA;
    })
    .slice(0, 3);

  const stats = [
    {
      id: 1,
      label: "Total Properties",
      value: totalProperties.toString(),
      change: `${activeProperties} active`,
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      href: "/manager/property-listing",
    },
    {
      id: 2,
      label: "Total Customers",
      value: totalCustomers.toString(),
      change: `${activeCustomers} active`,
      icon: Users,
      color: "from-green-500 to-green-600",
      href: "/manager/customers",
    },
    {
      id: 3,
      label: "Total Bookings",
      value: totalBookings.toString(),
      change: `${completedBookings} completed`,
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      href: "/manager/bookings",
    },
    {
      id: 4,
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: `$${monthlyRevenue.toLocaleString()} this month`,
      icon: DollarSign,
      color: "from-orange-500 to-orange-600",
      href: "/manager/payment",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="py-4 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
            Dashboard
          </h1>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Welcome back! Here's what's happening with your properties today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/manager/property-listing/add"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.id} href={stat.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-lg border p-5 transition-all hover:shadow-lg cursor-pointer ${
                  isDarkMode ? "bg-gray-900 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`} />
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </h3>
                <p className={`text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </p>
                <p className={`text-xs flex items-center gap-1 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings - Takes 2 columns */}
        <div className={`lg:col-span-2 rounded-lg border p-6 ${
          isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Recent Bookings
            </h2>
            <Link
              href="/manager/bookings"
              className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentBookings.length === 0 ? (
              <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                <p>No bookings yet</p>
              </div>
            ) : (
              recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/manager/bookings/${booking.id}`}
                  className={`block p-4 rounded-lg border transition-all hover:shadow-md ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {booking.seeker.name}
                        </h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className={`text-sm mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {booking.property.name}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                          {booking.bookingId}
                        </span>
                        <span className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                          ${booking.billing.total.toLocaleString()}
                        </span>
                        <span className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                          {formatTimeAgo(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats & Actions - Takes 1 column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className={`rounded-lg border p-6 ${
            isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Pending Bookings
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {pendingBookings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Active Properties
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {activeProperties}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Active Customers
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {activeCustomers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Monthly Revenue
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  ${monthlyRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`rounded-lg border p-6 ${
            isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                href="/manager/property-listing/add"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Add New Property</span>
              </Link>
              <Link
                href="/manager/bookings"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">View All Bookings</span>
              </Link>
              <Link
                href="/manager/messages"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Check Messages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Recent Customers & Top Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <div className={`rounded-lg border p-6 ${
          isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Recent Customers
            </h2>
            <Link
              href="/manager/customers"
              className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentCustomers.length === 0 ? (
              <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                <p>No customers yet</p>
              </div>
            ) : (
              recentCustomers.map((customer) => (
                <Link
                  key={customer.id}
                  href={`/manager/customers`}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="relative shrink-0">
                    <Image
                      src={customer.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=6366f1&color=fff&size=128`}
                      alt={customer.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {customer.status === "active" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {customer.name}
                    </h3>
                    <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {customer.email}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                        {customer.totalBookings} bookings
                      </span>
                      <span className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                        ${customer.totalSpent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Top Properties */}
        <div className={`rounded-lg border p-6 ${
          isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Top Properties
            </h2>
            <Link
              href="/manager/property-listing"
              className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {topProperties.length === 0 ? (
              <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                <p>No properties yet</p>
              </div>
            ) : (
              topProperties.map((property, idx) => (
                <Link
                  key={property.id}
                  href={`/manager/property-listing/${property.id}`}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      #{idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.propertyName}
                    </h3>
                    <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {property.location}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
                        {property.totalBookings} bookings
                      </span>
                      <span className={`font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                        {property.totalRevenue}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
