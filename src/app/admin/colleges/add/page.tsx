"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "../../_components/ThemeProvider";
import { ArrowLeft } from "lucide-react";

export default function CreateCollegePage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    username: "",
    email: "",
    mobileNo: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    skype: "",
    collegeType: "",
    approvedBy: "",
    password: "",
    uploadFile: null as File | null,
    brochure: null as File | null,
    nirfRanking: "",
    utmId: "",
    utmMedium: "",
    utmSource: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Create College
        </h1>
        <button
          onClick={() => router.back()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
            isDarkMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-100 hover:bg-green-200 text-green-800"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`rounded-xl border p-6 shadow-sm ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            College Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter college name"
              />
            </div>

            {/* Username */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter email address"
              />
            </div>

            {/* Mobile No */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter mobile number"
              />
            </div>

            {/* Country */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
              </select>
            </div>

            {/* State/Region */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                State/Region <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              >
                <option value="">Select State/Region</option>
                <option value="California">California</option>
                <option value="New York">New York</option>
                <option value="Texas">Texas</option>
                <option value="Florida">Florida</option>
                <option value="Massachusetts">Massachusetts</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                City <span className="text-red-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              >
                <option value="">Select City</option>
                <option value="Boston">Boston</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </div>

            {/* Zip/Postal Code */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Zip/Postal Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter zip/postal code"
              />
            </div>

            {/* Skype */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Skype
              </label>
              <input
                type="text"
                name="skype"
                value={formData.skype}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter Skype ID"
              />
            </div>

            {/* College Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                College Type <span className="text-red-500">*</span>
              </label>
              <select
                name="collegeType"
                value={formData.collegeType}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              >
                <option value="">Select College Type</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Semi-Private">Semi-Private</option>
              </select>
            </div>

            {/* Approved By */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Approved By <span className="text-red-500">*</span>
              </label>
              <select
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
              >
                <option value="">Select Approval Authority</option>
                <option value="UGC">UGC</option>
                <option value="AICTE">AICTE</option>
                <option value="State Government">State Government</option>
                <option value="Central Government">Central Government</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter password"
              />
            </div>

            {/* Upload File */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Upload File
              </label>
              <input
                type="file"
                name="uploadFile"
                onChange={(e) => handleFileChange(e, "uploadFile")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#FF5A22] file:text-white hover:file:bg-[#FF5A22]/90"
                    : "bg-gray-50 border-gray-200 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#FF5A22] file:text-white hover:file:bg-[#FF5A22]/90"
                }`}
              />
            </div>

            {/* Brochure */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Brochure
              </label>
              <input
                type="file"
                name="brochure"
                onChange={(e) => handleFileChange(e, "brochure")}
                accept=".pdf"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#FF5A22] file:text-white hover:file:bg-[#FF5A22]/90"
                    : "bg-gray-50 border-gray-200 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#FF5A22] file:text-white hover:file:bg-[#FF5A22]/90"
                }`}
              />
            </div>

            {/* NIRF Ranking */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                NIRF Ranking
              </label>
              <input
                type="number"
                name="nirfRanking"
                value={formData.nirfRanking}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter NIRF ranking"
              />
            </div>
          </div>
        </div>

        {/* UTM Details Section */}
        <div className={`rounded-xl border p-6 shadow-sm ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            UTM Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UTM ID */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                UTM ID
              </label>
              <input
                type="text"
                name="utmId"
                value={formData.utmId}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter UTM ID"
              />
            </div>

            {/* UTM Medium */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                UTM Medium
              </label>
              <input
                type="text"
                name="utmMedium"
                value={formData.utmMedium}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter UTM medium"
              />
            </div>

            {/* UTM Source */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                UTM Source
              </label>
              <input
                type="text"
                name="utmSource"
                value={formData.utmSource}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter UTM source"
              />
            </div>

            {/* UTM Campaign */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                UTM Campaign
              </label>
              <input
                type="text"
                name="utmCampaign"
                value={formData.utmCampaign}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter UTM campaign"
              />
            </div>

            {/* UTM Term */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                UTM Term
              </label>
              <input
                type="text"
                name="utmTerm"
                value={formData.utmTerm}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter UTM term"
              />
            </div>

            {/* UTM Content */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                UTM Content
              </label>
              <input
                type="text"
                name="utmContent"
                value={formData.utmContent}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#FF5A22] focus:ring-1 focus:ring-[#FF5A22]"
                }`}
                placeholder="Enter UTM content"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-medium transition-all duration-200 bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
          >
            Create College
          </button>
        </div>
      </form>
    </motion.div>
  );
}

