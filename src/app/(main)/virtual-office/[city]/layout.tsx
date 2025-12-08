import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const citySlug = params?.city || "new-york";
  const city = citySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return generateSEOMetadata({
    title: `Virtual Office in ${city} | Professional Business Address & Mail Handling`,
    description: `Get a prestigious virtual office address in ${city} with mail handling, call forwarding, and business services. Perfect for remote businesses, startups, and entrepreneurs needing a professional presence.`,
    keywords: [
      `virtual office ${city.toLowerCase()}`,
      `business address ${city.toLowerCase()}`,
      `mail forwarding ${city.toLowerCase()}`,
      `virtual office services ${city.toLowerCase()}`,
      "virtual office address",
      "business mail handling",
      "virtual office space",
      "remote business address",
    ],
    canonical: `/virtual-office/${citySlug}`,
    city,
    workspaceType: "Virtual Office",
  });
}

export default function VirtualOfficeCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
