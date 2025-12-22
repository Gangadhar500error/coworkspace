# Property Managers Data

This directory contains centralized data files for Property Managers that can be used across multiple pages and shared with backend developers.

## Files

- **property-managers.json** - JSON file containing all property manager data
- **property-managers.ts** - TypeScript wrapper with helper functions

## Usage

### Importing Data

```typescript
import { mockPropertyManagers, getPropertyManagerById, filterPropertyManagers } from "@/data/property-managers";
```

### Using in Components

```typescript
// Get all property managers
const managers = mockPropertyManagers;

// Get specific property manager by ID
const manager = getPropertyManagerById(1);

// Filter property managers
const filtered = filterPropertyManagers(managers, "search term");
```

## Data Structure

Each property manager object contains:

- `id` (number) - Unique identifier
- `name` (string) - Full name
- `mobile` (string) - Mobile phone number
- `email` (string) - Email address
- `address` (string, optional) - Street address
- `city` (string, optional) - City name
- `state` (string, optional) - State/Province
- `zipCode` (string, optional) - ZIP/Postal code
- `joinDate` (string, optional) - Join date (ISO format)
- `status` (string, optional) - Status: "active" | "inactive" | "pending"
- `totalProperties` (number, optional) - Total number of properties
- `role` (string, optional) - Job role/title
- `company` (string, optional) - Company name
- `mobileVerification` (string, optional) - Verification status: "verified" | "unverified" | "pending"
- `currency` (string, optional) - Currency code (e.g., "USD")
- `description` (string, optional) - Description/bio
- `image` (string, optional) - Profile image URL

## Backend Integration

When connecting to a backend API, replace the import in `property-managers.ts`:

```typescript
// Replace mock data with API call
export const getPropertyManagers = async (): Promise<PropertyManager[]> => {
  const response = await fetch('/api/property-managers');
  return response.json();
};
```

The JSON structure matches the expected API response format, making it easy for backend developers to implement the same structure.

