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
  Building2,
  DollarSign,
  Calendar,
  FileText,
  User,
  Phone,
  Mail,
  Clock,
  Wifi,
  Monitor,
  Users,
  Briefcase,
  Shield,
  Coffee,
  Car,
  Lock,
  CheckSquare,
  Star,
  Search,
  Video,
  Zap,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
} from "lucide-react";
import { Property } from "@/types/property";
import { getPropertyById } from "@/data/properties";

export default function PropertyViewPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const propertyId = params.id as string;
    if (propertyId) {
      const foundProperty = getPropertyById(parseInt(propertyId));
      setProperty(foundProperty || null);
      setLoading(false);
    }
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
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

  const handleEdit = () => {
    if (property) {
      router.push(`/admin/property-listings/${property.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Delete property:", params.id);
      router.push("/admin/property-listings");
    }
  };

  const getStartingPrice = () => {
    if (!property) return null;
    
    if (property.workspaceType === "Coworking" && property.coworkingFields) {
      return property.coworkingFields.dailyPrice || property.coworkingFields.monthlyPrice;
    }
    if (property.workspaceType === "Private Office" && property.privateOfficeFields) {
      return property.privateOfficeFields.monthlyRent;
    }
    if (property.workspaceType === "Meeting Room" && property.meetingRoomFields) {
      return property.meetingRoomFields.hourlyPrice || property.meetingRoomFields.halfDayPrice;
    }
    if (property.workspaceType === "Virtual Office" && property.virtualOfficeFields) {
      return property.virtualOfficeFields.monthlyPrice || property.virtualOfficeFields.yearlyPrice;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5A22] mx-auto mb-4"></div>
          <p>Loading property data...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-6">
        <div className={`rounded-lg border p-8 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Property Not Found
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/admin/property-listings")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const startingPrice = getStartingPrice();

  return (
    <div className="min-h-screen py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/property-listings")}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Back to list"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {property.propertyName}
            </h1>
            <p className={`mt-1 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {property.areaLocality}, {property.city}, {property.state}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isDarkMode
                ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.propertyStatus)}`}>
          {property.propertyStatus.charAt(0).toUpperCase() + property.propertyStatus.slice(1)}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getVerificationColor(property.verificationStatus)}`}>
          {property.verificationStatus === "approved" ? "✓ Approved" : "Pending Verification"}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
        }`}>
          {property.workspaceType}
        </span>
        {property.featuredProperty === "yes" && (
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
          {/* Cover Image */}
          {/* {property.coverImage && (
            <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="relative aspect-video w-full">
                <Image
                  src={property.coverImage}
                  alt={property.propertyName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )} */}

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
                      unoptimized
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
                {property.brandOperatorName && (
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Brand/Operator: <span className="font-medium">{property.brandOperatorName}</span>
                  </p>
                )}
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
              {property.detailedDescription && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Detailed Description
                  </h3>
                  <p className={`leading-relaxed whitespace-pre-line ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {property.detailedDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Type-Specific Fields */}
          {property.workspaceType === "Coworking" && property.coworkingFields && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Coworking Space Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Total Seats
                    </div>
                    <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.coworkingFields.totalSeats}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Hot Desks
                    </div>
                    <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.coworkingFields.hotDesksCount}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Dedicated Desks
                    </div>
                    <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.coworkingFields.dedicatedDesksCount}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Min. Booking
                    </div>
                    <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.coworkingFields.minimumBookingDuration}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {property.coworkingFields.dailyPrice && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Daily Price
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.coworkingFields.dailyPrice)}
                      </div>
                    </div>
                  )}
                  {property.coworkingFields.weeklyPrice && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Weekly Price
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.coworkingFields.weeklyPrice)}
                      </div>
                    </div>
                  )}
                  {property.coworkingFields.monthlyPrice && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Monthly Price
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.coworkingFields.monthlyPrice)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {property.workspaceType === "Private Office" && property.privateOfficeFields && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Private Office Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.privateOfficeFields.officeSizes && property.privateOfficeFields.officeSizes.length > 0 && (
                    <div className="md:col-span-3">
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Office Sizes Available
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {property.privateOfficeFields.officeSizes.map((size, index) => (
                          <span key={index} className={`px-3 py-1 rounded-lg text-sm ${
                            isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"
                          }`}>
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {property.privateOfficeFields.numberOfCabins && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Number of Cabins
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.privateOfficeFields.numberOfCabins}
                      </div>
                    </div>
                  )}
                  {property.privateOfficeFields.monthlyRent && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Monthly Rent
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.privateOfficeFields.monthlyRent)}
                      </div>
                    </div>
                  )}
                  {property.privateOfficeFields.securityDeposit && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Security Deposit
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.privateOfficeFields.securityDeposit)}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Furnished
                    </div>
                    <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.privateOfficeFields.furnished ? "Yes" : "No"}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Private Access
                    </div>
                    <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.privateOfficeFields.privateAccess ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {property.workspaceType === "Meeting Room" && property.meetingRoomFields && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Meeting Room Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <h4 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.meetingRoomFields.roomName}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <span>Seating Capacity:</span>
                        <span className="font-medium">{property.meetingRoomFields.seatingCapacity}</span>
                      </div>
                      {property.meetingRoomFields.roomLayout && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Layout:</span>
                          <span className="font-medium capitalize">{property.meetingRoomFields.roomLayout}</span>
                        </div>
                      )}
                      {property.meetingRoomFields.hourlyPrice && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Hourly:</span>
                          <span className="font-medium">{formatPrice(property.meetingRoomFields.hourlyPrice)}</span>
                        </div>
                      )}
                      {property.meetingRoomFields.halfDayPrice && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Half-Day:</span>
                          <span className="font-medium">{formatPrice(property.meetingRoomFields.halfDayPrice)}</span>
                        </div>
                      )}
                      {property.meetingRoomFields.fullDayPrice && (
                        <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span>Full-Day:</span>
                          <span className="font-medium">{formatPrice(property.meetingRoomFields.fullDayPrice)}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
                        {property.meetingRoomFields.projectorTv === "yes" && (
                          <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                            Projector/TV
                          </span>
                        )}
                        {property.meetingRoomFields.whiteboard === "yes" && (
                          <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                            Whiteboard
                          </span>
                        )}
                        {property.meetingRoomFields.videoConferencing === "yes" && (
                          <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                            Video Conferencing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {property.workspaceType === "Virtual Office" && property.virtualOfficeFields && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                  Virtual Office Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Business Address
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.virtualOfficeFields.businessAddress}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      City
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.virtualOfficeFields.city}
                    </div>
                  </div>
                  {property.virtualOfficeFields.monthlyPrice && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Monthly Price
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.virtualOfficeFields.monthlyPrice)}
                      </div>
                    </div>
                  )}
                  {property.virtualOfficeFields.yearlyPrice && (
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Yearly Price
                      </div>
                      <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatPrice(property.virtualOfficeFields.yearlyPrice)}
                      </div>
                    </div>
                  )}
                  <div className="md:col-span-2 pt-2">
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Services Included
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {property.virtualOfficeFields.addressProofProvided && (
                        <span className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                          Address Proof Provided
                        </span>
                      )}
                      {property.virtualOfficeFields.gstRegistrationSupport && (
                        <span className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                          GST Registration Support
                        </span>
                      )}
                      {property.virtualOfficeFields.mailHandling && (
                        <span className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                          Mail Handling
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Amenities */}
          {property.amenities && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <CheckSquare className="w-5 h-5 text-[#FF5A22]" />
                  Common Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {property.amenities.wifi === "yes" && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Wifi className="w-4 h-4" />
                      <span className="text-sm">WiFi</span>
                    </div>
                  )}
                  {property.amenities.acNonAc && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Zap className="w-4 h-4" />
                      <span className="text-sm capitalize">{property.amenities.acNonAc}</span>
                    </div>
                  )}
                  {property.amenities.powerBackup === "yes" && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Power Backup</span>
                    </div>
                  )}
                  {property.amenities.lift === "yes" && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">Lift</span>
                    </div>
                  )}
                  {property.amenities.parking === "yes" && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Car className="w-4 h-4" />
                      <span className="text-sm">Parking</span>
                    </div>
                  )}
                  {property.amenities.securityCctv === "yes" && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Security/CCTV</span>
                    </div>
                  )}
                  {property.amenities.pantryCafeteria === "yes" && (
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                      <Coffee className="w-4 h-4" />
                      <span className="text-sm">Pantry/Cafeteria</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Open Hours */}
          {property.workingDays && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Clock className="w-5 h-5 text-[#FF5A22]" />
                  Availability & Timings
                </h3>
                {property.available24x7 === "yes" ? (
                  <div className={`text-center py-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                    <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      24×7 Available
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { key: "monday", label: "Monday", isOpen: property.workingDays.monday },
                        { key: "tuesday", label: "Tuesday", isOpen: property.workingDays.tuesday },
                        { key: "wednesday", label: "Wednesday", isOpen: property.workingDays.wednesday },
                        { key: "thursday", label: "Thursday", isOpen: property.workingDays.thursday },
                        { key: "friday", label: "Friday", isOpen: property.workingDays.friday },
                        { key: "saturday", label: "Saturday", isOpen: property.workingDays.saturday },
                        { key: "sunday", label: "Sunday", isOpen: property.workingDays.sunday },
                      ].map(({ key, label, isOpen }) => {
                        const timeDisplay = isOpen ? `${property.openingTime || "09:00"} - ${property.closingTime || "18:00"}` : "Closed";
                        
                        return (
                          <div 
                            key={key} 
                            className={`flex items-center justify-between py-3 px-4 ${
                              isDarkMode 
                                ? !isOpen 
                                  ? "text-gray-500" 
                                  : "text-gray-300"
                                : !isOpen 
                                  ? "text-gray-400" 
                                  : "text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                !isOpen 
                                  ? isDarkMode ? "bg-gray-600" : "bg-gray-300"
                                  : "bg-[#FF5A22]"
                              }`} />
                              <span className={`text-sm font-medium`}>
                                {label}
                              </span>
                            </div>
                            <span className={`text-sm font-medium`}>
                              {timeDisplay}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Floor Plan */}
          {property.floorPlan && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Floor Plan
                </h3>
              </div>
              <div className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={property.floorPlan}
                    alt="Floor Plan"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          )}

          {/* Video Link */}
          {property.videoLink && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="p-4 md:p-6">
                <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Video className="w-5 h-5 text-[#FF5A22]" />
                  Video Tour
                </h3>
                <a
                  href={property.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  Watch Video
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pricing Card */}
          {startingPrice && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <DollarSign className="w-5 h-5 text-[#FF5A22]" />
                  Pricing
                </h3>
              </div>
              <div className="p-4">
                <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Starting from {formatPrice(startingPrice)}
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
                {property.areaLocality}, {property.city}, {property.state}
              </div>
              {property.pincode && (
                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Pincode: {property.pincode}
                </div>
              )}
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {property.country}
              </div>
              {(property.latitude && property.longitude) && (
                <div className={`text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-800 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                  Coordinates: {property.latitude}, {property.longitude}
                </div>
              )}
              {property.googleMapLink && (
                <div className="mt-3">
                  <a
                    href={property.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    View on Google Maps
                  </a>
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
              {property.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <a
                    href={`tel:${property.phoneNumber}`}
                    className={`text-sm hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {property.phoneNumber}
                  </a>
                </div>
              )}
              {property.emailId && (
                <div className="flex items-center gap-3">
                  <Mail className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <a
                    href={`mailto:${property.emailId}`}
                    className={`text-sm hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    {property.emailId}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Legal & Compliance */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Shield className="w-5 h-5 text-[#FF5A22]" />
                Legal & Compliance
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>GST Registered</span>
                <span className={`text-sm font-medium flex items-center gap-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.gstRegistered ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Yes
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-gray-500" />
                      No
                    </>
                  )}
                </span>
              </div>
              {property.gstRegistered && property.gstNumber && (
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    GST Number
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.gstNumber}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Admin Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <FileText className="w-5 h-5 text-[#FF5A22]" />
                Admin Information
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Property Status</span>
                <span className={`text-xs font-medium px-2 py-1 rounded border ${getStatusColor(property.propertyStatus)}`}>
                  {property.propertyStatus.charAt(0).toUpperCase() + property.propertyStatus.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Verification</span>
                <span className={`text-xs font-medium px-2 py-1 rounded border ${getVerificationColor(property.verificationStatus)}`}>
                  {property.verificationStatus === "approved" ? "✓ Approved" : "Pending"}
                </span>
              </div>
              {property.featuredProperty === "yes" && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Featured</span>
                  <span className={`text-xs font-medium flex items-center gap-1 ${
                    isDarkMode ? "text-yellow-400" : "text-yellow-600"
                  }`}>
                    <Star className="w-3 h-3" />
                    Yes
                  </span>
                </div>
              )}
              {property.priorityRanking && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Priority Ranking</span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.priorityRanking}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Created Date</span>
                <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatDate(property.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* SEO Information */}
          {(property.seoTitle || property.seoDescription) && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Search className="w-5 h-5 text-[#FF5A22]" />
                  SEO Information
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {property.seoTitle && (
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      SEO Title
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.seoTitle}
                    </div>
                  </div>
                )}
                {property.seoDescription && (
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      SEO Description
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {property.seoDescription}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
