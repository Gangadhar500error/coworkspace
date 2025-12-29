"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Building2,
  FileText,
  CreditCard,
  MessageSquare,
  Heart,
  Settings,
  HelpCircle,
  ChevronDown,
  Menu,
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
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    label: "My Bookings",
    href: "/customer/bookings",
    icon: Calendar,
    badge: 3,
  },
  {
    label: "My Properties",
    href: "/customer/properties",
    icon: Building2,
  },
  {
    label: "Invoices",
    href: "/customer/invoices",
    icon: FileText,
    badge: 2,
  },
  {
    label: "Payments",
    href: "/customer/payments",
    icon: CreditCard,
  },
  {
    label: "Messages",
    href: "/customer/messages",
    icon: MessageSquare,
    badge: 5,
  },
  {
    label: "Favorites",
    href: "/customer/favorites",
    icon: Heart,
  },
  {
    label: "Settings",
    href: "/customer/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    href: "/customer/help",
    icon: HelpCircle,
  },
];

interface CustomerSecondNavProps {
  isDarkMode: boolean;
}

export default function CustomerSecondNav({ isDarkMode }: CustomerSecondNavProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-16 z-40 ${isDarkMode ? "bg-gray-800 border-b border-gray-700" : "bg-gray-50 border-b border-gray-200"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 h-14 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/customer" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all relative ${
                  isActive
                    ? isDarkMode
                      ? "bg-[#FF5A22] text-white"
                      : "bg-[#FF5A22] text-white"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isDarkMode
                      ? "bg-[#FF5A22] text-white"
                      : "bg-[#FF5A22] text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-full flex items-center justify-between py-3 px-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            <div className="flex items-center gap-2">
              {pathname && (() => {
                const activeItem = navItems.find(item => 
                  pathname === item.href || (item.href !== "/customer" && pathname.startsWith(item.href))
                );
                if (activeItem) {
                  const Icon = activeItem.icon;
                  return (
                    <>
                      <Icon className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {activeItem.label}
                      </span>
                    </>
                  );
                }
                return (
                  <>
                    <Menu className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Menu
                    </span>
                  </>
                );
              })()}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""} ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
          </button>
          {isMobileMenuOpen && (
            <div className={`pb-4 space-y-1 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/customer" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? isDarkMode
                          ? "bg-[#FF5A22] text-white"
                          : "bg-[#FF5A22] text-white"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : isDarkMode
                          ? "bg-[#FF5A22] text-white"
                          : "bg-[#FF5A22] text-white"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

