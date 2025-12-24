// Message and Conversation Types

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  read: boolean;
  type: "text" | "image" | "file";
  attachment?: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

