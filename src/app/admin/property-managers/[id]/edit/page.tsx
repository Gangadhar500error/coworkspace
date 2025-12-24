"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "../../../_components/ThemeProvider";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  ArrowLeft,
  Save,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { PropertyManager } from "@/types/property-manager";
import { mockPropertyManagers, getPropertyManagerBySlug, getTotalEarningsForManager } from "@/data/property-managers";

export default function EditPropertyManagerPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    company: "",
    role: "",
    mobileVerification: "pending" as "verified" | "unverified" | "pending",
    currency: "USD",
    status: "pending" as "active" | "inactive" | "pending",
    description: "",
    joinDate: new Date().toISOString().split("T")[0],
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const slug = params.id as string;
    const manager = getPropertyManagerBySlug(slug);
    
    if (manager) {
      setFormData({
        name: manager.name || "",
        mobile: manager.mobile || "",
        email: manager.email || "",
        address: manager.address || "",
        city: manager.city || "",
        state: manager.state || "",
        zipCode: manager.zipCode || "",
        company: manager.company || "",
        role: manager.role || "",
        mobileVerification: manager.mobileVerification || "pending",
        currency: manager.currency || "USD",
        status: manager.status || "pending",
        description: manager.description || "",
        joinDate: manager.joinDate || new Date().toISOString().split("T")[0],
        image: null,
      });
      
      if (manager.image) {
        setExistingImageUrl(manager.image);
        setImagePreview(manager.image);
      }
    }
    
    setLoading(false);
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setExistingImageUrl(null); // Clear existing image URL when new image is selected
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
    setExistingImageUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form updated:", formData);
      setIsSubmitting(false);
      router.push("/admin/property-managers");
    }, 1000);
  };

  const handleCancel = () => {
    router.push("/admin/property-managers");
  };

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Edit Property Manager
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Update the property manager details
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="p-4 md:p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className={`text-lg font-semibold pb-2 border-b ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                Personal Information
              </h2>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  Profile Image
                </label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Image Preview */}
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className={`absolute top-1 right-1 p-1 rounded-full transition-all ${
                            isDarkMode
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center border-2 border-dashed ${
                        isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-50"
                      }`}>
                        <User className={`w-8 h-8 md:w-10 md:h-10 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-1">
                    <label
                      htmlFor="image-upload"
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm cursor-pointer transition-all ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className={`mt-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Recommended: Square image, max 2MB (JPG, PNG)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <User className="w-4 h-4 text-[#7E22CE]" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <Mail className="w-4 h-4 text-purple-500" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter email address"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <Phone className="w-4 h-4 text-blue-500" />
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Mobile Verification */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <Phone className="w-4 h-4 text-green-500" />
                    Mobile Verification
                  </label>
                  <select
                    name="mobileVerification"
                    value={formData.mobileVerification}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Company & Role Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h2 className={`text-lg font-semibold pb-2 border-b ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                Company & Role
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <Building2 className="w-4 h-4 text-[#FF5A22]" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter company name"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <User className="w-4 h-4 text-[#7E22CE]" />
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="e.g., Senior Property Manager"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h2 className={`text-lg font-semibold pb-2 border-b ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <MapPin className="w-4 h-4 text-red-500" />
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter street address"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter city"
                  />
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter state"
                  />
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h2 className={`text-lg font-semibold pb-2 border-b ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>
                Additional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Currency */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <DollarSign className="w-4 h-4 text-green-500" />
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>

                {/* Total Earnings (Read-only) */}
                {formData.name && (
                  <div className="space-y-2">
                    <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <DollarSign className="w-4 h-4 text-green-500" />
                      Total Earnings
                    </label>
                    <div className={`w-full px-4 py-2.5 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-800/50 border-gray-700"
                        : "bg-gray-50 border-gray-300"
                    }`}>
                      <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: formData.currency || "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(getTotalEarningsForManager(formData.name, formData.company, formData.currency))}
                      </div>
                      <div className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                        {formData.currency || "USD"}
                      </div>
                    </div>
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      Calculated from associated properties
                    </p>
                  </div>
                )}

                {/* Join Date */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                        : "bg-white border-gray-300 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    }`}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <FileText className="w-4 h-4 text-blue-500" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all resize-none ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                  }`}
                  placeholder="Enter a brief description about the property manager..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={`px-4 md:px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
            <button
              type="button"
              onClick={handleCancel}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <X className="w-4 h-4" />
                Cancel
              </div>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } ${
                isDarkMode
                  ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                  : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                {isSubmitting ? "Updating..." : "Update Property Manager"}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

