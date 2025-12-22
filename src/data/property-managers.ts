/**
 * Property Managers Data
 * Centralized data file for property managers
 * Can be easily replaced with API calls later
 */

import propertyManagersData from "./property-managers.json";
import { PropertyManager, generateSlug } from "../types/property-manager";

// Add slug to each property manager
export const mockPropertyManagers: PropertyManager[] = propertyManagersData.propertyManagers.map((manager) => ({
  ...manager,
  slug: generateSlug(manager.name),
}));

// Helper function to get property manager by ID
export const getPropertyManagerById = (id: number): PropertyManager | undefined => {
  return mockPropertyManagers.find((manager) => manager.id === id);
};

// Helper function to get property manager by slug
export const getPropertyManagerBySlug = (slug: string): PropertyManager | undefined => {
  return mockPropertyManagers.find((manager) => manager.slug === slug);
};

// Helper function to filter property managers
export const filterPropertyManagers = (
  managers: PropertyManager[],
  searchTerm: string
): PropertyManager[] => {
  if (!searchTerm) return managers;
  
  const term = searchTerm.toLowerCase();
  return managers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(term) ||
      manager.email.toLowerCase().includes(term) ||
      manager.mobile.includes(term) ||
      manager.company?.toLowerCase().includes(term) ||
      manager.role?.toLowerCase().includes(term)
  );
};

