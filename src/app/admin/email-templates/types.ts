// Email Template Types

export type TemplateCategory = 
  | "Booking"
  | "Authentication"
  | "Communication"
  | "Payment"
  | "System";

export interface EmailTemplate {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  subject: string;
  description: string;
  body: string;
  variables: string[]; // Available variables like {{userName}}, {{bookingId}}, etc.
  isActive: boolean;
  lastModified: string;
  icon: string; // Icon name from lucide-react
}

