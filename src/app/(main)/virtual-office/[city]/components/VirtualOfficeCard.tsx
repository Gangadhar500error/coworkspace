"use client";

import Image from "next/image";
import { Star, MapPin, CheckCircle2 } from "lucide-react";

export interface VirtualOfficeCardData {
  id: string;
  name: string;
  rating: number;
  location: string;
  image: string;
  features: string[];
  services: {
    name: string;
    price: string;
  }[];
  badge?: string;
}

interface VirtualOfficeCardProps {
  office: VirtualOfficeCardData;
  onGetQuote?: (id: string) => void;
}

export default function VirtualOfficeCard({ office, onGetQuote }: VirtualOfficeCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Side - Image */}
        <div className="md:w-2/5 relative h-40 md:h-full md:min-h-[200px]">
          <Image
            src={office.image}
            alt={office.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          {/* Badge overlay */}
          {office.badge && (
            <div className="absolute top-2 right-2">
              <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">
                {office.badge}
              </span>
            </div>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="md:w-3/5 p-4 flex flex-col">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1">{office.name}</h3>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700 font-semibold text-sm">{office.rating}</span>
              </div>
              {/* Location */}
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{office.location}</span>
              </div>
            </div>
          </div>

          {/* Features */}
          {office.features && office.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {office.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                    <span className="whitespace-nowrap">{feature}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          <div className="flex-1 mb-3">
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Services & Pricing
            </h4>
            <div className="space-y-1.5">
              {office.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1.5 px-2.5 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 text-xs font-medium">{service.name}</span>
                  <span className="text-orange-600 font-bold text-xs">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Get Quote Button */}
          {onGetQuote && (
            <button
              onClick={() => onGetQuote(office.id)}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-all shadow-sm hover:shadow-md mt-auto self-start"
            >
              Get Quote for virtual office
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
