const PUBLIC_PREFIX = "/public";
const USER_PREFIX = "/me";
const USER_MANAGEMENT_PREFIX = "/users";
const SETTING_PREFIX = "/me/notifications/settings";
const KYC_PREFIX = "/kyc";
const COMPANY_PREFIX = "/companies";
const OWNER_PREFIX = "/owners";
const PRODUCT_PREFIX = "/products";
const SALES_PREFIX = "/sales";
const SELLER_PREFIX = "/sellers";
const BUYER_PREFIX = "/buyers";
const ORDER_PREFIX = "/orders";
const AUDIT_LOGS_PREFIX = "/audit-logs";

export const GET_CURRENT_USER = `${USER_PREFIX}`;
export const UPDATE_USER_INFO = `${USER_PREFIX}`;
export const CHANGE_PASSWORD = `${USER_PREFIX}/password`;

export const GET_AUDIT_LOGS = `${AUDIT_LOGS_PREFIX}`;

export const GET_ALL_USERS = `${USER_MANAGEMENT_PREFIX}`;
export const CREATE_USER = `${USER_MANAGEMENT_PREFIX}`;
export const DELETE_USER = `${USER_MANAGEMENT_PREFIX}`;
export const UPDATE_USER = `${USER_MANAGEMENT_PREFIX}`;

export const LOGIN = `${PUBLIC_PREFIX}/login`;
export const REGISTER = `${PUBLIC_PREFIX}/register`;
export const RESET_PW = `${PUBLIC_PREFIX}/resetPassword`;
export const SUGGEST_USERNAME = `${PUBLIC_PREFIX}/username`;
export const CHECK_RESET_PW_TOKEN = `${PUBLIC_PREFIX}/tokens/password`;
export const CHECK_EMAIL_CONFIRM_TOKEN = `${PUBLIC_PREFIX}/tokens/registration`;
export const SEND_RESET_PW_LINK = `${PUBLIC_PREFIX}/sendResetPasswordLink`;
export const PHONE_VERIFICATION = `${SETTING_PREFIX}/phone/code`;
export const NOTIFICATION_SETTING = SETTING_PREFIX;
export const NOTIFICATIONS = `${USER_PREFIX}/notifications`;
export const NOTIFICATIONS_READ = `${USER_PREFIX}/notifications/read`;
export const SUBSCRIPTION = `${USER_PREFIX}/notifications/subscriptions`;
export const SELLER_DASHBOARD = `${SELLER_PREFIX}/dashboard`;
export const SELLER_ACTIONLIST = `${SELLER_PREFIX}/actionList`;
export const BUYER_DASHBOARD = `${BUYER_PREFIX}/dashboard`;
export const BUYER_ACTIONLIST = `${BUYER_PREFIX}/actionList`;

export const KYC_STEP1 = `${KYC_PREFIX}/step-1`;
export const KYC_STEP2 = `${KYC_PREFIX}/step-2`;
export const KYC_STEP3 = `${KYC_PREFIX}/step-3`;
export const KYC_STEP4 = `${KYC_PREFIX}/step-4`;
export const KYC_SUBMIT = `${KYC_PREFIX}/submit`;

export const COMPANY_INFO = `${COMPANY_PREFIX}`;
export const KYC_SUBMISSION = `${COMPANY_PREFIX}/kyc`;
export const COMPANY_ADDRESSES = `${COMPANY_PREFIX}/addresses`;
export const BANK_DETAILS = `${COMPANY_PREFIX}/bankdetails`;
export const DOCUMENTS = `${COMPANY_PREFIX}/documents`;
export const FINANCIAL_DETAILS = `${COMPANY_PREFIX}/financialdetails`;
export const COMPANY_LOGO = `${COMPANY_PREFIX}/logos`;
export const OWNER_INFO = `${OWNER_PREFIX}`;

export const PRODUCTS = `${PRODUCT_PREFIX}`;
export const PRODUCTS_INVENTORY = `/inventories`;
export const PRODUCTS_ITEM_LISTING = `${PRODUCT_PREFIX}/global`;
export const PRODUCTS_MARKETPLACE = `${PRODUCT_PREFIX}/sales`;

export const SALES_PRODUCT = `${SALES_PREFIX}`;
export const BID_PRODUCT = `${BUYER_PREFIX}/bids/first`;
export const SELLER_SALES = `${SELLER_PREFIX}/sales`;
export const SELLER_BID_NEGOTIATION = `${SELLER_PREFIX}/negotiations`;
export const BUYER_BID_NEGOTIATION = `${BUYER_PREFIX}/negotiations`;
export const SELLER_BID_NEGOTIATION_BID = `${SELLER_PREFIX}/bids`;
export const BUYER_BID_NEGOTIATION_BID = `${BUYER_PREFIX}/bids`;
export const BUYER_BIDS = `${BUYER_PREFIX}/negotiations`;
export const ORDER_SELLER = `${SELLER_PREFIX}${ORDER_PREFIX}`;
export const ORDER_BUYER = `${BUYER_PREFIX}${ORDER_PREFIX}`;
export const FINANCIAL_SELLER = `${SELLER_PREFIX}/financial`;
export const FINANCIAL_BUYER = `${BUYER_PREFIX}/financial`;

export const WALLET_SELLER = `${SELLER_PREFIX}/wallet`;
export const WALLET_BUYER = `${BUYER_PREFIX}/wallet`;

export const SELLER_BID = `${SELLER_PREFIX}/bids`;
export const BUYER_BID = `${BUYER_PREFIX}/bids`;
