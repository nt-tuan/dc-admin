export class SharedPaths {
  static get HOME_ROUTE() {
    return "/admin";
  }
  static get LOGIN_ROUTE() {
    return "/admin/login";
  }
  static get FORGOT_PASSWORD_ROUTE() {
    return "/admin/forgot-password";
  }
  static get FORGOT_PASSWORD_SUCCESS_ROUTE() {
    return "/admin/forgot-password-success";
  }
  static get RESET_PASSWORD_ROUTE() {
    return "/admin/reset-password";
  }
  static get EMAIL_VERIFICATION() {
    return "/admin/email-verification";
  }
  static get REGISTER_ROUTE() {
    return "/admin/register";
  }
  static get NOT_FOUND_ERROR_ROUTE() {
    return "/admin/404";
  }
  static get UNEXPECTED_ERROR_ROUTE() {
    return "/admin/500";
  }
  static get ORDERS() {
    return "/admin/orders";
  }
  static get USER_MANAGEMENT() {
    return "/admin/user-management";
  }
  static get NEW_USER() {
    return "/admin/new-user";
  }
  static get SERVICE() {
    return "/admin/services";
  }
  static get WALLET() {
    return "/admin/wallet";
  }
  static get FEATURE_TOGGLES() {
    return "/admin/configuration/feature-toggles";
  }
  static get ACCOUNT_SUMMARY() {
    return "/admin/account-summary";
  }
  static get WITHDRAW_FUND() {
    return "/admin/withdraw-funds";
  }
  static get ADD_FUNDS() {
    return "/admin/add-funds";
  }
  static get ORDER_TRACK_AND_TRACE() {
    return "/admin/orders/:orderNumber/track-and-trace";
  }
  static get PRODUCT_DATABASE() {
    return "/admin/product-database";
  }
  static get ADD_PRODUCT() {
    return "/admin/add-product";
  }
  static get EDIT_PRODUCT() {
    return "/admin/edit-product/:id";
  }
  static get REBATES() {
    return "/admin/rebates";
  }
  static get CREATE_REBATES() {
    return "/admin/create-rebates";
  }
  static get EDIT_REBATES() {
    return "/admin/edit-rebates/:id";
  }
  static get TRADE_ROUTES() {
    return "/admin/trade-routes";
  }
  static get CREATE_TRADE_ROUTES() {
    return "/admin/create-trade-routes";
  }
  // static get ADD_ROUTE() {
  //   return "/admin/add-routes";
  // }
  // static get CREATE_TRADE_ROUTE() {
  //   return "/admin/create-trade-route";
  // }
  static get EDIT_TRADE_ROUTE() {
    return "/admin/edit-trade-routes";
  }
  static get ADD_DEFAULT_ROUTE() {
    return "/admin/add-default-routes";
  }
  static get EDIT_DEFAULT_ROUTE() {
    return "/admin/edit-default-routes";
  }
  static get DOCUMENT() {
    return "/admin/documents";
  }
  static get USER_DETAILS() {
    return "/admin/user-details";
  }
  static get CREDIT_REQUEST() {
    return "/admin/credit-request";
  }
  static get CREDIT_STATUS() {
    return "/admin/credit-status";
  }
  static get CREDIT_USERS() {
    return "/admin/credit-users";
  }
  static get PURCHASE_ORDER() {
    return "/admin/purchase-order";
  }
  static get NOTIFICATION() {
    return "/admin/notifications";
  }
  static get CREATE_INTRODUCER() {
    return "/admin/create-introducer";
  }
  static get INTRODUCERS() {
    return "/admin/introducers";
  }
  static get INTRODUCER_DETAILS() {
    return "/admin/introducers/introducer-details";
  }
  static get INTRODUCER_EDIT() {
    return "/admin/introducers/introducer-edit";
  }
  static get CREATE_TRADE_RULES() {
    return "/admin/create-trade-rules";
  }
  static get TRADE_RULES() {
    return "/admin/trade-rules";
  }
  static get EDIT_TRADE_RULES() {
    return "/admin/edit-trader-rules";
  }
  static get REQUESTED_PRODUCTS() {
    return "/admin/requested-products";
  }
  static get PROFILE_PAGES() {
    return "/admin/profile/:tabName";
  }
  static get PROFILE() {
    return "/admin/profile";
  }
  static get ADMIN_USER_MANAGEMENT() {
    return "/admin/users";
  }
  static get ADD_ADMIN_USER() {
    return "/admin/users/add-user";
  }
}
