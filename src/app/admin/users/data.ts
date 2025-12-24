// Mock Users Data
import { User } from "./types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234-567-8900",
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=FF5A22&color=fff&size=128",
    status: "active",
    role: "user",
    city: "New York",
    joinedDate: "2024-01-15",
    lastActive: "2 hours ago",
    totalBookings: 12,
    totalSpent: 3450,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234-567-8901",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff&size=128",
    status: "active",
    role: "host",
    city: "Los Angeles",
    joinedDate: "2023-11-20",
    lastActive: "1 day ago",
    totalBookings: 0,
    totalSpent: 0,
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 234-567-8902",
    avatar: "https://ui-avatars.com/api/?name=Mike+Chen&background=10b981&color=fff&size=128",
    status: "active",
    role: "user",
    city: "Chicago",
    joinedDate: "2024-02-10",
    lastActive: "30 minutes ago",
    totalBookings: 5,
    totalSpent: 1200,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234-567-8903",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=ec4899&color=fff&size=128",
    status: "pending",
    role: "user",
    city: "San Francisco",
    joinedDate: "2024-03-01",
    lastActive: "Never",
    totalBookings: 0,
    totalSpent: 0,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 234-567-8904",
    avatar: "https://ui-avatars.com/api/?name=David+Wilson&background=f59e0b&color=fff&size=128",
    status: "active",
    role: "manager",
    city: "Miami",
    joinedDate: "2023-09-15",
    lastActive: "5 hours ago",
    totalBookings: 0,
    totalSpent: 0,
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 234-567-8905",
    avatar: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=8b5cf6&color=fff&size=128",
    status: "active",
    role: "user",
    city: "Seattle",
    joinedDate: "2024-01-25",
    lastActive: "1 hour ago",
    totalBookings: 8,
    totalSpent: 2100,
  },
  {
    id: 7,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+1 234-567-8906",
    avatar: "https://ui-avatars.com/api/?name=Robert+Brown&background=ef4444&color=fff&size=128",
    status: "inactive",
    role: "user",
    city: "Boston",
    joinedDate: "2023-12-10",
    lastActive: "2 weeks ago",
    totalBookings: 3,
    totalSpent: 750,
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "+1 234-567-8907",
    avatar: "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=14b8a6&color=fff&size=128",
    status: "active",
    role: "host",
    city: "Austin",
    joinedDate: "2023-10-05",
    lastActive: "3 days ago",
    totalBookings: 0,
    totalSpent: 0,
  },
  {
    id: 9,
    name: "Michael Taylor",
    email: "michael.t@example.com",
    phone: "+1 234-567-8908",
    avatar: "https://ui-avatars.com/api/?name=Michael+Taylor&background=a855f7&color=fff&size=128",
    status: "active",
    role: "user",
    city: "Denver",
    joinedDate: "2024-02-20",
    lastActive: "15 minutes ago",
    totalBookings: 15,
    totalSpent: 4200,
  },
  {
    id: 10,
    name: "Amanda White",
    email: "amanda.w@example.com",
    phone: "+1 234-567-8909",
    avatar: "https://ui-avatars.com/api/?name=Amanda+White&background=f97316&color=fff&size=128",
    status: "pending",
    role: "user",
    city: "Portland",
    joinedDate: "2024-03-05",
    lastActive: "Never",
    totalBookings: 0,
    totalSpent: 0,
  },
  {
    id: 11,
    name: "James Harris",
    email: "james.h@example.com",
    phone: "+1 234-567-8910",
    avatar: "https://ui-avatars.com/api/?name=James+Harris&background=06b6d4&color=fff&size=128",
    status: "active",
    role: "user",
    city: "Phoenix",
    joinedDate: "2024-01-08",
    lastActive: "45 minutes ago",
    totalBookings: 7,
    totalSpent: 1800,
  },
  {
    id: 12,
    name: "Patricia Clark",
    email: "patricia.c@example.com",
    phone: "+1 234-567-8911",
    avatar: "https://ui-avatars.com/api/?name=Patricia+Clark&background=e11d48&color=fff&size=128",
    status: "active",
    role: "user",
    city: "Nashville",
    joinedDate: "2024-02-15",
    lastActive: "2 hours ago",
    totalBookings: 4,
    totalSpent: 950,
  },
];

// Helper functions
export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) return users;
  
  const term = searchTerm.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.city.toLowerCase().includes(term)
  );
};

export const filterByStatus = (users: User[], status: User["status"]): User[] => {
  if (!status) return users;
  return users.filter((user) => user.status === status);
};

export const filterByRole = (users: User[], role: User["role"]): User[] => {
  if (!role) return users;
  return users.filter((user) => user.role === role);
};

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

