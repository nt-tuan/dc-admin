const FIELDS = {
  timestamp: "createdDate",
  orderNumber: "number",
  productCategory: "productCategory",
  productType: "productType",
  productBrand: "productBrand",
  productName: "productName",
  quantity: "quantity",
  unitPrice: "unitPrice",
  totalPrice: "total",
  buyerCompanyName: "buyerCompany",
  sellerCompanyName: "sellerCompany",
  status: "process"
};

const LABELS = {
  [FIELDS.timestamp]: "Timestamp",
  [FIELDS.orderNumber]: "Order Number",
  [FIELDS.productCategory]: "Product Category",
  [FIELDS.productType]: "Product Type",
  [FIELDS.productBrand]: "Product Brand",
  [FIELDS.productName]: "Product Name",
  [FIELDS.quantity]: "Quantity",
  [FIELDS.unitPrice]: "Unit Price",
  [FIELDS.totalPrice]: "Total Price",
  [FIELDS.buyerCompanyName]: "Buyer Company Name",
  [FIELDS.sellerCompanyName]: "Seller Company Name",
  [FIELDS.status]: "Status"
};

const ORDER_STATUS = {
  OFFER_APPROVED: "OFFER_APPROVED",
  PROVIDE_SHIPPING_DETAILS: "PROVIDE_SHIPPING_DETAILS",
  UPLOAD_SHIPPING_DOCUMENTS: "UPLOAD_SHIPPING_DOCUMENTS",
  CHOOSE_LOGISTICS_PROVIDER: "CHOOSE_LOGISTICS_PROVIDER",
  LOAD_FUND: "LOAD_FUND",
  PROVIDE_PICKUP_DATE: "PROVIDE_PICKUP_DATE",
  SHIPMENT_PICKUP: "SHIPMENT_PICKUP",
  TRACK_SHIPMENT: "TRACK_SHIPMENT",
  SHIPMENT_REACH_BUYER_WAREHOUSE: "SHIPMENT_REACH_BUYER_WAREHOUSE",
  INSPECTION: "INSPECTION",
  REVIEW: "REVIEW",
  DONE: "DONE",
  CANCEL: "CANCEL",
  CONFIRM_PROFORMA_INVOICE: "CONFIRM_PROFORMA_INVOICE"
};

const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.OFFER_APPROVED]: "Offer Approved",
  [ORDER_STATUS.PROVIDE_SHIPPING_DETAILS]: "Provide Shipping Details",
  [ORDER_STATUS.UPLOAD_SHIPPING_DOCUMENTS]: "Upload Documents",
  [ORDER_STATUS.CHOOSE_LOGISTICS_PROVIDER]: "Choose Logistics Provider",
  [ORDER_STATUS.LOAD_FUND]: "Buyer to Load Funds in wallet",
  [ORDER_STATUS.PROVIDE_PICKUP_DATE]: "Update Pickup Date",
  [ORDER_STATUS.SHIPMENT_PICKUP]: "Shipment Pickup",
  [ORDER_STATUS.TRACK_SHIPMENT]: "Track shipment",
  [ORDER_STATUS.SHIPMENT_REACH_BUYER_WAREHOUSE]: "Shipment Reach Buyer's Warehouse",
  [ORDER_STATUS.INSPECTION]: "Buyer's Inspection Report",
  [ORDER_STATUS.REVIEW]: "Review",
  [ORDER_STATUS.DONE]: "Order Completed",
  [ORDER_STATUS.CANCEL]: "Order Cancelled",
  [ORDER_STATUS.CONFIRM_PROFORMA_INVOICE]: "Confirm Pro Forma Invoice",
  EXTERNAL_ORDER_PAYMENT: "Completed via External Payment & Services"
};

export const ORDERS_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  ORDER_STATUS: ORDER_STATUS,
  ORDER_STATUS_LABELS: ORDER_STATUS_LABELS
});

export const orderActiveTableColumns = [
  {
    headerName: LABELS[FIELDS.timestamp],
    field: FIELDS.timestamp,
    width: 150
  },
  {
    headerName: LABELS[FIELDS.productCategory],
    field: FIELDS.productCategory,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.productType],
    field: FIELDS.productType,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.productBrand],
    field: FIELDS.productBrand,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.productName],
    field: FIELDS.productName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.buyerCompanyName],
    field: FIELDS.buyerCompanyName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.sellerCompanyName],
    field: FIELDS.sellerCompanyName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.status],
    field: FIELDS.status,
    width: 200
  }
];

export const orderHistoryTableColumns = [
  {
    headerName: LABELS[FIELDS.timestamp],
    field: FIELDS.timestamp,
    width: 150
  },
  {
    headerName: LABELS[FIELDS.productName],
    field: FIELDS.productName,
    width: 300
  },
  {
    headerName: LABELS[FIELDS.buyerCompanyName],
    field: FIELDS.buyerCompanyName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.sellerCompanyName],
    field: FIELDS.sellerCompanyName,
    width: 200
  },
  {
    headerName: LABELS[FIELDS.status],
    field: FIELDS.status,
    width: 200
  }
];
