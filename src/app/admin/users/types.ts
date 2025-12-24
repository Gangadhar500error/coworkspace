// User Types

export type UserStatus = "active" | "inactive" | "pending";
export type UserRole = "admin" | "user" | "host" | "manager";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: UserStatus;
  role: UserRole;
  city: string;
  joinedDate: string;
  lastActive: string;
  totalBookings: number;
  totalSpent: number;
}

