export class ApiUriConsts {
  static #PUBLIC_PREFIX = "/public";
  static #USER_PREFIX = "/me";
  static #USER_MANAGEMENT_PREFIX = "/users";
  static #ORDER_PREFIX = "/orders";
  static #WALLET_PREFIX = "/wallet";
  static #COMPANY_PREFIX = "/companies";

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
}
