"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../../../_components/ThemeProvider";
import {
  ArrowLeft,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Building2,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Customer } from "@/types/customer";
import { getCustomerById } from "@/data/customers";
import { getCustomerBookingStats } from "@/data/bookings";

export default function CustomerEditPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active" as "active" | "inactive" | "pending",
    city: "",
    location: "",
    preferredWorkspaceType: "" as "" | "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office",
    notes: "",
  });

  useEffect(() => {
    const customerId = params.id as string;
    if (customerId) {
      const foundCustomer = getCustomerById(parseInt(customerId));
      if (foundCustomer) {
        const stats = getCustomerBookingStats(parseInt(customerId));
        const customerWithStats = {
          ...foundCustomer,
          totalBookings: stats.totalBookings,
          totalSpent: stats.totalSpent,
          lastBookingDate: stats.lastBookingDate || foundCustomer.lastBookingDate,
        };
        setCustomer(customerWithStats);
        setFormData({
          name: foundCustomer.name,
          email: foundCustomer.email,
          phone: foundCustomer.phone,
          status: foundCustomer.status,
          city: foundCustomer.city || "",
          location: foundCustomer.location || "",
          preferredWorkspaceType: foundCustomer.preferredWorkspaceType || "",
          notes: foundCustomer.notes || "",
        });
      }
      setLoading(false);
    }
  }, [params.id]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Save customer:", customer?.id, formData);
    // Implement save functionality
    setSaving(false);
    router.push(`/admin/customers/${customer?.id}`);
  };

  const handleCancel = () => {
    router.push(`/admin/customers/${customer?.id}`);
  };

  if (loading) {
    return (
      <div className={`py-6 flex items-center justify-center min-h-[400px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5A22] mx-auto mb-4"></div>
          <p>Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className={`py-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <div className="text-center py-12">
          <User className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h2 className="text-2xl font-bold mb-2">Customer Not Found</h2>
          <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            The customer you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/admin/customers")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Edit Customer
            </h1>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Update customer information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCancel}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 border border-gray-500/30"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className={`w-20 h-20 rounded-full overflow-hidden border-2 shrink-0 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              {customer.image ? (
                <Image
                  src={customer.image}
                  alt={customer.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  <User className={`w-10 h-10 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                </div>
              )}
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {customer.name}
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Customer ID: {customer.id}
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Location Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  City
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="Enter city"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Location/Area
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="Enter location or area"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Preferred Workspace Type
                </label>
                <div className="relative">
                  <Building2 className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <select
                    value={formData.preferredWorkspaceType}
                    onChange={(e) => handleInputChange("preferredWorkspaceType", e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select workspace type</option>
                    <option value="Coworking">Coworking</option>
                    <option value="Private Office">Private Office</option>
                    <option value="Meeting Room">Meeting Room</option>
                    <option value="Virtual Office">Virtual Office</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Additional Information
            </h3>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Notes
              </label>
              <div className="relative">
                <FileText className={`absolute left-3 top-3 w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="Add any notes about this customer..."
                />
              </div>
            </div>
          </div>

          {/* Read-only Information */}
          <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Account Statistics (Read-only)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Bookings</div>
                <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {customer.totalBookings}
                </div>
              </div>
              <div>
                <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Spent</div>
                <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  ${customer.totalSpent.toLocaleString()}
                </div>
              </div>
              <div>
                <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Join Date</div>
                <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {new Date(customer.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

