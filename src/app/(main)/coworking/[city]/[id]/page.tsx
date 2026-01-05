"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import { ArrowLeft, Star, MapPin, Clock, Users, Wifi, Car, Coffee, ChevronLeft, ChevronRight } from "lucide-react";
import { workspaces, Workspace } from "../data/workspaces";
import { useState } from "react";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const city = (params.city as string) || "";
  const workspaceId = (params.id as string) || "";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Format city name for display
  const formattedCity = city
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Find the workspace
  const workspace = useMemo(() => {
    return workspaces.find(ws => ws.id === workspaceId);
  }, [workspaceId]);

  // Get workspace images
  const workspaceImages = workspace && 'images' in workspace ? (workspace as any).images : undefined;
  const images: string[] = workspaceImages && Array.isArray(workspaceImages) && workspaceImages.length > 0
    ? workspaceImages
    : workspace?.image ? [workspace.image] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBackClick = () => {
    router.back();
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Popular":
        return "bg-yellow-500 text-white";
      case "Special Offer":
        return "bg-red-500 text-white";
      case "Featured":
        return "bg-purple-500 text-white";
      default:
        return "";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-5 h-5" />;
      case "parking":
        return <Car className="w-5 h-5" />;
      case "pantry":
        return <Coffee className="w-5 h-5" />;
      case "24/7 access":
        return <Clock className="w-5 h-5" />;
      case "meeting rooms":
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (!workspace) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Workspace Not Found</h1>
          <p className="text-gray-600 mb-6">The workspace you're looking for doesn't exist.</p>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {formattedCity} workspaces</span>
          </button>
        </div>
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column - Images and Basic Info */}
            <div className="lg:col-span-2 space-y-6">

              {/* Image Gallery */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-96 w-full overflow-hidden">
                  {/* Images */}
                  <div className="relative h-full w-full">
                    {images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${workspace.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 hover:opacity-100 transition-opacity duration-200"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 hover:opacity-100 transition-opacity duration-200"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                      {images.map((_: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? "w-8 bg-white"
                              : "w-2 bg-white/50 hover:bg-white/75"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Badge */}
                  {workspace.badge && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold z-20 ${getBadgeColor(workspace.badge)}`}>
                      {workspace.badge}
                    </div>
                  )}

                  {/* Workspace Type Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 z-20">
                    {workspace.type}
                  </div>
                </div>
              </div>

              {/* Workspace Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">
                      {workspace.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-5 h-5" />
                      <span className="font-body">{workspace.area}, {formattedCity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 font-display">
                      ${workspace.price}
                    </div>
                    <div className="text-gray-600 font-body">
                      {workspace.type === "Meeting Room" ? "per hour" : "per month"}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold text-gray-900">{workspace.rating}</span>
                  </div>
                  <span className="text-gray-500 font-body">
                    ({workspace.reviewCount} reviews)
                  </span>
                </div>

                {/* Description */}
                {workspace.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 font-display">About this workspace</h3>
                    <p className="text-gray-700 leading-relaxed font-body">
                      {workspace.description}
                    </p>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">Amenities & Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {workspace.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="text-gray-600">
                          {getAmenityIcon(amenity) || <div className="w-5 h-5 rounded bg-gray-300"></div>}
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-body">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact/Action Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-display">
                  {workspace.type === "Meeting Room" ? "Book This Room" : "Get a Quote"}
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                      placeholder="Enter your phone"
                    />
                  </div>

                  {workspace.type === "Meeting Room" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                          Number of Attendees
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body">
                          <option value="">Select number of people</option>
                          <option value="1-5">1-5 people</option>
                          <option value="6-10">6-10 people</option>
                          <option value="11-15">11-15 people</option>
                          <option value="16-20">16-20 people</option>
                          <option value="20+">20+ people</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                          Meeting Duration
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body">
                          <option value="">Select duration</option>
                          <option value="1">1 hour</option>
                          <option value="2">2 hours</option>
                          <option value="3">3 hours</option>
                          <option value="4">4 hours</option>
                          <option value="6">6 hours</option>
                          <option value="8">Full day (8 hours)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                          Meeting Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                          Company Size
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body">
                          <option value="">Select company size</option>
                          <option value="1-5">1-5 employees</option>
                          <option value="6-10">6-10 employees</option>
                          <option value="11-25">11-25 employees</option>
                          <option value="26-50">26-50 employees</option>
                          <option value="51+">51+ employees</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                          Move-in Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                      Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                      placeholder={workspace.type === "Meeting Room" ? "Any special AV requirements or setup needs..." : "Any special requirements or questions..."}
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold font-body">
                  {workspace.type === "Meeting Room" ? "Book This Room" : "Request Quote"}
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center font-body">
                  By submitting this form, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
