import Image from "next/image";
import Link from "next/link";
import { City } from "@/data/cities";

interface HeroSectionProps {
  topCities: City[];
}

export default function HeroSection({ topCities }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 lg:py-20 overflow-hidden">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-display leading-tight">
              Coworking Spaces in USA
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-body">
              Flexible workspace solutions for modern professionals and teams.
            </p>

            {/* City List - Direct Links */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-600 mb-4 font-body uppercase tracking-wide">Popular Cities</p>
              <div className="flex flex-wrap gap-3">
                {topCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/coworking/${city.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 hover:shadow-md transition-all duration-200 group"
                  >
                    <Image
                      src={city.image}
                      alt={city.name}
                      width={20}
                      height={20}
                      className="rounded object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 font-body">
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Image with Curved Corners */}
          <div className="order-1 lg:order-2 relative h-80 md:h-96 lg:h-[500px]">
            <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src="https://runningremote.com/wp-content/uploads/2019/12/ignited-coworking-space-la.png"
                alt="Coworking space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
