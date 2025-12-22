/**
 * Property Type Definitions
 * This file contains TypeScript interfaces for Property data structure
 * Used across the application for type safety
 */

export interface ConferenceRoom {
  name: string;
  availableSeats: number;
  pricePerHour: number;
  pricePerDay: number;
}

export interface OpenHours {
  monday?: { from: string; to: string };
  tuesday?: { from: string; to: string };
  wednesday?: { from: string; to: string };
  thursday?: { from: string; to: string };
  friday?: { from: string; to: string };
  saturday?: { from: string; to: string };
  sunday?: { from: string; to: string };
}

export interface Property {
  id: number;
  title: string;
  slug?: string;
  description: string;
  propertyType: "Residential" | "Commercial" | "Industrial" | "Land" | "Other" | "Cowork Space";
  listingType: "Sale" | "Rent" | "Lease";
  
  // Cowork Space Basic Details
  area?: number; // in sq.ft.
  isApproved?: boolean; // yes/no
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  
  // Workspace Types Available
  workspaceTypes?: {
    coworking?: boolean;
    meetingRooms?: boolean;
    virtualOffice?: boolean;
    privateOffice?: boolean;
  };
  
  // Workspace Counts
  numberOfPrivateOffices?: number;
  numberOfMeetingRooms?: number;
  
  // Workspace Pricing & Capacity
  conferenceRooms?: ConferenceRoom[];
  
  // Cowork Space Amenities
  coworkAmenities?: {
    highSpeedWifi?: boolean;
    projectorLed?: boolean;
    eventsWorkshops?: boolean;
    phoneBooth?: boolean;
    accessControl?: boolean;
    receptionDesk?: boolean;
    scannerPrinter?: boolean;
    cafeKitchen?: boolean;
    parking?: boolean;
    securitySystem?: boolean;
    mailService?: boolean;
    swimming?: boolean;
  };
  
  // Open Hours
  openHours?: OpenHours;
  
  // Contact Details
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  
  // Invoice Related Details
  companyName?: string;
  billingAddress?: string;
  
  // Property Details (for non-cowork spaces)
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  floors?: number;
  parkingSpaces?: number;
  
  // Pricing
  price: number;
  currency: string;
  pricePerSquareFoot?: number;
  monthlyRent?: number;
  deposit?: number;
  
  // Features & Amenities (legacy)
  amenities: string[];
  features: string[];
  
  // Media
  coverImage?: string; // Single cover image
  images: string[]; // Image gallery
  videos?: string[];
  virtualTour?: string;
  
  // Status & Management
  status: "Available" | "Sold" | "Rented" | "Pending" | "Off Market";
  propertyManagerId?: number;
  propertyManagerName?: string;
  
  // Additional Info
  mlsNumber?: string;
  listingDate?: string;
  availableDate?: string;
  tags?: string[];
  notes?: string;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  propertyType: "Residential" | "Commercial" | "Industrial" | "Land" | "Other" | "Cowork Space";
  listingType: "Sale" | "Rent" | "Lease";
  
  // Cowork Space Basic Details
  area: string;
  isApproved: string; // "yes" | "no"
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: string;
  longitude: string;
  
  // Workspace Types Available
  coworking: boolean;
  meetingRooms: boolean;
  virtualOffice: boolean;
  privateOffice: boolean;
  
  // Workspace Counts
  numberOfPrivateOffices: string;
  numberOfMeetingRooms: string;
  
  // Workspace Pricing & Capacity
  conferenceRooms: ConferenceRoom[];
  
  // Cowork Space Amenities
  highSpeedWifi: boolean;
  projectorLed: boolean;
  eventsWorkshops: boolean;
  phoneBooth: boolean;
  accessControl: boolean;
  receptionDesk: boolean;
  scannerPrinter: boolean;
  cafeKitchen: boolean;
  parking: boolean;
  securitySystem: boolean;
  mailService: boolean;
  swimming: boolean;
  
  // Open Hours
  mondayFrom: string;
  mondayTo: string;
  tuesdayFrom: string;
  tuesdayTo: string;
  wednesdayFrom: string;
  wednesdayTo: string;
  thursdayFrom: string;
  thursdayTo: string;
  fridayFrom: string;
  fridayTo: string;
  saturdayFrom: string;
  saturdayTo: string;
  sundayFrom: string;
  sundayTo: string;
  
  // Contact Details
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Invoice Related Details
  companyName: string;
  billingAddress: string;
  
  // Property Details (for non-cowork spaces)
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  lotSize: string;
  yearBuilt: string;
  floors: string;
  parkingSpaces: string;
  
  // Pricing
  price: string;
  currency: string;
  pricePerSquareFoot: string;
  monthlyRent: string;
  deposit: string;
  
  // Features & Amenities (legacy)
  amenities: string[];
  features: string[];
  
  // Media
  coverImage: File | null;
  images: File[];
  videos: string[];
  virtualTour: string;
  
  // Status & Management
  status: "Available" | "Sold" | "Rented" | "Pending" | "Off Market";
  propertyManagerId: string;
  
  // Additional Info
  mlsNumber: string;
  listingDate: string;
  availableDate: string;
  tags: string[];
  notes: string;
}

// Helper function to generate slug from title
export function generatePropertySlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

