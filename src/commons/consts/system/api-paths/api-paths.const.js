export class ApiPathConsts {
  static #PUBLIC_PREFIX = "/public";
  static #USER_PREFIX = "/me";
  static #USER_MANAGEMENT_PREFIX = "/users";
  static #ORDER_PREFIX = "/orders";
  static #WALLET_PREFIX = "/wallet";
  static #COMPANY_PREFIX = "/companies";
  static #PRODUCT_PREFIX = "/products";
  static #BRANDS_PREFIX = "/brands";
  static #REBATES_PREFIX = "/rebates";

  static get GET_CURRENT_USER() {
    return `${this.USER_PREFIX}`;
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

  static get LOGIN() {
    return `${this.#PUBLIC_PREFIX}/login`;
  }

  static get GET_ALL_ACTIVE_ORDERS() {
    return `${this.#ORDER_PREFIX}/active`;
  }

  static get GET_ALL_ORDERS_HISTORY() {
    return `${this.#ORDER_PREFIX}/history`;
  }

  static get GET_WALLET_DASHBOARD() {
    return `${this.#WALLET_PREFIX}`;
  }

  static get GET_WALLET_TRANSACTION_DETAILS() {
    return `${this.#WALLET_PREFIX}/transactions/details`;
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
    return `${this.#PRODUCT_PREFIX}`;
  }

  static get EDIT_PRODUCT() {
    return `${this.#PRODUCT_PREFIX}/:id`;
  }

  static get GET_PRODUCTS() {
    return `${this.#PRODUCT_PREFIX}/global`;
  }

  static get GET_PRODUCT_CATEGORIES() {
    return `${this.#PRODUCT_PREFIX}/category`;
  }

  static get GET_PRODUCT_SALE_CHANNEL() {
    return `${this.#PRODUCT_PREFIX}/salesChannel`;
  }

  static get DELETE_PRODUCT() {
    return `${this.#PRODUCT_PREFIX}/:id`;
  }

  static get GET_PRODUCT_DETAILS() {
    return `${this.#PRODUCT_PREFIX}/:id`;
  }

  static get UPLOAD_PRODUCT_IMAGE() {
    return `${this.#PRODUCT_PREFIX}/images`;
  }

  static get DELETE_PRODUCT_IMAGE() {
    return `${this.#PRODUCT_PREFIX}/images`;
  }

  static get GET_REQUESTED_PRODUCTS() {
    return `${this.#PRODUCT_PREFIX}/product-pending`;
  }

  static get REJECT_REQUESTED_PRODUCTS() {
    return `${this.#PRODUCT_PREFIX}/reject/:id`;
  }

  static get GET_PRODUCT_TYPES_BY_CATEGORY_ID() {
    return `${this.#PRODUCT_PREFIX}/product-types`;
  }
  static get GET_PRODUCT_CATEGORIES_SELECT() {
    return `${this.#PRODUCT_PREFIX}/categories`;
  }

  static get GET_PRODUCT_NAMES_BY_TYPE_ID() {
    return `${this.#PRODUCT_PREFIX}/products`;
  }
  static get ADD_AVAILABLE_PRODUCT() {
    return `${this.#PRODUCT_PREFIX}/map/:sourceId/:targetId`;
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
}
