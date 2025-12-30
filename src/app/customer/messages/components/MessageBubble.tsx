"use client";

import { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isCustomer: boolean;
  avatar?: string;
  userName?: string;
  isDarkMode: boolean;
}

export default function MessageBubble({
  message,
  isCustomer,
  avatar,
  userName,
  isDarkMode,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-3 ${isCustomer ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isCustomer && avatar && (
        <div className="shrink-0">
          <div
            className={`w-8 h-8 rounded-full overflow-hidden ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <img
              src={avatar}
              alt={userName || "User"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <div className={`flex flex-col ${isCustomer ? "items-end" : "items-start"} max-w-[70%]`}>
        {userName && !isCustomer && (
          <span
            className={`text-xs font-medium mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {userName}
          </span>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${
            isCustomer
              ? isDarkMode
                ? "bg-[#FF5A22] text-white"
                : "bg-[#FF5A22] text-white"
              : isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <span
          className={`text-xs mt-1 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

