"use client";

import { useTheme } from "./_components/ThemeProvider";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Calendar,
  Clock,
  ArrowUpRight,
  BarChart3,
  Activity
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isDarkMode } = useTheme();

  const stats = [
    { label: "Total Students", value: "2,847", change: "+12.5%", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Active Courses", value: "142", change: "+5.2%", icon: BookOpen, color: "from-purple-500 to-pink-500" },
    { label: "Completion Rate", value: "78.4%", change: "+8.1%", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Certificates", value: "1,231", change: "+15.3%", icon: Award, color: "from-orange-500 to-red-500" },
  ];

  const recentActivity = [
    { id: 1, title: "New student enrolled in Web Development", time: "2m ago", type: "enrollment" },
    { id: 2, title: "Course 'React Advanced' completed", time: "15m ago", type: "completion" },
    { id: 3, title: "Payment received for Premium Plan", time: "1h ago", type: "payment" },
    { id: 4, title: "New assignment submitted", time: "2h ago", type: "submission" },
    { id: 5, title: "Instructor added new course material", time: "3h ago", type: "material" },
  ];

  const upcomingEvents = [
    { title: "Web Development Live Session", date: "Today", time: "2:00 PM", type: "live" },
    { title: "Assignment Deadline: React Basics", date: "Tomorrow", time: "11:59 PM", type: "deadline" },
    { title: "Monthly Progress Review", date: "Dec 25", time: "10:00 AM", type: "review" },
  ];

  return (
    <div className="py-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>
            Dashboard Overview
          </h1>
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Welcome back! Here's what's happening with your LMS today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"} border ${isDarkMode ? "border-gray-700" : "border-gray-200"} shadow-sm`}>
            <Calendar className="w-4 h-4 inline mr-2" />
            This Week
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-semibold flex items-center gap-1 ${
                  stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                }`}>
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              
              <div>
                <p className={`text-sm mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                <p className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
              </div>

              {/* Animated progress bar */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} transition-all duration-1000`} style={{ width: `${Math.min(parseFloat(stat.change.replace(/[^0-9.]/g, '')), 100)}%` }} />
            </div>
          );
        })}
      </div>

      {/* Charts and Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className={`lg:col-span-2 rounded-2xl p-6 transition-all duration-300 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Learning Progress</h2>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>Last 30 days</span>
            </div>
          </div>
          
          {/* Simple bar chart visualization */}
          <div className="space-y-4">
            {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, idx) => (
              <div key={week} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{week}</span>
                  <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{75 + idx * 5}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <div 
                    className={`h-full bg-gradient-to-r from-[#FF5A22] to-[#7E22CE] rounded-full transition-all duration-1000`}
                    style={{ width: `${75 + idx * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-2xl p-6 transition-all duration-300 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-2 mb-6">
            <Activity className={`w-5 h-5 ${isDarkMode ? "text-[#FF5A22]" : "text-[#FF5A22]"}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div
                key={activity.id}
                className={`p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <p className={`text-sm font-medium mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {activity.title}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className={`w-3 h-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className={`rounded-2xl p-6 transition-all duration-300 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className={`w-5 h-5 ${isDarkMode ? "text-[#7E22CE]" : "text-[#7E22CE]"}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Upcoming Events</h2>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
                  event.type === "live" ? `border-[#FF5A22]/30 ${isDarkMode ? "bg-[#FF5A22]/5" : "bg-[#FF5A22]/5"}` :
                  event.type === "deadline" ? `border-red-500/30 ${isDarkMode ? "bg-red-500/5" : "bg-red-500/5"}` :
                  `${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{event.title}</h3>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.type === "live" ? "bg-[#FF5A22]/10 text-[#FF5A22]" :
                    event.type === "deadline" ? "bg-red-500/10 text-red-500" :
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-2xl p-6 transition-all duration-300 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, label: "Add Course", color: "from-blue-500 to-cyan-500" },
              { icon: Users, label: "Manage Students", color: "from-purple-500 to-pink-500" },
              { icon: BookOpen, label: "View Reports", color: "from-green-500 to-emerald-500" },
              { icon: Award, label: "Issue Certificate", color: "from-orange-500 to-red-500" },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className={`group p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isDarkMode ? "border-gray-800 hover:border-gray-700 bg-gray-800/50" : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.color} mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={`rounded-2xl p-6 transition-all duration-300 ${isDarkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Performance Metrics</h2>
          <BarChart3 className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Avg. Course Completion", value: "82%", trend: "+5%" },
            { label: "Student Engagement", value: "91%", trend: "+12%" },
            { label: "Instructor Rating", value: "4.8/5", trend: "+0.3" },
          ].map((metric, idx) => (
            <div
              key={metric.label}
              className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <p className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{metric.value}</p>
                <span className="text-green-500 text-sm font-semibold">{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
