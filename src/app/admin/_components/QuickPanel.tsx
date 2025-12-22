"use client";

import {
  X,
  Building2,
  Users,
  Briefcase,
  CreditCard,
  Clock,
  BarChart3,
  TrendingUp,
  Zap,
  FileText,
  MapPin,
  Settings,
} from "lucide-react";

interface QuickPanelProps {
  isOpen: boolean;
  isVisible: boolean;
  isDarkMode: boolean;
  onClose: () => void;
}

export default function QuickPanel({ isOpen, isVisible, isDarkMode, onClose }: QuickPanelProps) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[89] bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 right-0 w-full max-w-md border-l z-[90] shadow-xl transform transition-transform duration-300 ease-out ${
          isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        } ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className={`h-16 px-4 border-b flex items-center justify-between ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
          <h3 className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Panel</h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100"}`}
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Quick Actions</h4>
              <div className="space-y-2">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors border ${isDarkMode ? "border-gray-800 hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-700"}`}>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-[#FF5A22]/10 text-[#FF5A22]" : "bg-[#FF5A22]/10 text-[#FF5A22]"}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Manage Spaces</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>View all cowork spaces</p>
                  </div>
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors border ${isDarkMode ? "border-gray-800 hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-700"}`}>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/10 text-blue-600"}`}>
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Members</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Manage members & teams</p>
                  </div>
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors border ${isDarkMode ? "border-gray-800 hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-700"}`}>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-green-500/10 text-green-400" : "bg-green-500/10 text-green-600"}`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Bookings</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>View reservations</p>
                  </div>
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors border ${isDarkMode ? "border-gray-800 hover:bg-gray-800 text-white" : "border-gray-200 hover:bg-gray-50 text-gray-700"}`}>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-purple-500/10 text-purple-600"}`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Payments</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Transactions & invoices</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Recent Activity</h4>
              <div className={`space-y-2 rounded-lg border p-3 ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md ${isDarkMode ? "bg-green-500/10" : "bg-green-500/10"}`}>
                    <Clock className={`w-3.5 h-3.5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>New booking received</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md ${isDarkMode ? "bg-blue-500/10" : "bg-blue-500/10"}`}>
                    <Users className={`w-3.5 h-3.5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Member joined</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md ${isDarkMode ? "bg-purple-500/10" : "bg-purple-500/10"}`}>
                    <CreditCard className={`w-3.5 h-3.5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Payment processed</p>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Today's Stats</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className={`p-3 rounded-lg border ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Bookings</p>
                  </div>
                  <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>24</p>
                </div>
                <div className={`p-3 rounded-lg border ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Revenue</p>
                  </div>
                  <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>₹12.5K</p>
                </div>
                <div className={`p-3 rounded-lg border ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Active</p>
                  </div>
                  <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>18</p>
                </div>
                <div className={`p-3 rounded-lg border ${isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className={`w-4 h-4 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                    <p className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Spaces</p>
                  </div>
                  <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>8</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Quick Links</h4>
              <div className="space-y-1">
                <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                  <FileText className="w-4 h-4" />
                  Reports & Analytics
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                  <MapPin className="w-4 h-4" />
                  Locations
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                  <Settings className="w-4 h-4" />
                  Workspace Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

