/**
 * Customer Bookings Data
 * Mock data for customer's own bookings
 * This data structure is optimized for customer-facing views
 * Can be easily replaced with API calls later
 */

export interface CustomerBooking {
  id: number;
  property: string;
  location: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
  type: "Coworking" | "Meeting Room" | "Private Office" | "Virtual Office";
  bookingId: string;
}

export const customerBookings: CustomerBooking[] = [
  {
    id: 1,
    property: "Downtown Cowork Space",
    location: "New York, NY",
    date: "2024-01-15",
    time: "9:00 AM - 5:00 PM",
    status: "confirmed",
    amount: "$150",
    type: "Coworking",
    bookingId: "BK-2024-001",
  },
  {
    id: 2,
    property: "Meeting Room A",
    location: "San Francisco, CA",
    date: "2024-01-16",
    time: "2:00 PM - 4:00 PM",
    status: "pending",
    amount: "$80",
    type: "Meeting Room",
    bookingId: "BK-2024-002",
  },
  {
    id: 3,
    property: "Private Office Suite",
    location: "Los Angeles, CA",
    date: "2024-01-17",
    time: "Full Day",
    status: "confirmed",
    amount: "$200",
    type: "Private Office",
    bookingId: "BK-2024-003",
  },
  {
    id: 4,
    property: "Virtual Office Premium",
    location: "Chicago, IL",
    date: "2024-01-18",
    time: "Monthly",
    status: "confirmed",
    amount: "$120",
    type: "Virtual Office",
    bookingId: "BK-2024-004",
  },
  {
    id: 5,
    property: "Tech Hub Workspace",
    location: "Austin, TX",
    date: "2024-01-19",
    time: "9:00 AM - 6:00 PM",
    status: "confirmed",
    amount: "$175",
    type: "Coworking",
    bookingId: "BK-2024-005",
  },
  {
    id: 6,
    property: "Executive Conference Room",
    location: "Boston, MA",
    date: "2024-01-20",
    time: "10:00 AM - 12:00 PM",
    status: "pending",
    amount: "$95",
    type: "Meeting Room",
    bookingId: "BK-2024-006",
  },
  {
    id: 7,
    property: "Premium Private Office",
    location: "Seattle, WA",
    date: "2024-01-21",
    time: "Full Day",
    status: "confirmed",
    amount: "$250",
    type: "Private Office",
    bookingId: "BK-2024-007",
  },
  {
    id: 8,
    property: "Business Center Virtual",
    location: "Miami, FL",
    date: "2024-01-22",
    time: "Monthly",
    status: "confirmed",
    amount: "$140",
    type: "Virtual Office",
    bookingId: "BK-2024-008",
  },
  {
    id: 9,
    property: "Creative Space CoWork",
    location: "Portland, OR",
    date: "2024-01-23",
    time: "9:00 AM - 5:00 PM",
    status: "confirmed",
    amount: "$160",
    type: "Coworking",
    bookingId: "BK-2024-009",
  },
  {
    id: 10,
    property: "Boardroom Elite",
    location: "Denver, CO",
    date: "2024-01-24",
    time: "3:00 PM - 5:00 PM",
    status: "pending",
    amount: "$110",
    type: "Meeting Room",
    bookingId: "BK-2024-010",
  },
];

/**
 * Filter customer bookings by search term, status, and type
 */
export const filterCustomerBookings = (
  bookings: CustomerBooking[],
  searchTerm: string,
  statusFilter: string,
  typeFilter: string
): CustomerBooking[] => {
  return bookings.filter((booking) => {
    const matchesSearch =
      booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    const matchesType = typeFilter === "all" || booking.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });
};

/**
 * Get booking by ID
 */
export const getCustomerBookingById = (id: number): CustomerBooking | undefined => {
  return customerBookings.find((booking) => booking.id === id);
};

/**
 * Get bookings by type
 */
export const getCustomerBookingsByType = (type: string): CustomerBooking[] => {
  if (type === "all") return customerBookings;
  return customerBookings.filter((booking) => booking.type === type);
};

/**
 * Get bookings by status
 */
export const getCustomerBookingsByStatus = (status: string): CustomerBooking[] => {
  if (status === "all") return customerBookings;
  return customerBookings.filter((booking) => booking.status === status);
};

