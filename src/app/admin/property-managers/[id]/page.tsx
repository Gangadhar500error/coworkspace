"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../../_components/ThemeProvider";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  User,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  Briefcase,
  Globe,
} from "lucide-react";
import { PropertyManager } from "@/types/property-manager";
import { mockPropertyManagers, getPropertyManagerBySlug } from "@/data/property-managers";

export default function PropertyManagerViewPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [propertyManager, setPropertyManager] = useState<PropertyManager | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.id as string;
    const manager = getPropertyManagerBySlug(slug);
    setPropertyManager(manager || null);
    setLoading(false);
  }, [params.id]);

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
    if (propertyManager) {
      const slug = propertyManager.slug || propertyManager.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      router.push(`/admin/property-managers/${slug}/edit`);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this property manager?")) {
      // Implement delete functionality
      console.log("Delete property manager:", params.id);
      router.push("/admin/property-managers");
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

  if (!propertyManager) {
    return (
      <div className="py-6">
        <div className={`rounded-lg border p-8 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Property Manager Not Found
          </h2>
          <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            The property manager you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/admin/property-managers")}
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
            onClick={() => router.push("/admin/property-managers")}
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
              Property Manager Details
            </h1>
            <p className={`mt-1 text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              View complete information about this property manager
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
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            {/* Profile Image */}
            <div className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} flex flex-col items-center`}>
              <div className={`relative w-32 h-32 rounded-full overflow-hidden border-4 ${isDarkMode ? "border-gray-700" : "border-white shadow-lg"}`}>
                {propertyManager.image ? (
                  <Image
                    src={propertyManager.image}
                    alt={propertyManager.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <User className={`w-16 h-16 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  </div>
                )}
              </div>
              <h2 className={`mt-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {propertyManager.name}
              </h2>
              {propertyManager.role && (
                <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {propertyManager.role}
                </p>
              )}
            </div>

            {/* Status Badges */}
            <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
              {propertyManager.status && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Status
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(propertyManager.status)}`}>
                    {propertyManager.status.charAt(0).toUpperCase() + propertyManager.status.slice(1)}
                  </span>
                </div>
              )}
              {propertyManager.mobileVerification && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Mobile Verification
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getMobileVerificationColor(propertyManager.mobileVerification)}`}>
                    {getMobileVerificationIcon(propertyManager.mobileVerification)}
                    {propertyManager.mobileVerification.charAt(0).toUpperCase() + propertyManager.mobileVerification.slice(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Phone className="w-5 h-5 text-[#FF5A22]" />
                Contact Information
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Phone className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Mobile Number
                    </p>
                    <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {propertyManager.mobile || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Email Address
                    </p>
                    <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {propertyManager.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          {(propertyManager.address || propertyManager.city || propertyManager.state || propertyManager.zipCode) && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <MapPin className="w-5 h-5 text-[#FF5A22]" />
                  Address Information
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <div className="space-y-1">
                    {propertyManager.address && (
                      <p className={isDarkMode ? "text-white" : "text-gray-900"}>
                        {propertyManager.address}
                      </p>
                    )}
                    <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                      {[propertyManager.city, propertyManager.state, propertyManager.zipCode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional Information */}
          <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                <Briefcase className="w-5 h-5 text-[#FF5A22]" />
                Professional Information
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propertyManager.company && (
                  <div className="flex items-start gap-3">
                    <Building2 className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Company Name
                      </p>
                      <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {propertyManager.company}
                      </p>
                    </div>
                  </div>
                )}
                {propertyManager.role && (
                  <div className="flex items-start gap-3">
                    <User className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Role
                      </p>
                      <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {propertyManager.role}
                      </p>
                    </div>
                  </div>
                )}
                {propertyManager.totalProperties !== undefined && (
                  <div className="flex items-start gap-3">
                    <Building2 className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Total Properties
                      </p>
                      <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {propertyManager.totalProperties}
                      </p>
                    </div>
                  </div>
                )}
                {propertyManager.currency && (
                  <div className="flex items-start gap-3">
                    <DollarSign className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Currency
                      </p>
                      <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {propertyManager.currency}
                      </p>
                    </div>
                  </div>
                )}
                {propertyManager.joinDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 mt-0.5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Join Date
                      </p>
                      <p className={`mt-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatDate(propertyManager.joinDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {propertyManager.description && (
            <div className={`rounded-lg border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <FileText className="w-5 h-5 text-[#FF5A22]" />
                  Description
                </h3>
              </div>
              <div className="p-4">
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {propertyManager.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

