"use client";

import { Conversation } from "../types";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
  isDarkMode: boolean;
}

export default function ConversationItem({
  conversation,
  isSelected,
  onClick,
  isDarkMode,
}: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border-b transition-colors text-left ${
        isSelected
          ? isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-200"
          : isDarkMode
          ? "border-gray-800 hover:bg-gray-800/50"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className={`w-12 h-12 rounded-full overflow-hidden ${
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

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3
              className={`font-semibold truncate ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {conversation.name}
            </h3>
            <span
              className={`text-xs shrink-0 ml-2 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {conversation.timestamp}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-sm truncate ${
                conversation.unreadCount > 0
                  ? isDarkMode
                    ? "text-white font-medium"
                    : "text-gray-900 font-medium"
                  : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {conversation.lastMessage}
            </p>
            {conversation.unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#FF5A22] text-white text-xs font-semibold rounded-full shrink-0">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

