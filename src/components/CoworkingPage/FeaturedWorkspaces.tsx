import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Workspace } from "@/app/(main)/coworking/[city]/data/workspaces";
import { getBadgeColor } from "./utils";

interface FeaturedWorkspacesProps {
  featuredWorkspaces: Workspace[];
}

export default function FeaturedWorkspaces({ featuredWorkspaces }: FeaturedWorkspacesProps) {
  return (
    <section id="featured-workspaces" className="bg-white py-10 lg:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Featured Coworking Spaces
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Explore our top-rated coworking spaces across major US cities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorkspaces.map((workspace) => (
            <div key={workspace.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Image */}
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

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 font-display">
                  {workspace.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-body">{workspace.area}, {workspace.city}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">{workspace.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-body">
                    ({workspace.reviewCount} reviews)
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {workspace.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-body"
                    >
                      {amenity}
                    </span>
                  ))}
                  {workspace.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-body">
                      +{workspace.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 font-display">
                      ${workspace.price}
                    </span>
                    <span className="text-sm text-gray-600 font-body">/month</span>
                  </div>
                  <Link
                    href={`/coworking/${workspace.city.toLowerCase().replace(" ", "-")}`}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors font-body"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
