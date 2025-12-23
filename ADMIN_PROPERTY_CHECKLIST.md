# Admin Property Details Checklist
## Production-Ready Field Requirements

---

## 1. COMMON PROPERTY FIELDS (ALL Workspace Types)

### Basic Info
- Property Name (title) - required
- Description - required
- Workspace Type Selection (multi-select checkbox)
  - Coworking Spaces
  - Private Offices
  - Meeting Rooms
  - Virtual Offices
- Area (sq.ft.) - number
- Property Status (draft/active/inactive) - admin only

### Location
- Full Address - required
- City - required
- State/Province - required
- Zip/Postal Code - required
- Country - required
- Latitude - number
- Longitude - number
- Map Location (interactive picker)

### Media
- Cover Image (single upload) - required
- Image Gallery (multiple upload, max 20) - required
- Video URLs (array)
- Virtual Tour URL

### Availability
- Available From Date
- Available Until Date
- Operating Hours (day-wise)
  - Monday: From / To
  - Tuesday: From / To
  - Wednesday: From / To
  - Thursday: From / To
  - Friday: From / To
  - Saturday: From / To
  - Sunday: From / To
- Closed Days (array of dates)

### Contact
- Contact Name - required
- Contact Email - required
- Contact Phone - required
- Alternate Phone
- Contact Person Designation

### Legal / GST
- Company Name
- Billing Address
- GST Number
- PAN Number
- Tax ID
- Business Registration Number

### Admin Status Controls
- Listing Status (draft/active/inactive)
- Approval Status (pending/approved/rejected)
- Verification Status (verified/unverified)
- Featured (boolean)
- Priority Level (1-10)
- Admin Notes

---

## 2. COWORKING SPACE Specific Admin Fields

### Seating & Capacity
- Total Seating Capacity - number
- Hot Desk Count - number
- Dedicated Desk Count - number
- Private Cabin Count - number
- Available Seats (current) - number
- Waitlist Enabled (boolean)
- Maximum Occupancy - number

### Pricing Structure
- Hot Desk Price (monthly) - number
- Dedicated Desk Price (monthly) - number
- Private Cabin Price (monthly) - number
- Day Pass Price - number
- Weekly Pass Price - number
- Currency - select
- Security Deposit (per seat type) - number
- Setup Fee - number
- Cancellation Policy
- Minimum Commitment Period (months)

### Amenities
- High-Speed WiFi (boolean)
- Air Conditioning (boolean)
- Non-AC Areas (boolean)
- Pantry/Kitchen (boolean)
- Cafe (boolean)
- Printing/Scanning (boolean)
- Phone Booths (boolean)
- Meeting Rooms Access (boolean)
- Event Space (boolean)
- 24/7 Access (boolean)
- Parking (boolean)
- Security System (boolean)
- Mail Handling (boolean)
- Reception Services (boolean)
- Projector/LED Screen (boolean)
- Whiteboard (boolean)
- Lockers (boolean)
- Gym/Fitness (boolean)
- Wellness Room (boolean)
- Rooftop Terrace (boolean)
- Pet Friendly (boolean)

### Booking Rules
- Minimum Booking Duration (days)
- Maximum Booking Duration (days)
- Advance Booking Allowed (days)
- Same Day Booking Allowed (boolean)
- Cancellation Window (hours)
- Refund Policy
- Booking Restrictions (text)

---

## 3. PRIVATE OFFICE Specific Admin Fields

### Office Sizes & Cabins
- Total Private Offices Count - number
- Available Offices Count - number
- Office Size Options (array)
  - Small (1-2 person): Count, Area (sq.ft.), Price
  - Medium (3-5 person): Count, Area (sq.ft.), Price
  - Large (6-10 person): Count, Area (sq.ft.), Price
  - Extra Large (11+ person): Count, Area (sq.ft.), Price
- Lockable Doors (boolean)
- Window Offices Available (boolean)
- Corner Offices Available (boolean)

### Pricing & Deposit
- Base Monthly Rent - number
- Price per sq.ft. - number
- Security Deposit (months) - number
- Setup Fee - number
- Maintenance Fee (monthly) - number
- Utilities Included (boolean)
- Currency - select
- Minimum Lease Term (months)
- Maximum Lease Term (months)
- Early Termination Fee

### Access & Privacy
- 24/7 Access (boolean)
- Key Card Access (boolean)
- Biometric Access (boolean)
- Private Entrance (boolean)
- Shared Entrance (boolean)
- Access Control System

### Amenities
- Fully Furnished (boolean)
- Semi-Furnished (boolean)
- Unfurnished (boolean)
- High-Speed Internet (boolean)
- Phone Lines (number)
- Storage Space (boolean)
- Filing Cabinets (boolean)
- Meeting Room Access (boolean)
- Kitchen Access (boolean)
- Parking Spaces (number)
- Mail Handling (boolean)
- Reception Services (boolean)
- Cleaning Services (boolean)
- Air Conditioning (boolean)
- Natural Light (boolean)

---

## 4. MEETING ROOM Specific Admin Fields

### Room Setup
- Room Name - required
- Room Type (standard/boardroom/conference/training) - select
- Total Capacity - number
- Seating Arrangement (theater/classroom/boardroom/u-shaped) - select
- Room Area (sq.ft.) - number
- Floor Number - number
- Room Number/Identifier

