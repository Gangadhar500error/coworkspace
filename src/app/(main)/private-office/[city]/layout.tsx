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
    title: `Private Offices in ${city} | Dedicated Office Space for Rent`,
    description: `Find private office spaces in ${city} for your business. Fully furnished, lockable offices with modern amenities, flexible lease terms, and prime locations. Perfect for teams and growing businesses.`,
    keywords: [
      `private office ${city.toLowerCase()}`,
      `dedicated office ${city.toLowerCase()}`,
      `office space rental ${city.toLowerCase()}`,
      `lockable office ${city.toLowerCase()}`,
      "private office space",
      "dedicated office space",
      "office rental",
      "business office space",
    ],
    canonical: `/private-office/${citySlug}`,
    city,
    workspaceType: "Private Office",
  });
}

export default function PrivateOfficeCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
