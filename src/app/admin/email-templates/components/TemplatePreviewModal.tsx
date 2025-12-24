"use client";

import { X, Mail } from "lucide-react";
import { EmailTemplate } from "../types";
import { useEffect, useRef } from "react";

interface TemplatePreviewModalProps {
  template: EmailTemplate;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function TemplatePreviewModal({
  template,
  onClose,
  isDarkMode,
}: TemplatePreviewModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(template.body);
        doc.close();
      }
    }
  }, [template.body]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className={`w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Simple and Clean */}
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-gray-50"} px-5 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              isDarkMode ? "bg-gray-700" : "bg-white shadow-sm"
            }`}>
              <Mail className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-[#FF5A22]"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={`text-base font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {template.subject}
              </h2>
              <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Email Preview
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            }`}
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Body Preview - Full Height */}
        <div className={`flex-1 overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            title="Email Preview"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
