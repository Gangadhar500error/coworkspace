"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
  isDarkMode: boolean;
}

export default function MessageInput({
  onSend,
  isDarkMode,
}: MessageInputProps) {
  const [messageText, setMessageText] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (messageText.trim()) {
        onSend(messageText);
        setMessageText("");
      }
    }
  };

  const handleSendClick = () => {
    if (messageText.trim()) {
      onSend(messageText);
      setMessageText("");
    }
  };

  const handleAttachmentClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("File selected:", file.name);
        // Handle file upload here
      }
    };
    input.click();
  };

  return (
    <div
      className={`p-4 border-t ${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-end gap-2">
        <button
          onClick={handleAttachmentClick}
          className={`p-2.5 rounded-lg hover:bg-opacity-80 transition-colors shrink-0 ${
            isDarkMode
              ? "hover:bg-gray-800 text-gray-400"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          title="Attach File"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF5A22] transition-all ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
          />
        </div>
        <button
          onClick={handleSendClick}
          disabled={!messageText.trim()}
          className={`p-2.5 rounded-lg transition-all shrink-0 ${
            messageText.trim()
              ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
              : isDarkMode
              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          title="Send Message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

