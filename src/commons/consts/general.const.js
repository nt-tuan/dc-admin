import { getCompanyName } from "@/utils/config.util";

export const MARKETPLACE_NAME = Object.freeze({
  Distichain: "Distichain",
  Extravaganza: "Extravaganza",
  "8Corners": "8Corners",
  HSB2B: "HSB2B"
});

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
  ADMIN_REBATE_CREDIT_ADD_NEW_USER: "ADMIN_REBATE_CREDIT_ADD_NEW_USER",
  ADMIN_ROUTE_ADD_ORDER: "ADMIN_ROUTE_ADD_ORDER",
  ADMIN_CONFIRM_EXTERNAL_ORDER: "ADMIN_CONFIRM_EXTERNAL_ORDER"
});

export const PHONE_CREDIT_TYPES = Object.freeze({
  SEVEN_DAYS: "A_SEVEN_DAYS",
  FOURTEEN_DAYS: "B_FOURTEEN_DAYS",
  TWENTY_ONE_DAYS: "C_TWENTY_ONE_DAYS",
  TWENTY_EIGHT_DAYS: "D_TWENTY_EIGHT_DAYS",
  THIRTY_FIVE_DAYS: "E_THIRTY_FIVE_DAYS",
  ESCROW_ON_DELIVERY: "ESCROW_ON_DELIVERY"
});

export const PHONE_CREDIT_TYPE_LABELS = Object.freeze({
  [PHONE_CREDIT_TYPES.SEVEN_DAYS]: "7 days",
  [PHONE_CREDIT_TYPES.FOURTEEN_DAYS]: "14 days",
  [PHONE_CREDIT_TYPES.TWENTY_ONE_DAYS]: "21 days",
  [PHONE_CREDIT_TYPES.TWENTY_EIGHT_DAYS]: "28 days",
  [PHONE_CREDIT_TYPES.THIRTY_FIVE_DAYS]: "35 days",
  [PHONE_CREDIT_TYPES.ESCROW_ON_DELIVERY]: "Escrow on Delivery"
});

export const PRODUCT_DETAILS_LABELS = Object.freeze({
  productCategory: "Product Category",
  productType: "Product Type",
  productName: "Product Name",
  hsCode: "HS Code",
  chapterLabel: "Chapter Label",
  headingLabel: "Heading Label",
  hsCodeDescription: "HS Code Description",
  ahecc: "AHECC",
  aheccDescription: "AHECC Full Description",
  aheccFullDescription: "AHECC Full Description",
  unitOfQuantity: "Unit of Quantity",
  minimumOrderQuantity: "Minimum Order Quantity",
  minimumQuantity: "Minimum Order Quantity",
  allowedMutipleQuantity: "Allowed Multiple Quantity",
  allowedMultiplesQuantity: "Allowed Multiple Quantity",
  keyword: "Key Word",
  quantity: "Quantity"
});

export const USER_TABS_NAME = Object.freeze({
  profileInfo: "profile-info",
  companyInfo: "company-info",
  ownerInfo: "owner-info",
  bankDetails: "bank-details",
  documents: "uploaded-documents",
  security: "add-credit-security",
  settings: "settings",
  rebateDetails: "rebate-details",
  introducer: "introducer-info",
  businessDetails: "business-details"
});
export const PREFERENCE_TABS_NAME = Object.freeze({
  general: "general",
  branding: "branding"
});

export const MESSAGES = Object.freeze({
  LOGIN_SUCCESS_MSG: `You have successfully logged in to ${getCompanyName()}!`,
  LOGIN_SUCCESS_TITLE: "Logged In",
  CHANGE_PASSWORD_SUCCESS: "Your password has been changed successfully.",
  RESET_PASSWORD_SUCCESS: "Reset Password Success",
  PHONE_VERIFICATION_CODE_SENT: "We've sent you a verification code to the above phone number.",
  SEND_VERIFICATION_CODE: "Send Verification Code",
  PHONE_VERIFY_CODE: "Verify",
  VERIFY_PHONE_NOW: "Please verify your phone number",
  VERIFY_PHONE_SUCCESSFUL: "Verify successful",
  UPDATE_SUCCESSFUL: "Update Successful",
  VERIFY_PHONE_TO_USE_THIS_FEATURE: "Please verify your phone number to use this feature"
});

export const NOTIFICATION_CHANNELS = Object.freeze({
  EMAIL: "EMAIL",
  WHATSAPP: "WHATSAPP",
  WEB: "WEB",
  SMS: "SMS"
});

export const TWO_FACTOR_AUTH_TYPES = Object.freeze({
  DISABLED: "TWOFA_DISABLED",
  PER_30_DAYS: "PER_30_DAYS",
  EVERY_LOGIN: "EVERY_LOGIN",
  WHATSAPP_PER_30_DAYS: "TWOFA_WHATSAPP_EVERY_30_DAYS",
  WHATSAPP_EVERY_LOGIN: "TWOFA_WHATSAPP_EVERY_LOGIN",
  EMAIL_PER_30_DAYS: "TWOFA_EMAIL_EVERY_30_DAYS",
  EMAIL_EVERY_LOGIN: "TWOFA_EMAIL_EVERY_LOGIN",
  SMS_PER_30_DAYS: "TWOFA_SMS_EVERY_30_DAYS",
  SMS_EVERY_LOGIN: "TWOFA_SMS_EVERY_LOGIN",
  GA_PER_30_DAYS: "TWOFA_GA_EVERY_30_DAYS",
  GA_EVERY_LOGIN: "TWOFA_GA_EVERY_LOGIN"
});

export const THREE_STEPS_SECURITY_STATUS = Object.freeze({
  SUCCESS: "SUCCESS",
  INVALID: "INVALID",
  OTP_EXPIRED: "OTP_EXPIRED",
  OTP_LOCKED: "OTP_LOCKED",
  PASSCODE_LOCKED: "PASSCODE_LOCKED"
});
