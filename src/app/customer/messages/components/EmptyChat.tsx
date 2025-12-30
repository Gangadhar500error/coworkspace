"use client";

import { MessageSquare } from "lucide-react";

interface EmptyChatProps {
  isDarkMode: boolean;
}

export default function EmptyChat({ isDarkMode }: EmptyChatProps) {
  return (
    <div
      className={`flex-1 flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="text-center">
        <MessageSquare
          className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? "text-gray-700" : "text-gray-400"
          }`}
        />
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Select a conversation
        </h3>
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Choose a conversation from the list to start messaging
        </p>
      </div>
    </div>
  );
}

