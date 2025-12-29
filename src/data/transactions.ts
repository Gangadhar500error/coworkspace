/**
 * Transactions Data
 */

import { Transaction } from "../types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    transactionId: "TXN-2024-001234",
    type: "payment",
    status: "completed",
    bookingId: "BK-2024-001",
    userId: 101,
    userName: "John Smith",
    userEmail: "john.smith@example.com",
    amount: 495,
    currency: "USD",
    fee: 14.85,
    netAmount: 480.15,
    paymentMethod: "credit_card",
    paymentGateway: "Stripe",
    gatewayTransactionId: "ch_1A2B3C4D5E",
    createdAt: "2024-01-10T10:30:00Z",
    completedAt: "2024-01-10T10:30:15Z",
    description: "Payment for booking BK-2024-001",
  },
  {
    id: 2,
    transactionId: "TXN-2024-002345",
    type: "payment",
    status: "completed",
    bookingId: "BK-2024-002",
    userId: 102,
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    amount: 3780,
    currency: "USD",
    fee: 113.40,
    netAmount: 3666.60,
    paymentMethod: "bank_transfer",
    paymentGateway: "Bank Transfer",
    gatewayTransactionId: "BT-2024-002345",
    createdAt: "2024-01-18T14:20:00Z",
    completedAt: "2024-01-19T09:15:00Z",
    description: "Payment for booking BK-2024-002",
  },
  {
    id: 3,
    transactionId: "TXN-2024-003456",
    type: "refund",
    status: "completed",
    bookingId: "BK-2024-003",
    userId: 103,
    userName: "Robert Wilson",
    userEmail: "robert.wilson@example.com",
    amount: 335,
    currency: "USD",
    fee: 0,
    netAmount: 335,
    paymentMethod: "upi",
    paymentGateway: "UPI",
    gatewayTransactionId: "UPI-REF-003456",
    createdAt: "2024-02-05T11:00:00Z",
    completedAt: "2024-02-05T11:05:00Z",
    description: "Refund for cancelled booking BK-2024-003",
  },
  {
    id: 4,
    transactionId: "TXN-2024-004567",
    type: "commission",
    status: "completed",
    userId: 201,
    userName: "Sarah Johnson",
    userEmail: "sarah.johnson@coworkspace.com",
    amount: 48.02,
    currency: "USD",
    fee: 0,
    netAmount: 48.02,
    paymentMethod: "bank_transfer",
    paymentGateway: "Bank Transfer",
    createdAt: "2024-01-15T12:00:00Z",
    completedAt: "2024-01-15T12:00:00Z",
    description: "Commission payment for booking BK-2024-001",
  },
  {
    id: 5,
    transactionId: "TXN-2024-005678",
    type: "payment",
    status: "pending",
    bookingId: "BK-2024-006",
    userId: 106,
    userName: "Patricia Lee",
    userEmail: "patricia.lee@example.com",
    amount: 1200,
    currency: "USD",
    fee: 36.00,
    netAmount: 1164.00,
    paymentMethod: "credit_card",
    paymentGateway: "Stripe",
    gatewayTransactionId: "ch_1F2G3H4I5J",
    createdAt: "2024-02-25T11:00:00Z",
    description: "Payment for booking BK-2024-006",
  },
  {
    id: 6,
    transactionId: "TXN-2024-006789",
    type: "payment",
    status: "failed",
    bookingId: "BK-2024-007",
    userId: 107,
    userName: "Daniel Kim",
    userEmail: "daniel.kim@example.com",
    amount: 4950,
    currency: "USD",
    fee: 148.50,
    netAmount: 4801.50,
    paymentMethod: "credit_card",
    paymentGateway: "Stripe",
    gatewayTransactionId: "ch_FAILED_001",
    createdAt: "2024-02-12T15:30:00Z",
    description: "Failed payment for booking BK-2024-007 - Insufficient funds",
  },
  {
    id: 7,
    transactionId: "TXN-2024-007890",
    type: "withdrawal",
    status: "completed",
    userId: 202,
    userName: "Michael Chen",
    userEmail: "michael.chen@coworkspace.com",
    amount: 3666.60,
    currency: "USD",
    fee: 10.00,
    netAmount: 3656.60,
    paymentMethod: "bank_transfer",
    paymentGateway: "Bank Transfer",
    gatewayTransactionId: "WD-2024-007890",
    createdAt: "2024-01-20T10:00:00Z",
    completedAt: "2024-01-21T14:30:00Z",
    description: "Withdrawal request for earnings",
  },
  {
    id: 8,
    transactionId: "TXN-2024-008901",
    type: "payment",
    status: "completed",
    bookingId: "BK-2024-008",
    userId: 108,
    userName: "Sophie Anderson",
    userEmail: "sophie.anderson@example.com",
    amount: 780,
    currency: "USD",
    fee: 23.40,
    netAmount: 756.60,
    paymentMethod: "credit_card",
    paymentGateway: "Stripe",
    gatewayTransactionId: "ch_1K2L3M4N5O",
    createdAt: "2024-03-08T09:15:00Z",
    completedAt: "2024-03-08T09:15:20Z",
    description: "Payment for booking BK-2024-008",
  },
  {
    id: 9,
    transactionId: "TXN-2024-009012",
    type: "payment",
    status: "completed",
    bookingId: "BK-2024-009",
    userId: 109,
    userName: "Michael Thompson",
    userEmail: "michael.thompson@example.com",
    amount: 1210,
    currency: "USD",
    fee: 36.30,
    netAmount: 1173.70,
    paymentMethod: "upi",
    paymentGateway: "UPI",
    gatewayTransactionId: "UPI-009012",
    createdAt: "2024-01-12T10:45:00Z",
    completedAt: "2024-01-12T10:45:10Z",
    description: "Payment for booking BK-2024-009",
  },
  {
    id: 10,
    transactionId: "TXN-2024-010123",
    type: "commission",
    status: "completed",
    userId: 203,
    userName: "Lisa Anderson",
    userEmail: "lisa.anderson@coworkspace.com",
    amount: 75.66,
    currency: "USD",
    fee: 0,
    netAmount: 75.66,
    paymentMethod: "bank_transfer",
    paymentGateway: "Bank Transfer",
    createdAt: "2024-03-10T12:00:00Z",
    completedAt: "2024-03-10T12:00:00Z",
    description: "Commission payment for booking BK-2024-008",
  },
];

export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string,
  filters?: {
    type?: string;
    status?: string;
    paymentMethod?: string;
  }
): Transaction[] => {
  let filtered = transactions;
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (transaction) =>
        transaction.transactionId.toLowerCase().includes(term) ||
        transaction.userName.toLowerCase().includes(term) ||
        transaction.userEmail.toLowerCase().includes(term) ||
        transaction.bookingId?.toLowerCase().includes(term) ||
        transaction.gatewayTransactionId?.toLowerCase().includes(term)
    );
  }
  
  if (filters) {
    if (filters.type) {
      filtered = filtered.filter((transaction) => transaction.type === filters.type);
    }
    
    if (filters.status) {
      filtered = filtered.filter((transaction) => transaction.status === filters.status);
    }
    
    if (filters.paymentMethod) {
      filtered = filtered.filter((transaction) => transaction.paymentMethod === filters.paymentMethod);
    }
  }
  
  return filtered;
};

