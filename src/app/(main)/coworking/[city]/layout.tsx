import { Metadata } from "next";
import { generateSEOMetadata, generateWorkspaceStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo";

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
    title: `Coworking Spaces in ${city} | Flexible Workspace Solutions`,
    description: `Find the best coworking spaces, dedicated desks, and flexible workspace solutions in ${city}. Browse premium coworking spaces with modern amenities, flexible terms, and prime locations.`,
    keywords: [
      `coworking ${city.toLowerCase()}`,
      `workspace ${city.toLowerCase()}`,
      `shared office space ${city.toLowerCase()}`,
      `flexible workspace ${city.toLowerCase()}`,
      "dedicated desk",
      "hot desk",
      "coworking space",
    ],
    canonical: `/coworking/${citySlug}`,
    city,
    workspaceType: "Coworking Spaces",
  });
}

export default function CoworkingCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
