"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VirtualOfficeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const city = (params.city as string) || "";

  // Redirect back to virtual office listing page
  useEffect(() => {
    const formattedCity = city.toLowerCase().replace(/\s+/g, '-');
    router.replace(`/virtual-office/${formattedCity}`);
  }, [city, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
