"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  Shield,
  MessageSquare,
  Power,
  PowerOff,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { User as UserType } from "../types";
import { getUserById } from "../data";

export default function UserViewPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = params.id as string;
    if (userId) {
      const foundUser = getUserById(parseInt(userId));
      setUser(foundUser || null);
      setLoading(false);
    }
  }, [params.id]);

  const getStatusColor = (status: UserType["status"]) => {
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

  const getRoleColor = (role: UserType["role"]) => {
    switch (role) {
      case "admin":
        return isDarkMode
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-red-50 text-red-600 border-red-200";
      case "host":
        return isDarkMode
          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
          : "bg-blue-50 text-blue-600 border-blue-200";
      case "manager":
        return isDarkMode
          ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
          : "bg-purple-50 text-purple-600 border-purple-200";
      case "user":
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
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
    }).format(amount);
  };

  const handleEdit = () => {
    if (user) {
      router.push(`/admin/users/${user.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (user && confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user:", user.id);
      router.push("/admin/users");
    }
  };

  const handleMessage = () => {
    if (user) {
      router.push(`/admin/messaging?user=${user.id}`);
    }
  };

  const handleToggleStatus = () => {
    if (user) {
      const newStatus = user.status === "active" ? "inactive" : "active";
      if (confirm(`Are you sure you want to ${newStatus === "active" ? "activate" : "deactivate"} this user?`)) {
        console.log(`Toggle user status: ${user.id} -> ${newStatus}`);
        // Implement toggle functionality
      }
    }
  };

  if (loading) {
    return (
      <div className={`py-6 flex items-center justify-center min-h-[400px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5A22] mx-auto mb-4"></div>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`py-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        <div className="text-center py-12">
          <User className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            The user you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/admin/users")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            Back to Users
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
            onClick={() => router.push("/admin/users")}
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
              User Details
            </h1>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View and manage user information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleMessage}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30"
                : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Message
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
            onClick={handleToggleStatus}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              user.status === "active"
                ? isDarkMode
                  ? "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 border border-gray-500/30"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                : isDarkMode
                ? "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
            }`}
          >
            {user.status === "active" ? (
              <>
                <PowerOff className="w-4 h-4" />
                Deactivate
              </>
            ) : (
              <>
                <Power className="w-4 h-4" />
                Activate
              </>
            )}
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Sticky User Details */}
        <div className="lg:col-span-1">
          <div className={`sticky top-6 rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-6 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FF5A22&color=fff&size=128`;
                      }}
                    />
                  </div>
                  {user.status === "active" && (
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>
                <h2 className={`text-xl font-bold text-center mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {user.name}
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div className={`space-y-4 border-t ${isDarkMode ? "border-gray-800 pt-4" : "border-gray-200 pt-4"}`}>
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Email
                  </label>
                  <p className={`text-sm break-all ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Phone
                  </label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {user.phone}
                  </p>
                </div>
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    City
                  </label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {user.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="p-6">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">Total Bookings</span>
                  </div>
                  <div className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {user.totalBookings}
                  </div>
                </div>

                <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">Total Spent</span>
                  </div>
                  <div className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatPrice(user.totalSpent)}
                  </div>
                </div>

                <div className={`p-6 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">Last Active</span>
                  </div>
                  <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {user.lastActive}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <User className="w-5 h-5" />
                Account Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Full Name
                  </label>
                  <div className={`text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user.name}</div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Email Address
                  </label>
                  <div className={`text-base break-all ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user.email}</div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Phone Number
                  </label>
                  <div className={`text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user.phone}</div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    City
                  </label>
                  <div className={`text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user.city}</div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Role
                  </label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Status
                  </label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                    {user.status === "active" && <CheckCircle className="w-4 h-4 mr-1" />}
                    {user.status === "inactive" && <XCircle className="w-4 h-4 mr-1" />}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Joined Date
                  </label>
                  <div className={`text-base flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Calendar className="w-4 h-4" />
                    {formatDate(user.joinedDate)}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Last Active
                  </label>
                  <div className={`text-base flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Clock className="w-4 h-4" />
                    {user.lastActive}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

