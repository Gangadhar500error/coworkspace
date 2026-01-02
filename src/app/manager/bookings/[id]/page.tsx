"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../../_components/ThemeProvider";
import {
  ArrowLeft,
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  FileText,
  User,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Download,
  Printer,
  Mail as MailIcon,
  Building,
  Briefcase,
  Users,
  Globe,
} from "lucide-react";
import { Booking } from "@/types/booking";
import { getBookingById } from "@/data/bookings";

export default function ManagerBookingViewPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingId = params.id as string;
    if (bookingId) {
      const foundBooking = getBookingById(parseInt(bookingId));
      setBooking(foundBooking || null);
      setLoading(false);
    }
  }, [params.id]);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getPaymentStatusColor = (status: Booking["payment"]["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      case "refunded":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "Coworking":
        return <Building2 className="w-5 h-5" />;
      case "Private Office":
        return <Briefcase className="w-5 h-5" />;
      case "Meeting Room":
        return <Users className="w-5 h-5" />;
      case "Virtual Office":
        return <Globe className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Loading...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-6">
        <div className={`rounded-lg border p-12 text-center ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Booking not found</p>
          <button
            onClick={() => router.back()}
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Booking Details
            </h1>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {booking.bookingId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
            }`}
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getPaymentStatusColor(booking.payment.status)}`}>
          Payment: {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Customer Information
            </h2>
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 shrink-0 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}>
                {booking.seeker.image ? (
                  <Image
                    src={booking.seeker.image}
                    alt={booking.seeker.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                  }`}>
                    <User className={`w-8 h-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Name</p>
                  <p className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.seeker.name}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Mail className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {booking.seeker.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {booking.seeker.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Property Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                  {getPropertyTypeIcon(booking.property.type)}
                </div>
                <div className="flex-1">
                  <p className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.property.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {booking.property.address}, {booking.property.city}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium mt-2 ${
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                  }`}>
                    {booking.property.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Booking Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                  <Calendar className={`w-5 h-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Start Date</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatDate(booking.bookingDetails.startDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                  <Calendar className={`w-5 h-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>End Date</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatDate(booking.bookingDetails.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                  <Clock className={`w-5 h-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Duration</p>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.bookingDetails.duration}
                  </p>
                </div>
              </div>
              {booking.bookingDetails.numberOfSeats && (
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                    <Users className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Seats</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {booking.bookingDetails.numberOfSeats}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {booking.bookingDetails.amenities && booking.bookingDetails.amenities.length > 0 && (
              <div className="mt-4">
                <p className={`text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {booking.bookingDetails.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Provider Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Provider Information
            </h2>
            <div className="space-y-2">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Name</p>
                <p className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {booking.provider.name}
                </p>
                {booking.provider.company && (
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {booking.provider.company}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {booking.provider.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {booking.provider.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Billing & Payment */}
        <div className="space-y-6">
          {/* Billing Summary */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Billing Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Subtotal</span>
                <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatPrice(booking.billing.subtotal, booking.billing.currency)}
                </span>
              </div>
              {booking.billing.discount && booking.billing.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Discount</span>
                  <span className={`text-sm font-semibold text-green-600`}>
                    -{formatPrice(booking.billing.discount, booking.billing.currency)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Tax</span>
                <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatPrice(booking.billing.tax, booking.billing.currency)}
                </span>
              </div>
              <div className={`border-t pt-3 mt-3 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Total</span>
                  <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {formatPrice(booking.billing.total, booking.billing.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Payment Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Method</p>
                <div className="flex items-center gap-2">
                  <CreditCard className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {booking.payment.method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
              </div>
              {booking.payment.transactionId && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Transaction ID</p>
                  <p className={`text-sm font-mono ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {booking.payment.transactionId}
                  </p>
                </div>
              )}
              {booking.payment.paidAt && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Paid At</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {formatDateTime(booking.payment.paidAt)}
                  </p>
                </div>
              )}
              {booking.payment.paymentGateway && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Gateway</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {booking.payment.paymentGateway}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Invoice Information */}
          {booking.invoiceGenerated && (
            <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Invoice Information
              </h2>
              <div className="space-y-3">
                {booking.invoiceNumber && (
                  <div>
                    <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Invoice Number</p>
                    <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {booking.invoiceNumber}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle className={`w-4 h-4 text-green-500`} />
                  <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Invoice Generated
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className={`rounded-lg border p-6 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Timestamps
            </h2>
            <div className="space-y-3">
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Created At</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {formatDateTime(booking.createdAt)}
                </p>
              </div>
              <div>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Updated At</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {formatDateTime(booking.updatedAt)}
                </p>
              </div>
              {booking.completedAt && (
                <div>
                  <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Completed At</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {formatDateTime(booking.completedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

