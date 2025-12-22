"use client";

import { useEffect, useRef, useState } from "react";
import {
  PanelLeftOpen,
  PanelLeftClose,
  Search,
  Bell,
  Menu,
  X,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  CalendarClock,
  ClipboardCheck,
  Languages,
  LayoutGrid,
} from "lucide-react";
import QuickPanel from "./QuickPanel";

interface AdminNavbarProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
}

export default function AdminNavbar({ onMenuClick, onToggleSidebar, isSidebarCollapsed, isDarkMode, onDarkModeToggle }: AdminNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Auto focus search when modal opened and close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };
    if (isSearchModalOpen) {
      const id = setTimeout(() => searchInputRef.current?.focus(), 150);
      window.addEventListener("keydown", handler);
      return () => {
        clearTimeout(id);
        window.removeEventListener("keydown", handler);
      };
    }
  }, [isSearchModalOpen]);

  // Sync fullscreen state (Esc or browser changes)
  useEffect(() => {
    const handler = () => {
      const fs = !!(
        document.fullscreenElement ||
        // @ts-ignore - vendor prefixes
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(fs);
    };
    document.addEventListener("fullscreenchange", handler);
    // @ts-ignore
    document.addEventListener("webkitfullscreenchange", handler);
    // @ts-ignore
    document.addEventListener("mozfullscreenchange", handler);
    // @ts-ignore
    document.addEventListener("MSFullscreenChange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      // @ts-ignore
      document.removeEventListener("webkitfullscreenchange", handler);
      // @ts-ignore
      document.removeEventListener("mozfullscreenchange", handler);
      // @ts-ignore
      document.removeEventListener("MSFullscreenChange", handler);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        const root: any = document.documentElement as any;
        if (root.requestFullscreen) await root.requestFullscreen();
        else if (root.webkitRequestFullscreen) await root.webkitRequestFullscreen();
        else if (root.mozRequestFullScreen) await root.mozRequestFullScreen();
        else if (root.msRequestFullscreen) await root.msRequestFullscreen();
        setIsFullscreen(true);
      } else {
        const doc: any = document as any;
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
        else if (doc.mozCancelFullScreen) await doc.mozCancelFullScreen();
        else if (doc.msExitFullscreen) await doc.msExitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      // ignore
    }
  };

  const notifications = [
    { id: 1, title: "New appointment booked", time: "2m ago", icon: CalendarClock },
    { id: 2, title: "Task completed: Sunday prep", time: "45m ago", icon: ClipboardCheck },
    { id: 3, title: "System maintenance tonight", time: "1h ago", icon: Settings },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "ur", name: "Urdu" },
    { code: "te", name: "Telugu" },
    { code: "ta", name: "Tamil" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "mr", name: "Marathi" },
    { code: "gu", name: "Gujarati" },
    { code: "bn", name: "Bengali" },
  ];

  return (
    <nav className={`relative h-16 flex items-center justify-between px-4 shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-900 border-b border-gray-800" : "bg-white border-b border-gray-200"}`}>
      {/* Left: sidebar toggle + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => {
            if (window.innerWidth >= 1024) {
              onToggleSidebar();
            } else {
              onMenuClick();
            }
          }}
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          aria-label="Toggle sidebar"
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-800"}`} />
          ) : (
            <PanelLeftClose className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-800"}`} />
          )}
        </button>

        <div className="relative flex items-center min-w-0">
          {/* Mobile icon -> modal */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className={`sm:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            aria-label="Search"
          >
            <Search className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
          </button>
          {/* Desktop inline input */}
          <div className="hidden sm:flex items-center">
          <div className={`flex items-center gap-2 rounded-xl px-3 py-1 w-[350px] shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
            <input
                type="text"
                placeholder="Search..."
                className={`flex-1 h-8 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:border-none text-sm ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-400"}`}
            />
            <span className={`hidden md:inline-flex items-center justify-center px-2 py-0.5 text-[11px] rounded-md border ${isDarkMode ? "text-white bg-gray-900 border-gray-700" : "text-gray-600 bg-white border-gray-200"}`}>
                /
            </span>
            </div>

          </div>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={() => onDarkModeToggle(!isDarkMode)}
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          aria-label={isDarkMode ? "Switch to light" : "Switch to dark"}
          title={isDarkMode ? "Light mode" : "Dark mode"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
          )}
        </button>
        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
          ) : (
            <Maximize2 className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
          )}
        </button>
        {/* Language selector */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setIsLanguageOpen((v) => !v)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            aria-label="Select language"
            title="Language"
          >
            <Languages className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
          </button>
          {isLanguageOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease-out_forwards] border z-50 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`px-4 py-3 border-b font-semibold ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>Select Language</div>
              <ul className={`max-h-80 overflow-auto divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        selectedLanguage === lang.name
                          ? isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : isDarkMode
                          ? "hover:bg-gray-800 text-white"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span>{lang.name}</span>
                      {selectedLanguage === lang.name && (
                        <span className={`text-xs ${isDarkMode ? "text-[#FF5A22]" : "text-[#FF5A22]"}`}>✓</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen((v) => !v)}
            className={`p-2 rounded-lg transition-colors relative ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            aria-label="Notifications"
          >
            <Bell className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF5A22] text-white text-[10px] rounded-full flex items-center justify-center">{notifications.length}</span>
          </button>
          {isNotifOpen && (
            <div className={`sm:absolute sm:right-0 sm:-translate-x-full sm:top-full sm:mt-2 sm:w-80 fixed left-2 right-2 top-16 w-auto rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease-out_forwards] z-50 border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`px-4 py-3 border-b font-semibold ${isDarkMode ? "border-gray-800 text-white" : "border-gray-200 text-gray-900"}`}>Notifications</div>
              <ul className={`max-h-[70vh] overflow-auto divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <li key={n.id} className={`flex items-start gap-3 px-4 py-3 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                      <div className="mt-0.5 p-2 rounded-lg bg-[#FF5A22]/10 text-[#FF5A22]"><Icon className="w-4 h-4" /></div>
                      <div className="min-w-0">
                        <p className={`text-sm truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{n.title}</p>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{n.time}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Right side panel toggle */}
        <button
          onClick={() => {
            setIsRightPanelOpen(true);
            // allow mount before triggering translate animation
            requestAnimationFrame(() => setIsRightPanelVisible(true));
          }}
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          aria-label="Open right panel"
          title="Quick Panel"
        >
          <LayoutGrid className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((v) => !v)}
            className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            aria-label="Open profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#FF5A22] to-[#7E22CE] text-white flex items-center justify-center text-sm font-semibold">JD</div>
            <span className={`hidden sm:block text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Admin</span>
          </button>
          {isProfileOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease-out_forwards] border z-50 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <button className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                <User className="w-4 h-4" /> Profile
              </button>
              <button className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-50 text-gray-700"}`}>
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search modal - small screens only */}
      {isSearchModalOpen && (
        <div className="sm:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setIsSearchModalOpen(false)}
            aria-hidden="true"
          />
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-start justify-center pt-16 px-4 z-[101]">
            <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border transform transition-all duration-200 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className={`relative p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                {/* Search Input */}
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <Search className={`w-5 h-5 shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search modules, appointments, tasks..."
                    className={`flex-1 h-9 bg-transparent outline-none text-sm ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-400"}`}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setIsSearchModalOpen(false);
                    }}
                  />
                  <button
                    onClick={() => setIsSearchModalOpen(false)}
                    className={`p-1.5 rounded-md transition-colors ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Mobile suggestions */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <p className={`text-xs uppercase tracking-wide mb-3 font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Quick Actions</p>
                <ul className={`space-y-1 ${isDarkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                  <li>
                    <button className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-colors ${isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                      View all appointments
                    </button>
                  </li>
                  <li>
                    <button className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-colors ${isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                      Create new task
                    </button>
                  </li>
                  <li>
                    <button className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-colors ${isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                      Open communications
                    </button>
                  </li>
                  <li>
                    <button className={`w-full text-left py-2.5 px-3 rounded-lg text-sm transition-colors ${isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                      Go to colleges
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large screens: no modal/panel for search (inline input used) */}

      {/* Right slide-over panel */}
      <QuickPanel
        isOpen={isRightPanelOpen}
        isVisible={isRightPanelVisible}
        isDarkMode={isDarkMode}
        onClose={() => {
          setIsRightPanelVisible(false);
          setTimeout(() => setIsRightPanelOpen(false), 300);
        }}
      />
    </nav>
  );
}
