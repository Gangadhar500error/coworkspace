// Virtual Office Cards Data Structure
// This file demonstrates the data structure backend developers should follow
// Backend API should return virtual office listings for each city

import { VirtualOfficeCardData } from "../components/VirtualOfficeCard";

// Example data structure - Backend should return similar format
// API Endpoint: GET /virtual-offices?city={city_slug}
// Note: City names should match formatted city names (e.g., "New York", "Los Angeles", "Hyderabad")
export const virtualOfficeCardsByCity: Record<string, VirtualOfficeCardData[]> = {
  "Hyderabad": [
    {
      id: "1",
      name: "Smartworks Purva Summit",
      rating: 4.2,
      location: "Hitec City, Hyderabad",
      image: "/assets/cowork.jpg",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours"],
      services: [
        { name: "Business Address", price: "₹999 /month" },
        { name: "Tax Registration", price: "₹2,499 /month" },
        { name: "Company Registration", price: "₹1,099 /month" },
      ],
      badge: "Popular",
    },
    {
      id: "2",
      name: "WeWork Cyber Towers",
      rating: 4.5,
      location: "Gachibowli, Hyderabad",
      image: "/assets/eventspace.webp",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours", "Mail Forwarding"],
      services: [
        { name: "Business Address", price: "₹1,299 /month" },
        { name: "Tax Registration", price: "₹2,999 /month" },
        { name: "Company Registration", price: "₹1,499 /month" },
      ],
      badge: "Featured",
    },
    {
      id: "3",
      name: "Regus Hitech City",
      rating: 4.3,
      location: "Madhapur, Hyderabad",
      image: "/assets/monthly.webp",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours"],
      services: [
        { name: "Business Address", price: "₹899 /month" },
        { name: "Tax Registration", price: "₹2,199 /month" },
        { name: "Company Registration", price: "₹999 /month" },
      ],
    },
    {
      id: "4",
      name: "Awfis Space Solutions",
      rating: 4.4,
      location: "Banjara Hills, Hyderabad",
      image: "/assets/privateoffice.jpg",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours", "24/7 Support"],
      services: [
        { name: "Business Address", price: "₹1,199 /month" },
        { name: "Tax Registration", price: "₹2,799 /month" },
        { name: "Company Registration", price: "₹1,299 /month" },
      ],
      badge: "New",
    },
    {
      id: "5",
      name: "IndiQube Tech Park",
      rating: 4.6,
      location: "Financial District, Hyderabad",
      image: "/assets/cowork.jpg",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours", "Premium Support"],
      services: [
        { name: "Business Address", price: "₹1,499 /month" },
        { name: "Tax Registration", price: "₹3,299 /month" },
        { name: "Company Registration", price: "₹1,599 /month" },
      ],
      badge: "Best Value",
    },
    {
      id: "6",
      name: "91Springboard Hub",
      rating: 4.1,
      location: "Kondapur, Hyderabad",
      image: "/assets/eventspace.webp",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours"],
      services: [
        { name: "Business Address", price: "₹799 /month" },
        { name: "Tax Registration", price: "₹1,999 /month" },
        { name: "Company Registration", price: "₹899 /month" },
      ],
    },
  ],
  "New York": [
    {
      id: "7",
      name: "WeWork Times Square",
      rating: 4.7,
      location: "Times Square, New York",
      image: "/assets/cowork.jpg",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours", "Premium Support"],
      services: [
        { name: "Business Address", price: "$299 /month" },
        { name: "Tax Registration", price: "$499 /month" },
        { name: "Company Registration", price: "$399 /month" },
      ],
      badge: "Featured",
    },
    {
      id: "8",
      name: "Regus Manhattan",
      rating: 4.5,
      location: "Manhattan, New York",
      image: "/assets/eventspace.webp",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours"],
      services: [
        { name: "Business Address", price: "$249 /month" },
        { name: "Tax Registration", price: "$449 /month" },
        { name: "Company Registration", price: "$349 /month" },
      ],
      badge: "Popular",
    },
  ],
  "Los Angeles": [
    {
      id: "9",
      name: "WeWork Beverly Hills",
      rating: 4.6,
      location: "Beverly Hills, Los Angeles",
      image: "/assets/monthly.webp",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours", "Mail Forwarding"],
      services: [
        { name: "Business Address", price: "$279 /month" },
        { name: "Tax Registration", price: "$479 /month" },
        { name: "Company Registration", price: "$379 /month" },
      ],
      badge: "Featured",
    },
  ],
  "Chicago": [],
  "Miami": [],
  "San Francisco": [],
  "Boston": [],
  "Seattle": [],
  "Dallas": [],
  "Houston": [],
  "Atlanta": [],
  "Phoenix": [],
  "Philadelphia": [],
  "San Diego": [],
  "Denver": [],
  "Washington DC": [],
  "Tampa": [],
  "Orlando": [],
  "Las Vegas": [],
};

// Helper function to get virtual offices for a city
// In production, this would call the API: GET /virtual-offices?city={city_slug}
export function getVirtualOfficesByCity(cityName: string): VirtualOfficeCardData[] {
  return virtualOfficeCardsByCity[cityName] || [];
}
