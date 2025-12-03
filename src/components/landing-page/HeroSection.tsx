"use client";

import Image from "next/image";

// Card data structure
const featureCards = [
  {
    id: 1,
    heading: "Single Day Passes",
    paragraph: "Find an open seat and get some work done without membership.",
    image: "/assets/medium-shot-people-working-together-office_23-2149345228.jpg",
    linkText: "Book Now →",
    linkHref: "#"
  },
  {
    id: 2,
    heading: "Meeting Rooms",
    paragraph: "Book professional meeting rooms equipped with everything you need.",
    image: "/assets/cowork.jpg",
    linkText: "Book Now →",
    linkHref: "#"
  },
  {
    id: 3,
    heading: "Monthly Memberships",
    paragraph: "Join our growing community and make CoworkSpace your work home.",
    image: "/assets/monthly.webp",
    linkText: "Join Today →",
    linkHref: "#"
  },
  {
    id: 4,
    heading: "Virtual Offices",
    paragraph: "Get a professional business address and mail handling for you.",
    image: "/assets/eventspace.webp",
    linkText: "Learn More →",
    linkHref: "#"
  },
  {
    id: 5,
    heading: "Private Offices",
    paragraph: "Enjoy privacy, comfort, and focus in your own modern dedicated office workspace..",
    image: "/assets/privateoffice.jpg",
    linkText: "View Spaces →",
    linkHref: "#"
  },
  {
    id: 6,
    heading: "Event Spaces",
    paragraph: "Host workshops, seminars, and networking events in our spaces.",
    image: "/assets/eventspace.webp",
    linkText: "Book Event →",
    linkHref: "#"
  }
];

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white py-12 md:py-10 lg:pt-24 lg:pb-14 overflow-hidden">
      {/* Dotted Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
        {/* Full Width Main Headline with Embedded Elements */}
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] font-display" style={{ fontFamily: "'Romana-Bold', 'Romana-Bold'" }}>
              {/* First Line */}
              <span className="block">
              <span className="text-gradient-animate">Future-Ready Work.</span>
                {/* First Decorative Element - Floating Image Card */}
                <span className="inline-block ml-3 md:ml-4 lg:ml-6 align-middle">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 transition-all duration-300 hover:scale-105 hover:-rotate-2">
                    {/* Shadow layer */}
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{ 
                        backgroundColor: '#F5E6D3',
                        transform: 'translate(4px, 4px)',
                        opacity: 0.3
                      }}
                    />
                    {/* Main card */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-xl">
                      <Image
                        src="/assets/cowork.jpg"
                        alt="Workspace"
                        fill
                        className="object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                    </div>
                  </div>
                </span>
                {/* Coworking Image - Irregular/Cloud shape - Enhanced */}
                <span className="inline-block ml-3 md:ml-4 lg:ml-6 align-middle">
                  <div className="relative w-24 h-20 md:w-36 md:h-28 lg:w-48 lg:h-36 xl:w-56 xl:h-44">
                    <div 
                      className="relative w-full h-full overflow-hidden shadow-2xl transition-transform hover:scale-105"
                      style={{
                        clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Image
                        src="/assets/coworking-space-design-03.jpg"
                        alt="Coworking space"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </span>
              </span>

              {/* Second Line - Cascading Overlapping Images */}
              <span className="block">
                <span className="inline-flex items-center align-middle ml-3 md:ml-4 lg:ml-6">
                  {/* Cascading Image Group */}
                  <span className="relative inline-flex items-center mr-2 md:mr-3 lg:mr-4">
                    {/* First Image - Largest, fully visible */}
                    <span className="relative z-30 inline-block w-12 h-16 md:w-16 md:h-20 lg:w-20 lg:h-26 xl:w-24 xl:h-32 transition-transform hover:scale-105">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50">
                        <Image
                          src="/assets/basil-speaking-705x571.jpg"
                          alt="Team member"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </span>
                    
                    {/* Second Image - Medium, overlaps first by half */}
                    <span className="relative z-20 inline-block -ml-6 md:-ml-8 lg:-ml-10 xl:-ml-12 w-11 h-15 md:w-15 md:h-19 lg:w-19 lg:h-25 xl:w-23 xl:h-31 transition-transform hover:scale-105">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50">
                        <Image
                          src="/assets/monthly.webp"
                          alt="Workspace"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </span>
                    
                    {/* Third Image - Smallest, overlaps second by half */}
                    <span className="relative z-10 inline-block -ml-6 md:-ml-8 lg:-ml-10 xl:-ml-12 w-10 h-14 md:w-14 md:h-18 lg:w-18 lg:h-24 xl:w-22 xl:h-30 transition-transform hover:scale-105">
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-2 ring-white/50">
                        <Image
                          src="/assets/cowork.jpg"
                          alt="Coworking"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </span>
                  </span>
                  
                  {/* Text - Right side of images */}
                  <span className="inline-block whitespace-nowrap align-middle text-gradient-animate">Human-Focused Spaces.</span>
                </span>
              </span>
            </h1>

        {/* Separator Line */}
        <div className="w-full border-t border-gray-300 my-10 md:my-12 lg:my-10"></div>

        {/* Six Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
          {featureCards.map((card) => (
            <div key={card.id} className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-2/5 h-48 md:h-28 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.heading}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="flex-1 p-0 flex flex-col justify-start">
                <h3 className="text-xl md:text-xl font-bold text-black mb-2 font-display">
                  {card.heading}
                </h3>
                <p className="text-gray-700 mb-0 text-[15px] leading-relaxed font-body">
                  {card.paragraph}{" "}
                  <a 
                    href={card.linkHref} 
                    className="text-[#4ECDC4] hover:text-[#3ab5ad] underline font-semibold text-xs transition-colors font-body inline"
                  >
                    {card.linkText}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
