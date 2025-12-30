"use client";

import { useEffect, useRef } from "react";
import { Conversation } from "../types";
import MessageBubble from "./MessageBubble";

interface MessagesAreaProps {
  conversation: Conversation;
  isDarkMode: boolean;
}

export default function MessagesArea({ conversation, isDarkMode }: MessagesAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  return (
    <div
      className={`flex-1 overflow-y-auto p-4 space-y-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {conversation.messages.map((message) => {
        const isCustomer = message.senderId === "customer";
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isCustomer={isCustomer}
            avatar={!isCustomer ? conversation.avatar : undefined}
            userName={!isCustomer ? conversation.name : undefined}
            isDarkMode={isDarkMode}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

