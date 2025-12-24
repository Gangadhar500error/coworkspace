# Migration Example: Switching from JSON to API

## Before (Current - Direct JSON Import)

```typescript
// ❌ OLD WAY - Direct import from JSON
import { mockProperties, getPropertyById } from "@/data/properties";

export default function PropertyListingsPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  
  const property = getPropertyById(1);
  // ...
}
```

## After (New - Using Service Layer)

```typescript
// ✅ NEW WAY - Using service layer
import { getProperties, getPropertyById } from "@/services/propertyService";

export default function PropertyListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const data = await getProperties({
          workspaceType: filters.workspaceType,
          propertyStatus: filters.propertyStatus,
          search: searchTerm,
        });
        setProperties(data);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProperties();
  }, [filters, searchTerm]);
  
  // ...
}
```

## Key Changes

### 1. **Import Change**
```typescript
// Before
import { mockProperties } from "@/data/properties";

// After
import { getProperties } from "@/services/propertyService";
```

### 2. **Data Loading**
```typescript
// Before (Synchronous)
const properties = mockProperties;

// After (Async with loading state)
const [properties, setProperties] = useState<Property[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function load() {
    const data = await getProperties();
    setProperties(data);
    setLoading(false);
  }
  load();
}, []);
```

### 3. **Error Handling**
```typescript
// After (Always handle errors)
try {
  const property = await getPropertyById(id);
  if (!property) {
    // Handle not found
  }
} catch (error) {
  // Handle API error
  console.error("Failed to load property:", error);
}
```

## Component Update Checklist

When updating a component to use the service layer:

- [ ] Replace direct `mockProperties` import with service function
- [ ] Add `useState` for data
- [ ] Add `useState` for loading state
- [ ] Add `useState` for error state (optional)
- [ ] Add `useEffect` to load data
- [ ] Add try-catch for error handling
- [ ] Update UI to show loading state
- [ ] Update UI to show error state (if needed)

## Example: Complete Component Update

```typescript
"use client";

import { useState, useEffect } from "react";
import { getProperties, deleteProperty } from "@/services/propertyService";
import { Property } from "@/types/property";

export default function PropertyListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;
    
    try {
      await deleteProperty(id);
      // Reload properties after delete
      await loadProperties();
    } catch (err) {
      alert("Failed to delete property");
      console.error(err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          {property.propertyName}
          <button onClick={() => handleDelete(property.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Environment Configuration

Create `.env.local` file:

```env
# Development - Use JSON files
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api

# Production - Use API
# NEXT_PUBLIC_USE_MOCK_DATA=false
# NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api
```

## Benefits

✅ **Easy Testing**: Switch between mock/API with one flag  
✅ **No Component Changes**: Backend integration doesn't require UI changes  
✅ **Type Safety**: TypeScript ensures correct data structure  
✅ **Error Handling**: Centralized error handling  
✅ **Loading States**: Easy to add loading indicators  

