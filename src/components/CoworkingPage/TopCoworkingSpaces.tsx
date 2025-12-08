import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { City } from "@/data/cities";
import { workspaces, Workspace } from "@/app/(main)/coworking/[city]/data/workspaces";
import { getBadgeColor } from "./utils";

interface TopCoworkingSpacesProps {
  topCities: City[];
}

export default function TopCoworkingSpaces({ topCities }: TopCoworkingSpacesProps) {
  return (
    <section id="top-spaces" className="bg-white py-10 lg:py-12">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Top Coworking Spaces in USA
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Discover premium coworking spaces in America's most vibrant cities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCities.map((city) => {
            const cityWorkspaces = workspaces.filter(ws => ws.city === city.name);
            const topWorkspace = cityWorkspaces.sort((a, b) => b.rating - a.rating)[0];
            
            return (
              <Link
                key={city.slug}
                href={`/coworking/${city.slug}`}
                className="group relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image with Opacity Overlay */}
                <div className="absolute inset-0">
                  {topWorkspace ? (
                    <>
                      <Image
                        src={topWorkspace.image}
                        alt={city.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/85 group-hover:via-black/60 transition-all duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                    </div>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 text-white">
                  {/* Top Section - Badge */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold font-body">{city.name}</span>
                    </div>
                  </div>

                  {/* Bottom Section - Details Split Left & Right */}
                  <div className="flex items-end justify-between gap-3">
                    {/* Left Side */}
                    <div className="flex-1">
                      {topWorkspace && (
                        <>
                          <h3 className="text-xl md:text-2xl font-bold mb-1 font-display">{city.name}</h3>
                          <p className="text-xs md:text-sm text-white/90 font-body mb-1.5">{topWorkspace.area}</p>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs md:text-sm font-bold">{topWorkspace.rating}</span>
                            <span className="text-xs text-white/80 font-body">({topWorkspace.reviewCount})</span>
                          </div>
                          <p className="text-xs text-white/80 font-body">
                            {cityWorkspaces.length} workspace{cityWorkspaces.length !== 1 ? 's' : ''}
                          </p>
                        </>
                      )}
                      {!topWorkspace && (
                        <>
                          <h3 className="text-xl md:text-2xl font-bold mb-1 font-display">{city.name}</h3>
                          <p className="text-xs text-white/80 font-body">
                            {cityWorkspaces.length} workspace{cityWorkspaces.length !== 1 ? 's' : ''} available
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
