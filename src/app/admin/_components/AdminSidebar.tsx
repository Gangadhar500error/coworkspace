"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ChevronDown,
  X,
  Users,
  Building2,
  Calendar,
  FileText,
  Mail,
  Settings,
  DollarSign,
  Languages,
  Globe,
  MessageSquare,
  Star,
  Wifi,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Property Managers",
    href: "/admin/property-managers",
    icon: Users,
  },
  {
    label: "Property Listings",
    href: "/admin/property-listings",
    icon: Building2,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
    children: [
      { label: "All Bookings", href: "/admin/bookings", icon: Calendar },
      { label: "Unpaid Invoices", href: "/admin/bookings/unpaid-invoices", icon: FileText },
      { label: "Paid Invoices", href: "/admin/bookings/paid-invoices", icon: FileText },
      { label: "Bookings Completed", href: "/admin/bookings/completed", icon: Calendar },
    ],
  },
  {
    label: "Messaging",
    href: "/admin/messaging",
    icon: MessageSquare,
  },
  {
    label: "Email Templates",
    href: "/admin/email-templates",
    icon: Mail,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Master Settings",
    href: "/admin/master-settings",
    icon: Settings,
  },
  {
    label: "Currencies",
    href: "/admin/currencies",
    icon: DollarSign,
  },
  {
    label: "Translations",
    href: "/admin/translations",
    icon: Languages,
  },
  {
    label: "Languages",
    href: "/admin/languages",
    icon: Globe,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    label: "Amenities",
    href: "/admin/amenities",
    icon: Wifi,
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isDarkMode: boolean;
}

export default function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
  isDarkMode,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Auto-open parent menu if child is active
  useEffect(() => {
    const activeParent = navItems.find((item) => {
      if (item.children) {
        return item.children.some((child) => pathname === child.href);
      }
      return false;
    });
    if (activeParent) {
      setOpenItems((prev) => {
        if (!prev.includes(activeParent.label)) {
          return [...prev, activeParent.label];
        }
        return prev;
      });
    }
  }, [pathname]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  
  const isChildActive = (children?: NavItem[]) => {
    if (!children) return false;
    return children.some((child) => pathname === child.href);
  };

  const NavItemComponent = ({
    item,
    level = 0,
  }: {
    item: NavItem;
    level?: number;
  }) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.includes(item.label);
    const active = isActive(item.href) || isChildActive(item.children);

    const handleClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.preventDefault(); // prevent navigation
        toggleItem(item.label);
      }
    };

    return (
      <div className="relative">
        <Link
          href={hasChildren ? "#" : item.href}
          onClick={handleClick}
            className={`
            group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
            ${
              active
                ? "bg-[#FF5A22]/10 text-[#FF5A22]"
                : isDarkMode ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-100 text-gray-700"
            }
            ${isCollapsed && !isMobileOpen ? "justify-center" : ""}
          `}
          onMouseEnter={() => isCollapsed && setTooltipVisible(item.label)}
          onMouseLeave={() => setTooltipVisible(null)}
          aria-label={item.label}
        >
          <div className="flex items-center gap-3 grow">
            <Icon className="w-6 h-6 shrink-0" />
            {(!isCollapsed || isMobileOpen) && (
              <>
                <span className="grow text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-[#FF5A22] text-white text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
                {hasChildren && (
                  <span
                    className={`ml-auto transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
          </div>

          {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF5A22] rounded-r-full" />
          )}
        </Link>

        {/* Tooltip for collapsed state */}
        {isCollapsed && tooltipVisible === item.label && !isMobileOpen && (
          <div className={`absolute left-full ml-2 px-3 py-2 text-sm rounded-lg shadow-lg z-50 pointer-events-none whitespace-nowrap ${isDarkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-gray-900 text-white"}`}>
            {item.label}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-4 border-transparent ${isDarkMode ? "border-r-gray-800" : "border-r-gray-900"}`} />
          </div>
        )}

        {/* Nested items */}
        <AnimatePresence mode="wait">
          {hasChildren && isOpen && (
            <motion.div
              key="dropdown"
              className="ml-8 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.5 }
              }}
            >
              <div className="space-y-1 mt-1">
                {item.children!.map((child, idx) => (
                  <motion.div
                    key={child.href}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ 
                      delay: idx * 0.08,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <NavItemComponent
                      item={child}
                      level={level + 1}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed inset-y-0 left-0 z-50
          ${isDarkMode ? "bg-gray-900 border-r border-gray-800" : "bg-white border-r border-gray-200"}
          flex flex-col shadow-lg lg:shadow-none
        `}
        initial={false}
        animate={{
          width: isCollapsed ? 72 : 280,
          x: isLargeScreen ? 0 : (isMobileOpen ? 0 : -280)
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between h-20 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex items-center gap-2 grow px-3 justify-center">
              <Image
                src="/assets/coworkspace.png"
                alt="CoworkSpace logo"
                width={120}
                height={56}
                className="h-14 w-auto rounded-lg object-contain"
                quality={100}
                priority
                unoptimized={false}
              />
            </div>
          )}
          {isCollapsed && !isMobileOpen && (
            <div className="mx-auto">
              <Image
                src="/assets/coworkspace.png"
                alt="CoworkSpace logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-contain"
                quality={100}
                priority
                unoptimized={false}
              />
            </div>
          )}

          {/* Close button for mobile */}
          <button
            onClick={onMobileClose}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100"}`}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="grow overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
