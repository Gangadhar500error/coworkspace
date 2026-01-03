"use client";

import Image from "next/image";

const citySpaces = [
  {
    id: 1,
    city: "Tampa",
    subtitle: "Business Hub of Florida",
    image: "/assets/cowork.jpg",
  },
  {
    id: 2,
    city: "Orlando",
    subtitle: "Innovation Capital",
    image: "/assets/medium-shot-people-working-together-office_23-2149345228.jpg",
  },
  {
    id: 3,
    city: "Miami",
    subtitle: "Coastal Business Center",
    image: "/assets/monthly.webp",
  },
  {
    id: 4,
    city: "Atlanta",
    subtitle: "Southern Business Hub",
    image: "/assets/privateoffice.jpg",
  },
  {
    id: 5,
    city: "Jacksonville",
    subtitle: "Growing Tech Scene",
    image: "/assets/eventspace.webp",
  },
  {
    id: 6,
    city: "New York",
    subtitle: "Financial Capital",
    image: "/assets/cowork.jpg",
  },
  {
    id: 7,
    city: "Los Angeles",
    subtitle: "Creative Industries Hub",
    image: "/assets/medium-shot-people-working-together-office_23-2149345228.jpg",
  },
  {
    id: 8,
    city: "Chicago",
    subtitle: "Midwest Business Center",
    image: "/assets/monthly.webp",
  },
];

export default function SpacesSection() {
  return (
    <section className="relative w-full bg-white pb-5 lg:py-10 overflow-hidden">
      <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight font-display inline-block">
              <span className="relative z-10">Top Coworking Spaces in USA</span>
          </h2>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {citySpaces.map((space) => (
            <div
              key={space.id}
              className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-44 sm:h-48 md:h-56 lg:h-64">
                <Image
                  src={space.image}
                  alt={`Coworking space in ${space.city}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1 md:mb-1.5 font-display">
                    {space.city}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/95 font-body">
                    {space.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
