/**
 * Properties Data
 * Centralized data file for properties
 * Can be easily replaced with API calls later
 */

import propertiesData from "./properties.json";
import { Property, generatePropertySlug, getStartingPrice } from "../types/property";

// Add slug to each property if not present
export const mockProperties: Property[] = propertiesData.properties.map((property) => ({
  ...property,
  slug: property.slug || generatePropertySlug(property.propertyName),
  workspaceType: property.workspaceType as Property["workspaceType"],
  propertyStatus: property.propertyStatus as Property["propertyStatus"],
  verificationStatus: property.verificationStatus as Property["verificationStatus"],
  featuredProperty: property.featuredProperty as Property["featuredProperty"],
  available24x7: property.available24x7 as Property["available24x7"],
  gstRegistered: property.gstRegistered as Property["gstRegistered"],
  amenities: {
    wifi: property.amenities.wifi as Property["amenities"]["wifi"],
    acNonAc: property.amenities.acNonAc as Property["amenities"]["acNonAc"],
    powerBackup: property.amenities.powerBackup as Property["amenities"]["powerBackup"],
    lift: property.amenities.lift as Property["amenities"]["lift"],
    parking: property.amenities.parking as Property["amenities"]["parking"],
    securityCctv: property.amenities.securityCctv as Property["amenities"]["securityCctv"],
    pantryCafeteria: property.amenities.pantryCafeteria as Property["amenities"]["pantryCafeteria"],
  },
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
      property.propertyName.toLowerCase().includes(term) ||
      property.shortDescription.toLowerCase().includes(term) ||
      property.detailedDescription.toLowerCase().includes(term) ||
      property.fullAddress.toLowerCase().includes(term) ||
      property.city.toLowerCase().includes(term) ||
      property.areaLocality.toLowerCase().includes(term) ||
      property.brandOperatorName.toLowerCase().includes(term) ||
      property.contactPersonName.toLowerCase().includes(term)
  );
};

// Helper function to filter by workspace type
export const filterByWorkspaceType = (
  properties: Property[],
  workspaceType: Property["workspaceType"]
): Property[] => {
  if (!workspaceType) return properties;
  return properties.filter((property) => property.workspaceType === workspaceType);
};

// Helper function to filter by status
export const filterByStatus = (
  properties: Property[],
  status: Property["propertyStatus"]
): Property[] => {
  if (!status) return properties;
  return properties.filter((property) => property.propertyStatus === status);
};

// Helper function to filter by verification status
export const filterByVerificationStatus = (
  properties: Property[],
  verificationStatus: Property["verificationStatus"]
): Property[] => {
  if (!verificationStatus) return properties;
  return properties.filter((property) => property.verificationStatus === verificationStatus);
};

// Helper function to get all unique cities
export const getAllCities = (): string[] => {
  const cities = mockProperties.map((property) => property.city);
  return Array.from(new Set(cities)).sort();
};

// Helper function to get properties by city
export const getPropertiesByCity = (city: string): Property[] => {
  return mockProperties.filter((property) => property.city === city);
};
