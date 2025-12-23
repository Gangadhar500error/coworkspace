# Property Add Form - Backend API Reference

## Required Fields Validation

This document outlines the required fields for the property add form to help backend developers implement proper validation.

### Base Required Fields (All Workspace Types)

1. **Basic Info Section:**
   - `propertyName` (string) - Required
   - `workspaceType` (enum: "Coworking" | "Private Office" | "Meeting Room" | "Virtual Office") - Required

2. **Location Section:**
   - `country` (string) - Required
   - `state` (string) - Required
   - `city` (string) - Required
   - `areaLocality` (string) - Required
   - `fullAddress` (string) - Required

3. **Contact Section:**
   - `contactPersonName` (string) - Required
   - `phoneNumber` (string) - Required
   - `emailId` (string) - Required, must be valid email format

4. **Admin Section:**
   - `propertyStatus` (enum: "draft" | "active" | "inactive") - Required
   - `verificationStatus` (enum: "pending" | "approved") - Required

### Conditional Required Fields

5. **Legal Section:**
   - `gstNumber` (string) - Required ONLY if `gstRegistered === "yes"`

### Type-Specific Required Fields

#### Coworking Space:
- `totalSeats` (number) - Required
- `dailyPrice` (number) - Required
- `monthlyPrice` (number) - Required

#### Private Office:
- `privateOfficeMonthlyRent` (number) - Required

#### Meeting Room:
- `roomName` (string) - Required
- `seatingCapacity` (number) - Required
- `hourlyPrice` (number) - Required

#### Virtual Office:
- `businessAddress` (string) - Required
- `virtualOfficeCity` (string) - Required
- `virtualOfficeMonthlyPrice` (number) - Required

### Optional Fields (Recommended but not Required)

- `brandOperatorName`
- `shortDescription`
- `detailedDescription`
- `pincode`
- `googleMapLink`
- `latitude` / `longitude`
- `coverImage` (recommended)
- `galleryImages` (optional)
- `floorPlan` (optional)
- `videoLink` (optional)
- `openingTime` / `closingTime`
- `workingDays` (can be 24x7)
- `available24x7`
- All amenities fields
- `seoTitle` / `seoDescription`

### Validation Rules

1. **Email Validation:** Must match pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
2. **GST Number:** Required only when `gstRegistered === "yes"`
3. **Type-Specific Fields:** Only validate fields for the selected `workspaceType`

### API Endpoint Suggestion

```
POST /api/admin/properties
Content-Type: application/json

Request Body: PropertyFormData
Response: { success: boolean, propertyId?: number, errors?: ValidationErrors }
```

### Error Response Format

```json
{
  "success": false,
  "errors": {
    "propertyName": "Property name is required",
    "emailId": "Please enter a valid email address",
    "gstNumber": "GST number is required when GST registered is Yes"
  }
}
```

