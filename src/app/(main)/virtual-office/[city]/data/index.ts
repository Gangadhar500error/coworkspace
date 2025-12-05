// Virtual Office Data Index
// Central export point for all virtual office data structures
// This helps backend developers understand the complete data structure

// City Locations Data
export {
  type CityLocation,
  type CityLocationsData,
  cityLocationsData,
  getLocationsByCity,
} from "./cityLocations";

// Virtual Office Cards Data
export {
  virtualOfficeCardsByCity,
  getVirtualOfficesByCity,
} from "./virtualOfficeCards";

// Virtual Office Card Type (re-exported for convenience)
export type { VirtualOfficeCardData } from "../components/VirtualOfficeCard";
