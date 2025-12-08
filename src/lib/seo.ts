import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  nofollow?: boolean;
  city?: string;
  workspaceType?: string;
}

/**
 * Generate comprehensive SEO metadata for pages
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = "/assets/cowork.jpg",
    ogType = "website",
    noindex = false,
    nofollow = false,
    city,
    workspaceType,
  } = config;

  const metadataBase = new URL("https://www.coworkspace.com");
  const fullTitle = title.includes("CoworkSpace") ? title : `${title} | CoworkSpace`;
  const canonicalUrl = canonical 
    ? new URL(canonical, metadataBase).toString()
    : metadataBase.toString();

  // Build keywords array
  const defaultKeywords = [
    "coworking space",
    "workspace solutions",
    "office space",
    "flexible workspace",
    "business workspace",
  ];

  if (city) {
    defaultKeywords.push(`coworking ${city.toLowerCase()}`);
    defaultKeywords.push(`workspace ${city.toLowerCase()}`);
  }

  if (workspaceType) {
    defaultKeywords.push(workspaceType.toLowerCase());
  }

  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "CoworkSpace",
      images: [
        {
          url: new URL(ogImage, metadataBase).toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [new URL(ogImage, metadataBase).toString()],
      creator: "@coworkspace",
      site: "@coworkspace",
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // yahoo: "your-yahoo-verification-code",
    },
  };
}

/**
 * Generate JSON-LD structured data for workspace listings
 */
export function generateWorkspaceStructuredData(
  city: string,
  workspaceType: string,
  count: number = 0
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `CoworkSpace - ${workspaceType} in ${city}`,
    description: `Find the best ${workspaceType.toLowerCase()} options in ${city}. Flexible workspace solutions for businesses and professionals.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: count > 0 ? count.toString() : "50",
    },
    offers: {
      "@type": "AggregateOffer",
      offerCount: count.toString(),
      priceRange: "$$",
    },
  };
}

/**
 * Generate JSON-LD structured data for the home page
 */
export function generateHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CoworkSpace",
    description: "Modern workspace solutions for businesses and professionals",
    url: "https://www.coworkspace.com",
    logo: "https://www.coworkspace.com/assets/logo.png",
    sameAs: [
      // Add your social media profiles here
      // "https://www.facebook.com/coworkspace",
      // "https://www.twitter.com/coworkspace",
      // "https://www.linkedin.com/company/coworkspace",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English"],
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
