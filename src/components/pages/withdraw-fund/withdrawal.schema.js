const FIELDS = {
  timestamp: "timestamp",
  id: "id",
  accountNumber: "accountNumber",
  amount: "amount",
  currency: "currency",
  requestedDate: "requestedDate",
  processedDate: "processedDate",
  status: "status"
};

const LABELS = {
  [FIELDS.timestamp]: "Date",
  [FIELDS.id]: "Withdrawal Id",
  [FIELDS.accountNumber]: "Deposited Bank Account",
  [FIELDS.amount]: "Debit",
  [FIELDS.currency]: "Currency",
  [FIELDS.requestedDate]: "Requested Date",
  [FIELDS.processedDate]: "Processed Date",
  [FIELDS.status]: "Status"
};

export const WITHDRAWAL_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS
});
