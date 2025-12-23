"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { PropertyFormData } from "@/types/property";

interface AvailabilitySectionProps {
  formData: PropertyFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onWorkingDayChange: (day: string, checked: boolean) => void;
  isDarkMode: boolean;
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export default function AvailabilitySection({ formData, onChange, onWorkingDayChange, isDarkMode }: AvailabilitySectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <h2 className={`text-lg font-semibold pb-2 border-b flex items-center gap-2 ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
        <Clock className="w-5 h-5 text-[#FF5A22]" />
        Availability & Timings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Opening Time
          </label>
          <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={onChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Closing Time
          </label>
          <input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={onChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
          />
        </div>
        <div className="md:col-span-2">
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Working Days
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {DAYS_OF_WEEK.map((day) => {
              const dayKey = day.toLowerCase() as keyof typeof formData.workingDays;
              return (
                <label
                  key={day}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                    formData.workingDays[dayKey]
                      ? isDarkMode
                        ? "bg-[#FF5A22]/10 border-[#FF5A22]"
                        : "bg-[#FF5A22]/5 border-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.workingDays[dayKey]}
                    onChange={(e) => onWorkingDayChange(dayKey, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{day.slice(0, 3)}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            24×7 Available
          </label>
          <select
            name="available24x7"
            value={formData.available24x7}
            onChange={onChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}`}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

