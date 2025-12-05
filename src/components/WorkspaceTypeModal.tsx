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
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl p-8 rounded-3xl shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 font-display leading-tight">
          Choose Workspace in <span className="text-orange-500">{cityName}</span>
        </h2>
        <p className="text-center text-gray-600 text-sm mt-1">
          100% Verified • Sanitized • Flexible Plans
        </p>

        {/* Workspace Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {workspaceTypes.map((type) => {
            const Icon = type.icon;

            return (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-gray-700 hover:text-orange-600 text-center transition-all hover:scale-105"
              >
                <Icon className="w-7 h-7 mb-2" />
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
