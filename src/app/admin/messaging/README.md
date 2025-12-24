# Admin Messaging System

## Overview

A modern, WhatsApp-like messaging interface for the admin panel. Built with React, TypeScript, and Next.js.

## Features

- ✅ **Conversation List** - Left sidebar with search functionality
- ✅ **Chat Interface** - Clean message bubbles with read receipts
- ✅ **Emoji Picker** - WhatsApp-style emoji picker with categories and search
- ✅ **File Attachments** - Support for images and files
- ✅ **Dark Mode** - Full dark mode support
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Real-time Ready** - Structure ready for WebSocket integration

## Component Structure

```
messaging/
├── page.tsx                    # Main messaging page
├── types.ts                    # TypeScript interfaces
├── data.ts                     # Mock conversation data
└── components/
    ├── ConversationsList.tsx   # Left sidebar with conversations
    ├── ConversationItem.tsx    # Individual conversation card
    ├── ConversationMenu.tsx    # Three-dot menu (Pin, Mute, Archive, etc.)
    ├── ChatHeader.tsx          # Chat header with user info
    ├── MessagesArea.tsx         # Scrollable messages container
    ├── MessageBubble.tsx       # Individual message bubble
    ├── MessageInput.tsx         # Input area with emoji & attachments
    ├── EmojiPicker.tsx          # WhatsApp-style emoji picker
    ├── AttachmentMenu.tsx       # Attachment options menu
    └── EmptyChat.tsx            # Empty state component
```

## Data Structure

### Conversation
```typescript
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}
```

### Message
```typescript
interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  read: boolean;
  type: "text" | "image" | "file";
  attachment?: string;
}
```

## Backend Integration

### Required API Endpoints

#### 1. Get Conversations List
```
GET /api/admin/messaging/conversations
Query Params:
  - search?: string
  - page?: number
  - limit?: number

Response:
{
  "success": true,
  "data": Conversation[],
  "pagination": {
    "current_page": number,
    "last_page": number,
    "per_page": number,
    "total": number
  }
}
```

#### 2. Get Conversation Messages
```
GET /api/admin/messaging/conversations/:conversationId/messages
Query Params:
  - page?: number
  - limit?: number

Response:
{
  "success": true,
  "data": Message[],
  "pagination": {
    "current_page": number,
    "last_page": number,
    "per_page": number,
    "total": number
  }
}
```

#### 3. Send Message
```
POST /api/admin/messaging/conversations/:conversationId/messages
Body:
{
  "text": string,
  "type": "text" | "image" | "file",
  "attachment"?: string (URL or base64)
}

Response:
{
  "success": true,
  "data": Message
}
```

#### 4. Mark Messages as Read
```
PATCH /api/admin/messaging/conversations/:conversationId/read
Body:
{
  "messageIds": string[]
}

Response:
{
  "success": true,
  "message": "Messages marked as read"
}
```

#### 5. Upload Attachment
```
POST /api/admin/messaging/attachments
Body: FormData
  - file: File
  - type: "image" | "file"

Response:
{
  "success": true,
  "data": {
    "url": string,
    "type": "image" | "file",
    "filename": string
  }
}
```

### WebSocket Events (Optional - for real-time)

#### Client → Server
- `join_conversation` - Join a conversation room
- `send_message` - Send a new message
- `typing` - User is typing indicator
- `mark_read` - Mark messages as read

#### Server → Client
- `new_message` - New message received
- `message_read` - Message read receipt
- `user_typing` - User typing indicator
- `user_online` - User online status change

## Environment Variables

```env
# WebSocket (optional)
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_WS_RECONNECT_INTERVAL=3000

# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Usage Example

### Replace Mock Data with API Calls

```typescript
// In page.tsx
import { useEffect } from "react";
import { getConversations, getMessages } from "@/services/messagingService";

useEffect(() => {
  async function loadConversations() {
    const data = await getConversations();
    setConversations(data);
  }
  loadConversations();
}, []);

useEffect(() => {
  if (selectedConversation) {
    async function loadMessages() {
      const messages = await getMessages(selectedConversation.id);
      // Update conversation messages
    }
    loadMessages();
  }
}, [selectedConversation]);
```

## Dependencies

- `emoji-picker-react` - WhatsApp-style emoji picker
- `lucide-react` - Icons
- `framer-motion` - Animations (if needed)

## Styling

- Uses Tailwind CSS
- Dark mode via `ThemeProvider`
- Brand color: `#FF5A22`

## Future Enhancements

- [ ] Voice messages
- [ ] Video messages
- [ ] Message reactions
- [ ] Message forwarding
- [ ] Group conversations
- [ ] Message search
- [ ] Message pinning
- [ ] Read receipts per message
- [ ] Typing indicators
- [ ] Online/offline status
- [ ] Message delivery status

## Notes for Backend Developers

1. **Message IDs**: Use UUIDs or unique identifiers
2. **Timestamps**: Use ISO 8601 format
3. **File Uploads**: Store files in cloud storage (S3, Cloudinary, etc.)
4. **Real-time**: Consider WebSocket or Server-Sent Events
5. **Pagination**: Implement cursor-based or offset pagination
6. **Search**: Full-text search for conversations and messages
7. **Security**: Validate user permissions for each conversation
8. **Rate Limiting**: Implement rate limiting for message sending

