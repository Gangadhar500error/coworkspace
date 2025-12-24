"use client";

import { useEffect, useRef } from "react";
import { Archive, Trash2, BellOff, Pin, UserPlus } from "lucide-react";

interface ConversationMenuProps {
  isDarkMode: boolean;
  position: { x: number; y: number };
  onClose: () => void;
}

export default function ConversationMenu({
  isDarkMode,
  position,
  onClose,
}: ConversationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const menuItems = [
    { icon: Pin, label: "Pin Conversation", onClick: () => console.log("Pin") },
    { icon: BellOff, label: "Mute Notifications", onClick: () => console.log("Mute") },
    { icon: Archive, label: "Archive", onClick: () => console.log("Archive") },
    { icon: UserPlus, label: "Add Contact", onClick: () => console.log("Add Contact") },
    { icon: Trash2, label: "Delete", onClick: () => console.log("Delete"), danger: true },
  ];

  return (
    <div
      ref={menuRef}
      className={`fixed z-50 mt-2 w-56 rounded-lg shadow-lg border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 shadow-gray-900/50"
          : "bg-white border-gray-200 shadow-gray-900/10"
      }`}
      style={{
        left: `${position.x - 200}px`,
        top: `${position.y + 10}px`,
      }}
    >
      <div className="py-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                item.danger
                  ? isDarkMode
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-red-600 hover:bg-red-50"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

