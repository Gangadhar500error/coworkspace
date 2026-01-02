/**
 * Customers Data
 * 
 * This file contains mock customer data for both admin and manager dashboards.
 * 
 * BACKEND INTEGRATION NOTES:
 * - Replace mockCustomers with API call to fetch customers
 * - Customer stats (totalBookings, totalSpent, lastBookingDate) are calculated dynamically from bookings
 * - Property filtering: Customers are linked to properties through bookings (see bookings.ts)
 * - Customer matching: Uses workspace type + city to match customers to properties
 * 
 * API ENDPOINTS EXPECTED:
 * - GET /api/customers - Fetch all customers
 * - GET /api/customers?propertyId={id} - Fetch customers for a specific property
 * - GET /api/customers/{id} - Fetch single customer details
 * 
 * DATA STRUCTURE:
 * - Customer interface defined in types/customer.ts
 * - Customer stats calculated from bookings data (see bookings.ts helpers)
 */

import { Customer } from "../types/customer";

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234-567-8900",
    image: "https://ui-avatars.com/api/?name=John+Smith&background=FF5A22&color=fff&size=128",
    status: "active",
    joinDate: "2024-01-10",
    location: "Downtown",
    city: "New York",
    totalBookings: 5,
    totalSpent: 2475,
    lastBookingDate: "2024-02-15",
    preferredWorkspaceType: "Coworking",
    notes: "Regular customer, prefers morning slots",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234-567-8902",
    image: "https://ui-avatars.com/api/?name=Emily+Davis&background=6366f1&color=fff&size=128",
    status: "active",
    joinDate: "2024-01-15",
    location: "Tech District",
    city: "San Francisco",
    totalBookings: 3,
    totalSpent: 11340,
    lastBookingDate: "2024-04-20",
    preferredWorkspaceType: "Private Office",
    notes: "Long-term client, needs dedicated space",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 234-567-8904",
    image: "https://ui-avatars.com/api/?name=Michael+Brown&background=10b981&color=fff&size=128",
    status: "active",
    joinDate: "2024-01-18",
    location: "Business Park",
    city: "Chicago",
    totalBookings: 8,
    totalSpent: 2400,
    lastBookingDate: "2024-03-10",
    preferredWorkspaceType: "Meeting Room",
    notes: "Frequent meeting room bookings",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 234-567-8906",
    image: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=ec4899&color=fff&size=128",
    status: "active",
    joinDate: "2024-01-22",
    location: "Financial District",
    city: "Boston",
    totalBookings: 2,
    totalSpent: 1100,
    lastBookingDate: "2024-02-28",
    preferredWorkspaceType: "Virtual Office",
    notes: "Virtual office subscription",
  },
  {
    id: 5,
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "+1 234-567-8908",
    image: "https://ui-avatars.com/api/?name=David+Martinez&background=f59e0b&color=fff&size=128",
    status: "pending",
    joinDate: "2024-02-01",
    location: "Midtown",
    city: "New York",
    totalBookings: 1,
    totalSpent: 495,
    lastBookingDate: "2024-02-05",
    preferredWorkspaceType: "Coworking",
    notes: "New customer, needs verification",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    phone: "+1 234-567-8910",
    image: "https://ui-avatars.com/api/?name=Jessica+Taylor&background=8b5cf6&color=fff&size=128",
    status: "active",
    joinDate: "2024-02-05",
    location: "Silicon Valley",
    city: "San Jose",
    totalBookings: 4,
    totalSpent: 3200,
    lastBookingDate: "2024-03-25",
    preferredWorkspaceType: "Private Office",
    notes: "Tech startup founder",
  },
  {
    id: 7,
    name: "Robert Anderson",
    email: "robert.anderson@example.com",
    phone: "+1 234-567-8912",
    image: "https://ui-avatars.com/api/?name=Robert+Anderson&background=ef4444&color=fff&size=128",
    status: "inactive",
    joinDate: "2023-12-15",
    location: "Downtown",
    city: "Seattle",
    totalBookings: 2,
    totalSpent: 990,
    lastBookingDate: "2024-01-20",
    preferredWorkspaceType: "Coworking",
    notes: "No recent activity",
  },
  {
    id: 8,
    name: "Lisa Garcia",
    email: "lisa.garcia@example.com",
    phone: "+1 234-567-8914",
    image: "https://ui-avatars.com/api/?name=Lisa+Garcia&background=06b6d4&color=fff&size=128",
    status: "active",
    joinDate: "2024-02-10",
    location: "Arts District",
    city: "Los Angeles",
    totalBookings: 6,
    totalSpent: 1800,
    lastBookingDate: "2024-04-01",
    preferredWorkspaceType: "Meeting Room",
    notes: "Creative agency, regular bookings",
  },
  {
    id: 9,
    name: "James White",
    email: "james.white@example.com",
    phone: "+1 234-567-8916",
    image: "https://ui-avatars.com/api/?name=James+White&background=84cc16&color=fff&size=128",
    status: "active",
    joinDate: "2024-02-15",
    location: "Financial Center",
    city: "Miami",
    totalBookings: 3,
    totalSpent: 1650,
    lastBookingDate: "2024-03-20",
    preferredWorkspaceType: "Virtual Office",
    notes: "Remote worker, needs business address",
  },
  {
    id: 10,
    name: "Amanda Lee",
    email: "amanda.lee@example.com",
    phone: "+1 234-567-8918",
    image: "https://ui-avatars.com/api/?name=Amanda+Lee&background=a855f7&color=fff&size=128",
    status: "active",
    joinDate: "2024-02-20",
    location: "University Area",
    city: "Austin",
    totalBookings: 7,
    totalSpent: 2100,
    lastBookingDate: "2024-04-10",
    preferredWorkspaceType: "Coworking",
    notes: "Student entrepreneur, flexible schedule",
  },
  {
    id: 11,
    name: "Christopher Harris",
    email: "christopher.harris@example.com",
    phone: "+1 234-567-8920",
    image: "https://ui-avatars.com/api/?name=Christopher+Harris&background=f97316&color=fff&size=128",
    status: "pending",
    joinDate: "2024-03-01",
    location: "Tech Hub",
    city: "Denver",
    totalBookings: 1,
    totalSpent: 450,
    lastBookingDate: "2024-03-05",
    preferredWorkspaceType: "Coworking",
    notes: "Awaiting payment confirmation",
  },
  {
    id: 12,
    name: "Michelle Clark",
    email: "michelle.clark@example.com",
    phone: "+1 234-567-8922",
    image: "https://ui-avatars.com/api/?name=Michelle+Clark&background=14b8a6&color=fff&size=128",
    status: "active",
    joinDate: "2024-03-05",
    location: "Business District",
    city: "Portland",
    totalBookings: 4,
    totalSpent: 2400,
    lastBookingDate: "2024-04-15",
    preferredWorkspaceType: "Private Office",
    notes: "Consultant, needs quiet space",
  },
];

// Helper function to filter customers
export const filterCustomers = (customers: Customer[], searchTerm: string): Customer[] => {
  if (!searchTerm) return customers;
  
  const term = searchTerm.toLowerCase();
  return customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.toLowerCase().includes(term) ||
      customer.city?.toLowerCase().includes(term) ||
      customer.location?.toLowerCase().includes(term)
  );
};

