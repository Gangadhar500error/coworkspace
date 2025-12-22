/**
 * Properties Data
 * Centralized data file for properties
 * Can be easily replaced with API calls later
 */

import propertiesData from "./properties.json";
import { Property, generatePropertySlug } from "../types/property";

// Add slug to each property
export const mockProperties: Property[] = propertiesData.properties.map((property) => ({
  ...property,
  slug: generatePropertySlug(property.title),
}));

// Helper function to get property by ID
export const getPropertyById = (id: number): Property | undefined => {
  return mockProperties.find((property) => property.id === id);
};

// Helper function to get property by slug
export const getPropertyBySlug = (slug: string): Property | undefined => {
  return mockProperties.find((property) => property.slug === slug);
};

// Helper function to filter properties
export const filterProperties = (
  properties: Property[],
  searchTerm: string
): Property[] => {
  if (!searchTerm) return properties;
  
  const term = searchTerm.toLowerCase();
  return properties.filter(
    (property) =>
      property.title.toLowerCase().includes(term) ||
      property.description.toLowerCase().includes(term) ||
      property.address.toLowerCase().includes(term) ||
      property.city.toLowerCase().includes(term) ||
      property.propertyManagerName?.toLowerCase().includes(term) ||
      property.mlsNumber?.toLowerCase().includes(term)
  );
};

