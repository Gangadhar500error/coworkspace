# Frontend-Backend Integration Guide

## ✅ Is Using JSON Files Correct?

**Short Answer: YES, but with proper structure!**

### Current Approach (Development Phase) ✅
- **JSON files** (`properties.json`) are **perfect** for:
  - ✅ Frontend development without waiting for backend
  - ✅ UI/UX testing and prototyping
  - ✅ Defining data structure and types
  - ✅ Backend developers understanding expected data format

### What You're Doing Right ✅

1. **TypeScript Interfaces** (`src/types/property.ts`)
   - ✅ Defines exact data structure
   - ✅ Backend developers can use this as reference
   - ✅ Type safety prevents errors

2. **Data Access Layer** (`src/data/properties.ts`)
   - ✅ Centralized data access
   - ✅ Helper functions (filtering, searching)
   - ✅ Easy to replace with API calls later

3. **API Utility** (`src/lib/api.ts`)
   - ✅ Already prepared for backend integration
   - ✅ Authentication handling ready
   - ✅ Error handling structure in place

4. **Documentation** (`BACKEND_API_REFERENCE.md`)
   - ✅ Clear field requirements
   - ✅ Validation rules documented
   - ✅ API endpoint suggestions

---

## 🎯 Best Practices for Backend Integration

### 1. **Data Access Abstraction Layer** (CRITICAL)

**Current Issue:** Components directly import `mockProperties` from JSON.

**Solution:** Create a service layer that can switch between mock data and API calls.

```
src/
  services/
    propertyService.ts  ← NEW: Abstraction layer
  data/
    properties.ts       ← Keep for mock data
    properties.json     ← Keep for development
```

**Benefits:**
- ✅ Switch between mock/API with one flag
- ✅ Backend developers just implement the service functions
- ✅ No changes needed in components
- ✅ Easy testing

### 2. **Environment-Based Configuration**

Use environment variables to control data source:

```env
# .env.local (Development)
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api

# .env.production (Production)
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api
```

### 3. **API Response Structure**

Ensure backend returns data matching your TypeScript interfaces:

```typescript
// Backend should return:
{
  "success": true,
  "data": Property | Property[],
  "message"?: string,
  "errors"?: Record<string, string[]>
}
```

---

## ⚠️ Potential Issues & Solutions

### Issue 1: **Data Structure Mismatch**
**Problem:** Backend returns different field names or structure.

**Solution:**
- ✅ Your TypeScript interfaces serve as **contract**
- ✅ Backend team should match these interfaces
- ✅ Create adapter functions if needed:
  ```typescript
  function adaptBackendProperty(backendData: any): Property {
    return {
      propertyName: backendData.name, // Map if different
      // ... rest of fields
    };
  }
  ```

### Issue 2: **Image Upload Handling**
**Problem:** JSON stores image URLs, but backend needs file uploads.

**Solution:**
- ✅ Use `FormData` for file uploads
- ✅ Separate API endpoints for images:
  - `POST /api/admin/properties/{id}/cover-image`
  - `POST /api/admin/properties/{id}/gallery`
- ✅ Return uploaded image URLs from backend

### Issue 3: **Real-time Updates**
**Problem:** JSON doesn't update when other users make changes.

**Solution:**
- ✅ Backend integration solves this automatically
- ✅ Consider WebSocket/SSE for real-time updates (optional)

### Issue 4: **Pagination & Filtering**
**Problem:** Client-side filtering works on small datasets only.

**Solution:**
- ✅ Backend should handle pagination and filtering
- ✅ Pass filters as query parameters:
  ```
  GET /api/admin/properties?workspaceType=Coworking&status=active&page=1&limit=10
  ```

### Issue 5: **Form Validation**
**Problem:** Client-side validation might differ from backend.

**Solution:**
- ✅ Your `validation.ts` file is excellent reference
- ✅ Backend should implement same rules
- ✅ Display backend validation errors in UI

---

## 🚀 Migration Strategy

### Phase 1: Current (Development) ✅
- Use JSON files
- Develop UI/UX
- Define data structure

### Phase 2: Service Layer (This Step)
- Create abstraction layer
- Keep JSON as fallback
- Prepare API integration points

### Phase 3: Backend Integration
- Replace mock calls with API calls
- Test with real backend
- Keep JSON for offline development

### Phase 4: Production
- Remove JSON fallback (optional)
- Full API integration
- Error handling & loading states

---

## 📋 Checklist for Backend Developers

### Must-Have API Endpoints:

1. **GET** `/api/admin/properties`
   - List all properties
   - Query params: `workspaceType`, `status`, `verificationStatus`, `page`, `limit`, `search`

2. **GET** `/api/admin/properties/{id}`
   - Get single property by ID

3. **POST** `/api/admin/properties`
   - Create new property
   - Body: `PropertyFormData` (from your form)

4. **PUT** `/api/admin/properties/{id}`
   - Update existing property
   - Body: `PropertyFormData`

5. **DELETE** `/api/admin/properties/{id}`
   - Delete property

6. **PATCH** `/api/admin/properties/{id}/status`
   - Update status (active/inactive)
   - Body: `{ propertyStatus: "active" | "inactive" }`

7. **PATCH** `/api/admin/properties/{id}/verification`
   - Approve/reject property
   - Body: `{ verificationStatus: "approved" | "pending" }`

8. **POST** `/api/admin/properties/{id}/images`
   - Upload cover image or gallery images
   - Body: `FormData` with files

### Response Format:

```typescript
// Success Response
{
  "success": true,
  "data": Property | Property[],
  "message"?: string
}

// Error Response
{
  "success": false,
  "errors": {
    "propertyName": ["Property name is required"],
    "emailId": ["Invalid email format"]
  },
  "message": "Validation failed"
}
```

---

## 💡 Recommendations

### ✅ DO:
1. Keep JSON files during development
2. Use TypeScript interfaces as contract
3. Create service abstraction layer
4. Document API requirements clearly
5. Handle loading and error states
6. Validate data on both frontend and backend

### ❌ DON'T:
1. Hardcode API URLs (use env variables)
2. Mix mock data and API calls in components
3. Skip error handling
4. Forget about image upload handling
5. Ignore TypeScript types

---

## 🎯 Next Steps

1. **Create Service Layer** (I'll help you with this)
   - `src/services/propertyService.ts`
   - Can switch between mock/API

2. **Update Components**
   - Replace direct `mockProperties` imports
   - Use service functions instead

3. **Add Environment Config**
   - `.env.local` for development
   - `.env.production` for production

4. **Test Integration**
   - Mock API responses
   - Test error scenarios
   - Verify data mapping

---

## 📞 Summary

**Your current approach is CORRECT for development!**

✅ JSON files are perfect for frontend development  
✅ TypeScript interfaces help backend developers  
✅ Your structure is backend-ready  
✅ Just need service abstraction layer  

**No major issues** - just need to prepare for backend integration properly!

