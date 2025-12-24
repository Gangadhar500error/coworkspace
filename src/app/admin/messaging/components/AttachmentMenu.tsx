"use client";

import { ImageIcon, FileText, X } from "lucide-react";

interface AttachmentMenuProps {
  isDarkMode: boolean;
  onImageClick: () => void;
  onFileClick: () => void;
  onClose: () => void;
}

export default function AttachmentMenu({
  isDarkMode,
  onImageClick,
  onFileClick,
  onClose,
}: AttachmentMenuProps) {
  return (
    <div
      className={`mb-3 p-3 rounded-lg border flex gap-3 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <button
        onClick={() => {
          onImageClick();
          onClose();
        }}
        className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-400"
            : "hover:bg-white text-gray-600"
        }`}
        title="Upload Image"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          onFileClick();
          onClose();
        }}
        className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-400"
            : "hover:bg-white text-gray-600"
        }`}
        title="Upload File"
      >
        <FileText className="w-5 h-5" />
      </button>
      <button
        onClick={onClose}
        className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ml-auto ${
          isDarkMode
            ? "hover:bg-gray-700 text-gray-400"
            : "hover:bg-white text-gray-600"
        }`}
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

