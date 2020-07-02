export class SharedPaths {
  static get HOME_ROUTE() {
    return "/";
  }
  static get LOGIN_ROUTE() {
    return "/login";
  }
  static get REGISTER_ROUTE() {
    return "/register";
  }
  static get NOT_FOUND_ERROR_ROUTE() {
    return "/404";
  }
  static get UNEXPECTED_ERROR_ROUTE() {
    return "/500";
  }
  static get ORDERS() {
    return "/orders";
  }
  static get USER_MANAGEMENT() {
    return "/user-management";
  }
  static get SERVICE() {
    return "/service";
  }
  static get WALLET() {
    return "/wallet";
  }
  static get ACCOUNT_SUMMARY() {
    return "/account-summary";
  }
  static get WITHDRAW_FUND() {
    return "/withdraw-fund";
  }
  static get ADD_FUNDS() {
    return "/add-funds";
  }
  static get ORDER_TRACK_AND_TRACE() {
    return "/orders/:orderNumber/track-and-trace";
  }
}
