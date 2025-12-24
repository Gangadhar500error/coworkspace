"use client";

import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { EmailTemplate } from "../types";

interface TemplateEditorModalProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function TemplateEditorModal({
  template,
  onSave,
  onClose,
  isDarkMode,
}: TemplateEditorModalProps) {
  const [editedTemplate, setEditedTemplate] = useState<EmailTemplate>(template);
  const [activeTab, setActiveTab] = useState<"subject" | "body">("subject");

  useEffect(() => {
    setEditedTemplate(template);
  }, [template]);

  const handleSave = () => {
    onSave({
      ...editedTemplate,
      lastModified: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className={`w-full max-w-6xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <h2
            className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Edit Template: {template.name}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <button
            onClick={() => setActiveTab("subject")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "subject"
                ? isDarkMode
                  ? "text-[#FF5A22] border-b-2 border-[#FF5A22]"
                  : "text-[#FF5A22] border-b-2 border-[#FF5A22]"
                : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Subject
          </button>
          <button
            onClick={() => setActiveTab("body")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "body"
                ? isDarkMode
                  ? "text-[#FF5A22] border-b-2 border-[#FF5A22]"
                  : "text-[#FF5A22] border-b-2 border-[#FF5A22]"
                : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Email Body (HTML)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "subject" ? (
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Subject
              </label>
              <input
                type="text"
                value={editedTemplate.subject}
                onChange={(e) =>
                  setEditedTemplate({ ...editedTemplate, subject: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A22] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  HTML Content
                </label>
                <div className="flex gap-2">
                  {template.variables.map((variable) => (
                    <button
                      key={variable}
                      onClick={() => {
                        const textarea = document.getElementById("body-editor") as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const before = text.substring(0, start);
                          const after = text.substring(end);
                          const newText = before + `{{${variable}}}` + after;
                          setEditedTemplate({ ...editedTemplate, body: newText });
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(
                              start + variable.length + 4,
                              start + variable.length + 4
                            );
                          }, 0);
                        }
                      }}
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {`{{${variable}}}`}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                id="body-editor"
                value={editedTemplate.body}
                onChange={(e) =>
                  setEditedTemplate({ ...editedTemplate, body: e.target.value })
                }
                rows={20}
                className={`w-full px-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A22] ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Available variables:
            </span>
            {template.variables.map((variable) => (
              <span
                key={variable}
                className={`text-xs px-2 py-1 rounded ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {`{{${variable}}}`}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isDarkMode
                  ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                  : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
              }`}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

