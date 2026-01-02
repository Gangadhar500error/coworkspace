"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  PanelLeftOpen,
  PanelLeftClose,
  Search,
  Bell,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface ManagerNavbarProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
}

export default function ManagerNavbar({
  onMenuClick,
  onToggleSidebar,
  isSidebarCollapsed,
  isDarkMode,
  onDarkModeToggle,
}: ManagerNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-20 h-14 border-b backdrop-blur-sm transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gray-900/95 border-gray-800" 
          : "bg-white/95 border-gray-200"
      }`}
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-1.5 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={onToggleSidebar}
            className={`hidden lg:flex p-1.5 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-sm ml-2">
            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 w-full border transition-all ${
                isDarkMode 
                  ? "bg-gray-800/50 border-gray-700/50 hover:border-gray-700" 
                  : "bg-gray-50/50 border-gray-200/50 hover:border-gray-300"
              }`}
            >
              <Search className={`w-3.5 h-3.5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search..."
                className={`flex-1 h-5 bg-transparent border-none outline-none ring-0 focus:ring-0 text-sm ${
                  isDarkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            onClick={() => onDarkModeToggle(!isDarkMode)}
            className={`p-1.5 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
            aria-label={isDarkMode ? "Switch to light" : "Switch to dark"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`relative p-1.5 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#FF5A22] rounded-full"></span>
            </button>
            {isNotifOpen && (
              <div
                className={`absolute right-0 mt-2 w-72 rounded-lg shadow-lg border overflow-hidden z-50 ${
                  isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                }`}
              >
                <div className={`p-3 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Notifications
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className={`p-4 text-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    No new notifications
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? "bg-[#FF5A22]" : "bg-[#FF5A22]"}`}>
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="hidden xl:block text-left">
                <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Manager
                </p>
                <p className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  manager@example.com
                </p>
              </div>
            </button>
            {isProfileOpen && (
              <div
                className={`absolute right-0 mt-2 w-52 rounded-lg shadow-lg overflow-hidden border z-50 ${
                  isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                }`}
              >
                <div className={`px-3 py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                  <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Manager
                  </p>
                  <p className={`text-[10px] mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    manager@example.com
                  </p>
                </div>
                <div className={`py-1 divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                  <Link
                    href="/manager/settings"
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 transition-colors text-xs ${
                      isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </Link>
                  <button
                    className={`w-full px-3 py-2 text-left flex items-center gap-2 transition-colors text-xs ${
                      isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

