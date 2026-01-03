"use client";

import { useRouter } from "next/navigation";
import { X, Building2, Users, Monitor, Briefcase } from "lucide-react";

interface WorkspaceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  citySlug: string;
}

const workspaceTypes = [
  { id: "coworking", name: "Coworking", icon: Building2 },
  { id: "meeting-room", name: "Meeting Room", icon: Users },
  { id: "virtual-office", name: "Virtual Office", icon: Monitor },
  { id: "private-office", name: "Private Office", icon: Briefcase },
];

export default function WorkspaceTypeModal({ isOpen, onClose, cityName, citySlug }: WorkspaceTypeModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleTypeSelect = (typeId: string) => {
    // Navigate directly to the workspace type page
    router.push(`/${typeId}/${citySlug}`);
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-end md:items-center p-0 md:p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full md:w-full md:max-w-xl rounded-t-3xl md:rounded-3xl shadow-2xl relative p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl md:text-3xl font-bold text-center text-gray-900 font-display leading-tight mb-2 md:mb-0 pr-8 md:pr-0">
          Choose Workspace in <span className="text-orange-500">{cityName}</span>
        </h2>
        <p className="hidden md:block text-center text-gray-600 text-sm mt-1">
          100% Verified • Sanitized • Flexible Plans
        </p>

        {/* Workspace Grid - 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-10">
          {workspaceTypes.map((type) => {
            const Icon = type.icon;

            return (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="flex flex-col items-center justify-center p-4 md:p-4 rounded-xl border-2 md:border border-gray-200 md:border-gray-300 hover:border-[#FF5A22] md:hover:border-orange-500 hover:bg-orange-50 text-gray-700 hover:text-[#FF5A22] md:hover:text-orange-600 text-center transition-all active:scale-95 md:hover:scale-105"
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7 mb-2" />
                <span className="text-xs md:text-sm font-semibold md:font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
