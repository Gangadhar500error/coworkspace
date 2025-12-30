"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Building2,
  MapPin,
  Star,
  Search,
  Filter,
  Users,
  Briefcase,
  Globe,
  Trash2,
} from "lucide-react";
import { customerProperties } from "../../../data/customer-properties";
import { CustomerProperty } from "../../../types/customer-property";

export default function CustomerFavoritesPage() {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  // Mock favorite properties (first 6 properties as favorites)
  const [favoriteProperties, setFavoriteProperties] = useState<CustomerProperty[]>(
    customerProperties.slice(0, 6)
  );

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

  const handleRemoveFavorite = (propertyId: number) => {
    setFavoriteProperties(favoriteProperties.filter((p) => p.id !== propertyId));
  };

  const filteredProperties = favoriteProperties.filter((property) => {
    const matchesSearch =
      property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || property.workspaceType === typeFilter;

    return matchesSearch && matchesType;
  });

  const stats = {
    total: favoriteProperties.length,
    coworking: favoriteProperties.filter((p) => p.workspaceType === "Coworking").length,
    privateOffice: favoriteProperties.filter((p) => p.workspaceType === "Private Office").length,
    meetingRoom: favoriteProperties.filter((p) => p.workspaceType === "Meeting Room").length,
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            My Favorites
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your saved properties and workspaces
          </p>
        </div>
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
                <p className={`text-sm font-bold text-blue-600`}>{stats.coworking}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Coworking</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-purple-600`}>{stats.privateOffice}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Private</p>
              </div>
              <div className="text-center flex-1">
                <p className={`text-sm font-bold text-green-600`}>{stats.meetingRoom}</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Meeting</p>
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
                    placeholder="Search favorites..."
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      {filteredProperties.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <Heart className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-gray-700" : "text-gray-400"}`} />
          <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No favorites found
          </p>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {favoriteProperties.length === 0
              ? "Start adding properties to your favorites to see them here"
              : "Try adjusting your search or filter criteria"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-lg border overflow-hidden transition-all hover:shadow-lg relative ${
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
                {/* Favorite Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => handleRemoveFavorite(property.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      isDarkMode
                        ? "bg-red-500/90 hover:bg-red-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                {/* Rating */}
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
                <div className="mb-3">
                  <h3 className={`text-lg font-bold mb-2 truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
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
                  </div>
                  <p className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {property.location}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-200 dark:border-gray-800">
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

