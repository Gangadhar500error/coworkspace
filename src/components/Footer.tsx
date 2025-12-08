"use client";

import { MapPin, Mail, Phone, Facebook, Twitter, Globe, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2025);
  
  // Set year on client side only to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #4ECDC4 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#4ECDC4]/20 to-[#FF5A22]/10 rounded-full blur-3xl" />

      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 py-5 lg:py-5">
        {/* Our Presence Section - First */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-wide">
            Our Presence
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-white/80 font-body">
            {[
              "New York",
              "Chicago",
              "Los Angeles",
              "Houston",
              "Phoenix",
              "Philadelphia",
              "San Antonio",
              "San Diego",
              "Dallas",
              "San Jose",
              "Austin",
              "Jacksonville",
              "Fort Worth",
              "Columbus",
              "Charlotte",
              "San Francisco",
              "Indianapolis",
              "Seattle",
              "Denver",
              "Washington",
              "Boston",
              "El Paso",
              "Nashville",
              "Detroit",
              "Oklahoma City",
              "Portland",
              "Las Vegas",
              "Memphis",
              "Louisville",
              "Baltimore"
            ].map((city, index, array) => (
              <span key={city} className="flex items-center">
                <span className="hover:text-[#FF5A22] transition-colors cursor-default">{city}</span>
                {index < array.length - 1 && <span className="text-white/30 mx-2">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6">
          {/* Useful Links Section */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-display uppercase tracking-wide">
              Useful Links
            </h3>
            <div className="space-y-1.5">
              {[
                "About Us",
                "Careers",
                "Contact Us",
                "News & Media",
                "Awards",
                "Blogs",
                "Newsletters",
                "Partnership Model",
                "Brokerage / Aggregator",
                "Landlord",
                "Privacy Policy",
                "Terms And Conditions",
                "Data Protection",
                "Cookie Policy"
              ].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="block text-sm text-white/80 hover:text-[#FF5A22] transition-colors font-body leading-relaxed"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Corporate & Registered Office */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-display uppercase tracking-wide">
              Corporate Office
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-body mb-4">
              123 Business Center, 5th Floor,<br />
              Suite 500, Downtown District,<br />
              Tampa, Florida, USA - 33602
            </p>
            <h3 className="text-base font-bold text-white mb-3 font-display uppercase tracking-wide">
              Registered Office
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-body">
              456 Corporate Plaza, 8th Floor,<br />
              Tower A, Business Park,<br />
              Tampa, Florida, USA - 33602
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-display uppercase tracking-wide">
              Contact Us
            </h3>
            <div className="space-y-2">
              <a 
                href="mailto:info@coworkspaces.us" 
                className="flex items-center gap-2 text-sm text-white/80 hover:text-[#FF5A22] transition-colors group"
              >
                <Mail className="w-4 h-4 text-white/60 group-hover:text-[#FF5A22] transition-colors shrink-0" />
                <span className="font-body break-all">info@coworkspaces.us</span>
              </a>
              <a 
                href="tel:+18139221406" 
                className="flex items-center gap-2 text-sm text-white/80 hover:text-[#FF5A22] transition-colors group"
              >
                <Phone className="w-4 h-4 text-white/60 group-hover:text-[#FF5A22] transition-colors shrink-0" />
                <span className="font-body">+1 813-922-1406</span>
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Tampa+Florida+USA" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-white/80 hover:text-[#FF5A22] transition-colors group"
              >
                <MapPin className="w-4 h-4 text-white/60 group-hover:text-[#FF5A22] transition-colors shrink-0 mt-0.5" />
                <span className="font-body">Multiple locations across the USA</span>
              </a>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 font-display uppercase tracking-wide">
              Follow Us
            </h3>
            <div className="flex gap-2 flex-wrap">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-600" },
                { icon: Facebook, href: "https://www.facebook.com/ConquerorsSoftwareTechnologiesPvtLimited", label: "Facebook", color: "hover:bg-blue-500" },
                { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-orange-500" },
                { icon: Twitter, href: "https://x.com/ConquerorsTech", label: "Twitter", color: "hover:bg-black" },
                { icon: Globe, href: "https://www.conquerorstech.net/", label: "Website", color: "hover:bg-white/20" }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:shadow-lg border border-white/20`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-sm text-white/70 font-body text-center md:text-left">
              Copyright - {currentYear}. <span className="font-semibold text-white">CoworkSpace</span> | All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
