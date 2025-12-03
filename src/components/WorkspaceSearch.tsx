"use client";

import { useState } from "react";
import {
  Building2,
  LayoutGrid,
  Laptop,
  BarChart3,
  Search,
} from "lucide-react";

const workspaceTypes = [
  {
    id: "office",
    icon: Building2,
    label: "Office Space",
    placeholder: "Search for office space, location, or city...",
  },
  {
    id: "coworking",
    icon: LayoutGrid,
    label: "Coworking",
    placeholder: "Search for coworking spaces, location, or city...",
  },
  {
    id: "virtual",
    icon: Laptop,
    label: "Virtual Offices",
    placeholder: "Search for virtual offices, location, or city...",
  },
  {
    id: "meeting",
    icon: BarChart3,
    label: "Meeting rooms",
    placeholder: "Search for meeting rooms, location, or city...",
  },
];

const trendingLocations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Miami",
  "San Francisco",
  "Boston",
];

export default function WorkspaceSearch() {
  const [activeType, setActiveType] = useState("office");
  const [searchQuery, setSearchQuery] = useState("");

  const activeWorkspaceType = workspaceTypes.find((type) => type.id === activeType);
  const placeholderText = activeWorkspaceType?.placeholder || "Search for workspace, location, or city...";

  return (
    <div className="bg-white rounded-2xl  border border-gray-300 overflow-hidden mb-8 md:mb-12">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Filter Tabs */}
        <div className="lg:w-1/4 bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-5 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {workspaceTypes.map((type) => {
              const IconComponent = type.icon;
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-white shadow-md border-2 border-orange-500"
                      : "bg-white/50 hover:bg-white border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-orange-500 to-orange-600"
                        : "bg-white group-hover:bg-orange-50"
                    }`}
                  >
                    <IconComponent
                      className={`h-3.5 w-3.5 transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 group-hover:text-orange-500"
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive ? "text-orange-600" : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Search Input Area */}
        <div className="lg:w-3/4 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={placeholderText}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-3 md:py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 text-sm md:text-base shadow-sm hover:border-gray-300"
                />
                <button
                  onClick={() => {
                    // Handle search nearby
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs md:text-sm text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                  <span className="hidden sm:inline">Search</span>
                  <span className="underline">Nearby</span>
                </button>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => {
                // Handle search
              }}
              className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base whitespace-nowrap"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110" strokeWidth={2.5} />
              <span>Search</span>
            </button>
          </div>

          {/* Trending Top Locations */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs md:text-sm font-semibold text-gray-500 whitespace-nowrap">
                Trending Top Locations:
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(location)}
                    className="px-3 py-1.5 text-xs md:text-sm text-gray-700 bg-orange-50 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 whitespace-nowrap"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
