"use client";

import { Phone, Mail } from "lucide-react";

export default function VirtualOfficeCTA() {
  return (
    <section
      className="w-full py-8 md:py-10 lg:py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/ctabg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="max-w-xl bg-white/90 md:bg-white/80 backdrop-blur-sm p-5 md:p-8 lg:p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
            Book Your Virtual Office{" "}
            <span className="text-yellow-500">with Cowork Space</span>
          </h2>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
            Company Registration • Tax Registration • Business Address •  
            Mailing Address • Reception Services • Meeting Room Access
          </p>

          <div className="mt-5 md:mt-6 pt-4 border-t border-gray-300 space-y-2.5 md:space-y-3">
            <a href="tel:+18139221406" className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-800 hover:text-yellow-500 transition-colors">
              <Phone className="h-5 w-5 text-gray-800 shrink-0" />
              <span className="break-all">+1 813-922-1406</span>
            </a>
            <a href="mailto:info@coworkspaces.us" className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-800 hover:text-yellow-500 transition-colors">
              <Mail className="h-5 w-5 text-gray-800 shrink-0" />
              <span className="break-all">info@coworkspaces.us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
