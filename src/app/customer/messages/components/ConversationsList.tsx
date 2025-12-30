"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Conversation } from "../types";
import ConversationItem from "./ConversationItem";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  isDarkMode: boolean;
}

export default function ConversationsList({
  conversations,
  selectedConversation,
  onSelectConversation,
  isDarkMode,
}: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full md:w-96 border-r flex flex-col ${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        <h1
          className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Messages
        </h1>

        {/* Search */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF5A22] transition-all ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div
            className={`p-8 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            <p>No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              onClick={() => onSelectConversation(conversation)}
              isDarkMode={isDarkMode}
            />
          ))
        )}
      </div>
    </div>
  );
}

