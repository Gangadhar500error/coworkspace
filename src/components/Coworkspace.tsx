"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

export default function Coworkspace() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    location: "",
    officeType: "",
    workstations: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate map URL based on city and location
  const mapUrl = useMemo(() => {
    if (!formData.city && !formData.location) {
      // Default map (Tampa)
      return "https://www.google.com/maps?q=Tampa+Florida+USA&output=embed";
    }

    const cityMap: { [key: string]: string } = {
      tampa: "Tampa",
      orlando: "Orlando",
      miami: "Miami",
      jacksonville: "Jacksonville",
      atlanta: "Atlanta",
    };

    const locationMap: { [key: string]: string } = {
      downtown: "Downtown",
      "business-district": "Business District",
      "airport-area": "Airport Area",
      suburban: "Suburban",
    };

    let searchQuery = "";
    
    if (formData.city && formData.location) {
      const cityName = cityMap[formData.city] || formData.city;
      const locationName = locationMap[formData.location] || formData.location;
      searchQuery = `${locationName}, ${cityName}, Florida, USA`;
    } else if (formData.city) {
      const cityName = cityMap[formData.city] || formData.city;
      searchQuery = `${cityName}, Florida, USA`;
    } else if (formData.location) {
      const locationName = locationMap[formData.location] || formData.location;
      searchQuery = `${locationName}, Florida, USA`;
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
  }, [formData.city, formData.location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white py-6 md:py-10">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 lg:gap-8">
          {/* LEFT COLUMN - Content Area */}
          <div className="space-y-4">
            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Experience our Premium Coworking Space
            </h1>

            {/* Description Paragraph */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              CoworkSpace offers modern, flexible workspace solutions designed for businesses and professionals. 
              Our premium coworking spaces feature prime locations with easy access to major business districts, 
              shopping centers, and entertainment hubs. Enjoy 24/7 access, high-speed internet, fully-equipped meeting rooms, 
              and over 30+ amenities designed to enhance your productivity. Join a vibrant community of entrepreneurs, 
              freelancers, and growing businesses in our state-of-the-art facilities.
            </p>

            {/* Google Map Embed */}
            <div className="w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden shadow-md border border-gray-200">
              <iframe
                key={mapUrl}
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:+18139221406" className="text-sm md:text-base text-gray-900 font-medium hover:text-yellow-500 transition-colors">
                  +1 813-922-1406
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:info@coworkspaces.us" className="text-sm md:text-base text-gray-900 font-medium hover:text-yellow-500 transition-colors">
                  info@coworkspaces.us
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Schedule a Visit Form */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white border-2 border-yellow-500 rounded-2xl p-5 md:p-6 shadow-lg">
              {/* Form Heading */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-1">
                Schedule a Visit
              </h2>
              <p className="text-xs md:text-sm text-gray-500 text-center mb-4 md:mb-5">
                We would love to show you around !
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name Field */}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 placeholder-gray-500"
                  required
                />

                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 placeholder-gray-500"
                  required
                />

                {/* Phone Field */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 placeholder-gray-500"
                  required
                />

                {/* City Dropdown */}
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose City</option>
                    <option value="tampa">Tampa</option>
                    <option value="orlando">Orlando</option>
                    <option value="miami">Miami</option>
                    <option value="jacksonville">Jacksonville</option>
                    <option value="atlanta">Atlanta</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Location Dropdown */}
                <div className="relative">
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="downtown">Downtown</option>
                    <option value="business-district">Business District</option>
                    <option value="airport-area">Airport Area</option>
                    <option value="suburban">Suburban</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Office Type Dropdown */}
                <div className="relative">
                  <select
                    name="officeType"
                    value={formData.officeType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Office Type</option>
                    <option value="hot-desk">Hot Desk</option>
                    <option value="dedicated-desk">Dedicated Desk</option>
                    <option value="private-office">Private Office</option>
                    <option value="meeting-room">Meeting Room</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Workstations Dropdown */}
                <div className="relative">
                  <select
                    name="workstations"
                    value={formData.workstations}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-900 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Number of Workstations</option>
                    <option value="1">1</option>
                    <option value="2-5">2-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-20">11-20</option>
                    <option value="20+">20+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-orange-500 px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-semibold text-white hover:bg-orange-600 transition-colors mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
