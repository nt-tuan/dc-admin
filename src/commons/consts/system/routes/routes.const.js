import { SharedPaths } from "./shared-paths.const";

export class RouteConst extends SharedPaths {
  static get PUBLIC_ROUTES() {
    return [this.LOGIN_ROUTE];
  }

  static get PRIVATE_ROUTES() {
    return [
      this.HOME_ROUTE,
      this.USER_MANAGEMENT,
      this.ORDERS,
      this.SERVICE,
      this.ACCOUNT_SUMMARY,
      this.WITHDRAW_FUND,
      this.WALLET,
      this.ADD_FUNDS,
      this.ORDER_TRACK_AND_TRACE,
      this.PRODUCT_DATABASE,
      this.ADD_PRODUCT,
      this.PRODUCT_EDIT
    ];
  }

  static ERROR_LAYOUT_ROUTES() {
    return [this.NOT_FOUND_ERROR_ROUTE, this.UNEXPECTED_ERROR_ROUTE];
  }
}
