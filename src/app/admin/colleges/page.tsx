"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "../_components/ThemeProvider";
import CollegeFilter from "../_components/CollegeFilter";
import { fetchUsers, UserData, UsersResponse } from "@/lib/api";
import {
  Plus,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Mail,
  UserX,
  ChevronUp,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface College {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "Suspended";
  country?: string;
  state?: string;
  city?: string;
}

interface FilterState {
  search: string;
  status: string;
  role: string;
  country: string;
  state: string;
  city: string;
}

interface PaginationState {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

// Map API user data to College interface
const mapUserToCollege = (user: UserData): College => {
  return {
    id: user.id,
    name: user.name || "",
    username: user.user_name || "",
    email: user.email || "",
    role: user.role?.title || user.role?.slug || "Admin",
    status: (user.status as "Active" | "Inactive" | "Pending" | "Suspended") || "Active",
  };
};

export default function CollegesPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    role: "all",
    country: "all",
    state: "all",
    city: "all",
  });
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const actionsDropdownRef = useRef<HTMLDivElement>(null);
  
  // API data state
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Fetch colleges data from API
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetchUsers({
          search: filters.search || undefined,
          column: sortColumn,
          dir: sortDir,
          length: pagination.perPage,
          page: pagination.currentPage,
          draw: 1,
        });

        const mappedColleges = response.data.map(mapUserToCollege);
        setColleges(mappedColleges);
        
        // Update pagination state
        setPagination(prev => ({
          ...prev,
          currentPage: response.meta.current_page,
          total: response.meta.total,
          lastPage: response.meta.last_page,
          perPage: response.meta.per_page,
        }));
      } catch (err: any) {
        setError(err.message || "Failed to fetch colleges");
        console.error("Error fetching colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [filters.search, sortColumn, sortDir, pagination.perPage, pagination.currentPage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target as Node)) {
        setActionsDropdownOpen(false);
      }
    };
    if (actionsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionsDropdownOpen]);

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

  // Apply client-side filters (status, role, country, state, city)
  // Note: Search is handled server-side via API
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      // Status filter
      if (filters.status !== "all" && college.status !== filters.status) {
        return false;
      }

      // Role filter
      if (filters.role !== "all" && college.role !== filters.role) {
        return false;
      }

      // Country filter
      if (filters.country !== "all" && college.country !== filters.country) {
        return false;
      }

      // State filter
      if (filters.state !== "all" && college.state !== filters.state) {
        return false;
      }

      // City filter
      if (filters.city !== "all" && college.city !== filters.city) {
        return false;
      }

      return true;
    });
  }, [colleges, filters]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setPagination(prev => ({ ...prev, perPage, currentPage: 1 }));
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDir(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDir("asc");
    }
  };

  const getStatusColor = (status: College["status"]) => {
    const colors = {
      Active: isDarkMode ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-green-100 text-green-800 border-green-200",
      Inactive: isDarkMode ? "bg-gray-500/20 text-gray-400 border-gray-500/30" : "bg-gray-100 text-gray-800 border-gray-200",
      Pending: isDarkMode ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : "bg-yellow-100 text-yellow-800 border-yellow-200",
      Suspended: isDarkMode ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status];
  };

  const ActionButton = ({ icon: Icon, label, onClick, variant = "default" }: {
    icon: any;
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
  }) => {
    const isDanger = variant === "danger";
    return (
      <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
          isDanger
            ? isDarkMode
              ? "hover:bg-red-500/20 text-red-400"
              : "hover:bg-red-100 text-red-600"
            : isDarkMode
            ? "hover:bg-gray-800 text-gray-300"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        title={label}
        aria-label={label}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className=" space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Colleges
        </h1>
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <CollegeFilter 
            isDarkMode={isDarkMode} 
            onFilterChange={setFilters}
            renderButtonOnly={true}
            onButtonClick={() => setFilterPanelOpen(!filterPanelOpen)}
            isOpen={filterPanelOpen}
          />
          
          {/* Actions Button */}
          <div className="relative" ref={actionsDropdownRef}>
            <button
              onClick={() => setActionsDropdownOpen(!actionsDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                  : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              Actions
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${actionsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

          <AnimatePresence>
            {actionsDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden border z-50 ${
                  isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                }`}
              >
                <button
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors ${
                    isDarkMode
                      ? "hover:bg-gray-800 text-gray-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => {
                    router.push("/admin/colleges/add");
                    setActionsDropdownOpen(false);
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
                <button
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors border-t ${
                    isDarkMode
                      ? "border-gray-800 hover:bg-gray-800 text-gray-200"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => {
                    console.log("States");
                    setActionsDropdownOpen(false);
                  }}
                >
                  States
                </button>
                <button
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors border-t ${
                    isDarkMode
                      ? "border-gray-800 hover:bg-gray-800 text-gray-200"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => {
                    console.log("Cities");
                    setActionsDropdownOpen(false);
                  }}
                >
                  Cities
                </button>
                <button
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors border-t ${
                    isDarkMode
                      ? "border-gray-800 hover:bg-gray-800 text-gray-200"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                  onClick={() => {
                    console.log("Countries");
                    setActionsDropdownOpen(false);
                  }}
                >
                  Countries
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {filterPanelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <CollegeFilter 
              isDarkMode={isDarkMode} 
              onFilterChange={setFilters}
              isOpen={filterPanelOpen}
              renderPanelOnly={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Input */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search colleges by name, username, or email..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className={`w-full px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-gray-600"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-[#FF5A22]/20`}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Per page:
          </span>
          <select
            value={pagination.perPage}
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-[#FF5A22]/20`}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className={`p-4 rounded-lg border flex items-center gap-3 ${
          isDarkMode ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-red-50 border-red-200 text-red-700"
        }`}>
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A22]" />
          <span className={`ml-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Loading colleges...
          </span>
        </div>
      )}

      {/* Table */}
      <div className={`rounded-xl border overflow-hidden shadow-sm ${
        isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
      }`}>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDarkMode ? "border-gray-400 bg-gray-800/50" : "border-gray-200 bg-gray-50"
              }`}>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  S.No
                </th>
                <th 
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-700/50 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Name
                    {sortColumn === "name" && (
                      <span>{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th 
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-700/50 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  onClick={() => handleSort("user_name")}
                >
                  <div className="flex items-center gap-1">
                    Username
                    {sortColumn === "user_name" && (
                      <span>{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  Email
                </th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  Role
                </th>
                <th 
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-700/50 transition-colors ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortColumn === "status" && (
                      <span>{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
                <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-300"}`}>
              {!loading && filteredColleges.length === 0 && (
                <tr>
                  <td colSpan={7} className={`px-6 py-12 text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    No colleges found
                  </td>
                </tr>
              )}
              {filteredColleges.map((college, index) => (
                <motion.tr
                  key={college.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`transition-colors duration-150 ${
                    isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  }`}>
                    {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {college.name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {college.username}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {college.email}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {college.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(college.status)}`}>
                      {college.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <ActionButton
                        icon={Eye}
                        label="View"
                        onClick={() => router.push(`/admin/colleges/view/${college.id}`)}
                      />
                      <ActionButton
                        icon={Edit}
                        label="Edit"
                        onClick={() => router.push(`/admin/colleges/edit/${college.id}`)}
                      />
                      <ActionButton
                        icon={Mail}
                        label="Send Email"
                        onClick={() => console.log("Email", college.id)}
                      />
                      <ActionButton
                        icon={UserX}
                        label="Suspend"
                        onClick={() => console.log("Suspend", college.id)}
                      />
                      <ActionButton
                        icon={Trash2}
                        label="Delete"
                        variant="danger"
                        onClick={() => console.log("Delete", college.id)}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className={`md:hidden divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-300"}`}>
          {filteredColleges.map((college, index) => {
            const isExpanded = expandedRows.has(college.id);
            return (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 ${
                  isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-900"
                    }`}>
                      {college.id}.
                    </span>
                    <span className={`text-sm font-semibold truncate ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {college.name}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleRow(college.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
                    }`}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden mt-3 space-y-3 pt-3 border-t border-gray-200 dark:border-gray-800"
                    >
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className={`font-medium ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}>Username:</span>
                          <p className={isDarkMode ? "text-gray-300" : "text-gray-900"}>{college.username}</p>
                        </div>
                        <div>
                          <span className={`font-medium ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}>Role:</span>
                          <p className={isDarkMode ? "text-gray-300" : "text-gray-900"}>{college.role}</p>
                        </div>
                        <div className="col-span-2">
                          <span className={`font-medium ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}>Email:</span>
                          <p className={isDarkMode ? "text-gray-300" : "text-gray-900"}>{college.email}</p>
                        </div>
                        <div className="col-span-2">
                          <span className={`font-medium ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}>Status:</span>
                          <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border mt-1 ${getStatusColor(college.status)}`}>
                            {college.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <ActionButton
                          icon={Eye}
                          label="View"
                          onClick={() => router.push(`/admin/colleges/view/${college.id}`)}
                        />
                        <ActionButton
                          icon={Edit}
                          label="Edit"
                          onClick={() => router.push(`/admin/colleges/edit/${college.id}`)}
                        />
                        <ActionButton
                          icon={Mail}
                          label="Send Email"
                          onClick={() => console.log("Email", college.id)}
                        />
                        <ActionButton
                          icon={UserX}
                          label="Suspend"
                          onClick={() => console.log("Suspend", college.id)}
                        />
                        <ActionButton
                          icon={Trash2}
                          label="Delete"
                          variant="danger"
                          onClick={() => console.log("Delete", college.id)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {!loading && pagination.total > 0 && (
        <div className={`flex items-center justify-between px-6 py-4 border-t rounded-b-xl ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}>
          <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Showing {pagination.currentPage === 1 ? 1 : (pagination.currentPage - 1) * pagination.perPage + 1} to{" "}
            {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of {pagination.total} colleges
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pagination.currentPage === 1
                  ? isDarkMode
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              Previous
            </button>
            <span className={`px-3 py-2 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Page {pagination.currentPage} of {pagination.lastPage}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.lastPage}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pagination.currentPage === pagination.lastPage
                  ? isDarkMode
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
