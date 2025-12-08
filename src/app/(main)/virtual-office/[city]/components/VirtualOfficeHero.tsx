"use client";

import { useState } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { getLocationsByCity } from "../data/cityLocations";

interface VirtualOfficeHeroProps {
  cityName: string;
}

export default function VirtualOfficeHero({ cityName }: VirtualOfficeHeroProps) {
  const router = useRouter();
  const params = useParams();
  const citySlug = (params.city as string) || "new-york";
  
  // Get locations for the selected city
  const cityLocations = getLocationsByCity(citySlug);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    planType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      planType: "",
    });
  };

  const handleGetQuote = () => {
    // Scroll to virtual offices section or handle quote request
    const officesSection = document.getElementById("virtual-offices-section");
    if (officesSection) {
      officesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    "Business Address",
    "Tax Registration",
    "Company Registration",
    "Documents in 24 Hours",
  ];


  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 md:py-16 lg:py-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-display leading-tight mb-4">
                Virtual Office in{" "}
                <span className="text-orange-500">{cityName}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Get a prestigious business address, mail handling, and complete business registration services. 
                Start your business journey with professional virtual office solutions.
              </p>
            </div>

            {/* Features Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* Get Quote Button */}
            <div className="flex items-center gap-2">
            <button
              onClick={handleGetQuote}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Get Quote
            </button>

            {/* Mobile Number */}
            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-5 h-5 text-orange-500" />
              <a href="tel:+18139221406" className="text-gray-700 font-semibold hover:text-orange-500 transition-colors">
                +1 813-922-1406
              </a>
            </div>
            </div>
            {/* City Locations */}
            {cityLocations.length > 0 && (
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  Popular Areas in {cityName}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cityLocations.map((location) => (
                    <button
                      key={location.slug}
                      onClick={() => {
                        // TODO: Filter virtual offices by location/area
                        // This could be implemented as: /virtual-office/{city}?area={location-slug}
                        console.log("Filter by location:", location.slug);
                        // For now, just scroll to offices section
                        const officesSection = document.getElementById("virtual-offices-section");
                        if (officesSection) {
                          officesSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all"
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Booking Form */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-5 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-1">
                Book a Virtual Office
              </h2>
              <p className="text-xs text-gray-500 text-center mb-5">
                by Cowork Space
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Plan Type */}
                <div>
                  <select
                    name="planType"
                    value={formData.planType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                  >
                    <option value="">Select Plan Type</option>
                    <option value="basic">Basic Plan</option>
                    <option value="premium">Premium Plan</option>
                    <option value="enterprise">Enterprise Plan</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
