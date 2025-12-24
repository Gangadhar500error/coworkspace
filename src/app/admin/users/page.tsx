"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Power,
  PowerOff,
  MessageSquare,
  User,
  Shield,
  Building2,
} from "lucide-react";
import { User as UserType } from "./types";
import { mockUsers, filterUsers, filterByStatus, filterByRole } from "./data";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function UsersPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const itemsPerPage = 10;

  // Filter states
  const [filters, setFilters] = useState({
    status: "" as "" | "active" | "inactive" | "pending",
    role: "" as "" | "admin" | "user" | "host" | "manager",
  });

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleView = (user: UserType) => {
    router.push(`/admin/users/${user.id}`);
  };

  const handleEdit = (user: UserType) => {
    router.push(`/admin/users/${user.id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user:", id);
      // Implement delete functionality
    }
  };

  const handleMessage = (user: UserType) => {
    router.push(`/admin/messaging?user=${user.id}`);
  };

  const handleToggleStatus = (id: number, currentStatus: UserType["status"]) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    if (confirm(`Are you sure you want to ${newStatus === "active" ? "activate" : "deactivate"} this user?`)) {
      console.log(`Toggle user status: ${id} -> ${newStatus}`);
      // Implement toggle functionality
    }
  };

  const handleAddUser = () => {
    router.push("/admin/users/add");
  };

  // Apply filters
  const applyFilters = (users: UserType[]) => {
    let filtered = users;
    
    if (filters.status) {
      filtered = filterByStatus(filtered, filters.status);
    }
    if (filters.role) {
      filtered = filterByRole(filtered, filters.role);
    }
    
    return filtered;
  };

  const searchedUsers = filterUsers(mockUsers, searchTerm);
  const filteredUsers = applyFilters(searchedUsers);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter((f) => f !== "").length;

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      role: "",
    });
    setSearchTerm("");
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

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

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Users
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all users and their accounts
            </p>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`relative flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeFiltersCount > 0
                    ? isDarkMode
                      ? "bg-[#FF5A22]/10 border border-[#FF5A22]/30 text-[#FF5A22] hover:bg-[#FF5A22]/20"
                      : "bg-[#FF5A22]/5 border border-[#FF5A22]/20 text-[#FF5A22] hover:bg-[#FF5A22]/10"
                    : isDarkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
                {activeFiltersCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isDarkMode ? "bg-[#FF5A22] text-white" : "bg-[#FF5A22] text-white"
                  }`}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <FilterDropdown
                isOpen={showFilterDropdown}
                onClose={() => setShowFilterDropdown(false)}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
                buttonRef={filterButtonRef}
              />
            </div>

            <button
              onClick={handleAddUser}
              className={`flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all ${
                isDarkMode
                  ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                  : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add New User</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg overflow-hidden ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-16 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  S.No
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  User
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Role
                </th>
                <th className={`px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  City
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
                <th className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className={`px-4 py-12 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <User className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                    <p>No users found</p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, idx) => {
                  const isExpanded = expandedRows.has(user.id);
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <Fragment key={user.id}>
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`transition-colors ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
                      >
                        {/* S.No */}
                        <td className={`px-4 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <span className="text-sm font-medium">{serialNumber}</span>
                        </td>

                        {/* User Avatar & Name */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          <div className="flex items-start gap-3">
                            <div className="relative shrink-0">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
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
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-sm md:text-base">{user.name}</div>
                              <div className={`text-xs mt-0.5 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {user.email}
                              </div>
                              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-2 border ${getStatusColor(user.status)}`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>

                        {/* City */}
                        <td className={`px-4 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <div className="flex items-center gap-2">
                            <MapPin className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <span className="text-sm font-medium">{user.city}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className={`px-4 py-4`}>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleMessage(user)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "text-purple-400 hover:bg-purple-500/10"
                                  : "text-purple-600 hover:bg-purple-100"
                              }`}
                              title="Message"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleView(user)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "text-blue-400 hover:bg-blue-500/10"
                                  : "text-blue-600 hover:bg-blue-100"
                              }`}
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(user)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "text-yellow-400 hover:bg-yellow-500/10"
                                  : "text-yellow-600 hover:bg-yellow-100"
                              }`}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "text-red-400 hover:bg-red-500/10"
                                  : "text-red-600 hover:bg-red-100"
                              }`}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                        {/* Expand Button */}
                        <td className={`px-4 py-4 text-center`}>
                          <button
                            onClick={() => toggleRow(user.id)}
                            className={`p-1.5 md:p-2 rounded-lg transition-all ${
                              isDarkMode
                                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            }`}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.div>
                          </button>
                        </td>
                      </motion.tr>

                      {/* Expanded Row Details */}
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.tr
                            key={`expanded-${user.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              ease: [0.16, 1, 0.3, 1],
                              opacity: { duration: 0.3 }
                            }}
                          >
                            <td colSpan={6} className={`px-4 py-6 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6"
                              >
                                {/* Status & Role Badges */}
                                <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Status:
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      Role:
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                  </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  {/* Contact Details */}
                                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-white"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <Phone className="w-4 h-4" />
                                      Contact Details
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 shrink-0" />
                                        <span className="break-all">{user.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 shrink-0" />
                                        <span>{user.phone}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Location & Activity */}
                                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-white"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <MapPin className="w-4 h-4" />
                                      Location & Activity
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 shrink-0" />
                                        <span>{user.city}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 shrink-0" />
                                        <span>Last active: {user.lastActive}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 shrink-0" />
                                        <span>Joined: {formatDate(user.joinedDate)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Statistics */}
                                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-white"}`}>
                                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                      <DollarSign className="w-4 h-4" />
                                      Statistics
                                    </div>
                                    <div className={`text-sm space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <div>
                                        <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Bookings</div>
                                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {user.totalBookings}
                                        </div>
                                      </div>
                                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <div className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Spent</div>
                                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                          {formatPrice(user.totalSpent)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Additional Actions */}
                                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                                  <button
                                    onClick={() => handleMessage(user)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30"
                                        : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
                                    }`}
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                    Send Message
                                  </button>
                                  <button
                                    onClick={() => handleView(user)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
                                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                                    }`}
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleEdit(user)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isDarkMode
                                        ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30"
                                        : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200"
                                    }`}
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit User
                                  </button>
                                  <button
                                    onClick={() => handleToggleStatus(user.id, user.status)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
                                </div>
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}
