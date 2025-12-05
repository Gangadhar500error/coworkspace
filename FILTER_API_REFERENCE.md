# Workspace Filter API Reference

This document outlines the filter structure for each workspace type to help backend developers implement the filtering API endpoints.

## API Endpoints

All endpoints follow the pattern: `/workspaces?type={workspace_type}`

### Supported Workspace Types:
- `coworking` - `/workspaces?type=coworking`
- `meeting-room` - `/workspaces?type=meeting-room`
- `virtual-office` - `/workspaces?type=virtual-office`
- `private-office` - `/workspaces?type=private-office`

## Filter Structures

### 1. Coworking Spaces (`/workspaces?type=coworking`)

**Filters:**
- `city` (string) - City name/slug
- `price_range` (string) - Price range filter
  - Values: `"all"`, `"0-300"`, `"300-500"`, `"500-700"`, `"700+"`
- `amenities` (array of strings) - Array of amenity IDs
  - Values: `"ac"`, `"non_ac"`, `"parking"`, `"wifi"`, `"pantry"`, `"24_7_access"`, `"meeting_rooms"`, `"printing"`
- `availability` (string) - Availability status
  - Values: `"all"`, `"available_now"`, `"available_soon"`, `"waitlist"`
- `seat_type` (string) - Type of seating
  - Values: `"all"`, `"hot_desk"`, `"dedicated_desk"`, `"private_cabin"`, `"meeting_room"`

**Example Request:**
```
GET /workspaces?type=coworking&city=new-york&price_range=300-500&amenities=ac,wifi,parking&availability=available_now&seat_type=hot_desk
```

**Expected Response Structure:**
```json
{
  "coworking": {
    "filters": [
      "city",
      "price_range",
      "amenities",
      "availability",
      "seat_type"
    ]
  }
}
```

---

### 2. Meeting Rooms (`/workspaces?type=meeting-room`)

**Filters:**
- `city` (string) - City name/slug
- `capacity` (string) - Room capacity range
  - Values: `"all"`, `"1-4"`, `"5-10"`, `"11-20"`, `"21-50"`, `"50+"`
- `price_range` (string) - Price range per hour
  - Values: `"all"`, `"0-50"`, `"50-100"`, `"100-200"`, `"200+"`
- `room_features` (array of strings) - Array of feature IDs
  - Values: `"projector"`, `"whiteboard"`, `"video_conferencing"`, `"phone_booth"`, `"catering"`, `"wifi"`, `"ac"`, `"natural_light"`
- `booking_type` (string) - Booking duration type
  - Values: `"all"`, `"hourly"`, `"half_day"`, `"full_day"`, `"monthly"`

**Example Request:**
```
GET /workspaces?type=meeting-room&city=new-york&capacity=5-10&price_range=50-100&room_features=projector,whiteboard&booking_type=hourly
```

**Expected Response Structure:**
```json
{
  "meeting_room": {
    "filters": [
      "city",
      "capacity",
      "price_range",
      "room_features",
      "booking_type"
    ]
  }
}
```

---

### 3. Virtual Offices (`/workspaces?type=virtual-office`)

**Filters:**
- `city` (string) - City name/slug
- `plan_type` (string) - Plan tier
  - Values: `"all"`, `"basic"`, `"premium"`, `"enterprise"`
- `gst_support` (string) - GST support availability
  - Values: `"all"`, `"yes"`, `"no"`
- `mail_handling` (string) - Mail handling service
  - Values: `"all"`, `"yes"`, `"no"`

**Example Request:**
```
GET /workspaces?type=virtual-office&city=new-york&plan_type=premium&gst_support=yes&mail_handling=yes
```

**Expected Response Structure:**
```json
{
  "virtual_office": {
    "filters": [
      "city",
      "plan_type",
      "gst_support",
      "mail_handling"
    ]
  }
}
```

---

### 4. Private Offices (`/workspaces?type=private-office`)

**Filters:**
- `city` (string) - City name/slug
- `capacity` (string) - Office capacity range
  - Values: `"all"`, `"1-2"`, `"3-5"`, `"6-10"`, `"11-20"`, `"21+"`
- `lockable` (string) - Lockable office option
  - Values: `"all"`, `"yes"`, `"no"`
- `furnishing` (string) - Furnishing status
  - Values: `"all"`, `"fully_furnished"`, `"semi_furnished"`, `"unfurnished"`
- `contract_term` (string) - Contract duration
  - Values: `"all"`, `"monthly"`, `"quarterly"`, `"half_yearly"`, `"yearly"`, `"flexible"`
- `amenities` (array of strings) - Array of amenity IDs
  - Values: `"ac"`, `"parking"`, `"wifi"`, `"pantry"`, `"reception"`, `"security"`, `"meeting_rooms"`, `"printing"`

**Example Request:**
```
GET /workspaces?type=private-office&city=new-york&capacity=3-5&lockable=yes&furnishing=fully_furnished&contract_term=monthly&amenities=ac,parking,wifi
```

**Expected Response Structure:**
```json
{
  "private_office": {
    "filters": [
      "city",
      "capacity",
      "lockable",
      "furnishing",
      "contract_term",
      "amenities"
    ]
  }
}
```

---

## Query Parameter Format

### Single Value Filters
- Format: `?filter_name=value`
- Example: `?city=new-york&price_range=300-500`

### Array Filters (Amenities, Room Features)
- Format: `?filter_name=value1,value2,value3`
- Example: `?amenities=ac,wifi,parking`
- Example: `?room_features=projector,whiteboard`

### Default Values
- When a filter is not provided or set to `"all"`, it should return all results for that filter
- `city` is typically required and comes from the URL path

## Response Format

All endpoints should return a JSON response with the following structure:

```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "city": "string",
      "type": "string",
      "price": "number",
      "rating": "number",
      "amenities": ["string"],
      // ... other workspace properties
    }
  ],
  "pagination": {
    "current_page": "number",
    "per_page": "number",
    "total": "number",
    "last_page": "number"
  }
}
```

## Notes for Backend Developers

1. **City Parameter**: The `city` parameter comes from the URL path (e.g., `/coworking/new-york`) and should be included in filter requests.

2. **Filter Combinations**: All filters can be combined. The backend should apply AND logic (all filters must match).

3. **Amenities/Features Arrays**: When filtering by amenities or room_features, use AND logic - the workspace must have ALL selected amenities/features.

4. **Price Ranges**: Price ranges are inclusive on both ends (e.g., `300-500` means >= 300 AND <= 500).

5. **URL Encoding**: Array values in query strings should be comma-separated and URL-encoded if needed.

6. **Empty Filters**: If a filter array is empty or a filter value is `"all"`, ignore that filter in the query.

## Frontend Implementation

The frontend automatically builds query parameters based on selected filters and sends them to the backend API. Each workspace type page uses its specific filter component that matches the structure defined above.
