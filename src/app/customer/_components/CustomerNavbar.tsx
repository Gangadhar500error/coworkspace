"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bell,
  X,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  CalendarClock,
  MessageSquare,
} from "lucide-react";
import CustomerSecondNav from "./CustomerSecondNav";

interface CustomerNavbarProps {
  isDarkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
}

export default function CustomerNavbar({ 
  isDarkMode, 
  onDarkModeToggle 
}: CustomerNavbarProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns when clicking outside
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

  const notifications = [
    { id: 1, title: "New booking confirmed", time: "2m ago", icon: CalendarClock },
    { id: 2, title: "Payment received", time: "1h ago", icon: CalendarClock },
    { id: 3, title: "New message from host", time: "3h ago", icon: MessageSquare },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className={`sticky top-0 z-50 ${isDarkMode ? "bg-gray-900 border-b border-gray-800" : "bg-white border-b border-gray-200"} shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-4 lg:gap-6 flex-1 min-w-0">
              {/* Logo */}
              <Link href="/customer" className="flex items-center shrink-0">
                <Image
                  src="/assets/coworkspace.png"
                  alt="CoworkSpace logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto rounded-lg object-contain"
                  quality={100}
                  priority
                  unoptimized={false}
                />
              </Link>

              {/* Search */}
              <div className="relative flex items-center min-w-0 flex-1 max-w-md">
                {/* Mobile icon -> modal */}
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className={`md:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                  aria-label="Search"
                >
                  <Search className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                </button>
                {/* Desktop inline input */}
                <div className="hidden md:flex items-center w-full">
                  <div className={`flex items-center gap-2 rounded-xl px-4 py-2 w-full shadow-sm border transition-all ${isDarkMode ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}>
                    <Search className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                    <input
                      type="text"
                      placeholder="Search spaces, bookings..."
                      className={`flex-1 h-6 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:border-none text-sm ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-400"}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Notifications + Profile */}
            <div className="flex items-center gap-2 lg:gap-3">
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
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`relative p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                  aria-label="Notifications"
                >
                  <Bell className={`w-5 h-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
                  <span className={`absolute top-1 right-1 w-2 h-2 bg-[#FF5A22] rounded-full border-2 ${isDarkMode ? "border-gray-900" : "border-white"}`} />
                </button>
            {isNotifOpen && (
              <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease-out_forwards] border z-50 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                  <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Notifications</h3>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>3 new</span>
                </div>
                <div className={`max-h-96 overflow-auto divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      className={`w-full px-4 py-3 text-left transition-colors ${isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                          <notif.icon className={`w-4 h-4 ${isDarkMode ? "text-[#FF5A22]" : "text-[#FF5A22]"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {notif.title}
                          </p>
                          <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className={`px-4 py-3 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                  <button className={`w-full text-sm font-medium text-center ${isDarkMode ? "text-[#FF5A22] hover:text-[#FF5A22]/80" : "text-[#FF5A22] hover:text-[#FF5A22]/80"}`}>
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

              {/* Profile dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                  aria-label="User menu"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? "bg-[#FF5A22]" : "bg-[#FF5A22]"}`}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Madan
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Customer
                    </p>
                  </div>
                </button>
                {isProfileOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease-out_forwards] border z-50 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                    <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Madan
                      </p>
                      <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        madan@example.com
                      </p>
                    </div>
                    <div className={`py-2 divide-y ${isDarkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                      <Link href="/customer/profile" className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                        <User className="w-4 h-4" />
                        <span className="text-sm">My Profile</span>
                      </Link>
                      <Link href="/customer/bookings" className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                        <CalendarClock className="w-4 h-4" />
                        <span className="text-sm">My Bookings</span>
                      </Link>
                      <Link href="/customer/settings" className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-50"}`}>
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                    </div>
                    <div className={`px-4 py-2 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                      <button className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors rounded-lg ${isDarkMode ? "text-red-400 hover:bg-gray-800" : "text-red-600 hover:bg-gray-50"}`}>
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Second Navigation Bar */}
      <CustomerSecondNav isDarkMode={isDarkMode} />

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className={`w-full max-w-2xl rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.2s_ease-out_forwards] border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              <Search className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search bookings, properties..."
                className={`flex-1 bg-transparent border-none outline-none text-lg ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-400"}`}
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className={`p-1 rounded-lg ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              >
                <X className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </button>
            </div>
            <div className={`p-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              <p className="text-sm">Start typing to search...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

