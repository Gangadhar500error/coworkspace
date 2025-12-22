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
  Home,
  DollarSign,
  Calendar,
  FileText,
  User,
  Bed,
  Bath,
  Square,
  Car,
  Layers,
  Tag,
  Video,
  Link as LinkIcon,
  Phone,
  Mail,
  Clock,
  Wifi,
  Monitor,
  Users,
  Briefcase,
  PhoneCall,
  Shield,
  Coffee,
  Lock,
  Printer,
  Mail as MailIcon,
  Waves,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Property } from "@/types/property";
import { mockProperties, getPropertyBySlug } from "@/data/properties";

export default function PropertyViewPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.id as string;
    const foundProperty = getPropertyBySlug(slug);
    setProperty(foundProperty || null);
    setLoading(false);
  }, [params.id]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Sold":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "Rented":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Off Market":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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

  const handleEdit = () => {
    if (property) {
      const slug = property.slug || property.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      router.push(`/admin/property-listings/${slug}/edit`);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Delete property:", params.id);
      router.push("/admin/property-listings");
    }
  };

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Loading...
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

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
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
              Property Details
            </h1>
            <p className={`mt-1 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View complete information about this property
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images & Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images Gallery */}
          {property.images && property.images.length > 0 && (
            <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                {property.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              {property.images.length > 4 && (
                <div className={`px-4 py-2 text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  +{property.images.length - 4} more images
                </div>
              )}
            </div>
          )}

          {/* Property Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 md:p-6 space-y-6`}>
              <div>
                <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                    {property.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" : "bg-blue-50 text-blue-600 border border-blue-200"
                  }`}>
                    {property.propertyType}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? "bg-purple-500/10 text-purple-400 border border-purple-500/30" : "bg-purple-50 text-purple-600 border border-purple-200"
                  }`}>
                    {property.listingType}
                  </span>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="space-y-2">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Description
                  </h3>
                  <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {property.description}
                  </p>
                </div>
              )}

              {/* Property Details Grid */}
              {(property.bedrooms !== null || property.bathrooms !== null || property.squareFeet || property.yearBuilt) && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {property.bedrooms !== null && property.bedrooms !== undefined && (
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <Bed className="w-4 h-4" />
                        Bedrooms
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.bedrooms}
                      </div>
                    </div>
                  )}
                  {property.bathrooms !== null && property.bathrooms !== undefined && (
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <Bath className="w-4 h-4" />
                        Bathrooms
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.bathrooms}
                      </div>
                    </div>
                  )}
                  {property.squareFeet && (
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <Square className="w-4 h-4" />
                        Square Feet
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.squareFeet.toLocaleString()}
                      </div>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <Calendar className="w-4 h-4" />
                        Year Built
                      </div>
                      <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {property.yearBuilt}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cowork Space Basic Details */}
              {(property.area || property.isApproved !== undefined) && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Basic Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.area && (
                      <div className="space-y-1">
                        <div className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Area
                        </div>
                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {property.area.toLocaleString()} sq.ft.
                        </div>
                      </div>
                    )}
                    {property.isApproved !== undefined && (
                      <div className="space-y-1">
                        <div className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Approval Status
                        </div>
                        <div className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {property.isApproved ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="font-semibold">Approved</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-500" />
                              <span className="font-semibold">Not Approved</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Workspace Types */}
              {property.workspaceTypes && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                    Workspace Types Available
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.workspaceTypes.openDesks && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Open Desks</span>
                      </div>
                    )}
                    {property.workspaceTypes.dedicatedDesks && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-medium">Dedicated Desks</span>
                      </div>
                    )}
                    {property.workspaceTypes.meetingConferenceRooms && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Meeting/Conference Rooms</span>
                      </div>
                    )}
                    {property.workspaceTypes.virtualOffice && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <PhoneCall className="w-4 h-4" />
                        <span className="text-sm font-medium">Virtual Office</span>
                      </div>
                    )}
                    {property.workspaceTypes.privateOffice && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Home className="w-4 h-4" />
                        <span className="text-sm font-medium">Private Office</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Workspace Counts */}
              {(property.numberOfPrivateOffices || property.numberOfMeetingRooms) && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Users className="w-5 h-5 text-[#FF5A22]" />
                    Workspace Counts
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {property.numberOfPrivateOffices && (
                      <div className="space-y-1">
                        <div className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Private Offices
                        </div>
                        <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {property.numberOfPrivateOffices}
                        </div>
                      </div>
                    )}
                    {property.numberOfMeetingRooms && (
                      <div className="space-y-1">
                        <div className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Meeting Rooms
                        </div>
                        <div className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {property.numberOfMeetingRooms}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Conference Rooms */}
              {property.conferenceRooms && property.conferenceRooms.length > 0 && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <Building2 className="w-5 h-5 text-[#FF5A22]" />
                    Conference Rooms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.conferenceRooms.map((room, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                        <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {room.name}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <span>Seats:</span>
                            <span className="font-medium">{room.availableSeats}</span>
                          </div>
                          <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <span>Per Hour:</span>
                            <span className="font-medium">${room.pricePerHour}</span>
                          </div>
                          {room.pricePerDay > 0 && (
                            <div className={`flex items-center justify-between ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              <span>Per Day:</span>
                              <span className="font-medium">${room.pricePerDay}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cowork Amenities */}
              {property.coworkAmenities && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    <CheckCircle className="w-5 h-5 text-[#FF5A22]" />
                    Cowork Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {property.coworkAmenities.highSpeedWifi && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Wifi className="w-4 h-4" />
                        <span className="text-sm">High-Speed WiFi</span>
                      </div>
                    )}
                    {property.coworkAmenities.projectorLed && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Monitor className="w-4 h-4" />
                        <span className="text-sm">Projector/LED</span>
                      </div>
                    )}
                    {property.coworkAmenities.eventsWorkshops && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Events/Workshops</span>
                      </div>
                    )}
                    {property.coworkAmenities.phoneBooth && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <PhoneCall className="w-4 h-4" />
                        <span className="text-sm">Phone Booth</span>
                      </div>
                    )}
                    {property.coworkAmenities.accessControl && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Access Control</span>
                      </div>
                    )}
                    {property.coworkAmenities.receptionDesk && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm">Reception Desk</span>
                      </div>
                    )}
                    {property.coworkAmenities.scannerPrinter && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Printer className="w-4 h-4" />
                        <span className="text-sm">Scanner/Printer</span>
                      </div>
                    )}
                    {property.coworkAmenities.cafeKitchen && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Coffee className="w-4 h-4" />
                        <span className="text-sm">Cafe/Kitchen</span>
                      </div>
                    )}
                    {property.coworkAmenities.parking && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Car className="w-4 h-4" />
                        <span className="text-sm">Parking</span>
                      </div>
                    )}
                    {property.coworkAmenities.securitySystem && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Security System</span>
                      </div>
                    )}
                    {property.coworkAmenities.mailService && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <MailIcon className="w-4 h-4" />
                        <span className="text-sm">Mail Service</span>
                      </div>
                    )}
                    {property.coworkAmenities.swimming && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                        <Waves className="w-4 h-4" />
                        <span className="text-sm">Swimming</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Open Hours */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Clock className="w-5 h-5 text-[#FF5A22]" />
                  Open Hours
                </h3>
                <div className={`rounded-lg border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { key: "monday", label: "Monday" },
                      { key: "tuesday", label: "Tuesday" },
                      { key: "wednesday", label: "Wednesday" },
                      { key: "thursday", label: "Thursday" },
                      { key: "friday", label: "Friday" },
                      { key: "saturday", label: "Saturday" },
                      { key: "sunday", label: "Sunday" },
                    ].map(({ key, label }) => {
                      const dayHours = property.openHours?.[key as keyof typeof property.openHours];
                      // Default to 8 AM - 10 PM if no hours set
                      const defaultFrom = "08:00";
                      const defaultTo = "22:00";
                      const from = dayHours?.from || defaultFrom;
                      const to = dayHours?.to || defaultTo;
                      // Only show closed if explicitly set (empty strings), otherwise use defaults
                      const isClosed = dayHours && dayHours.from === "" && dayHours.to === "";
                      const timeDisplay = isClosed 
                        ? "Closed" 
                        : `${from} - ${to}`;
                      
                      return (
                        <div 
                          key={key} 
                          className={`flex items-center justify-between py-3 px-4 transition-colors ${
                            isDarkMode 
                              ? isClosed 
                                ? "text-gray-500" 
                                : "text-gray-300 hover:bg-gray-700/50"
                              : isClosed 
                                ? "text-gray-400" 
                                : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              isClosed 
                                ? isDarkMode ? "bg-gray-600" : "bg-gray-300"
                                : "bg-[#FF5A22]"
                            }`} />
                            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              {label}
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${
                            isClosed 
                              ? isDarkMode ? "text-gray-500" : "text-gray-400"
                              : isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {timeDisplay}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities & Features */}
          {(property.amenities.length > 0 || property.features.length > 0) && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 md:p-6 space-y-4`}>
                {property.amenities.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A22]" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {property.features.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Special Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            isDarkMode
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pricing Card */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <DollarSign className="w-5 h-5 text-[#FF5A22]" />
                Pricing
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {property.listingType === "Sale" ? "Sale Price" : property.listingType === "Rent" ? "Monthly Rent" : "Lease Price"}
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.listingType === "Sale" 
                    ? formatPrice(property.price, property.currency)
                    : property.monthlyRent 
                    ? formatPrice(property.monthlyRent, property.currency)
                    : formatPrice(property.price, property.currency)
                  }
                </div>
                {property.listingType !== "Sale" && property.monthlyRent && (
                  <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {property.listingType === "Rent" ? "per month" : "per month"}
                  </div>
                )}
              </div>
              {property.pricePerSquareFoot && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Price per sq ft
                  </div>
                  <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    ${property.pricePerSquareFoot.toFixed(2)}
                  </div>
                </div>
              )}
              {property.deposit && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Security Deposit
                  </div>
                  <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatPrice(property.deposit, property.currency)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <MapPin className="w-5 h-5 text-[#FF5A22]" />
                Location
              </h3>
            </div>
            <div className="p-4 space-y-2">
              <div className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {property.address}
              </div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {property.city}, {property.state} {property.zipCode}
              </div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {property.country}
              </div>
              {(property.latitude && property.longitude) && (
                <div className={`text-xs mt-2 pt-2 border-t border-gray-200 dark:border-gray-800 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                  Coordinates: {property.latitude}, {property.longitude}
                </div>
              )}
            </div>
          </div>


          {/* Property Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Building2 className="w-5 h-5 text-[#FF5A22]" />
                Property Info
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Type</span>
                <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.propertyType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Listing Type</span>
                <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.listingType}
                </span>
              </div>
              {property.floors && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Layers className="w-3 h-3" />
                    Floors
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.floors}
                  </span>
                </div>
              )}
              {property.parkingSpaces !== null && property.parkingSpaces !== undefined && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Car className="w-3 h-3" />
                    Parking
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.parkingSpaces} spaces
                  </span>
                </div>
              )}
              {property.lotSize && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Square className="w-3 h-3" />
                    Lot Size
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.lotSize.toLocaleString()} sq ft
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Property Manager */}
          {property.propertyManagerName && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <User className="w-5 h-5 text-[#FF5A22]" />
                  Property Manager
                </h3>
              </div>
              <div className="p-4">
                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {property.propertyManagerName}
                </div>
              </div>
            </div>
          )}

          {/* Contact Details */}
          {(property.contactName || property.contactEmail || property.contactPhone) && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <Phone className="w-5 h-5 text-[#FF5A22]" />
                  Contact Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {property.contactName && (
                  <div className="flex items-center gap-3">
                    <User className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.contactName}
                    </span>
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
              </div>
            </div>
          )}

          {/* Invoice Details */}
          {(property.companyName || property.billingAddress) && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <FileText className="w-5 h-5 text-[#FF5A22]" />
                  Invoice Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {property.companyName && (
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Company Name
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {property.companyName}
                    </div>
                  </div>
                )}
                {property.billingAddress && (
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Billing Address
                    </div>
                    <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {property.billingAddress}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <FileText className="w-5 h-5 text-[#FF5A22]" />
                Additional Info
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {property.mlsNumber && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>MLS Number</span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {property.mlsNumber}
                  </span>
                </div>
              )}
              {property.listingDate && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Calendar className="w-3 h-3" />
                    Listed
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatDate(property.listingDate)}
                  </span>
                </div>
              )}
              {property.availableDate && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <Calendar className="w-3 h-3" />
                    Available
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatDate(property.availableDate)}
                  </span>
                </div>
              )}
              {property.virtualTour && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <a
                    href={property.virtualTour}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    Virtual Tour
                  </a>
                </div>
              )}
              {property.tags && property.tags.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {property.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 rounded text-xs ${
                          isDarkMode
                            ? "bg-[#FF5A22]/10 text-[#FF5A22] border border-[#FF5A22]/30"
                            : "bg-[#FF5A22]/5 text-[#FF5A22] border border-[#FF5A22]/20"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

