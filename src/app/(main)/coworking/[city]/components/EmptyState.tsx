"use client";

import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchX className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
        No workspaces found
      </h3>
      <p className="text-gray-600 text-center max-w-md font-body">
        Try adjusting your filters to see more results. You can also clear all filters to start over.
      </p>
    </div>
  );
}
