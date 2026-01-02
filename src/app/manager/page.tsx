"use client";

import { useTheme } from "./_components/ThemeProvider";
import { motion } from "framer-motion";
import {
  Calendar,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function ManagerDashboardPage() {
  const { isDarkMode } = useTheme();

  const stats = [
    {
      id: 1,
      label: "Total Properties",
      value: "12",
      change: "+2 this month",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      label: "Total Customers",
      value: "145",
      change: "+12 this month",
      icon: Users,
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      label: "Total Bookings",
      value: "89",
      change: "+8 this month",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      label: "Total Revenue",
      value: "$24,580",
      change: "+15% this month",
      icon: DollarSign,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="py-4 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
            Manager Dashboard
          </h1>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Overview of your properties and bookings
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-lg border p-6 transition-all hover:shadow-md ${
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </h3>
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {stat.label}
              </p>
              <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                <Clock className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  New booking received for Property #{item}
                </p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {item} hour{item > 1 ? "s" : ""} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

