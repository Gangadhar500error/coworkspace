"use client";

import { useTheme } from "../../_components/ThemeProvider";

export default function EmailTemplatesPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="py-6">
      <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Email Templates</h1>
    </div>
  );
}

