"use client";

import { useParams, useRouter } from "next/navigation";
import { useTheme } from "../../../admin/_components/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
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
  Share2,
  Shield,
  CheckSquare,
  Video,
  Link as LinkIcon,
  Wifi,
  Zap,
  Car,
  Coffee,
  FileText,
  Search,
  User,
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
        <button
          onClick={() => router.push("/customer/properties")}
          className={`text-sm text-[#FF5A22] hover:underline`}
        >
          Back to Properties
        </button>
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

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "approved":
        return isDarkMode
          ? "bg-green-500/10 text-green-400 border-green-500/30"
          : "bg-green-50 text-green-600 border-green-200";
      case "pending":
        return isDarkMode
          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "rejected":
        return isDarkMode
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-red-50 text-red-600 border-red-200";
      default:
        return isDarkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
          : "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/customer/properties")}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {property.propertyName}
            </h1>
            <p className={`mt-1 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {property.city}, {property.state}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            href={`/customer/properties/${property.id}/edit`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getVerificationColor(property.verificationStatus)}`}>
          {property.verificationStatus === "approved" ? "✓ Approved" : property.verificationStatus === "pending" ? "Pending Verification" : "Rejected"}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
        }`}>
          {property.workspaceType}
        </span>
        {property.featuredProperty && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            isDarkMode ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30" : "bg-yellow-50 text-yellow-600 border border-yellow-200"
          }`}>
            <Star className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery Images */}
          {property.galleryImages && property.galleryImages.length > 0 && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Gallery ({property.galleryImages.length} images)
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
                {property.galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${property.propertyName} - Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="p-4 md:p-6 space-y-4">
              <div>
                <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.propertyName}
                </h2>
              </div>

              {/* Short Description */}
              {property.shortDescription && (
                <div>
                  <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {property.shortDescription}
                  </p>
                </div>
              )}

              {/* Detailed Description */}
              {property.description && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Detailed Description
                  </h3>
                  <p className={`leading-relaxed whitespace-pre-line ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {property.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Type-Specific Fields */}
          {property.workspaceType === "Coworking" && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Coworking Space Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.seats && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Total Seats
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.seats}
                      </div>
                    </div>
                  )}
                  {property.capacity && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Capacity
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.capacity}
                      </div>
                    </div>
                  )}
                </div>
                {property.pricing && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    {property.pricing.daily && (
                      <div>
                        <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Daily Price
                        </div>
                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {formatPrice(property.pricing.daily)}
                        </div>
                      </div>
                    )}
                    {property.pricing.weekly && (
                      <div>
                        <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Weekly Price
                        </div>
                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {formatPrice(property.pricing.weekly)}
                        </div>
                      </div>
                    )}
                    {property.pricing.monthly && (
                      <div>
                        <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Monthly Price
                        </div>
                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {formatPrice(property.pricing.monthly)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {property.workspaceType === "Meeting Room" && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Meeting Room Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.propertyName}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {property.seats && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Seating Capacity:</span>
                          <span className="font-medium">{property.seats}</span>
                        </div>
                      )}
                      {property.pricing?.hourly && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Hourly:</span>
                          <span className="font-medium">{formatPrice(property.pricing.hourly)}</span>
                        </div>
                      )}
                      {property.pricing?.halfDay && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Half-Day:</span>
                          <span className="font-medium">{formatPrice(property.pricing.halfDay)}</span>
                        </div>
                      )}
                      {property.pricing?.fullDay && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Full-Day:</span>
                          <span className="font-medium">{formatPrice(property.pricing.fullDay)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {property.workspaceType === "Virtual Office" && property.pricing && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Virtual Office Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.pricing.monthly && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Monthly Price
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.pricing.monthly)}
                      </div>
                    </div>
                  )}
                  {property.pricing.yearly && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Yearly Price
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.pricing.yearly)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Common Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <CheckSquare className="w-5 h-5 text-[#FF5A22]" />
                  Common Amenities
                </h3>
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
            </div>
          )}

          {/* Availability & Timings */}
          {(property.openingTime || property.closingTime || property.available24x7 !== undefined) && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Clock className="w-5 h-5 text-[#FF5A22]" />
                  Availability & Timings
                </h3>
                {property.available24x7 ? (
                  <div className={`text-center py-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                    <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      24×7 Available
                    </div>
                  </div>
                ) : (
                  property.openingTime && property.closingTime && (
                    <div className={`rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                      <div className="p-4">
                        <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {property.openingTime} - {property.closingTime}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pricing Card */}
          {property.startingPrice && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <DollarSign className="w-5 h-5 text-[#FF5A22]" />
                  Pricing
                </h3>
              </div>
              <div className="p-4">
                <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Starting from {formatPrice(property.startingPrice)}
                </div>
                <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {property.workspaceType === "Coworking" && "per day"}
                  {property.workspaceType === "Private Office" && "per month"}
                  {property.workspaceType === "Meeting Room" && "per hour"}
                  {property.workspaceType === "Virtual Office" && "per month"}
                </div>
              </div>
            </div>
          )}

          {/* Location Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <MapPin className="w-5 h-5 text-[#FF5A22]" />
                Location
              </h3>
            </div>
            <div className="p-4 space-y-2">
              <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {property.fullAddress}
              </div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {property.city}, {property.state}
              </div>
              {property.pincode && (
                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Pincode: {property.pincode}
                </div>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Phone className="w-5 h-5 text-[#FF5A22]" />
                Contact Details
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {property.contactPersonName && (
                <div className="flex items-center gap-3">
                  <User className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.contactPersonName}
                  </span>
                </div>
              )}
              {property.contactPhone && (
                <div className="flex items-center gap-3">
                  <Phone className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <a
                    href={`tel:${property.contactPhone}`}
                    className={`text-sm hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {property.contactPhone}
                  </a>
                </div>
              )}
              {property.contactEmail && (
                <div className="flex items-center gap-3">
                  <Mail className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <a
                    href={`mailto:${property.contactEmail}`}
                    className={`text-sm hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {property.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Quick Stats
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Bookings</span>
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.totalBookings}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Revenue</span>
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.totalRevenue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Views</span>
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.views}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className={`w-4 h-4 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Inquiries</span>
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.inquiries}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Rating</span>
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.rating} ({property.reviewCount})
                </span>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <FileText className="w-5 h-5 text-[#FF5A22]" />
                Property Info
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Property Status</span>
                <span className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(property.status)}`}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Verification</span>
                <span className={`text-xs font-medium px-2 py-1 rounded border ${getVerificationColor(property.verificationStatus)}`}>
                  {property.verificationStatus === "approved" ? "✓ Approved" : property.verificationStatus === "pending" ? "Pending" : "Rejected"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Created Date</span>
                <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatDate(property.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Last Updated</span>
                <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatDate(property.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
