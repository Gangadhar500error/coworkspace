"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Search, 
  Phone, 
  ChevronRight, 
  Globe, 
  User,
  X
} from "lucide-react";
import SecondaryNav from "./SecondaryNav";
import ProfileSidebar from "./ProfileSidebar";

export default function Navbar() {
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      {/* Top Dark Grey Strip */}
      <div className="h-1 bg-gray-800"></div>

      {/* Mobile Search Full Width - Only visible when search is open on mobile */}
      {mobileSearchOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white">
          <div className="container-custom flex items-center gap-2 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a location"
                autoFocus
                className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* First Row - Main Navigation */}
      {!mobileSearchOpen && (
        <div className={`border-b border-gray-200 bg-white transition-all duration-500 ease-in-out overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0 -translate-y-full" : "max-h-[100px] opacity-100 translate-y-0"
        }`}>
          <div className="container-custom flex items-center justify-between gap-4 py-3">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <div className="relative h-14 w-32 md:w-40">
                <Image
                  src="/assets/coworkspace.png"
                  alt="CoworkSpace"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a location"
                  className="w-full rounded-full border border-gray-300 bg-white pl-10 lg:pl-12 pr-4 lg:pr-5 py-2 lg:py-3 text-sm lg:text-base text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Mobile Search Icon - Only on small screens */}
              <button
                aria-label="Search"
                onClick={() => {
                  setMobileSearchOpen(true);
                  setProfileSidebarOpen(false);
                }}
                className="md:hidden p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-700" />
              </button>

              {/* Mobile Phone Icon - Only on small screens */}
              <button
                aria-label="Phone"
                onClick={() => window.location.href = "tel:+18139221406"}
                className="md:hidden  p-2 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-5 w-5 text-white" />
              </button>

              {/* Mobile Globe Icon - Only on small screens */}
              <button
                aria-label="Language"
                className="md:hidden p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              >
                <Globe className="h-5 w-5 text-gray-700" />
              </button>

              {/* Desktop Phone Button */}
              <button
                aria-label="Phone"
                onClick={() => window.location.href = "tel:+18139221406"}
                className="hidden md:flex items-center gap-2 lg:gap-3 rounded-full bg-orange-500 px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                <Phone className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="hidden lg:inline">+1 813-922-1406</span>
              </button>

              {/* Contact Us Button */}
              <button
                aria-label="Contact Us"
                onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                className="hidden sm:flex items-center gap-2 lg:gap-3 rounded-full bg-orange-500 px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                <span>Contact us</span>
                <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>

              {/* Desktop Language Selector */}
              <button
                aria-label="Language"
                className="hidden md:flex items-center gap-2 lg:gap-3 rounded-full border border-gray-300 bg-white px-3 py-2 lg:px-5 lg:py-3 text-sm lg:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Globe className="h-4 w-4 lg:h-5 lg:w-5" />
                <span>EN</span>
              </button>

              {/* User/Profile Button - Opens profile sidebar on all screens */}
              <button
                aria-label="Profile Menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileSidebarOpen(true);
                  setMobileSearchOpen(false);
                }}
                className="flex items-center gap-2 lg:gap-3 rounded-full border border-gray-300 bg-white px-3 py-2 lg:px-5 lg:py-3 text-sm lg:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Row - Navigation Links */}
      {!mobileSearchOpen && <SecondaryNav isScrolled={isScrolled} />}

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={profileSidebarOpen} 
        onClose={() => setProfileSidebarOpen(false)} 
      />
    </header>
  );
}
