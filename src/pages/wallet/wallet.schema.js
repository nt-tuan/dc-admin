import { getCompanyName } from "@/utils/config.util";

const FIELDS = {
  createdDate: "createdDate",
  type: "type",
  orderNumber: "orderNumber",
  productDetails: "productDetails",
  description: "description",
  currency: "currency",
  blockedFund: "blockedFund",
  credit: "credit",
  debit: "debit",
  totalBlockFund: "totalBlockFund",
  availableBalance: "availableBalance",
  currentBalance: "currentBalance"
};

const LABELS = {
  [FIELDS.createdDate]: "Time Stamp",
  [FIELDS.type]: "Transaction Type",
  [FIELDS.orderNumber]: "Order Number",
  [FIELDS.productDetails]: "Product Details",
  [FIELDS.description]: "Description",
  [FIELDS.currency]: "Currency",
  [FIELDS.blockedFund]: "Blocked",
  [FIELDS.credit]: "Credit",
  [FIELDS.debit]: "Debit",
  [FIELDS.totalBlockFund]: "Total Blocked",
  [FIELDS.availableBalance]: "Available Balance",
  [FIELDS.currentBalance]: "Current Total Balance"
};

const BANK_DETAILS = {
  accountHolder: "accountHolder",
  bankName: "name",
  accountNumber: "accountNumber",
  iban: "iban",
  nationality: "nationality",
  swiftCode: "swiftCode"
};

const BANK_DETAIL_LABELS = {
  [BANK_DETAILS.accountHolder]: "Account holder",
  [BANK_DETAILS.bankName]: "Bank name",
  [BANK_DETAILS.accountNumber]: "Account No.",
  [BANK_DETAILS.iban]: "IBAN",
  [BANK_DETAILS.nationality]: "Nationality",
  [BANK_DETAILS.swiftCode]: "Swift Code"
};

export const WALLET_TRANSACTION_TYPES = Object.freeze({
  ORDER_PAYMENT: "ORDER_PAYMENT",
  // IVS: "IVS",
  // TSF: "TSF",
  DEPOSIT: "DEPOSIT",
  DEPOSIT_IVS: "DEPOSIT_IVS",
  BILLING_IVS: "BILLING_IVS",
  BILLING_TSF: "BILLING_TSF",
  BILLING_DC: "BILLING_DC",
  BILLING_PCC: "BILLING_PCC",
  BILLING_COMMISSION: "BILLING_COMMISSION",
  WITHDRAWAL: "WITHDRAWAL"
});

export const getWalletTransactionType = () => ({
  [WALLET_TRANSACTION_TYPES.ORDER_PAYMENT]: "Order Payment",
  [WALLET_TRANSACTION_TYPES.DEPOSIT]: "Deposit",
  [WALLET_TRANSACTION_TYPES.DEPOSIT_IVS]: "Deposit​",
  [WALLET_TRANSACTION_TYPES.BILLING_DC]: "Billing",
  [WALLET_TRANSACTION_TYPES.BILLING_PCC]: "Billing",
  [WALLET_TRANSACTION_TYPES.WITHDRAWAL]: "Withdraw",
  [WALLET_TRANSACTION_TYPES.BILLING_COMMISSION]: "Billing",
  [WALLET_TRANSACTION_TYPES.BILLING_IVS]: "Billing"
});

export const getWalletDescriptions = () => ({
  [WALLET_TRANSACTION_TYPES.ORDER_PAYMENT]: "Order Payment",
  [WALLET_TRANSACTION_TYPES.DEPOSIT]: "Funds Deposited by User",
  [WALLET_TRANSACTION_TYPES.DEPOSIT_IVS]: "Invoice Value Settlement​",
  [WALLET_TRANSACTION_TYPES.BILLING_DC]: `${getCompanyName()} Commission`,
  [WALLET_TRANSACTION_TYPES.BILLING_PCC]: "Marketplace Commission",
  [WALLET_TRANSACTION_TYPES.BILLING_COMMISSION]: "Marketplace Fee",
  [WALLET_TRANSACTION_TYPES.WITHDRAWAL]: "Withdrawn funds",
  [WALLET_TRANSACTION_TYPES.BILLING_IVS]: "Invoice Value Settlement"
});

export const WALLET_SCHEMA = Object.freeze({
  FIELDS,
  LABELS,
  BANK_DETAILS,
  BANK_DETAIL_LABELS,
  WALLET_TRANSACTION_TYPES
});
