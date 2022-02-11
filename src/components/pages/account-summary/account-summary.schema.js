const FIELDS = {
  createdDate: "createdDate",
  number: "number",
  destinationCity: "destinationCity",
  destinationCountry: "destinationCountry",
  originCity: "originCity",
  originCountry: "originCountry",
  totalPrice: "totalPrice",
  commission: "commission",
  paymentDueDate: "paymentDueDate"
};

const LABELS = {
  [FIELDS.createdDate]: "Order Date",
  [FIELDS.number]: "Order Number",
  [FIELDS.destinationCity]: "Destination City",
  [FIELDS.destinationCountry]: "Destination Country",
  [FIELDS.originCity]: "Origin City",
  [FIELDS.originCountry]: "Origin Country",
  [FIELDS.totalPrice]: "Order Value",
  [FIELDS.paymentDueDate]: "Payment Due Date (Est)",
  [FIELDS.commission]: "Commission"
};

export const ACCOUNT_SUMMARY_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});

export const accountSummaryColumns = [
  {
    headerName: LABELS[FIELDS.createdDate],
    field: FIELDS.createdDate,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.number],
    field: FIELDS.number,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.destinationCity],
    field: FIELDS.destinationCity,
    width: 150
  },
  {
    headerName: LABELS[FIELDS.destinationCountry],
    field: FIELDS.destinationCountry,
    width: 150
  },
  {
    headerName: LABELS[FIELDS.originCity],
    field: FIELDS.originCity,
    width: 150
  },
  {
    headerName: LABELS[FIELDS.originCountry],
    field: FIELDS.originCountry,
    width: 150
  },

  {
    headerName: LABELS[FIELDS.commission],
    field: FIELDS.commission,
    width: 150,
    align: "right"
  },
  {
    headerName: LABELS[FIELDS.paymentDueDate],
    field: FIELDS.paymentDueDate,
    width: 200
  }
];
