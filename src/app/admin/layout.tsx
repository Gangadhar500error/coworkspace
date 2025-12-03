"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "./_components/ThemeProvider";
import { motion } from "framer-motion";
import AdminSidebar from "./_components/AdminSidebar";
import AdminNavbar from "./_components/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
      setIsLarge(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const openMobileSidebar = () => {
    setMobileOpen(true);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <div className={`min-h-screen flex overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <AdminSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          isMobileOpen={mobileOpen}
          onMobileClose={closeMobileSidebar}
          isDarkMode={isDarkMode}
        />
        <motion.div
          className="flex-1 flex flex-col"
          initial={false}
          animate={{ marginLeft: isLarge ? (sidebarCollapsed ? 72 : 280) : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          <AdminNavbar 
            onMenuClick={openMobileSidebar} 
            onToggleSidebar={toggleSidebar} 
            isSidebarCollapsed={sidebarCollapsed}
            isDarkMode={isDarkMode}
            onDarkModeToggle={setIsDarkMode}
          />
          <main className={`flex-1 p-6 overflow-auto transition-colors duration-300 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
