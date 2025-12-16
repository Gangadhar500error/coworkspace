"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./_components/ThemeProvider";
import { 
  Building2, 
  MapPin, 
  Users, 
  DollarSign,
  Calendar,
  Clock,
  ArrowUpRight,
  Activity,
  UserPlus,
  Plus,
  Bell,
  ChevronDown,
  ExternalLink
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isDarkMode } = useTheme();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    spaces: true,
    users: true,
    bookings: true,
    activity: true,
  });

  const toggleCard = (cardKey: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  // Key Statistics
  const stats = [
    { 
      label: "Total Spaces", 
      value: "142", 
      change: "+8.2%", 
      icon: Building2, 
      color: "from-[#FF5A22] to-[#FF8C42]",
      description: "Active locations"
    },
    { 
      label: "Cities Covered", 
      value: "28", 
      change: "+3 new", 
      icon: MapPin, 
      color: "from-[#7E22CE] to-[#A855F7]",
      description: "US cities"
    },
    { 
      label: "Active Members", 
      value: "3,847", 
      change: "+12.5%", 
      icon: Users, 
      color: "from-blue-500 to-cyan-500",
      description: "Current members"
    },
    { 
      label: "Monthly Revenue", 
      value: "$284.7K", 
      change: "+18.3%", 
      icon: DollarSign, 
      color: "from-green-500 to-emerald-500",
      description: "This month"
    },
  ];


  // Recent Bookings
  const recentBookings = [
    { id: 1, customer: "Sarah Johnson", space: "NYC - Private Office #12", type: "Private Office", date: "Today", time: "2:00 PM", status: "confirmed" },
    { id: 2, customer: "TechStart Inc.", space: "SF - Meeting Room A", type: "Meeting Room", date: "Today", time: "3:30 PM", status: "confirmed" },
    { id: 3, customer: "Michael Chen", space: "LA - Hot Desk #45", type: "Coworking", date: "Tomorrow", time: "9:00 AM", status: "pending" },
    { id: 4, customer: "Design Co.", space: "Chicago - Virtual Office", type: "Virtual Office", date: "Dec 20", time: "10:00 AM", status: "confirmed" },
    { id: 5, customer: "Emma Williams", space: "Miami - Private Office #8", type: "Private Office", date: "Dec 21", time: "11:00 AM", status: "pending" },
  ];

  // Recent Activity
  const recentActivity = [
    { id: 1, title: "New member joined in New York City", time: "5m ago", type: "member" },
    { id: 2, title: "Booking confirmed for Private Office in San Francisco", time: "12m ago", type: "booking" },
    { id: 3, title: "Monthly payment received from TechStart Inc.", time: "1h ago", type: "payment" },
    { id: 4, title: "New space added in Boston", time: "2h ago", type: "space" },
    { id: 5, title: "Meeting room booking cancelled in Chicago", time: "3h ago", type: "cancellation" },
  ];

  // Recent Added Spaces
  const recentSpaces = [
    { id: 1, name: "Downtown Coworking Space", city: "New York", type: "Coworking", addedDate: "2 days ago", status: "active" },
    { id: 2, name: "Tech Hub Private Office", city: "San Francisco", type: "Private Office", addedDate: "5 days ago", status: "active" },
    { id: 3, name: "Business Center Meeting Room", city: "Chicago", type: "Meeting Room", addedDate: "1 week ago", status: "active" },
    { id: 4, name: "Virtual Office Suite", city: "Los Angeles", type: "Virtual Office", addedDate: "1 week ago", status: "active" },
    { id: 5, name: "Creative Space", city: "Miami", type: "Coworking", addedDate: "2 weeks ago", status: "active" },
  ];

  // Recent Users
  const recentUsers = [
    { id: 1, name: "John Smith", email: "john.smith@email.com", city: "New York", joinDate: "Today", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com", city: "San Francisco", joinDate: "Yesterday", status: "active" },
    { id: 3, name: "Michael Chen", email: "m.chen@email.com", city: "Los Angeles", joinDate: "2 days ago", status: "active" },
    { id: 4, name: "Emily Davis", email: "emily.d@email.com", city: "Chicago", joinDate: "3 days ago", status: "active" },
  ];

  return (
    <div className="py-4 space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
            Coworking Space Dashboard
          </h1>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your coworking spaces across 28 US cities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"} border ${isDarkMode ? "border-gray-700" : "border-gray-200"} flex items-center gap-1.5`}>
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </button>
          <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"} border ${isDarkMode ? "border-gray-700" : "border-gray-200"} flex items-center gap-1.5`}>
            <Calendar className="w-3.5 h-3.5" />
            This Month
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`group relative overflow-hidden rounded-lg p-4 transition-all ${
                isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
              }`}
            >
              <div className="relative flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-1 ${
                  stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              
              <div>
                <p className={`text-xs mb-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Added Spaces and Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Added Spaces */}
        <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className={`w-4 h-4 text-[#FF5A22]`} />
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Added Spaces</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/property-listings"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? "bg-[#FF5A22]/10 text-[#FF5A22] hover:bg-[#FF5A22]/20 border border-[#FF5A22]/30" 
                      : "bg-[#FF5A22]/5 text-[#FF5A22] hover:bg-[#FF5A22]/10 border border-[#FF5A22]/20"
                  }`}
                >
                  View All
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => toggleCard("spaces")}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isDarkMode ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label={expandedCards.spaces ? "Collapse" : "Expand"}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedCards.spaces ? "" : "-rotate-90"}`} />
                </button>
              </div>
            </div>
          </div>
          
          <AnimatePresence initial={false}>
            {expandedCards.spaces && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2">
                  {recentSpaces.map((space, idx) => (
                    <motion.div
                      key={space.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className={`p-3 rounded-lg border ${
                        isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{space.name}</h3>
                          <div className="flex items-center gap-2 text-xs mt-0.5">
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {space.city}
                            </span>
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>•</span>
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{space.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            space.status === "active" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-gray-500/10 text-gray-500"
                          }`}>
                            {space.status}
                          </span>
                          <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{space.addedDate}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Users */}
        <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className={`w-4 h-4 text-[#7E22CE]`} />
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Users</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/users"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? "bg-[#7E22CE]/10 text-[#7E22CE] hover:bg-[#7E22CE]/20 border border-[#7E22CE]/30" 
                      : "bg-[#7E22CE]/5 text-[#7E22CE] hover:bg-[#7E22CE]/10 border border-[#7E22CE]/20"
                  }`}
                >
                  View All
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => toggleCard("users")}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isDarkMode ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label={expandedCards.users ? "Collapse" : "Expand"}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedCards.users ? "" : "-rotate-90"}`} />
                </button>
              </div>
            </div>
          </div>
          
          <AnimatePresence initial={false}>
            {expandedCards.users && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2">
                  {recentUsers.map((user, idx) => (
                    <motion.div
                      key={user.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className={`p-3 rounded-lg border ${
                        isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{user.name}</h3>
                          <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{user.email}</p>
                          <div className="flex items-center gap-2 text-xs mt-0.5">
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {user.city}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            user.status === "active" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-gray-500/10 text-gray-500"
                          }`}>
                            {user.status}
                          </span>
                          <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{user.joinDate}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Recent Bookings and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Bookings */}
        <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 text-[#7E22CE]`} />
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Bookings</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/bookings"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? "bg-[#7E22CE]/10 text-[#7E22CE] hover:bg-[#7E22CE]/20 border border-[#7E22CE]/30" 
                      : "bg-[#7E22CE]/5 text-[#7E22CE] hover:bg-[#7E22CE]/10 border border-[#7E22CE]/20"
                  }`}
                >
                  View All
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => toggleCard("bookings")}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isDarkMode ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label={expandedCards.bookings ? "Collapse" : "Expand"}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedCards.bookings ? "" : "-rotate-90"}`} />
                </button>
              </div>
            </div>
          </div>
          
          <AnimatePresence initial={false}>
            {expandedCards.bookings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2">
                  {recentBookings.map((booking, idx) => (
                    <motion.div
                      key={booking.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className={`p-3 rounded-lg border ${
                        booking.status === "confirmed" 
                          ? `border-green-500/30 ${isDarkMode ? "bg-green-500/5" : "bg-green-50"}` 
                          : `border-yellow-500/30 ${isDarkMode ? "bg-yellow-500/5" : "bg-yellow-50"}`
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{booking.customer}</h3>
                          <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{booking.space}</p>
                          <div className="flex items-center gap-2 text-xs mt-0.5">
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {booking.date}
                            </span>
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>•</span>
                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{booking.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            booking.status === "confirmed" 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {booking.status}
                          </span>
                          <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{booking.type}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-lg border overflow-hidden ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className={`w-4 h-4 text-[#FF5A22]`} />
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Activity</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? "bg-[#FF5A22]/10 text-[#FF5A22] hover:bg-[#FF5A22]/20 border border-[#FF5A22]/30" 
                      : "bg-[#FF5A22]/5 text-[#FF5A22] hover:bg-[#FF5A22]/10 border border-[#FF5A22]/20"
                  }`}
                >
                  View All
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => toggleCard("activity")}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isDarkMode ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label={expandedCards.activity ? "Collapse" : "Expand"}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedCards.activity ? "" : "-rotate-90"}`} />
                </button>
              </div>
            </div>
          </div>
          
          <AnimatePresence initial={false}>
            {expandedCards.activity && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2">
                  {recentActivity.map((activity, idx) => (
                    <motion.div
                      key={activity.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className={`p-2.5 rounded-lg border transition-colors duration-200 ${
                        isDarkMode ? "border-gray-800 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className={`w-3 h-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                        <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
