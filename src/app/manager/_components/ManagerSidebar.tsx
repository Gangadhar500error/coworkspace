"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  ChevronLeft,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/manager",
    icon: LayoutDashboard,
  },
  {
    label: "Property Listing",
    href: "/manager/property-listing",
    icon: Building2,
  },
  {
    label: "Customers",
    href: "/manager/customers",
    icon: Users,
  },
  {
    label: "Bookings",
    href: "/manager/bookings",
    icon: Calendar,
  },
  {
    label: "Messages",
    href: "/manager/messages",
    icon: MessageSquare,
    badge: 3,
  },
  {
    label: "Payment",
    href: "/manager/payment",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/manager/settings",
    icon: Settings,
  },
];

interface ManagerSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isDarkMode: boolean;
}

export default function ManagerSidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
  isDarkMode,
}: ManagerSidebarProps) {
  const pathname = usePathname();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== "/manager" && pathname?.startsWith(href));

  const sidebarContent = (
    <div className={`h-full flex flex-col ${isDarkMode ? "bg-gray-900" : "bg-white"} border-r ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
      {/* Logo */}
      <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-[#FF5A22]" : "bg-[#FF5A22]"}`}>
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Manager
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-[#FF5A22]" : "bg-[#FF5A22]"}`}>
              <Building2 className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
        {isMobileOpen && (
          <button
            onClick={onMobileClose}
            className={`p-1 rounded-lg ${isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (isMobileOpen) onMobileClose();
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    active
                      ? isDarkMode
                        ? "bg-[#FF5A22] text-white"
                        : "bg-[#FF5A22] text-white"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${active ? "text-white" : ""}`} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          active
                            ? "bg-white/20 text-white"
                            : isDarkMode
                            ? "bg-[#FF5A22] text-white"
                            : "bg-[#FF5A22] text-white"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      {/* {isLargeScreen && (
        <div className={`p-4 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
          <button
            onClick={onToggleCollapse}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
        </div>
      )} */}
    </div>
  );

  if (!isLargeScreen) {
    return (
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-[280px] z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 72 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden lg:block fixed left-0 top-0 h-full z-30"
    >
      {sidebarContent}
    </motion.div>
  );
}

