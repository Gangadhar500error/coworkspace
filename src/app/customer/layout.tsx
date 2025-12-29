"use client";

import { useState } from "react";
import { ThemeProvider } from "../admin/_components/ThemeProvider";
import CustomerNavbar from "./_components/CustomerNavbar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <CustomerNavbar 
          isDarkMode={isDarkMode}
          onDarkModeToggle={setIsDarkMode}
        />
        <main className={`flex-1 overflow-auto transition-colors duration-300 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

