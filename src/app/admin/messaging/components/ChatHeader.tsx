"use client";

import { Phone, Video, Info } from "lucide-react";
import { Conversation } from "../types";

interface ChatHeaderProps {
  conversation: Conversation;
  isDarkMode: boolean;
  onPhoneClick?: () => void;
  onVideoClick?: () => void;
  onInfoClick?: () => void;
}

export default function ChatHeader({
  conversation,
  isDarkMode,
  onPhoneClick,
  onVideoClick,
  onInfoClick,
}: ChatHeaderProps) {
  return (
    <div
      className={`p-4 border-b flex items-center justify-between ${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className={`w-10 h-10 rounded-full overflow-hidden ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.name)}&background=FF5A22&color=fff&size=128`;
              }}
            />
          </div>
          {conversation.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h2
            className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {conversation.name}
          </h2>
          <p
            className={`text-xs ${
              conversation.isOnline
                ? "text-green-500"
                : isDarkMode
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            {conversation.isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPhoneClick}
          className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
            isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
          }`}
          title="Call"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          onClick={onVideoClick}
          className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
            isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
          }`}
          title="Video Call"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          onClick={onInfoClick}
          className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
            isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
          }`}
          title="Conversation Info"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

