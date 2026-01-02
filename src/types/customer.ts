/**
 * Customer Type Definition
 * Represents a customer in the manager's system
 */

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  image?: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  location?: string;
  city?: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate?: string;
  preferredWorkspaceType?: "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office";
  notes?: string;
}

