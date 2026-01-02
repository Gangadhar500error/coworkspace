"use client";

import { useState } from "react";
import { useTheme } from "../_components/ThemeProvider";
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
  Building2,
  Shield,
  Key,
  Eye,
  EyeOff,
  Download,
  XCircle,
} from "lucide-react";

export default function ManagerSettingsPage() {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "Manager",
    lastName: "Name",
    email: "manager@coworkspace.com",
    phone: "+1 (555) 123-4567",
    company: "CoworkSpace Inc.",
    address: "123 Business Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    bookingUpdates: true,
    paymentUpdates: true,
    customerMessages: true,
    propertyUpdates: true,
    promotions: false,
    newsletters: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
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

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Here you would typically save password to backend
    console.log("Changing password");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
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
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Profile Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}>
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  <User className={`w-10 h-10 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                </div>
              </div>
              <div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  Change Photo
                </button>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  JPG, PNG or GIF. Max size 2MB
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
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
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
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                />
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
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
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
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
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
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm ${
                    isDarkMode
                      ? isEditing
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-800/50 border-gray-700 text-gray-400"
                      : isEditing
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password & Security */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              <Lock className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Password & Security
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handlePasswordSave}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isDarkMode
                    ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                    : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                }`}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              <Bell className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Email Notifications</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Receive notifications via email
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("email")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.email
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.email ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>SMS Notifications</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Receive notifications via SMS
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("sms")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.sms
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.sms ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Push Notifications</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Receive push notifications
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("push")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.push
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.push ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className={`border-t pt-4 mt-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Booking Updates</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Get notified about booking changes
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("bookingUpdates")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.bookingUpdates
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.bookingUpdates ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Payment Updates</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Get notified about payment transactions
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("paymentUpdates")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.paymentUpdates
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.paymentUpdates ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Customer Messages</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Get notified when customers message you
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("customerMessages")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.customerMessages
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.customerMessages ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Property Updates</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Get notified about property status changes
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange("propertyUpdates")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    notifications.propertyUpdates
                      ? "bg-[#FF5A22]"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.propertyUpdates ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Settings */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              <Moon className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Appearance
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Dark Mode</p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Switch between light and dark theme
                  </p>
                </div>
                <div className={`flex items-center gap-2 p-1 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  <Sun className={`w-4 h-4 ${!isDarkMode ? "text-[#FF5A22]" : "text-gray-400"}`} />
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {isDarkMode ? "Dark" : "Light"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-6">
              <Shield className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Account Settings
              </h2>
            </div>

            <div className="space-y-4">
              <button
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Two-Factor Authentication
                </div>
              </button>
              <button
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Data
                </div>
              </button>
              <button
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isDarkMode
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                    : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Delete Account
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
