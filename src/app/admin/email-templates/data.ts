// Email Templates Data
import { EmailTemplate } from "./types";

export const emailTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Booking Initiated",
    slug: "booking-initiated",
    category: "Booking",
    subject: "Your booking request has been received",
    description: "Sent when a user initiates a booking request",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF5A22 0%, #FF8C42 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Booking Request Received</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>Thank you for your booking request! We've received your request for <strong>{{workspaceName}}</strong>.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF5A22;">
      <h3 style="margin-top: 0;">Booking Details:</h3>
      <p><strong>Booking ID:</strong> {{bookingId}}</p>
      <p><strong>Workspace:</strong> {{workspaceName}}</p>
      <p><strong>Location:</strong> {{location}}</p>
      <p><strong>Date:</strong> {{bookingDate}}</p>
      <p><strong>Duration:</strong> {{duration}}</p>
      <p><strong>Total Amount:</strong> {{amount}}</p>
    </div>
    <p>We're currently processing your request and will send you a confirmation email shortly.</p>
    <p>If you have any questions, please don't hesitate to contact us.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "bookingId", "workspaceName", "location", "bookingDate", "duration", "amount"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "Calendar",
  },
  {
    id: "2",
    name: "Booking Success",
    slug: "booking-success",
    category: "Booking",
    subject: "Your booking has been confirmed! 🎉",
    description: "Sent when a booking is successfully confirmed",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">🎉 Booking Confirmed!</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>Great news! Your booking has been confirmed.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
      <h3 style="margin-top: 0;">Booking Confirmation:</h3>
      <p><strong>Booking ID:</strong> {{bookingId}}</p>
      <p><strong>Workspace:</strong> {{workspaceName}}</p>
      <p><strong>Address:</strong> {{address}}</p>
      <p><strong>Date & Time:</strong> {{bookingDateTime}}</p>
      <p><strong>Duration:</strong> {{duration}}</p>
      <p><strong>Amount Paid:</strong> {{amount}}</p>
    </div>
    <p>We're excited to have you! Please arrive 10 minutes early for check-in.</p>
    <p>If you need to make any changes or have questions, please contact us.</p>
    <p>See you soon!<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "bookingId", "workspaceName", "address", "bookingDateTime", "duration", "amount"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "CheckCircle",
  },
  {
    id: "3",
    name: "Connect",
    slug: "connect",
    category: "Communication",
    subject: "Connect with {{hostName}}",
    description: "Sent when a user wants to connect with a host",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">New Connection Request</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{hostName}},</p>
    <p><strong>{{userName}}</strong> wants to connect with you regarding <strong>{{workspaceName}}</strong>.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
      <h3 style="margin-top: 0;">User Details:</h3>
      <p><strong>Name:</strong> {{userName}}</p>
      <p><strong>Email:</strong> {{userEmail}}</p>
      <p><strong>Phone:</strong> {{userPhone}}</p>
      <p><strong>Message:</strong> {{message}}</p>
    </div>
    <p>Please respond to this connection request at your earliest convenience.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["hostName", "userName", "userEmail", "userPhone", "workspaceName", "message"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "UserPlus",
  },
  {
    id: "4",
    name: "Contact Host",
    slug: "contact-host",
    category: "Communication",
    subject: "New message from {{userName}}",
    description: "Sent when a user contacts a host",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">New Message Received</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{hostName}},</p>
    <p>You have received a new message from <strong>{{userName}}</strong>.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
      <h3 style="margin-top: 0;">Message:</h3>
      <p style="background: #f3f4f6; padding: 15px; border-radius: 5px; font-style: italic;">{{message}}</p>
      <p><strong>From:</strong> {{userName}} ({{userEmail}})</p>
      <p><strong>Regarding:</strong> {{workspaceName}}</p>
    </div>
    <p>Please respond directly to this email or through the CoWorkSpace platform.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["hostName", "userName", "userEmail", "workspaceName", "message"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "Mail",
  },
  {
    id: "5",
    name: "Email Message",
    slug: "email-message",
    category: "Communication",
    subject: "{{subject}}",
    description: "General email message template",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">{{subject}}</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      {{message}}
    </div>
    <p>If you have any questions, please don't hesitate to contact us.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "subject", "message"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "MessageSquare",
  },
  {
    id: "6",
    name: "Email Verification",
    slug: "email-verification",
    category: "Authentication",
    subject: "Verify your email address",
    description: "Sent when a user needs to verify their email",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>Thank you for signing up with CoWorkSpace! Please verify your email address to complete your registration.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{verificationLink}}" style="background: #FF5A22; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Verify Email Address</a>
    </div>
    <p style="font-size: 12px; color: #666;">Or copy and paste this link into your browser:</p>
    <p style="font-size: 12px; color: #666; word-break: break-all;">{{verificationLink}}</p>
    <p style="font-size: 12px; color: #666;">This link will expire in 24 hours.</p>
    <p>If you didn't create an account, please ignore this email.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "verificationLink"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "ShieldCheck",
  },
  {
    id: "7",
    name: "Forgot Password",
    slug: "forgot-password",
    category: "Authentication",
    subject: "Reset your password",
    description: "Sent when a user requests password reset",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #ef4444 0%, #f87171 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>We received a request to reset your password for your CoWorkSpace account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{resetLink}}" style="background: #FF5A22; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Reset Password</a>
    </div>
    <p style="font-size: 12px; color: #666;">Or copy and paste this link into your browser:</p>
    <p style="font-size: 12px; color: #666; word-break: break-all;">{{resetLink}}</p>
    <p style="font-size: 12px; color: #666;">This link will expire in 1 hour.</p>
    <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "resetLink"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "Key",
  },
  {
    id: "8",
    name: "Invoice Payment Success",
    slug: "invoice-payment-success",
    category: "Payment",
    subject: "Payment received - Invoice #{{invoiceNumber}}",
    description: "Sent when a payment is successfully processed",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">✅ Payment Successful</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>Thank you! Your payment has been successfully processed.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
      <h3 style="margin-top: 0;">Payment Details:</h3>
      <p><strong>Invoice Number:</strong> {{invoiceNumber}}</p>
      <p><strong>Amount Paid:</strong> {{amount}}</p>
      <p><strong>Payment Method:</strong> {{paymentMethod}}</p>
      <p><strong>Transaction ID:</strong> {{transactionId}}</p>
      <p><strong>Date:</strong> {{paymentDate}}</p>
    </div>
    <p>Your invoice receipt has been attached to this email.</p>
    <p>If you have any questions about this payment, please contact our support team.</p>
    <p>Thank you for your business!<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "invoiceNumber", "amount", "paymentMethod", "transactionId", "paymentDate"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "Receipt",
  },
  // Additional recommended templates
  {
    id: "9",
    name: "Welcome Email",
    slug: "welcome-email",
    category: "System",
    subject: "Welcome to CoWorkSpace! 🎉",
    description: "Sent to new users after registration",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF5A22 0%, #FF8C42 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Welcome to CoWorkSpace!</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>Welcome to CoWorkSpace! We're thrilled to have you join our community.</p>
    <p>Get started by exploring our workspaces and finding the perfect space for your needs.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{dashboardLink}}" style="background: #FF5A22; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Explore Workspaces</a>
    </div>
    <p>If you need any help, our support team is here for you.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "dashboardLink"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "Sparkles",
  },
  {
    id: "10",
    name: "Booking Reminder",
    slug: "booking-reminder",
    category: "Booking",
    subject: "Reminder: Your booking is tomorrow",
    description: "Sent 24 hours before a booking",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">⏰ Booking Reminder</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>This is a friendly reminder about your upcoming booking.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <h3 style="margin-top: 0;">Booking Details:</h3>
      <p><strong>Workspace:</strong> {{workspaceName}}</p>
      <p><strong>Date & Time:</strong> {{bookingDateTime}}</p>
      <p><strong>Address:</strong> {{address}}</p>
    </div>
    <p>We look forward to seeing you!</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "workspaceName", "bookingDateTime", "address"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "Bell",
  },
  {
    id: "11",
    name: "Booking Cancellation",
    slug: "booking-cancellation",
    category: "Booking",
    subject: "Your booking has been cancelled",
    description: "Sent when a booking is cancelled",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Booking Cancelled</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>Your booking has been cancelled as requested.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6b7280;">
      <h3 style="margin-top: 0;">Cancelled Booking:</h3>
      <p><strong>Booking ID:</strong> {{bookingId}}</p>
      <p><strong>Workspace:</strong> {{workspaceName}}</p>
      <p><strong>Date:</strong> {{bookingDate}}</p>
      <p><strong>Refund Amount:</strong> {{refundAmount}}</p>
    </div>
    <p>If you have any questions, please contact our support team.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "bookingId", "workspaceName", "bookingDate", "refundAmount"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "XCircle",
  },
  {
    id: "12",
    name: "Payment Reminder",
    slug: "payment-reminder",
    category: "Payment",
    subject: "Payment reminder for Invoice #{{invoiceNumber}}",
    description: "Sent when payment is overdue",
    body: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Payment Reminder</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{userName}},</p>
    <p>This is a friendly reminder that payment is due for the following invoice.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
      <h3 style="margin-top: 0;">Invoice Details:</h3>
      <p><strong>Invoice Number:</strong> {{invoiceNumber}}</p>
      <p><strong>Amount Due:</strong> {{amount}}</p>
      <p><strong>Due Date:</strong> {{dueDate}}</p>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{paymentLink}}" style="background: #FF5A22; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Pay Now</a>
    </div>
    <p>Please make payment at your earliest convenience to avoid any service interruptions.</p>
    <p>Best regards,<br>CoWorkSpace Team</p>
  </div>
</body>
</html>`,
    variables: ["userName", "invoiceNumber", "amount", "dueDate", "paymentLink"],
    isActive: true,
    lastModified: "2024-01-15",
    icon: "AlertCircle",
  },
];

