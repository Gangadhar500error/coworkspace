"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Save,
  Edit2,
  Camera,
} from "lucide-react";

export default function CustomerSettingsPage() {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Madan",
    lastName: "",
    email: "madan@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    bookingUpdates: true,
    promotions: false,
    newsletters: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving settings:", formData);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Settings
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your account settings and preferences
          </p>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`p-2 rounded-lg transition-all ${
                    isDarkMode
                      ? "hover:bg-gray-800 text-gray-400"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full overflow-hidden ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <User className={`w-10 h-10 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  </div>
                </div>
                {isEditing && (
                  <button
                    className={`absolute bottom-0 right-0 p-2 rounded-full ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } border-2 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formData.firstName} {formData.lastName}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {formData.email}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isEditing
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isEditing
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                      isEditing
                        ? isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                        : isDarkMode
                        ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Phone
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                      isEditing
                        ? isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                        : isDarkMode
                        ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Address
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`} />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                      isEditing
                        ? isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                        : isDarkMode
                        ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isEditing
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isEditing
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isEditing
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Password & Security */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Password & Security
            </h2>
            <div className="space-y-4">
              <button
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                  <span className="font-medium">Change Password</span>
                </div>
                <Edit2 className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Preferences */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notifications */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              <Bell className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              {(Object.keys(notifications) as Array<keyof typeof notifications>).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {key.split(/(?=[A-Z])/).join(" ").replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notifications[key]
                        ? "bg-[#FF5A22]"
                        : isDarkMode
                        ? "bg-gray-700"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications[key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              {isDarkMode ? (
                <Moon className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              ) : (
                <Sun className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              )}
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Appearance
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Dark Mode
              </span>
              <button
                onClick={() => {
                  // Toggle dark mode - this would typically be handled by a global state
                  console.log("Toggle dark mode");
                }}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-[#FF5A22]"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    isDarkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language & Region */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              <Globe className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Language & Region
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Language
                </label>
                <select
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Timezone
                </label>
                <select
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

