"use client";

import { useTheme } from "../_components/ThemeProvider";
import { motion } from "framer-motion";

export default function ManagerBookingsPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="py-4 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
            Bookings
          </h1>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your bookings
          </p>
        </div>
      </div>

      <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Bookings Page
        </p>
        <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Content coming soon...
        </p>
      </div>
    </div>
  );
}

