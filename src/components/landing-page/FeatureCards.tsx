import Image from "next/image";

// Card data structure
export interface FeatureCard {
  id: number;
  heading: string;
  paragraph: string;
  image: string;
  linkText: string;
  linkHref: string;
}

const featureCards: FeatureCard[] = [
  {
    id: 1,
    heading: "Coworking",
    paragraph: "Flexible workspace solutions for individuals and teams seeking a productive environment.",
    image: "/assets/medium-shot-people-working-together-office_23-2149345228.jpg",
    linkText: "Explore →",
    linkHref: "/coworking"
  },
  {
    id: 2,
    heading: "Dedicated Desk",
    paragraph: "Your own personal workspace in a shared environment with all amenities included.",
    image: "/assets/cowork.jpg",
    linkText: "Explore →",
    linkHref: "#"
  },
  {
    id: 3,
    heading: "Private Office",
    paragraph: "Enjoy privacy, comfort, and focus in your own modern dedicated office workspace.",
    image: "/assets/privateoffice.jpg",
    linkText: "Explore →",
    linkHref: "/private-office"
  },
  {
    id: 4,
    heading: "Virtual Office",
    paragraph: "Get a professional business address and mail handling services for your business.",
    image: "/assets/eventspace.webp",
    linkText: "Explore →",
    linkHref: "/virtual-office"
  },
  {
    id: 5,
    heading: "Meeting Rooms",
    paragraph: "Book professional meeting rooms equipped with everything you need for successful meetings.",
    image: "/assets/monthly.webp",
    linkText: "Explore →",
    linkHref: "/meeting-room"
  },
  {
    id: 6,
    heading: "Event/Training Space",
    paragraph: "Host workshops, seminars, training sessions, and networking events in our versatile spaces.",
    image: "/assets/eventspace.webp",
    linkText: "Explore →",
    linkHref: "#"
  }
];

export default function FeatureCards() {
  return (
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
  );
}

