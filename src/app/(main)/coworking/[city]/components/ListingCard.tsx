"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Workspace } from "../data/workspaces";

interface ListingCardProps {
  workspace: Workspace;
  onGetQuote: (id: string) => void;
}

export default function ListingCard({ workspace, onGetQuote }: ListingCardProps) {
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

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={workspace.image}
          alt={workspace.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge */}
        {workspace.badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(workspace.badge)}`}>
            {workspace.badge}
          </div>
        )}
        {/* Workspace Type Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
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
