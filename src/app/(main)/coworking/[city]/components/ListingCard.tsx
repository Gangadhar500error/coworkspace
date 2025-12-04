"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Workspace } from "../data/workspaces";

interface ListingCardProps {
  workspace: Workspace;
  onGetQuote: (id: string) => void;
}

export default function ListingCard({ workspace, onGetQuote }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Generate 3 images for each workspace (using the same image or variations)
  const workspaceImages = 'images' in workspace ? (workspace as any).images : undefined;
  const images: string[] = workspaceImages && Array.isArray(workspaceImages) ? workspaceImages : [
    workspace.image,
    workspace.image,
    workspace.image
  ];

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Slider Container */}
      <div className="relative h-48 w-full overflow-hidden">
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badge */}
        {workspace.badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold z-20 ${getBadgeColor(workspace.badge)}`}>
            {workspace.badge}
          </div>
        )}
        {/* Workspace Type Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 z-20">
          {workspace.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 font-display">
            {workspace.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="font-body">{workspace.area}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{workspace.rating}</span>
          </div>
          <span className="text-sm text-gray-500 font-body">
            ({workspace.reviewCount} reviews)
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {workspace.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-body"
            >
              {amenity}
            </span>
          ))}
          {workspace.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-body">
              +{workspace.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-gray-900 font-display">
              ${workspace.price}
            </span>
            <span className="text-sm text-gray-600 font-body">/month</span>
          </div>
          <button
            onClick={() => onGetQuote(workspace.id)}
            className="px-4 py-2 bg-[#4ECDC4] hover:bg-[#3ab5ad] text-white rounded-lg text-sm font-semibold transition-colors font-body"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}
