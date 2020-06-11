const FIELDS = {
  date: "date",
  number: "number",
  city: "city",
  country: "country",
  value: "value",
  payment: "payment"
};

const LABELS = {
  [FIELDS.date]: "Date",
  [FIELDS.number]: "Order Number",
  [FIELDS.city]: "City",
  [FIELDS.country]: "Country",
  [FIELDS.value]: "Value",
  [FIELDS.payment]: "Payment"
};

export const FINANCIAL_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});
