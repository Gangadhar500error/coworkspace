"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../_components/ThemeProvider";
import {
  Eye,
  X,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  User,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { PropertyManager } from "@/types/property-manager";
import { mockPropertyManagers, filterPropertyManagers } from "@/data/property-managers";
import { Pagination } from "@/components/pagination";
import FilterDropdown from "./FilterDropdown";

export default function PropertyManagersPage() {
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
    mobileVerification: "" as "" | "verified" | "unverified" | "pending",
    role: "",
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

  const handleView = (manager: PropertyManager) => {
    const slug = manager.slug || manager.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    router.push(`/admin/property-managers/${slug}`);
  };

  const handleReject = (id: number) => {
    console.log("Reject property manager:", id);
    // Implement reject functionality
  };

  const handleEdit = (manager: PropertyManager) => {
    const slug = manager.slug || manager.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    router.push(`/admin/property-managers/${slug}/edit`);
  };

  const handleDelete = (id: number) => {
    console.log("Delete property manager:", id);
    // Implement delete functionality
  };

  const handleAddProperty = (id: number) => {
    console.log("Add property for manager:", id);
    // Implement add property functionality
  };

  const handleAddNewUser = () => {
    router.push("/admin/property-managers/add");
  };

  // Apply filters
  const applyFilters = (managers: PropertyManager[]) => {
    return managers.filter((manager) => {
      // Status filter
      if (filters.status && manager.status !== filters.status) {
        return false;
      }
      // Mobile Verification filter
      if (filters.mobileVerification && manager.mobileVerification !== filters.mobileVerification) {
        return false;
      }
      // Role filter
      if (filters.role && manager.role?.toLowerCase() !== filters.role.toLowerCase()) {
        return false;
      }
      return true;
    });
  };

  const searchedManagers = filterPropertyManagers(mockPropertyManagers, searchTerm);
  const filteredManagers = applyFilters(searchedManagers);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredManagers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedManagers = filteredManagers.slice(startIndex, endIndex);

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
      mobileVerification: "",
      role: "",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set()); // Close all expanded rows when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getMobileVerificationColor = (verification?: string) => {
    switch (verification) {
      case "verified":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "unverified":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getMobileVerificationIcon = (verification?: string) => {
    switch (verification) {
      case "verified":
        return <CheckCircle className="w-4 h-4 shrink-0 text-green-500" />;
      case "unverified":
        return <XCircle className="w-4 h-4 shrink-0 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 shrink-0 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 shrink-0 text-gray-500" />;
    }
  };

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-4">
        {/* Top Row - Heading and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Side - Heading */}
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Property Managers
            </h1>
            <p className={`mt-1 md:mt-2 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage all property managers and their details
            </p>
          </div>

          {/* Right Side - Filter Icon and Add Button */}
          <div className="flex items-center gap-3 relative">
          {/* Filter Icon Button with Dropdown */}
          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`relative flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all border ${
                activeFiltersCount > 0
                  ? isDarkMode
                    ? "bg-[#FF5A22]/10 border-[#FF5A22]/30 text-[#FF5A22] hover:bg-[#FF5A22]/20"
                    : "bg-[#FF5A22]/5 border-[#FF5A22]/20 text-[#FF5A22] hover:bg-[#FF5A22]/10"
                  : isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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

            {/* Filter Dropdown */}
            <FilterDropdown
              isOpen={showFilterDropdown}
              onClose={() => setShowFilterDropdown(false)}
              searchTerm={searchTerm}
              onSearchChange={(value) => setSearchTerm(value)}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
              getStatusColor={getStatusColor}
              getMobileVerificationColor={getMobileVerificationColor}
              buttonRef={filterButtonRef}
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddNewUser}
            className={`flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-lg shadow-[#FF5A22]/20"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white shadow-md hover:shadow-lg"
            }`}
          >
            <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Add New User</span>
            <span className="sm:hidden">Add</span>
          </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider w-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  S.No
                </th>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Name
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Mobile Number
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`hidden md:table-cell px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
                <th className={`px-3 md:px-4 lg:px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {/* Expand column */}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-200"}`}>
              {paginatedManagers.map((manager, idx) => {
                const isExpanded = expandedRows.has(manager.id);
                const serialNumber = startIndex + idx + 1;
                return (
                  <Fragment key={manager.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`transition-colors ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
                    >
                      {/* S.No */}
                      <td className={`px-3 md:px-4 lg:px-6 py-4 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <span className="text-sm font-medium">{serialNumber}</span>
                      </td>

                      {/* Name */}
                      <td className={`px-3 md:px-4 lg:px-6 py-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                            {manager.image ? (
                              <Image
                                src={manager.image}
                                alt={manager.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className={`w-4 h-4 md:w-5 md:h-5 text-[#7E22CE]`} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm truncate">{manager.name}</div>
                            {manager.company && (
                              <div className={`text-xs truncate hidden md:block ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {manager.company}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Mobile - Hidden on small screens */}
                      <td className={`hidden md:table-cell px-4 lg:px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="flex items-center gap-2">
                          <Phone className={`w-4 h-4 shrink-0 text-blue-500`} />
                          <span className="text-sm truncate">{manager.mobile}</span>
                        </div>
                      </td>

                      {/* Email - Hidden on small screens */}
                      <td className={`hidden md:table-cell px-4 lg:px-6 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Mail className={`w-4 h-4 shrink-0 text-purple-500`} />
                          <span className="text-sm truncate">{manager.email}</span>
                        </div>
                      </td>

                      {/* Status - Hidden on small screens */}
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(manager.status)}`}>
                          {manager.status || "N/A"}
                        </span>
                      </td>

                      {/* Actions - Hidden on small screens */}
                      <td className="hidden md:table-cell px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          <button
                            onClick={() => handleView(manager)}
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
                            onClick={() => handleReject(manager.id)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "text-orange-400 hover:bg-orange-500/10"
                                : "text-orange-600 hover:bg-orange-100"
                            }`}
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(manager)}
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
                            onClick={() => handleDelete(manager.id)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "text-red-400 hover:bg-red-500/10"
                                : "text-red-600 hover:bg-red-100"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAddProperty(manager.id)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "text-green-400 hover:bg-green-500/10"
                                : "text-green-600 hover:bg-green-100"
                            }`}
                            title="Add Property"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                      {/* Expand Button */}
                      <td className="px-3 md:px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-end md:justify-center gap-1.5 md:gap-0">
                          {/* Show number with collapse on small screens */}
                          <button
                            onClick={() => toggleRow(manager.id)}
                            className={`flex items-center gap-1.5 px-2 py-1.5 md:p-1.5 rounded-lg transition-all ${
                              isDarkMode
                                ? "hover:bg-gray-800 text-gray-400 hover:text-[#FF5A22]"
                                : "hover:bg-gray-100 text-gray-500 hover:text-[#FF5A22]"
                            }`}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            <span className="md:hidden text-xs font-semibold">
                              #{serialNumber}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.div>
                          </button>
                        </div>
                      </td>
                    </motion.tr>

                    {/* Expanded Row Details - Only for this specific row */}
                    <AnimatePresence mode="wait">
                      {isExpanded && (
                        <motion.tr
                          key={`expanded-${manager.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.16, 1, 0.3, 1],
                            opacity: { duration: 0.3 }
                          }}
                          className={`overflow-hidden ${isDarkMode ? "bg-gray-800/30" : "bg-gray-50"}`}
                        >
                          <td colSpan={7} className="px-3 md:px-4 lg:px-6 py-6 md:py-8">
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ 
                                duration: 0.3,
                                delay: 0.1,
                                ease: [0.16, 1, 0.3, 1]
                              }}
                              className="space-y-5 md:space-y-6"
                            >
                              {/* Mobile-only: Mobile Number, Email, Status, Actions */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                                {/* Mobile Number */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Mobile Number
                                  </div>
                                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <Phone className="w-4 h-4 shrink-0 text-blue-500" />
                                    <span className="text-sm truncate">{manager.mobile}</span>
                                  </div>
                                </div>

                                {/* Email */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Email
                                  </div>
                                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <Mail className="w-4 h-4 shrink-0 text-purple-500" />
                                    <span className="text-sm truncate">{manager.email}</span>
                                  </div>
                                </div>

                                {/* Status */}
                                <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Status
                                  </div>
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(manager.status)}`}>
                                    {manager.status || "N/A"}
                                  </span>
                                </div>

                                {/* Actions */}
                                <div className={`p-3 rounded-lg border sm:col-span-2 ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                  <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Actions
                                  </div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                      onClick={() => handleView(manager)}
                                      className={`p-2 rounded-lg transition-all ${
                                        isDarkMode
                                          ? "text-blue-400 hover:bg-blue-500/10"
                                          : "text-blue-600 hover:bg-blue-100"
                                      }`}
                                      title="View"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleReject(manager.id)}
                                      className={`p-2 rounded-lg transition-all ${
                                        isDarkMode
                                          ? "text-orange-400 hover:bg-orange-500/10"
                                          : "text-orange-600 hover:bg-orange-100"
                                      }`}
                                      title="Reject"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleEdit(manager)}
                                      className={`p-2 rounded-lg transition-all ${
                                        isDarkMode
                                          ? "text-yellow-400 hover:bg-yellow-500/10"
                                          : "text-yellow-600 hover:bg-yellow-100"
                                      }`}
                                      title="Edit"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(manager.id)}
                                      className={`p-2 rounded-lg transition-all ${
                                        isDarkMode
                                          ? "text-red-400 hover:bg-red-500/10"
                                          : "text-red-600 hover:bg-red-100"
                                      }`}
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleAddProperty(manager.id)}
                                      className={`p-2 rounded-lg transition-all ${
                                        isDarkMode
                                          ? "text-green-400 hover:bg-green-500/10"
                                          : "text-green-600 hover:bg-green-100"
                                      }`}
                                      title="Add Property"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Large Screen: Simple Clean Layout (No Boxes) */}
                              <div className="hidden md:block space-y-4 pt-3">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                                  {/* Company Name */}
                                  {manager.company && (
                                    <div className="flex items-start gap-3">
                                      <Building2 className="w-4 h-4 shrink-0 mt-0.5 text-[#FF5A22]" />
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Company
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          {manager.company}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Role */}
                                  {manager.role && (
                                    <div className="flex items-start gap-3">
                                      <User className="w-4 h-4 shrink-0 mt-0.5 text-[#7E22CE]" />
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Role
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          {manager.role}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Mobile Verification */}
                                  {manager.mobileVerification && (
                                    <div className="flex items-start gap-3">
                                      {getMobileVerificationIcon(manager.mobileVerification)}
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Mobile Verification
                                        </div>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getMobileVerificationColor(manager.mobileVerification)}`}>
                                          {manager.mobileVerification}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Currency */}
                                  {manager.currency && (
                                    <div className="flex items-start gap-3">
                                      <DollarSign className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Currency
                                        </div>
                                        <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          {manager.currency}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Join Date */}
                                  {manager.joinDate && (
                                    <div className="flex items-start gap-3">
                                      <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Join Date
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          {new Date(manager.joinDate).toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Total Properties */}
                                  {manager.totalProperties !== undefined && (
                                    <div className="flex items-start gap-3">
                                      <Building2 className="w-4 h-4 shrink-0 mt-0.5 text-[#FF5A22]" />
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Total Properties
                                        </div>
                                        <div className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          {manager.totalProperties}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Address */}
                                  {manager.address && (
                                    <div className="flex items-start gap-3 lg:col-span-2">
                                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                                      <div className="min-w-0">
                                        <div className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                          Address
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                          {manager.address}
                                          {manager.city && `, ${manager.city}`}
                                          {manager.state && `, ${manager.state}`}
                                          {manager.zipCode && ` ${manager.zipCode}`}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Description */}
                                {manager.description && (
                                  <div className={`flex items-start gap-3 pt-4 mt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                                    <FileText className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                                    <div className="min-w-0 flex-1">
                                      <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Description
                                      </div>
                                      <div className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {manager.description}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Mobile/Tablet: Box Layout */}
                              <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Company */}
                                {manager.company && (
                                  <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Company
                                    </div>
                                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <Building2 className="w-4 h-4 shrink-0 text-[#FF5A22]" />
                                      <span className="text-sm">{manager.company}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Mobile Verification */}
                                {manager.mobileVerification && (
                                  <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Mobile Verification
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {getMobileVerificationIcon(manager.mobileVerification)}
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getMobileVerificationColor(manager.mobileVerification)}`}>
                                        {manager.mobileVerification}
                                      </span>
                                    </div>
                                  </div>
                                )}

                                {/* Currency */}
                                {manager.currency && (
                                  <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Currency
                                    </div>
                                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <DollarSign className="w-4 h-4 shrink-0 text-green-500" />
                                      <span className="text-sm font-medium">{manager.currency}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Role */}
                                {manager.role && (
                                  <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Role
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      {manager.role}
                                    </div>
                                  </div>
                                )}

                                {/* Join Date */}
                                {manager.joinDate && (
                                  <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Join Date
                                    </div>
                                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <Calendar className="w-4 h-4 shrink-0 text-indigo-500" />
                                      <span className="text-sm">{new Date(manager.joinDate).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Total Properties */}
                                {manager.totalProperties !== undefined && (
                                  <div className={`p-3 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Total Properties
                                    </div>
                                    <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <Building2 className="w-4 h-4 shrink-0 text-[#FF5A22]" />
                                      <span className="text-sm font-semibold">{manager.totalProperties}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Address */}
                                {manager.address && (
                                  <div className={`p-3 rounded-lg border sm:col-span-2 ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Address
                                    </div>
                                    <div className={`flex items-start gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                                      <div className="text-sm">
                                        {manager.address}
                                        {manager.city && `, ${manager.city}`}
                                        {manager.state && `, ${manager.state}`}
                                        {manager.zipCode && ` ${manager.zipCode}`}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Description */}
                                {manager.description && (
                                  <div className={`p-3 rounded-lg border sm:col-span-2 ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
                                    <div className={`text-xs font-semibold uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                      Description
                                    </div>
                                    <div className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                      {manager.description}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredManagers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredManagers.length}
          itemsPerPage={itemsPerPage}
          showInfo={true}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Empty State */}
      {filteredManagers.length === 0 && (
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <User className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No property managers found
          </h3>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {searchTerm ? "Try adjusting your search criteria" : "No property managers have been added yet"}
          </p>
        </div>
      )}
    </div>
  );
}
