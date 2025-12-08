# Virtual Office Data Structure

This folder contains all data structures and mock data for the Virtual Office feature. This serves as a reference for backend developers to understand the expected API response formats.

## File Structure

```
data/
├── README.md                    # This file - Overview of data structures
├── index.ts                     # Central export point for all data
├── cityLocations.ts             # City locations/areas data structure
└── virtualOfficeCards.ts        # Virtual office listings data structure
```

## Data Files

### 1. `cityLocations.ts`
Contains the structure for city locations/areas that appear in the hero section.

**API Endpoint:** `GET /cities/{city-slug}/locations`

**Data Structure:**
```typescript
{
  [citySlug: string]: {
    name: string;    // Display name (e.g., "Times Square")
    slug: string;    // URL-friendly identifier (e.g., "times-square")
  }[]
}
```

**Example:**
```typescript
{
  "new-york": [
    { name: "Times Square", slug: "times-square" },
    { name: "Manhattan", slug: "manhattan" }
  ]
}
```

### 2. `virtualOfficeCards.ts`
Contains the structure for virtual office listings that appear as cards.

**API Endpoint:** `GET /virtual-offices?city={city_slug}`

**Data Structure:**
```typescript
{
  [cityName: string]: {
    id: string;
    name: string;
    rating: number;
    location: string;
    image: string;
    features: string[];
    services: {
      name: string;
      price: string;
    }[];
    badge?: string;  // Optional: "Popular", "Featured", "New", "Best Value"
  }[]
}
```

**Example:**
```typescript
{
  "Hyderabad": [
    {
      id: "1",
      name: "Smartworks Purva Summit",
      rating: 4.2,
      location: "Hitec City, Hyderabad",
      image: "/assets/cowork.jpg",
      features: ["Digital KYC & Agreement", "Documents in 24 Hours"],
      services: [
        { name: "Business Address", price: "₹999 /month" },
        { name: "Tax Registration", price: "₹2,499 /month" }
      ],
      badge: "Popular"
    }
  ]
}
```

## Usage

### Importing Data

```typescript
// Import all data structures
import { 
  getLocationsByCity, 
  getVirtualOfficesByCity 
} from "./data";

// Or import specific files
import { getLocationsByCity } from "./data/cityLocations";
import { getVirtualOfficesByCity } from "./data/virtualOfficeCards";
```

### Helper Functions

#### `getLocationsByCity(citySlug: string)`
Returns locations/areas for a given city slug.

**Parameters:**
- `citySlug`: City slug from URL (e.g., "new-york", "chicago")

**Returns:**
- Array of `CityLocation` objects

**Example:**
```typescript
const locations = getLocationsByCity("new-york");
// Returns: [{ name: "Times Square", slug: "times-square" }, ...]
```

#### `getVirtualOfficesByCity(cityName: string)`
Returns virtual office listings for a given city name.

**Parameters:**
- `cityName`: Formatted city name (e.g., "New York", "Los Angeles", "Hyderabad")

**Returns:**
- Array of `VirtualOfficeCardData` objects

**Example:**
```typescript
const offices = getVirtualOfficesByCity("New York");
// Returns: [{ id: "7", name: "WeWork Times Square", ... }, ...]
```

## City Name Formatting

**Important:** City names in `virtualOfficeCards.ts` use formatted names (e.g., "New York", "Los Angeles"), while city slugs in `cityLocations.ts` use URL-friendly slugs (e.g., "new-york", "los-angeles").

The frontend converts slugs to formatted names:
- `new-york` → `New York`
- `los-angeles` → `Los Angeles`
- `hyderabad` → `Hyderabad`

## Backend Integration

When implementing the backend API:

1. **City Locations API:**
   - Endpoint: `GET /cities/{city-slug}/locations`
   - Use city slug from URL parameter
   - Return format matches `CityLocation[]`

2. **Virtual Offices API:**
   - Endpoint: `GET /virtual-offices?city={city_slug}`
   - Use city slug from query parameter
   - Convert to formatted city name internally
   - Return format matches `VirtualOfficeCardData[]`

## Related Documentation

- `VIRTUAL_OFFICE_CITY_LOCATIONS_API.md` - Complete API reference for city locations
- `VIRTUAL_OFFICE_API_REFERENCE.md` - Complete API reference for virtual office listings
- `VIRTUAL_OFFICE_BACKEND_INTEGRATION.md` - Backend integration guide

## Notes for Backend Developers

1. **City Slug Mapping:** Ensure city slugs match those used in `SecondaryNav.tsx`
2. **Empty Arrays:** Return empty arrays `[]` for cities without data (frontend will show ComingSoon component)
3. **Data Consistency:** Keep city names consistent between locations and office listings
4. **Image URLs:** Support both relative paths (`/assets/...`) and absolute URLs
5. **Price Format:** Include currency symbol and time period (e.g., "₹999 /month", "$299 /month")
