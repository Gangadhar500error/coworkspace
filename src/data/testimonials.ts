/**
 * Testimonials Data
 */

import { Testimonial } from "../types/testimonial";

export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    designation: "CEO",
    company: "Tech Innovations Inc.",
    rating: 5,
    content: "Excellent coworking space with great amenities and a professional environment. The staff is very helpful and the facilities are top-notch. Highly recommended!",
    propertyId: 301,
    propertyName: "Downtown Business Hub",
    isFeatured: true,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    designation: "Marketing Director",
    company: "Creative Solutions",
    rating: 5,
    content: "The best coworking space I've ever used. The meeting rooms are well-equipped and the community is amazing. Perfect for networking!",
    propertyId: 302,
    propertyName: "Tech Innovation Center",
    isFeatured: true,
    isActive: true,
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "Freelance Developer",
    company: "Independent",
    rating: 4,
    content: "Great value for money. The workspace is clean, modern, and has everything I need. The WiFi is fast and reliable.",
    propertyId: 305,
    propertyName: "Creative Co-working Space",
    isFeatured: false,
    isActive: true,
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-02-10T09:00:00Z",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Startup Founder",
    company: "Innovate Labs",
    rating: 5,
    content: "Perfect space for our startup. The private office options are excellent and the support staff is always available. Love the community events!",
    propertyId: 307,
    propertyName: "Executive Private Suite",
    isFeatured: true,
    isActive: true,
    createdAt: "2024-02-15T14:00:00Z",
    updatedAt: "2024-02-15T14:00:00Z",
  },
  {
    id: 5,
    name: "David Brown",
    designation: "Consultant",
    company: "Business Advisory Group",
    rating: 4,
    content: "Professional environment with excellent facilities. The virtual office service is perfect for my needs. Highly satisfied!",
    propertyId: 304,
    propertyName: "Virtual Business Address",
    isFeatured: false,
    isActive: true,
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    designation: "Project Manager",
    company: "Global Solutions",
    rating: 5,
    content: "Outstanding meeting room facilities. The video conferencing equipment is state-of-the-art. Our clients are always impressed!",
    propertyId: 303,
    propertyName: "Executive Meeting Suite",
    isFeatured: true,
    isActive: true,
    createdAt: "2024-03-01T12:00:00Z",
    updatedAt: "2024-03-01T12:00:00Z",
  },
  {
    id: 7,
    name: "Robert Wilson",
    designation: "Entrepreneur",
    company: "Startup Ventures",
    rating: 4,
    content: "Great coworking space with a vibrant community. The amenities are excellent and the location is perfect. Would definitely recommend!",
    propertyId: 306,
    propertyName: "Metro Co-working Hub",
    isFeatured: false,
    isActive: true,
    createdAt: "2024-03-05T15:00:00Z",
    updatedAt: "2024-03-05T15:00:00Z",
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    designation: "Designer",
    company: "Creative Studio",
    rating: 5,
    content: "Beautiful workspace with inspiring design. The creative atmosphere is perfect for my work. Love the coffee and networking events!",
    propertyId: 310,
    propertyName: "Startup Co-working Space",
    isFeatured: false,
    isActive: true,
    createdAt: "2024-03-10T11:00:00Z",
    updatedAt: "2024-03-10T11:00:00Z",
  },
];

export const filterTestimonials = (
  testimonials: Testimonial[],
  searchTerm: string,
  filters?: {
    isFeatured?: string;
    isActive?: string;
    rating?: string;
  }
): Testimonial[] => {
  let filtered = testimonials;
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (testimonial) =>
        testimonial.name.toLowerCase().includes(term) ||
        testimonial.company?.toLowerCase().includes(term) ||
        testimonial.propertyName?.toLowerCase().includes(term) ||
        testimonial.content.toLowerCase().includes(term)
    );
  }
  
  if (filters) {
    if (filters.isFeatured === "featured") {
      filtered = filtered.filter((testimonial) => testimonial.isFeatured === true);
    } else if (filters.isFeatured === "not-featured") {
      filtered = filtered.filter((testimonial) => testimonial.isFeatured === false);
    }
    
    if (filters.isActive === "active") {
      filtered = filtered.filter((testimonial) => testimonial.isActive === true);
    } else if (filters.isActive === "inactive") {
      filtered = filtered.filter((testimonial) => testimonial.isActive === false);
    }
    
    if (filters.rating) {
      const ratingNum = parseInt(filters.rating);
      filtered = filtered.filter((testimonial) => testimonial.rating === ratingNum);
    }
  }
  
  return filtered;
};

