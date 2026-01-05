"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../../_components/ThemeProvider";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  User,
  Building2,
  FileText,
  CheckCircle,
  XCircle,
  BookOpen,
} from "lucide-react";
import { Customer } from "@/types/customer";
import { getCustomerById } from "@/data/customers";
import { getCustomerBookingStats, getBookingsByCustomerId } from "@/data/bookings";

export default function ManagerCustomerViewPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerId = params.id as string;
    if (customerId) {
      const foundCustomer = getCustomerById(parseInt(customerId));
      if (foundCustomer) {
        // Update stats from bookings
        const stats = getCustomerBookingStats(parseInt(customerId));
        setCustomer({
          ...foundCustomer,
          totalBookings: stats.totalBookings,
          totalSpent: stats.totalSpent,
          lastBookingDate: stats.lastBookingDate || foundCustomer.lastBookingDate,
        });
      }
      setLoading(false);
    }
  }, [params.id]);

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "inactive":
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-600 border-yellow-200";
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleEdit = () => {
    if (customer) {
      router.push(`/manager/customers/${customer.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (customer && confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      console.log("Delete customer:", customer.id);
      router.push("/manager/customers");
    }
  };

  const handleViewBookings = () => {
    if (customer) {
      router.push(`/manager/bookings?customerId=${customer.id}`);
    }
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
            onClick={() => router.push("/manager/customers")}
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

  const bookings = getBookingsByCustomerId(customer.id);
  const memberSinceDays = Math.floor(
    (new Date().getTime() - new Date(customer.joinDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/manager/customers")}
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
              Customer Details
            </h1>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View and manage customer information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleViewBookings}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            View Bookings
          </button>
          <button
            onClick={handleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30"
                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200"
            }`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className={`p-6 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className={`w-24 h-24 rounded-full overflow-hidden border-2 shrink-0 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              {customer.image ? (
                <Image
                  src={customer.image}
                  alt={customer.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}>
                  <User className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {customer.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                    {customer.preferredWorkspaceType && (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
                      }`}>
                        <Building2 className="w-3 h-3 mr-1" />
                        {customer.preferredWorkspaceType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <User className="w-4 h-4" />
                Contact Information
              </div>
              <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  <span className="break-all">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span>{customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <MapPin className="w-4 h-4" />
                Location
              </div>
              <div className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {customer.city ? (
                  <>
                    <div className="font-medium">{customer.city}</div>
                    {customer.location && <div>{customer.location}</div>}
                  </>
                ) : (
                  <div className={`${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Not specified</div>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <Calendar className="w-4 h-4" />
                Account Information
              </div>
              <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className="flex items-center justify-between">
                  <span>Join Date:</span>
                  <span className="font-medium">{formatDate(customer.joinDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Member Since:</span>
                  <span className="font-medium">{memberSinceDays} days</span>
                </div>
              </div>
            </div>

            {/* Booking Statistics */}
            <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <BookOpen className="w-4 h-4" />
                Booking Statistics
              </div>
              <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className="flex items-center justify-between">
                  <span>Total Bookings:</span>
                  <span className="font-semibold">{customer.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Spent:</span>
                  <span className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatPrice(customer.totalSpent)}
                  </span>
                </div>
                {customer.lastBookingDate && (
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Last Booking:</span>
                    <span className="font-medium">{formatDate(customer.lastBookingDate)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Bookings Preview */}
            {bookings.length > 0 && (
              <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <Clock className="w-4 h-4" />
                  Recent Bookings
                </div>
                <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between">
                      <span className="truncate">{booking.property.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        booking.status === "completed"
                          ? isDarkMode ? "bg-green-500/10 text-green-400" : "bg-green-50 text-green-600"
                          : booking.status === "pending"
                          ? isDarkMode ? "bg-yellow-500/10 text-yellow-400" : "bg-yellow-50 text-yellow-600"
                          : isDarkMode ? "bg-gray-500/10 text-gray-400" : "bg-gray-50 text-gray-600"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length > 3 && (
                    <button
                      onClick={handleViewBookings}
                      className={`text-xs font-medium mt-2 ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                    >
                      View all {bookings.length} bookings →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          {customer.notes && (
            <div className={`mt-6 p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <FileText className="w-4 h-4" />
                Notes
              </div>
              <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {customer.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
