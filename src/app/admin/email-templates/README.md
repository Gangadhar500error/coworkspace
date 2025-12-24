# Email Templates System

## Overview

A comprehensive email template management system for CoWorkSpace admin panel. Manage, preview, and edit all email templates used throughout the application.

## Templates Included

### Booking Templates
1. **Booking Initiated** - Sent when a user initiates a booking request
2. **Booking Success** - Sent when a booking is successfully confirmed
3. **Booking Reminder** - Sent 24 hours before a booking
4. **Booking Cancellation** - Sent when a booking is cancelled

### Authentication Templates
5. **Email Verification** - Sent when a user needs to verify their email
6. **Forgot Password** - Sent when a user requests password reset

### Communication Templates
7. **Connect** - Sent when a user wants to connect with a host
8. **Contact Host** - Sent when a user contacts a host
9. **Email Message** - General email message template

### Payment Templates
10. **Invoice Payment Success** - Sent when a payment is successfully processed
11. **Payment Reminder** - Sent when payment is overdue

### System Templates
12. **Welcome Email** - Sent to new users after registration

## Data Structure

### EmailTemplate Interface
```typescript
interface EmailTemplate {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  subject: string;
  description: string;
  body: string; // HTML content
  variables: string[]; // Available variables like {{userName}}, {{bookingId}}
  isActive: boolean;
  lastModified: string;
  icon: string; // Icon name from lucide-react
}
```

### Template Categories
- `Booking` - Booking-related emails
- `Authentication` - Login, verification, password reset
- `Communication` - User-to-user or user-to-host messages
- `Payment` - Payment and invoice emails
- `System` - System notifications and welcome emails

## Features

### Template Management
- ✅ View all templates in a grid layout
- ✅ Search templates by name, subject, or description
- ✅ Filter by category
- ✅ Preview templates with HTML rendering
- ✅ Edit template subject and body
- ✅ Insert variables with one click
- ✅ Active/Inactive status toggle

### Template Editor
- ✅ Separate tabs for Subject and Body editing
- ✅ HTML editor for email body
- ✅ Variable insertion buttons
- ✅ Real-time preview
- ✅ Save functionality

## Variables

Each template includes available variables that can be used in the subject and body:

### Common Variables
- `{{userName}}` - User's full name
- `{{userEmail}}` - User's email address
- `{{userPhone}}` - User's phone number

### Booking Variables
- `{{bookingId}}` - Unique booking identifier
- `{{workspaceName}}` - Name of the workspace
- `{{location}}` - Workspace location
- `{{address}}` - Full address
- `{{bookingDate}}` - Booking date
- `{{bookingDateTime}}` - Date and time
- `{{duration}}` - Booking duration
- `{{amount}}` - Booking amount
- `{{refundAmount}}` - Refund amount (for cancellations)

### Payment Variables
- `{{invoiceNumber}}` - Invoice number
- `{{paymentMethod}}` - Payment method used
- `{{transactionId}}` - Transaction ID
- `{{paymentDate}}` - Payment date
- `{{dueDate}}` - Due date
- `{{paymentLink}}` - Link to payment page

### Authentication Variables
- `{{verificationLink}}` - Email verification link
- `{{resetLink}}` - Password reset link

### Communication Variables
- `{{hostName}}` - Host's name
- `{{message}}` - Message content
- `{{subject}}` - Email subject

### System Variables
- `{{dashboardLink}}` - Link to user dashboard

## Backend Integration

### Required API Endpoints

#### 1. Get All Templates
```
GET /api/admin/email-templates
Query Params:
  - category?: TemplateCategory
  - search?: string
  - isActive?: boolean

Response:
{
  "success": true,
  "data": EmailTemplate[]
}
```

#### 2. Get Single Template
```
GET /api/admin/email-templates/:id

Response:
{
  "success": true,
  "data": EmailTemplate
}
```

#### 3. Update Template
```
PUT /api/admin/email-templates/:id
Body:
{
  "subject": string,
  "body": string,
  "isActive": boolean
}

Response:
{
  "success": true,
  "data": EmailTemplate
}
```

#### 4. Create Template
```
POST /api/admin/email-templates
Body:
{
  "name": string,
  "slug": string,
  "category": TemplateCategory,
  "subject": string,
  "description": string,
  "body": string,
  "variables": string[],
  "icon": string
}

Response:
{
  "success": true,
  "data": EmailTemplate
}
```

#### 5. Send Test Email
```
POST /api/admin/email-templates/:id/test
Body:
{
  "recipientEmail": string,
  "variables": Record<string, string>
}

Response:
{
  "success": true,
  "message": "Test email sent"
}
```

## Email Sending Service

### Template Rendering
Backend should replace variables in templates:

```php
// Example PHP
function renderTemplate($template, $variables) {
    $subject = $template->subject;
    $body = $template->body;
    
    foreach ($variables as $key => $value) {
        $subject = str_replace("{{{$key}}}", $value, $subject);
        $body = str_replace("{{{$key}}}", $value, $body);
    }
    
    return [
        'subject' => $subject,
        'body' => $body
    ];
}
```

### Sending Emails
```php
// Example using Laravel
Mail::send('emails.template', [
    'body' => $renderedBody
], function ($message) use ($renderedSubject, $recipient) {
    $message->to($recipient)
            ->subject($renderedSubject);
});
```

## Best Practices

1. **Variable Naming**: Use camelCase for variable names (e.g., `userName`, `bookingId`)
2. **HTML Structure**: All templates should include proper HTML structure with DOCTYPE
3. **Responsive Design**: Use inline CSS for email compatibility
4. **Testing**: Always test templates with test emails before deploying
5. **Version Control**: Keep track of template changes with `lastModified` field
6. **Security**: Sanitize all variable inputs to prevent XSS attacks
7. **Accessibility**: Use proper alt text for images and semantic HTML

## Future Enhancements

- [ ] Template versioning/history
- [ ] A/B testing for templates
- [ ] Email analytics (open rates, click rates)
- [ ] Template duplication
- [ ] Rich text editor (WYSIWYG)
- [ ] Template preview with sample data
- [ ] Bulk template operations
- [ ] Template import/export
- [ ] Multi-language support
- [ ] Template scheduling

## Notes for Backend Developers

1. **Variable Replacement**: Always escape HTML in variables unless they're explicitly HTML content
2. **Email Clients**: Test templates in major email clients (Gmail, Outlook, Apple Mail)
3. **Image Hosting**: Host images on CDN and use absolute URLs
4. **Unsubscribe Links**: Include unsubscribe links in marketing emails
5. **Plain Text**: Consider generating plain text versions for better deliverability
6. **Rate Limiting**: Implement rate limiting for email sending
7. **Queue System**: Use queue system for bulk email sending
8. **Error Handling**: Log email sending failures and retry logic

