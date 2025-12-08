import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = params.city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateSEOMetadata({
    title: `Meeting Rooms in ${city} | Book Professional Meeting Spaces`,
    description: `Book professional meeting rooms in ${city} for your business needs. Fully equipped spaces with video conferencing, projectors, whiteboards, and modern amenities. Hourly and daily bookings available.`,
    keywords: [
      `meeting rooms ${city.toLowerCase()}`,
      `conference rooms ${city.toLowerCase()}`,
      `business meeting space ${city.toLowerCase()}`,
      `video conferencing ${city.toLowerCase()}`,
      "meeting room rental",
      "conference room booking",
      "professional meeting space",
    ],
    canonical: `/meeting-room/${params.city}`,
    city,
    workspaceType: "Meeting Rooms",
  });
}

export default function MeetingRoomCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