### Seating Types
- Theater Style Capacity - number
- Classroom Style Capacity - number
- Boardroom Style Capacity - number
- U-Shaped Capacity - number
- Standing Capacity - number

### Pricing (Hourly / Half / Full Day)
- Price Per Hour - number
- Price Per Half Day (4 hours) - number
- Price Per Full Day (8 hours) - number
- Price Per Week - number
- Price Per Month - number
- Currency - select
- Security Deposit - number
- Cancellation Fee
- Minimum Booking Duration (hours)

### Equipment
- Video Conferencing (boolean)
- Projector (boolean)
- LED Screen/TV (boolean)
- Whiteboard (boolean)
- Flip Chart (boolean)
- Phone System (boolean)
- Sound System (boolean)
- Microphone (boolean)
- Camera (boolean)
- High-Speed Internet (boolean)
- HDMI/VGA Cables (boolean)
- Laptop/Computer Provided (boolean)
- Printer (boolean)
- Catering Available (boolean)

### Booking Rules
- Minimum Booking Duration (hours)
- Maximum Booking Duration (hours)
- Advance Booking Required (hours)
- Same Day Booking Allowed (boolean)
- Cancellation Window (hours)
- Booking Restrictions (text)
- Setup Time Required (minutes)
- Breakdown Time Required (minutes)
- Outside Food Allowed (boolean)
- Alcohol Allowed (boolean)

---

## 5. VIRTUAL OFFICE Specific Admin Fields

### Address & City
- Business Address - required
- City - required
- State/Province - required
- Zip/Postal Code - required
- Country - required
- Address Type (premium/standard) - select
- Multiple Locations Available (boolean)

### Services Included
- Business Address Registration (boolean)
- Mail Receiving (boolean)
- Mail Forwarding (boolean)
- Mail Scanning (boolean)
- Phone Answering Service (boolean)
- Call Forwarding (boolean)
- Voicemail Service (boolean)
- Live Receptionist (boolean)
- Meeting Room Access (hours/month) - number
- Day Office Access (days/month) - number
- Document Notarization (boolean)
- Tax Support (boolean)
- GST Registration Support (boolean)
- Company Registration Support (boolean)

### Pricing (Monthly / Yearly)
- Monthly Price - number
- Yearly Price - number
- Setup Fee - number
- Currency - select
- Mail Handling Fee (per item) - number
- Mail Forwarding Fee (per item) - number
- Additional Meeting Room Hours Price - number
- Additional Day Office Price - number
- Phone Answering Minutes Included (monthly) - number
- Additional Phone Minutes Price - number

### Documents Provided
- Business Registration Certificate (boolean)
- Address Proof Document (boolean)
- GST Certificate (boolean)
- Tax Documents (boolean)
- Mail Receipt Confirmation (boolean)
- Invoice/Billing Documents (boolean)

---

## 6. ADMIN-ONLY Controls

### Status Management
- Listing Status
  - Draft
  - Active
  - Inactive
  - Archived
- Approval Status
  - Pending
  - Approved
  - Rejected
  - Under Review
- Verification Status
  - Verified
  - Unverified
  - Verification Pending

### Visibility & Promotion
- Featured Listing (boolean)
- Priority Level (1-10) - number
- Featured Until Date
- Promoted (boolean)
- Promotion End Date

### SEO Fields
- Meta Title
- Meta Description
- Meta Keywords (array)
- Slug/URL (auto-generated, editable)
- Open Graph Image
- Schema Markup Enabled (boolean)

### Analytics & Tracking
- View Count - number (read-only)
- Inquiry Count - number (read-only)
- Booking Count - number (read-only)
- Last Viewed Date
- Created Date
- Updated Date
- Created By (admin user)
- Last Modified By (admin user)

### Additional Admin Fields
- Internal Notes (admin only, not visible to public)
- Admin Tags (array)
- Property Manager Assignment
- Listing Source
- Referral Code
- Commission Rate (%)

---

## Field Type Reference

### Data Types
- **Text**: String input
- **Number**: Numeric input (integer or decimal)
- **Boolean**: Checkbox (true/false)
- **Date**: Date picker
- **Time**: Time picker
- **Select**: Dropdown selection
- **Multi-select**: Multiple selection dropdown
- **Array**: Dynamic list (add/remove items)
- **File Upload**: Single or multiple file upload
- **URL**: URL input with validation
- **Rich Text**: WYSIWYG editor for descriptions

### Validation Rules
- **Required**: Field must be filled
- **Optional**: Field can be empty
- **Min/Max**: Numeric/string length constraints
- **Format**: Email, phone, URL validation
- **Unique**: Slug, email uniqueness checks

---

## Implementation Notes

### Dynamic Form Structure
- Forms should conditionally show/hide sections based on selected workspace types
- Use tabbed or accordion interface for better UX
- Group related fields in sections
- Show field dependencies (e.g., if "Meeting Room Access" is checked, show meeting room details)

### Backend Considerations
- Store workspace type as enum: `coworking` | `private_office` | `meeting_room` | `virtual_office`
- Support multiple workspace types per property (multi-select)
- Use JSON fields for flexible data (office size options, pricing tiers)
- Implement proper validation on backend
- Support partial updates (PATCH requests)

### Frontend Considerations
- Use form libraries (React Hook Form, Formik) for validation
- Implement auto-save functionality
- Show unsaved changes warning
- Support image upload with preview
- Implement rich text editor for descriptions
- Use date/time pickers for scheduling fields
- Add field-level help text where needed


