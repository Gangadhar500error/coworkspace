/**
 * Amenities Data
 */

import { Amenity } from "../types/amenity";

export const mockAmenities: Amenity[] = [
  {
    id: 1,
    name: "High-Speed WiFi",
    icon: "wifi",
    category: "tech",
    description: "Ultra-fast internet connection for seamless work",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Printing & Scanning",
    icon: "printer",
    category: "basic",
    description: "Professional printing and scanning services",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Coffee & Tea",
    icon: "coffee",
    category: "food",
    description: "Complimentary premium coffee and tea",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Meeting Rooms",
    icon: "users",
    category: "premium",
    description: "Fully equipped meeting and conference rooms",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 5,
    name: "Parking",
    icon: "car",
    category: "basic",
    description: "Secure parking facilities",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 6,
    name: "24/7 Access",
    icon: "clock",
    category: "premium",
    description: "Round-the-clock access to workspace",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 7,
    name: "Kitchen Facilities",
    icon: "utensils",
    category: "food",
    description: "Fully equipped kitchen with refrigerator and microwave",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 8,
    name: "Video Conferencing",
    icon: "video",
    category: "tech",
    description: "State-of-the-art video conferencing equipment",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 9,
    name: "Security System",
    icon: "shield",
    category: "security",
    description: "24/7 security monitoring and access control",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 10,
    name: "Fitness Center",
    icon: "dumbbell",
    category: "wellness",
    description: "On-site gym and fitness facilities",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 11,
    name: "Mail Handling",
    icon: "mail",
    category: "basic",
    description: "Professional mail and package handling",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 12,
    name: "Phone Booths",
    icon: "phone",
    category: "premium",
    description: "Private phone booths for calls",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 13,
    name: "Event Space",
    icon: "calendar",
    category: "premium",
    description: "Dedicated space for events and networking",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 14,
    name: "Reception Service",
    icon: "user-check",
    category: "premium",
    description: "Professional reception and concierge services",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 15,
    name: "Yoga Studio",
    icon: "heart",
    category: "wellness",
    description: "Dedicated yoga and meditation space",
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
];

export const filterAmenities = (
  amenities: Amenity[],
  searchTerm: string,
  filters?: {
    category?: string;
    isActive?: string;
  }
): Amenity[] => {
  let filtered = amenities;
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (amenity) =>
        amenity.name.toLowerCase().includes(term) ||
        amenity.description?.toLowerCase().includes(term) ||
        amenity.category.toLowerCase().includes(term)
    );
  }
  
  if (filters) {
    if (filters.category) {
      filtered = filtered.filter((amenity) => amenity.category === filters.category);
    }
    
    if (filters.isActive === "active") {
      filtered = filtered.filter((amenity) => amenity.isActive === true);
    } else if (filters.isActive === "inactive") {
      filtered = filtered.filter((amenity) => amenity.isActive === false);
    }
  }
  
  return filtered;
};

