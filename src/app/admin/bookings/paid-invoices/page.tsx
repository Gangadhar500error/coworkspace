"use client";

import { useTheme } from "../../_components/ThemeProvider";

export default function PaidInvoicesPage() {
  const { isDarkMode } = useTheme();

  return (
    <div className="py-6">
      <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Paid Invoices</h1>
      <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Dummy content - to be implemented</p>
    </div>
  );
}
