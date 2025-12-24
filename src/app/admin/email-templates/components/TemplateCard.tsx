"use client";

import { Edit, Eye, Mail, CheckCircle, XCircle } from "lucide-react";
import { EmailTemplate } from "../types";
import * as Icons from "lucide-react";

interface TemplateCardProps {
  template: EmailTemplate;
  onEdit: () => void;
  onPreview: () => void;
  isDarkMode: boolean;
  categoryColor: string;
}

export default function TemplateCard({
  template,
  onEdit,
  onPreview,
  isDarkMode,
  categoryColor,
}: TemplateCardProps) {
  const IconComponent = (Icons as any)[template.icon] || Mail;

  return (
    <div
      className={`rounded-xl p-5 transition-all hover:shadow-lg cursor-pointer ${
        isDarkMode ? "bg-gray-900 hover:bg-gray-800/50" : "bg-white hover:bg-gray-50"
      }`}
      onClick={onPreview}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2.5 rounded-lg bg-gradient-to-br ${categoryColor} text-white shrink-0`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {template.name}
            </h3>
            <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              {template.category}
            </p>
          </div>
        </div>
        {template.isActive ? (
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </div>

      <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {template.description}
      </p>

      <div className={`p-3 rounded-lg mb-4 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
        <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          {template.subject}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
          {template.lastModified}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
