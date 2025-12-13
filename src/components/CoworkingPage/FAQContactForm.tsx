"use client";

import { ChevronDown } from "lucide-react";
import { allCities } from "@/data/cities";

interface FAQContactFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    city: string;
    message: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFormSubmit: (e: React.FormEvent) => void;
}

export default function FAQContactForm({
  formData,
  onFormChange,
  onFormSubmit,
}: FAQContactFormProps) {
  const faqs = [
    {
      q: "what is coworking?",
      a: "Coworking is a shared workspace model where individuals and teams from different companies work together in a common space. It offers flexibility, community, and access to professional amenities without the commitment of a traditional office lease.",
    },
    {
      q: "do you offer day passes?",
      a: "Yes! We offer flexible day passes for those who need workspace access on an occasional basis. Day passes include full access to all amenities, high-speed WiFi, meeting rooms, and community areas for one full day.",
    },
    {
      q: "can i upgrade later?",
      a: "Absolutely! You can upgrade your membership at any time. We'll prorate the difference and make the transition seamless. Whether you start with a day pass and want to move to a dedicated desk, or upgrade from hot desk to private office, we make it easy.",
    },
    {
      q: "do you offer private offices?",
      a: "Yes, we offer private office spaces for teams and individuals who need dedicated, lockable workspace. Private offices include all amenities, 24/7 access, and can accommodate teams from 1 to 20+ people. Contact us for availability and pricing.",
    },
  ];

  return (
    <section id="contact" className="bg-white py-8 md:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Column - FAQ */}
          <div className="flex flex-col h-full">
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-display">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-600 font-body">
                Get answers to common questions about our coworking spaces.
              </p>
            </div>
            <div className="space-y-4 flex-1">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md hover:border-orange-300 transition-all">
                  <div className="px-4 py-3 bg-orange-50/30 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 font-body text-sm">{faq.q}</h3>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-gray-700 font-body leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col h-full">
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-display">
                Need Help Finding a Space?
              </h2>
              <p className="text-sm text-gray-600 font-body">We're here to guide you.</p>
            </div>

            <form onSubmit={onFormSubmit} className="bg-gray-50 rounded-lg shadow-md p-5 flex flex-col h-full">
              <div className="space-y-4 flex-1">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1.5 font-body">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={onFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-body bg-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5 font-body">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-body bg-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1.5 font-body">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={onFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-body bg-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="formCity" className="block text-xs font-medium text-gray-700 mb-1.5 font-body">
                    City
                  </label>
                  <div className="relative">
                    <select
                      id="formCity"
                      name="city"
                      value={formData.city}
                      onChange={onFormChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-body appearance-none cursor-pointer bg-white text-sm"
                      required
                    >
                      <option value="">Select a City</option>
                      {allCities.map((city) => (
                        <option key={city.slug} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1.5 font-body">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={onFormChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-body bg-white text-sm resize-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors font-body text-sm shadow-sm"
                >
                  Request Callback
                </button>

                <div className="pt-3 border-t border-gray-200 text-center text-xs text-gray-600 font-body">
                  <p>Phone: <a href="tel:+18139221406" className="text-orange-600 hover:underline font-medium">+1 813-922-1406</a></p>
                  <p className="mt-1">Email: <a href="mailto:info@coworkspaces.us" className="text-orange-600 hover:underline font-medium">info@coworkspaces.us</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
