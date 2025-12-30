"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit,
  MoreVertical,
  TrendingUp,
  Users,
  Briefcase,
  Globe,
  Clock,
} from "lucide-react";
import { CustomerProperty } from "../../../types/customer-property";
import { customerProperties, filterCustomerProperties } from "../../../data/customer-properties";

export default function CustomerPropertiesPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "inactive":
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
      case "draft":
        return isDarkMode
          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
          : "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "inactive":
        return <XCircle className="w-4 h-4" />;
      case "draft":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "approved":
        return isDarkMode
          ? "bg-green-500/10 text-green-400"
          : "bg-green-50 text-green-600";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400"
          : "bg-yellow-50 text-yellow-600";
      case "rejected":
        return isDarkMode
          ? "bg-red-500/10 text-red-400"
          : "bg-red-50 text-red-600";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400"
          : "bg-gray-50 text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Coworking":
        return <Building2 className="w-4 h-4" />;
      case "Meeting Room":
        return <Users className="w-4 h-4" />;
      case "Private Office":
        return <Briefcase className="w-4 h-4" />;
      case "Virtual Office":
        return <Globe className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const filteredProperties = filterCustomerProperties(customerProperties, searchTerm, {
    status: statusFilter,
    workspaceType: typeFilter,
    verificationStatus: verificationFilter,
  });

  // Calculate stats
  const stats = {
    total: customerProperties.length,
    active: customerProperties.filter((p) => p.status === "active").length,
    pending: customerProperties.filter((p) => p.status === "pending").length,
    totalRevenue: customerProperties.reduce((sum, p) => {
      const revenue = parseFloat(p.totalRevenue.replace("$", "").replace(",", ""));
      return sum + revenue;
    }, 0),
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            My Properties
          </h1>
        </div>
        <Link
          href="/customer/properties/new"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            isDarkMode
              ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
              : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
          }`}
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      {/* Stats and Search/Filter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side - Stats Cards */}
        <div className="lg:col-span-1">
          <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-center flex-1">
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stats.total}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-green-600`}>{stats.active}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Active</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-yellow-600`}>{stats.pending}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>${(stats.totalRevenue / 1000).toFixed(1)}K</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Search and Filters */}
        <div className="lg:col-span-2">
          <div className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1">
                <div className={`relative flex items-center rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <Search className={`absolute left-3 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                  <input
                    type="text"
                    placeholder="Search properties, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-transparent border-none outline-none text-sm ${
                      isDarkMode
                        ? "text-white placeholder-gray-500"
                        : "text-gray-900 placeholder-gray-400"
                    }`}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 border border-gray-700"
                      : "bg-gray-50 border border-gray-200 text-gray-700"
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 border border-gray-700"
                      : "bg-gray-50 border border-gray-200 text-gray-700"
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="Coworking">Coworking</option>
                  <option value="Private Office">Private Office</option>
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Virtual Office">Virtual Office</option>
                </select>

                {/* Verification Filter */}
                <select
                  value={verificationFilter}
                  onChange={(e) => setVerificationFilter(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 border border-gray-700"
                      : "bg-gray-50 border border-gray-200 text-gray-700"
                  }`}
                >
                  <option value="all">All Verification</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.length === 0 ? (
          <div className={`col-span-full rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No properties found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-lg border overflow-hidden transition-all hover:shadow-lg ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Property Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                {property.coverImage ? (
                  <Image
                    src={property.coverImage}
                    alt={property.propertyName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className={`w-16 h-16 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                  </div>
                )}
                {property.featuredProperty && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      isDarkMode
                        ? "bg-[#FF5A22] text-white"
                        : "bg-[#FF5A22] text-white"
                    }`}>
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                      isDarkMode 
                        ? `${getStatusColor(property.status)} bg-black/30`
                        : `${getStatusColor(property.status)} bg-white/90`
                    }`}
                  >
                    {getStatusIcon(property.status)}
                    {property.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded backdrop-blur-sm ${
                    isDarkMode ? "bg-black/50 text-white" : "bg-white/90 text-gray-900"
                  }`}>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">{property.rating}</span>
                    <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      ({property.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.propertyName}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {getTypeIcon(property.workspaceType)}
                        {property.workspaceType}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getVerificationColor(property.verificationStatus)}`}>
                        {property.verificationStatus}
                      </span>
                    </div>
                    <p className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      {property.location}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.totalBookings}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.totalRevenue}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.views}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Views</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Starting from
                    </p>
                    <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${property.startingPrice}
                      <span className={`text-sm font-normal ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        /{property.workspaceType === "Meeting Room" ? "hour" : property.workspaceType === "Virtual Office" ? "month" : "day"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/customer/properties/${property.id}`}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-all ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/customer/properties/${property.id}/edit`}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

