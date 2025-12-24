"use client";

import { useState } from "react";
import { useTheme } from "../_components/ThemeProvider";
import {
  Search,
  Filter,
  Calendar,
  ShieldCheck,
  MessageSquare,
  Receipt,
  Sparkles,
  Plus,
  Mail,
} from "lucide-react";
import { emailTemplates } from "./data";
import { EmailTemplate, TemplateCategory } from "./types";
import TemplateCard from "./components/TemplateCard";
import TemplatePreviewModal from "./components/TemplatePreviewModal";
import TemplateEditorModal from "./components/TemplateEditorModal";

const categoryIcons: Record<TemplateCategory, any> = {
  Booking: Calendar,
  Authentication: ShieldCheck,
  Communication: MessageSquare,
  Payment: Receipt,
  System: Sparkles,
};

const categoryColors: Record<TemplateCategory, string> = {
  Booking: "from-blue-500 to-cyan-500",
  Authentication: "from-purple-500 to-pink-500",
  Communication: "from-indigo-500 to-blue-500",
  Payment: "from-green-500 to-emerald-500",
  System: "from-orange-500 to-amber-500",
};

export default function EmailTemplatesPage() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "All">("All");
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const categories: (TemplateCategory | "All")[] = ["All", "Booking", "Authentication", "Communication", "Payment", "System"];

  const filteredTemplates = emailTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowEditor(true);
  };

  const handlePreview = (template: EmailTemplate) => {
    setPreviewTemplate(template);
  };

  const handleSave = (updatedTemplate: EmailTemplate) => {
    console.log("Saving template:", updatedTemplate);
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Email Templates
            </h1>
            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage and customize email templates for your coworking space
            </p>
          </div>
          {/* <button
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isDarkMode
                ? "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
                : "bg-[#FF5A22] hover:bg-[#FF5A22]/90 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            New Template
          </button> */}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A22] transition-all ${
                isDarkMode
                  ? "bg-gray-800 text-white placeholder-gray-500"
                  : "bg-white text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category === "All" ? Filter : categoryIcons[category];
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? "bg-[#FF5A22] text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className={`rounded-xl p-12 text-center ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <Mail className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            No templates found
          </h3>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            {searchQuery || selectedCategory !== "All"
              ? "Try adjusting your search or filter"
              : "Create your first email template"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={() => handleEdit(template)}
              onPreview={() => handlePreview(template)}
              isDarkMode={isDarkMode}
              categoryColor={categoryColors[template.category]}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Editor Modal */}
      {showEditor && selectedTemplate && (
        <TemplateEditorModal
          template={selectedTemplate}
          onSave={handleSave}
          onClose={() => {
            setShowEditor(false);
            setSelectedTemplate(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
