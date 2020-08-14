export const BADGE_TYPES = Object.freeze({
  MANUFACTURE: "MANUFACTURE",
  DISTRIBUTOR: "DISTRIBUTOR",
  NUMBER_BADGE: "NUMBER_BADGE",
  VALUE_BADGE: "VALUE_BADGE"
});

export const BADGE_LEVELS = Object.freeze({
  [BADGE_TYPES.STATUS_BADGE]: {
    0: "Distributor",
    1: "Manufactor"
  },

  [BADGE_TYPES.NUMBER_BADGE]: {
    0: "blue",
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum"
  },
  [BADGE_TYPES.VALUE_BADGE]: {
    0: "blue",
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum"
  }
});

export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm A";

export const TIME_FIELDS = Object.freeze({
  week: "7",
  month: "30",
  year: "365"
});

export const TIME_LABELS = Object.freeze({
  [TIME_FIELDS.week]: "Week",
  [TIME_FIELDS.month]: "Month",
  [TIME_FIELDS.year]: "Year"
});

export const SORT_ORDERS = Object.freeze({
  DESC: "desc",
  ASC: "asc"
});

export const SALE_CHANNELS = Object.freeze({
  OWN_BRAND: "Own Brand​",
  NICHE_BRANDS: "Niche Brands",
  WHOLESALE_BRANDS: "Wholesale Brands​",
  WHOLESALE_MASS: "Wholesale Mass"
});

export const DOCUMENT_RULE_ACTOR = Object.freeze({
  SELLER: "Seller",
  BUYER: "Buyer",
  LOGISTIC_SERVICE_PROVIDER: "Logistic Service Provider",
  INSPECTION_SERVICE_PROVIDER: "Inspection Provider"
});

export const ACTORS = {
  Seller: "SELLER",
  Buyer: "BUYER",
  "Logistic Service Provider": "LOGISTIC_SERVICE_PROVIDER",
  "Inspection Provider": "INSPECTION_SERVICE_PROVIDER"
};

export const ACTORS_REVERSE = {
  SELLER: "Seller",
  BUYER: "Buyer",
  LOGISTIC_SERVICE_PROVIDER: "Logistic Service Provider",
  INSPECTION_SERVICE_PROVIDER: "Inspection Provider"
};
export const WEEK_DAYS = Object.freeze({
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun"
});

export const NOTIFICATION_TYPE = Object.freeze({
  ADMIN_ROUTE_ADD_NEW_USER: "ADMIN_ROUTE_ADD_NEW_USER",
  ADMIN_ROUTE_ADD_NEW_ADDRESS: "ADMIN_ROUTE_ADD_NEW_ADDRESS",
  ADMIN_PCC_CREDIT_COMMISSION_DEBIT: "ADMIN_PCC_CREDIT_COMMISSION_DEBIT",
  ADMIN_PROMPT_PCC_PAYMENT_FOR_BUYER: "ADMIN_PROMPT_PCC_PAYMENT_FOR_BUYER",
  ADMIN_MARKETPLACE_CREDIT_REQUEST_PCC: "ADMIN_MARKETPLACE_CREDIT_REQUEST_PCC",
  ADMIN_REBATE_CREDIT_ADD_NEW_USER: "ADMIN_REBATE_CREDIT_ADD_NEW_USER"
});
