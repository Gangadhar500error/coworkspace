"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { allCities } from "@/data/cities";
import WorkspaceTypeModal from "./WorkspaceTypeModal";

interface AllCitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllCitiesModal({ isOpen, onClose }: AllCitiesModalProps) {
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{ name: string; slug: string } | null>(null);

  const handleCityClick = (name: string, slug: string) => {
    setSelectedCity({ name, slug });
    setWorkspaceModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl relative flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-display">
              All Locations
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Select a city to view available workspaces
            </p>
          </div>

          {/* Cities Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
              {allCities.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => handleCityClick(city.name, city.slug)}
                  className="flex flex-col items-center p-2 md:p-1 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all bg-white"
                >
                  {/* City Image */}
                  <div className="relative w-12 h-12 md:w-14 md:h-14 mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 48px, 56px"
                    />
                  </div>
                  
                  {/* City Name */}
                  <span className="text-xs font-semibold text-gray-700 hover:text-orange-600 transition-colors text-center leading-tight">
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Type Modal */}
      {selectedCity && (
        <WorkspaceTypeModal
          isOpen={workspaceModalOpen}
          onClose={() => {
            setWorkspaceModalOpen(false);
            setSelectedCity(null);
          }}
          cityName={selectedCity.name}
          citySlug={selectedCity.slug}
        />
      )}
    </>
  );
}
