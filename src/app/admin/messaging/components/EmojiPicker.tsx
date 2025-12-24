"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { EmojiClickData, Theme } from "emoji-picker-react";

// Dynamically import emoji picker to avoid SSR issues
const EmojiPicker = dynamic(
  () => import("emoji-picker-react"),
  { ssr: false }
);

interface EmojiPickerProps {
  isDarkMode: boolean;
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}

export default function EmojiPickerWrapper({
  isDarkMode,
  onEmojiSelect,
  onClose,
  position,
}: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add slight delay to prevent immediate close on click
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    document.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    onClose();
  };

  return (
    <div
      ref={pickerRef}
      className="fixed z-50 shadow-2xl"
      style={{
        left: `${Math.max(10, position.x - 200)}px`, // Center on button, but keep 10px from left edge
        top: `${Math.max(10, position.y - 420)}px`, // Position above the button, but keep 10px from top
        right: "auto",
      }}
    >
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        theme={(isDarkMode ? "dark" : "light") as Theme}
        width={400}
        height={400}
        searchPlaceHolder="Search emojis..."
        previewConfig={{
          showPreview: false,
        }}
        skinTonesDisabled={false}
        lazyLoadEmojis={true}
      />
    </div>
  );
}
