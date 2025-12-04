"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Building2, Users, Monitor, Briefcase, Check } from "lucide-react";

interface WorkspaceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  citySlug: string;
}

const workspaceTypes = [
  {
    id: "coworking",
    name: "Coworking Space",
    icon: Building2,
    description: "Flexible shared workspaces"
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    icon: Users,
    description: "Book meeting spaces"
  },
  {
    id: "virtual-office",
    name: "Virtual Office",
    icon: Monitor,
    description: "Remote office solutions"
  },
  {
    id: "private-office",
    name: "Private Office",
    icon: Briefcase,
    description: "Dedicated private spaces"
  }
];

// Map modal IDs to actual workspace type names
const typeIdToName: Record<string, string> = {
  "coworking": "Coworking Space",
  "meeting-room": "Meeting Room",
  "virtual-office": "Virtual Office",
  "private-office": "Private Office"
};

export default function WorkspaceTypeModal({ isOpen, onClose, cityName, citySlug }: WorkspaceTypeModalProps) {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleViewResults = () => {
    if (selectedTypes.length === 0) {
      // If nothing selected, navigate to coworking page
      router.push(`/coworking/${citySlug}`);
    } else if (selectedTypes.length === 1) {
      // Single selection - navigate to specific type page
      const typeId = selectedTypes[0];
      switch (typeId) {
        case "coworking":
          router.push(`/coworking/${citySlug}`);
          break;
        case "meeting-room":
          router.push(`/meeting-room/${citySlug}`);
          break;
        case "virtual-office":
          router.push(`/virtual-office/${citySlug}`);
          break;
        case "private-office":
          router.push(`/private-office/${citySlug}`);
          break;
        default:
          router.push(`/coworking/${citySlug}`);
      }
    } else {
      // Multiple selections - navigate to coworking page with query params
      const typesParam = selectedTypes.map(id => typeIdToName[id]).join(",");
      router.push(`/coworking/${citySlug}?types=${encodeURIComponent(typesParam)}`);
    }
    setSelectedTypes([]); // Reset selections
    onClose();
  };

  const handleClose = () => {
    setSelectedTypes([]); // Reset selections when closing
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
              Select Workspace Types
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-body">
              Choose one or more workspace types for <span className="font-semibold text-orange-500">{cityName}</span>
            </p>
            {selectedTypes.length > 0 && (
              <p className="text-xs text-orange-600 mt-1 font-body font-medium">
                {selectedTypes.length} type{selectedTypes.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Workspace Type Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {workspaceTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedTypes.includes(type.id);
            return (
              <button
                key={type.id}
                onClick={() => handleTypeToggle(type.id)}
                className={`group flex flex-col items-start p-6 border-2 rounded-xl transition-all duration-200 text-left relative ${
                  isSelected
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-500 hover:bg-orange-50/50"
                }`}
              >
                {/* Checkbox indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white border-gray-300"
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
                
                <div className={`p-3 rounded-lg mb-4 transition-colors duration-200 ${
                  isSelected
                    ? "bg-orange-500"
                    : "bg-orange-100 group-hover:bg-orange-500"
                }`}>
                  <Icon className={`w-6 h-6 transition-colors duration-200 ${
                    isSelected
                      ? "text-white"
                      : "text-orange-600 group-hover:text-white"
                  }`} />
                </div>
                <h3 className={`text-lg font-bold mb-1 font-display transition-colors ${
                  isSelected
                    ? "text-orange-600"
                    : "text-gray-900 group-hover:text-orange-600"
                }`}>
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 font-body">
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors font-body"
          >
            Cancel
          </button>
          <button
            onClick={handleViewResults}
            className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors font-body disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedTypes.length === 0}
          >
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}
