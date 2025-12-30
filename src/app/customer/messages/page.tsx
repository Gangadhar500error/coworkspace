"use client";

import { useState } from "react";
import { useTheme } from "../../admin/_components/ThemeProvider";
import { Conversation, Message } from "./types";
import { mockConversations } from "./data";
import ConversationsList from "./components/ConversationsList";
import ChatHeader from "./components/ChatHeader";
import MessagesArea from "./components/MessagesArea";
import MessageInput from "./components/MessageInput";
import EmptyChat from "./components/EmptyChat";

export default function CustomerMessagesPage() {
  const { isDarkMode } = useTheme();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0] || null
  );

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText,
      senderId: "customer",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      type: "text",
    };

    // Update conversation with new message
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          timestamp: "Just now",
          unreadCount: 0, // Reset unread count when customer sends message
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageText,
      timestamp: "Just now",
      unreadCount: 0,
    });
  };

  const handlePhoneClick = () => {
    console.log("Phone call to:", selectedConversation?.name);
    // Implement phone call functionality
  };

  const handleVideoClick = () => {
    console.log("Video call to:", selectedConversation?.name);
    // Implement video call functionality
  };

  const handleInfoClick = () => {
    console.log("Show info for:", selectedConversation?.name);
    // Implement conversation info modal
  };

  return (
    <div className="space-y-2 animate-fadeIn">
     

      {/* Messages Interface */}
      <div className={`h-[calc(100vh-200px)] flex flex-col rounded-lg border overflow-hidden ${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}>
        <div className="flex h-full overflow-hidden">
          {/* Left Sidebar - Conversations List */}
          <ConversationsList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            isDarkMode={isDarkMode}
          />

          {/* Right Side - Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <ChatHeader
                conversation={selectedConversation}
                isDarkMode={isDarkMode}
                onPhoneClick={handlePhoneClick}
                onVideoClick={handleVideoClick}
                onInfoClick={handleInfoClick}
              />

              {/* Messages Area */}
              <MessagesArea conversation={selectedConversation} isDarkMode={isDarkMode} />

              {/* Message Input */}
              <MessageInput
                onSend={handleSendMessage}
                isDarkMode={isDarkMode}
              />
            </div>
          ) : (
            <EmptyChat isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
}

