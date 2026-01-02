"use client";

import { Check, CheckCheck } from "lucide-react";
import { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isManager: boolean;
  avatar?: string;
  userName?: string;
  isDarkMode: boolean;
}

export default function MessageBubble({
  message,
  isManager,
  avatar,
  userName,
  isDarkMode,
}: MessageBubbleProps) {
  const formatTime = (timestamp: string) => {
    if (timestamp.includes("ago") || timestamp === "Just now") {
      return timestamp;
    }
    return timestamp;
  };

  return (
    <div className={`flex ${isManager ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-2 max-w-[70%] md:max-w-[60%] ${
          isManager ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isManager && avatar && (
          <div
            className={`w-8 h-8 rounded-full overflow-hidden shrink-0 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <img
              src={avatar}
              alt={userName || "User"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || "User")}&background=FF5A22&color=fff&size=128`;
              }}
            />
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isManager
              ? "bg-[#FF5A22] text-white"
              : isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900 border border-gray-200"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.text}</p>
          <div
            className={`flex items-center gap-1 mt-1 ${
              isManager ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`text-xs ${
                isManager
                  ? "text-white/70"
                  : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {formatTime(message.timestamp)}
            </span>
            {isManager && (
              <span className="text-white/70">
                {message.read ? (
                  <CheckCheck className="w-3.5 h-3.5" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

