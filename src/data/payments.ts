import { Payment } from "../types/payment";

export const customerPayments: Payment[] = [
  {
    id: 1,
    transactionId: "TXN-2024-001",
    invoiceNumber: "INV-2024-001",
    bookingId: "BK-2024-001",
    propertyName: "Downtown Cowork Space",
    amount: 165,
    method: "credit_card",
    status: "completed",
    date: "2024-01-15",
    currency: "USD",
  },
  {
    id: 2,
    transactionId: "TXN-2024-002",
    invoiceNumber: "INV-2024-003",
    bookingId: "BK-2024-005",
    propertyName: "Tech Hub Workspace",
    amount: 192.5,
    method: "debit_card",
    status: "completed",
    date: "2024-01-19",
    currency: "USD",
  },
  {
    id: 3,
    transactionId: "TXN-2024-003",
    invoiceNumber: "INV-2024-002",
    bookingId: "BK-2024-003",
    propertyName: "Private Office Suite",
    amount: 220,
    method: "bank_transfer",
    status: "pending",
    date: "2024-01-20",
    currency: "USD",
  },
  {
    id: 4,
    transactionId: "TXN-2024-004",
    invoiceNumber: "INV-2024-005",
    bookingId: "BK-2024-009",
    propertyName: "Creative Space CoWork",
    amount: 176,
    method: "upi",
    status: "pending",
    date: "2024-01-23",
    currency: "USD",
  },
  {
    id: 5,
    transactionId: "TXN-2024-005",
    invoiceNumber: "INV-2024-004",
    bookingId: "BK-2024-007",
    propertyName: "Premium Private Office",
    amount: 275,
    method: "wallet",
    status: "failed",
    date: "2024-01-25",
    currency: "USD",
  },
  {
    id: 6,
    transactionId: "TXN-2024-006",
    invoiceNumber: "INV-2024-001",
    bookingId: "BK-2024-001",
    propertyName: "Downtown Cowork Space",
    amount: 165,
    method: "credit_card",
    status: "refunded",
    date: "2024-01-26",
    currency: "USD",
  },
];

/**
 * Get payment by ID
 */
export const getCustomerPaymentById = (id: number): Payment | undefined => {
  return customerPayments.find((payment) => payment.id === id);
};

