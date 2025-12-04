"use client";

import { useState } from "react";
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

const typeIdToName: Record<string, string> = {
  "coworking": "Coworking Space",
  "meeting-room": "Meeting Room",
  "virtual-office": "Virtual Office",
  "private-office": "Private Office",
};

export default function WorkspaceTypeModal({ isOpen, onClose, cityName, citySlug }: WorkspaceTypeModalProps) {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]);
  };

  const handleViewResults = () => {
    if (selectedTypes.length === 1) {
      router.push(`/${selectedTypes[0]}/${citySlug}`);
    } else if (selectedTypes.length > 1) {
      const typesParam = selectedTypes.map(id => typeIdToName[id]).join(",");
      router.push(`/coworking/${citySlug}?types=${encodeURIComponent(typesParam)}`);
    } else {
      router.push(`/coworking/${citySlug}`);
    }

    setSelectedTypes([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedTypes([]);
    onClose();
  };

  return (
    <div onClick={handleClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl p-8 rounded-3xl shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
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
            const isSelected = selectedTypes.includes(type.id);

            return (
              <button
                key={type.id}
                onClick={() => handleTypeToggle(type.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all 
                  ${isSelected ? "border-orange-500 bg-orange-50 text-orange-600 scale-[1.05]" 
                  : "border-gray-300 hover:border-gray-500 text-gray-700"}`}
              >
                <Icon className="w-7 h-7 mb-2" />
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Button */}
        {/* Button - Right side */}
<div className="flex justify-end mt-10">
  <button
    onClick={handleViewResults}
    disabled={selectedTypes.length === 0}
    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
  >
    {selectedTypes.length === 0
      ? "View All Spaces"
      : `View ${selectedTypes.length} Selected`}
  </button>
</div>

      </div>
    </div>
  );
}
