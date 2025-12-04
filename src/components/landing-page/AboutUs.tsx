"use client";

import {
  Receipt,
  FileCheck,
  Cog,
  MapPin,
  Tags,
  TrendingUp,
} from "lucide-react";
import WorkspaceSearch from "../WorkspaceSearch";

const features = [
  {
    icon: Receipt,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Billing",
    description:
      "Streamlined billing system with automated invoicing and multiple payment options for hassle-free transactions.",
  },
  {
    icon: FileCheck,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Documentation",
    description:
      "Complete documentation support for all your business needs including contracts, agreements, and legal paperwork.",
  },
  {
    icon: Cog,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Operations",
    description:
      "Efficient operations management ensuring smooth day-to-day functioning of your workspace and facilities.",
  },
  {
    icon: MapPin,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Property",
    description:
      "Premium properties in prime locations across the USA with modern infrastructure and professional amenities.",
  },
  {
    icon: Tags,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Uniform Pricing",
    description:
      "Transparent and consistent pricing across all locations. No hidden fees, single invoice for all services.",
  },
  {
    icon: TrendingUp,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Speedy Expansion",
    description:
      "Rapid expansion capabilities to scale your business quickly across multiple cities with minimal setup time.",
  },
];

export default function AboutUs() {
  return (
    <section className="w-full bg-white py-10 lg:py-12">
      <div className="container-custom px-4 md:px-6 lg:px-8">
        {/* Search Component */}
        <WorkspaceSearch />

        {/* Single Row - 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 hover:border-yellow-500 hover:shadow-md transition-all duration-300 text-start"
              >
                <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className={`h-6 w-6 ${feature.iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 inline-block border-b-2 border-gray-500 pb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
