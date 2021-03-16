import { SharedPaths } from "./shared-paths.const";

export class RouteConst extends SharedPaths {
  static get PUBLIC_ROUTES() {
    return [this.LOGIN_ROUTE];
  }

  static get PRIVATE_ROUTES() {
    return [
      this.HOME_ROUTE,
      this.USER_MANAGEMENT,
      this.NEW_USER,
      this.ORDERS,
      this.SERVICE,
      this.ACCOUNT_SUMMARY,
      this.WITHDRAW_FUND,
      this.WALLET,
      this.ADD_FUNDS,
      this.ORDER_TRACK_AND_TRACE,
      this.PRODUCT_DATABASE,
      this.ADD_PRODUCT,
      this.EDIT_PRODUCT,
      this.REBATES,
      this.CREATE_REBATES,
      this.EDIT_REBATES,
      this.TRADE_RULES,
      this.TRADE_ROUTES,
      // this.ADD_ROUTE,
      this.EDIT_ROUTE,
      this.ADD_DEFAULT_ROUTE,
      this.EDIT_DEFAULT_ROUTE,
      this.DOCUMENT,
      this.USER_DETAILS,
      this.CREDIT_REQUEST,
      this.CREDIT_STATUS,
      this.CREDIT_USERS,
      this.PURCHASE_ORDER,
      this.NOTIFICATION,
      this.CREATE_INTRODUCER,
      this.INTRODUCERS,
      this.INTRODUCER_DETAILS,
      this.INTRODUCER_EDIT,
      this.PROFILE_PAGES,
      this.CREATE_TRADE_ROUTE
    ];
  }

  static ERROR_LAYOUT_ROUTES() {
    return [this.NOT_FOUND_ERROR_ROUTE, this.UNEXPECTED_ERROR_ROUTE];
  }
}
