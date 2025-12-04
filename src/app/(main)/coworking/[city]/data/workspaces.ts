export interface Workspace {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  badge?: "Popular" | "Special Offer" | "Featured";
  price: number;
  image: string;
  amenities: string[];
  type: "Hot Desk" | "Dedicated Desk" | "Private Office" | "Meeting Room";
  description?: string;
}

export const workspaces: Workspace[] = [
  {
    id: "gw-infinitypark",
    name: "GoodWorks Cowork - Infinity Park",
    city: "New York",
    area: "Manhattan",
    rating: 4.7,
    reviewCount: 234,
    badge: "Popular",
    price: 499,
    image: "/assets/cowork.jpg",
    amenities: ["WiFi", "24/7 Access", "Meeting Rooms", "Parking", "AC", "Pantry"],
    type: "Dedicated Desk",
    description: "Modern workspace in the heart of Manhattan with stunning city views."
  },
  {
    id: "gw-downtown",
    name: "GoodWorks Cowork - Downtown Hub",
    city: "New York",
    area: "Manhattan",
    rating: 4.5,
    reviewCount: 189,
    badge: "Special Offer",
    price: 299,
    image: "/assets/monthly.webp",
    amenities: ["WiFi", "Meeting Rooms", "AC", "Pantry"],
    type: "Hot Desk",
    description: "Affordable coworking space perfect for startups and freelancers."
  },
  {
    id: "gw-brooklyn",
    name: "GoodWorks Cowork - Brooklyn Heights",
    city: "New York",
    area: "Brooklyn",
    rating: 4.8,
    reviewCount: 312,
    badge: "Featured",
    price: 599,
    image: "/assets/privateoffice.jpg",
    amenities: ["WiFi", "24/7 Access", "Meeting Rooms", "Parking", "AC", "Pantry"],
    type: "Private Office",
    description: "Premium private offices with dedicated meeting spaces."
  },
  {
    id: "gw-queens",
    name: "GoodWorks Cowork - Queens Plaza",
    city: "New York",
    area: "Queens",
    rating: 4.3,
    reviewCount: 156,
    price: 399,
    image: "/assets/eventspace.webp",
    amenities: ["WiFi", "Meeting Rooms", "AC", "Pantry"],
    type: "Dedicated Desk",
    description: "Spacious coworking environment with modern amenities."
  },
  {
    id: "gw-chelsea",
    name: "GoodWorks Cowork - Chelsea",
    city: "New York",
    area: "Manhattan",
    rating: 4.6,
    reviewCount: 278,
    badge: "Popular",
    price: 549,
    image: "/assets/cowork.jpg",
    amenities: ["WiFi", "24/7 Access", "Meeting Rooms", "Parking", "AC"],
    type: "Private Office",
    description: "Elegant workspace in trendy Chelsea neighborhood."
  },
  {
    id: "gw-astoria",
    name: "GoodWorks Cowork - Astoria",
    city: "New York",
    area: "Queens",
    rating: 4.4,
    reviewCount: 145,
    price: 349,
    image: "/assets/monthly.webp",
    amenities: ["WiFi", "AC", "Pantry"],
    type: "Hot Desk",
    description: "Budget-friendly coworking space with essential amenities."
  },
  {
    id: "gw-williamsburg",
    name: "GoodWorks Cowork - Williamsburg",
    city: "New York",
    area: "Brooklyn",
    rating: 4.9,
    reviewCount: 421,
    badge: "Featured",
    price: 649,
    image: "/assets/privateoffice.jpg",
    amenities: ["WiFi", "24/7 Access", "Meeting Rooms", "Parking", "AC", "Pantry"],
    type: "Private Office",
    description: "Luxury coworking space with premium facilities."
  },
  {
    id: "gw-upper-east",
    name: "GoodWorks Cowork - Upper East Side",
    city: "New York",
    area: "Manhattan",
    rating: 4.2,
    reviewCount: 198,
    badge: "Special Offer",
    price: 449,
    image: "/assets/eventspace.webp",
    amenities: ["WiFi", "Meeting Rooms", "AC", "Pantry"],
    type: "Dedicated Desk",
    description: "Sophisticated workspace in prestigious Upper East Side."
  },
  {
    id: "gw-greenpoint",
    name: "GoodWorks Cowork - Greenpoint",
    city: "New York",
    area: "Brooklyn",
    rating: 4.5,
    reviewCount: 167,
    price: 379,
    image: "/assets/cowork.jpg",
    amenities: ["WiFi", "24/7 Access", "AC", "Pantry"],
    type: "Hot Desk",
    description: "Creative space perfect for artists and designers."
  },
  {
    id: "gw-midtown",
    name: "GoodWorks Cowork - Midtown",
    city: "New York",
    area: "Manhattan",
    rating: 4.7,
    reviewCount: 356,
    badge: "Popular",
    price: 599,
    image: "/assets/monthly.webp",
    amenities: ["WiFi", "24/7 Access", "Meeting Rooms", "Parking", "AC", "Pantry"],
    type: "Private Office",
    description: "Central location with easy access to transportation."
  },
  {
    id: "gw-long-island",
    name: "GoodWorks Cowork - Long Island City",
    city: "New York",
    area: "Queens",
    rating: 4.1,
    reviewCount: 123,
    price: 329,
    image: "/assets/privateoffice.jpg",
    amenities: ["WiFi", "AC", "Pantry"],
    type: "Hot Desk",
    description: "Affordable option with great connectivity."
  },
  {
    id: "gw-dumbo",
    name: "GoodWorks Cowork - DUMBO",
    city: "New York",
    area: "Brooklyn",
    rating: 4.8,
    reviewCount: 289,
    badge: "Featured",
    price: 699,
    image: "/assets/eventspace.webp",
    amenities: ["WiFi", "24/7 Access", "Meeting Rooms", "Parking", "AC", "Pantry"],
    type: "Private Office",
    description: "Premium waterfront location with stunning views."
  }
];

// Helper function to get unique areas for a city
export const getAreasByCity = (city: string): string[] => {
  const areas = workspaces
    .filter(ws => ws.city.toLowerCase() === city.toLowerCase())
    .map(ws => ws.area);
  return Array.from(new Set(areas));
};

// Helper function to get workspaces by city
export const getWorkspacesByCity = (city: string): Workspace[] => {
  return workspaces.filter(ws => ws.city.toLowerCase() === city.toLowerCase());
};
