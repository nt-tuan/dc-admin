export class ApiPathConsts {
  static #PUBLIC_PREFIX = "/public";
  static #ADMIN_PREFIX = "/admin";
  static #USER_PREFIX = "/me";
  static #USER_MANAGEMENT_PREFIX = "/admin/users";
  static #ORDER_PREFIX = "/orders";
  static #WALLET_PREFIX = "/wallet";
  static #COMPANY_PREFIX = "/companies";
  static #ADMIN_PRODUCT_PREFIX = "/admin/products";
  static #PRODUCT_PREFIX = "/products";
  static #BRANDS_PREFIX = "/brands";
  static #REBATES_PREFIX = "/rebates";
  static #PRODUCT_REQUEST_PREFIX = "/product-requests";
  static #TRADE_RULE_PREFIX = "/product-rules";
  static #BADGE = "/badges";
  static #SETTING_PREFIX = "/me/notifications/settings";
  static #TWO_FACTOR_AUTH_PREFIX = "/two-factor-auth";
  static #BUSSINESS_DETAIL = "/company-product-rules";
  static MARKETPLACE = "/admin/marketplace";

  static get GET_ADMIN_USER() {
    return `${this.#USER_MANAGEMENT_PREFIX}`;
  }

  static get GET_CURRENT_USER() {
    return `${this.USER_PREFIX}`;
  }
  static get POST_MARKETPLACE_BRANDING_ASSET() {
    return `${this.MARKETPLACE}/branding/assets`;
  }
  static get GET_MARKETPLACE_BRANDING_ASSET() {
    return `/public/marketplace/branding/assets`;
  }
  static get GET_ORGANIZATION() {
    return `${this.#PUBLIC_PREFIX}/organizations`;
  }
  static get UPDATE_ORGANIZATION() {
    return `${this.#ADMIN_PREFIX}/organizations`;
  }
  static get UPDATE_USER_INFO() {
    return `${this.#USER_PREFIX}`;
  }
  static get GET_ALL_USERS() {
    return `${this.#USER_MANAGEMENT_PREFIX}/all`;
  }
  static get GET_ALL_BUYERS() {
    return `${this.#USER_MANAGEMENT_PREFIX}/buyer`;
  }
  static get GET_ALL_SELLERS() {
    return `${this.#USER_MANAGEMENT_PREFIX}/seller`;
  }
  static get SUSPEND_USER() {
    return `${this.#USER_MANAGEMENT_PREFIX}/:companyId/suspend`;
  }
  static get UNSUSPEND_USER() {
    return `${this.#USER_MANAGEMENT_PREFIX}/:companyId/unlockSuspend`;
  }
  static get ASSIGN_BADGE_TO_USER() {
    return `${this.#USER_MANAGEMENT_PREFIX}/:companyId/assign/badge/type`;
  }
  static get GET_AVAILABLE_BADGES() {
    return `${this.#USER_MANAGEMENT_PREFIX}/:companyId/badge/type`;
  }
  static get GET_ALL_BADGES() {
    return `${this.#BADGE}`;
  }
  static get LOGIN() {
    return `${this.#PUBLIC_PREFIX}/login`;
  }

  static get GET_ALL_ACTIVE_ORDERS() {
    return `${this.#ORDER_PREFIX}/active`;
  }

  static get GET_ALL_FEATURE_FLAGS() {
    return `${this.#ADMIN_PREFIX}/feature-flag`;
  }

  static get UPDATE_FEATURE_FLAG() {
    return `${this.#ADMIN_PREFIX}/feature-flag/:featureId`;
  }

  static get GET_ALL_ORDERS_HISTORY() {
    return `${this.#ORDER_PREFIX}/history`;
  }

  static get GET_ORDER_PREFIX() {
    return this.#ORDER_PREFIX;
  }

  static get GET_WALLET_DASHBOARD() {
    return `${this.#WALLET_PREFIX}`;
  }

  static get GET_WALLET_TRANSACTION_DETAILS() {
    return `${this.#WALLET_PREFIX}/transactions`;
  }

  static get GET_ACCOUNT_SUMMARY() {
    return `account/summary`;
  }

  static get GET_WITHDRAWAL() {
    return `${this.#WALLET_PREFIX}/withdrawal`;
  }

  static get BANK_DETAILS() {
    return `${this.#COMPANY_PREFIX}/bankdetails`;
  }

  static get WALLET_WITHDRAWAL() {
    return `${this.#WALLET_PREFIX}/withdrawal`;
  }

  static get ADD_PRODUCT() {
    return `${this.#ADMIN_PRODUCT_PREFIX}`;
  }

  static get CHECK_DUPLICATE_PRODUCT() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/check`;
  }

  static get EDIT_PRODUCT() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/:id`;
  }

  static get GET_PRODUCTS() {
    return `${this.#PRODUCT_PREFIX}/global`;
  }

  static get GET_PRODUCT_CATEGORIES() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/category`;
  }

  static get GET_PRODUCT_SALE_CHANNEL() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/salesChannel`;
  }

  static get DELETE_PRODUCT() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/:id`;
  }

  static get GET_PRODUCT_DETAILS() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/:id`;
  }

  static get UPLOAD_PRODUCT_IMAGE() {
    return `${this.#PRODUCT_PREFIX}/images`;
  }

  static get DELETE_PRODUCT_IMAGE() {
    return `${this.#PRODUCT_PREFIX}/images`;
  }

  static get GET_PRODUCT_NAMES_BY_TYPE_ID() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/types/:id`;
  }
  static get ADD_AVAILABLE_PRODUCT() {
    return `${this.#ADMIN_PRODUCT_PREFIX}/map/:sourceId/:targetId`;
  }
  static get GET_BUYER_COMPANY() {
    return `${this.#COMPANY_PREFIX}`;
  }

  static get GET_BRANDS() {
    return `${this.#BRANDS_PREFIX}/:id`;
  }

  static get REBATES() {
    return `${this.#REBATES_PREFIX}`;
  }

  static get GET_NEW_COMPANY_LIST() {
    return `${this.#COMPANY_PREFIX}/new`;
  }

  static get APPROVE_NEW_COMPANY() {
    return `${this.#COMPANY_PREFIX}/:companyId/approve`;
  }

  static get UPDATE_PRODUCT_CREATION_PERMISSION() {
    return `${this.#COMPANY_PREFIX}/:companyId/productCreation?isEnable=`;
  }

  static get GET_PRODUCTS_REQUESTS() {
    return this.#PRODUCT_REQUEST_PREFIX;
  }

  static get DELETE_PRODUCTS_REQUESTS() {
    return `${this.#PRODUCT_REQUEST_PREFIX}/:id`;
  }

  static get GET_PRODUCT_TRADE_RULES_STATUS() {
    return `${this.#TRADE_RULE_PREFIX}/rule-status/:id`;
  }

  static get GET_PRODUCT_TRADE_RULES() {
    return this.#TRADE_RULE_PREFIX;
  }
  static get GET_PRODUCT_TRADE_RULE_DETAIL() {
    return `${this.#TRADE_RULE_PREFIX}/:id`;
  }
  static get PUT_PRODUCT_TRADE_RULE_DETAIL() {
    return `${this.#TRADE_RULE_PREFIX}/:id`;
  }
  static get POST_PRODUCT_TRADE_RULE_DETAIL() {
    return `${this.#TRADE_RULE_PREFIX}/:id`;
  }

  static get PHONE_VERIFICATION() {
    return `${this.#SETTING_PREFIX}/phone/code`;
  }

  static get SECURITY_QUESTIONS() {
    return `${this.#USER_PREFIX}/threeSteps/questions`;
  }
  static get SECURITY_ANSWER() {
    return `${this.#USER_PREFIX}/threeSteps/answers`;
  }
  static get THREE_STEPS_PASSCODE() {
    return `${this.#USER_PREFIX}/threeSteps/passcode`;
  }
  static get THREE_STEPS_OTP() {
    return `${this.#USER_PREFIX}/threeSteps/otp`;
  }
  static get NOTIFICATION_SETTING() {
    return `${this.#SETTING_PREFIX}`;
  }
  static get CHANGE_PASSWORD() {
    return `${this.#USER_PREFIX}/password`;
  }
  static get FORGET_BROWSER() {
    return `${this.#TWO_FACTOR_AUTH_PREFIX}/forget-browser`;
  }
  static get BUSSINESS_DETAIL() {
    return `${this.#BUSSINESS_DETAIL}`;
  }
  static get COMPANY_SEND_VERIFICATION_CODE() {
    return `${this.#COMPANY_PREFIX}/bankdetails/code`;
  }
  static get GET_COMPANY_ME() {
    return `${this.#COMPANY_PREFIX}/me`;
  }
  static get GET_GOOGLE_AUTHENTICATOR_QRCODE() {
    return `${this.#TWO_FACTOR_AUTH_PREFIX}/google-authenticator`;
  }
  static get GET_EMAIL_VERIFICATION() {
    return `${this.#PUBLIC_PREFIX}/tokens/registration`;
  }
  static get SEND_RESET_PW_LINK() {
    return `${this.#PUBLIC_PREFIX}/sendResetPasswordLink`;
  }
  static get RESET_PW() {
    return `${this.#PUBLIC_PREFIX}/resetPassword`;
  }
  static get CHECK_RESET_PW_TOKEN() {
    return `${this.#PUBLIC_PREFIX}/tokens/password`;
  }
}
