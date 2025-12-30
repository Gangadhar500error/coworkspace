/**
 * Customer Property Type Definitions
 * Complete property structure for customer dashboard
 * Backend-ready data structure
 */

export type CustomerPropertyStatus = "active" | "inactive" | "pending" | "draft";
export type WorkspaceType = "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office";

export interface CustomerProperty {
  id: number;
  propertyName: string;
  workspaceType: WorkspaceType;
  location: string;
  city: string;
  state: string;
  fullAddress: string;
  pincode?: string;
  status: CustomerPropertyStatus;
  verificationStatus: "approved" | "pending" | "rejected";
  coverImage?: string;
  galleryImages?: string[];
  totalBookings: number;
  totalRevenue: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  featuredProperty: boolean;
  // Pricing info
  startingPrice: number;
  currency: string;
  // Detailed pricing (optional, for detail page)
  pricing?: {
    daily?: number;
    weekly?: number;
    monthly?: number;
    yearly?: number;
    hourly?: number;
    halfDay?: number;
    fullDay?: number;
  };
  // Quick stats
  views: number;
  inquiries: number;
  // Contact
  contactEmail: string;
  contactPhone: string;
  contactPersonName?: string;
  // Additional details
  description?: string;
  shortDescription?: string;
  amenities?: string[];
  // Type-specific details
  capacity?: number;
  seats?: number;
  // Working hours
  openingTime?: string;
  closingTime?: string;
  available24x7?: boolean;
  // SEO
  slug?: string;
}

