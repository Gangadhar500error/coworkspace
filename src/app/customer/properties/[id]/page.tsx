"use client";

import { useParams, useRouter } from "next/navigation";
import { useTheme } from "../../../admin/_components/ThemeProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
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
  Edit,
  Clock,
  Users,
  Briefcase,
  Globe,
  Mail,
  Phone,
  Download,
  Printer,
  Share2,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { CustomerProperty } from "../../../../types/customer-property";
import { customerProperties } from "../../../../data/customer-properties";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const propertyId = parseInt(params.id as string);

  // Find property - in real app, fetch from API
  const property = customerProperties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <p className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Property not found
        </p>
        <Link
          href="/customer/properties"
          className={`text-sm text-[#FF5A22] hover:underline`}
        >
          Back to Properties
        </Link>
      </div>
    );
  }

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Coworking":
        return <Building2 className="w-5 h-5" />;
      case "Meeting Room":
        return <Users className="w-5 h-5" />;
      case "Private Office":
        return <Briefcase className="w-5 h-5" />;
      case "Virtual Office":
        return <Globe className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className={`p-2 rounded-lg transition-all ${
            isDarkMode
              ? "hover:bg-gray-800 text-gray-300"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className={`text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {property.propertyName}
          </h1>
          <p className={`text-sm lg:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Property ID: #{property.id}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Share2 className="w-4 h-4 inline mr-2" />
            Share
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export
          </button>
          <Link
            href={`/customer/properties/${property.id}/edit`}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            <Edit className="w-4 h-4 inline mr-2" />
            Edit
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Image Gallery */}
          <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              {property.coverImage ? (
                <Image
                  src={property.coverImage}
                  alt={property.propertyName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className={`w-24 h-24 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                </div>
              )}
              {property.featuredProperty && (
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    isDarkMode
                      ? "bg-[#FF5A22] text-white"
                      : "bg-[#FF5A22] text-white"
                  }`}>
                    Featured Property
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm ${
                    isDarkMode 
                      ? `${getStatusColor(property.status)} bg-black/30`
                      : `${getStatusColor(property.status)} bg-white/90`
                  }`}
                >
                  {getStatusIcon(property.status)}
                  {property.status}
                </span>
              </div>
            </div>
            {property.galleryImages && property.galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 p-4">
                {property.galleryImages.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="relative h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={img}
                      alt={`${property.propertyName} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 16vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Overview */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                    {getTypeIcon(property.workspaceType)}
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.propertyName}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {property.workspaceType}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        property.verificationStatus === "approved"
                          ? isDarkMode
                            ? "bg-green-500/10 text-green-400"
                            : "bg-green-50 text-green-600"
                          : isDarkMode
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {property.verificationStatus}
                      </span>
                    </div>
                  </div>
                </div>
                {property.shortDescription && (
                  <p className={`text-base mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {property.shortDescription}
                  </p>
                )}
                {property.description && (
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {property.description}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                  <MapPin className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Location</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.location}
                  </p>
                  {property.fullAddress && (
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{property.fullAddress}</p>
                  )}
                </div>
              </div>
              {property.capacity && (
                <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                    <Users className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Capacity</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.capacity} {property.seats ? `(${property.seats} seats)` : ""}
                    </p>
                  </div>
                </div>
              )}
              {property.openingTime && property.closingTime && (
                <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                    <Clock className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Working Hours</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.openingTime} - {property.closingTime}
                      {property.available24x7 && " (24/7 Available)"}
                    </p>
                  </div>
                </div>
              )}
              <div className={`flex items-center gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-orange-500/20" : "bg-orange-100"}`}>
                  <Star className={`w-4 h-4 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Rating</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.rating} ({property.reviewCount} reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          {property.pricing && (
            <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {property.pricing.hourly && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Hourly</p>
                    <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${property.pricing.hourly}
                    </p>
                  </div>
                )}
                {property.pricing.daily && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Daily</p>
                    <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${property.pricing.daily}
                    </p>
                  </div>
                )}
                {property.pricing.weekly && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Weekly</p>
                    <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${property.pricing.weekly}
                    </p>
                  </div>
                )}
                {property.pricing.monthly && (
                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Monthly</p>
                    <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      ${property.pricing.monthly}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Bookings</p>
                </div>
                <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.totalBookings}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Revenue</p>
                </div>
                <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.totalRevenue}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Views</p>
                </div>
                <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.views}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className={`w-4 h-4 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Inquiries</p>
                </div>
                <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.inquiries}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Contact</h3>
            <div className="space-y-3">
              {property.contactPersonName && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Contact Person
                  </p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.contactPersonName}
                  </p>
                </div>
              )}
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                <a
                  href={`mailto:${property.contactEmail}`}
                  className={`text-sm font-semibold ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                >
                  {property.contactEmail}
                </a>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Phone</p>
                <a
                  href={`tel:${property.contactPhone}`}
                  className={`text-sm font-semibold ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
                >
                  {property.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Property Info</h3>
            <div className="space-y-3">
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Created At
                </p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {new Date(property.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Last Updated
                </p>
                <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {new Date(property.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

