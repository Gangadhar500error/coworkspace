import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Workspace } from "@/app/(main)/coworking/[city]/data/workspaces";
import { getBadgeColor } from "./utils";

interface CityWorkspacesProps {
  city: string;
  cityWorkspaces: Workspace[];
}

export default function CityWorkspaces({ city, cityWorkspaces }: CityWorkspacesProps) {
  if (cityWorkspaces.length === 0) return null;

  return (
    <section className="bg-gray-50 py-10 lg:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-display">
            Coworking Spaces in {city}
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Explore premium workspaces in {city} designed for productivity and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityWorkspaces.map((workspace) => (
            <Link
              key={workspace.id}
              href={`/coworking/${city.toLowerCase().replace(" ", "-")}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={workspace.image}
                  alt={workspace.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {workspace.badge && (
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold z-20 ${getBadgeColor(workspace.badge)}`}>
                    {workspace.badge}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 font-display">{workspace.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-body">{workspace.area}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{workspace.rating}</span>
                  <span className="text-sm text-gray-500 font-body">({workspace.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {workspace.amenities.slice(0, 2).map((amenity) => (
                    <span key={amenity} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-body">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-900 font-display">${workspace.price}<span className="text-sm text-gray-600 font-body">/mo</span></span>
                  <span className="text-sm text-orange-600 font-semibold font-body group-hover:underline">
                    view details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
