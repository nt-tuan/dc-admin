import { RouteConst } from "commons/consts";

const actions = {
  SET_STATE: "menu/SET_STATE",
  SET_BUYER_DATA: "menu/SET_BUYER_DATA",
  SET_SELLER_DATA: "menu/SET_SELLER_DATA",
  SET_ADMIN_DATA: "menu/SET_ADMIN_DATA",
  SET_USER_DATA: "menu/SET_USER_DATA"
};

export default actions;

export async function getUserData() {
  return [
    {
      title: "Orders",
      key: "Orders",
      icon: "fe fe-layers",
      url: RouteConst.ORDERS
    },
    {
      title: "Services",
      key: "Services",
      icon: "fe fe-phone-call",
      url: RouteConst.SERVICE
    },
    {
      title: "User Management",
      key: "User Management",
      icon: "fe fe-users",
      children: [
        {
          title: "Users",
          key: "Users",
          url: RouteConst.USER_MANAGEMENT
        },
        {
          title: "New User",
          key: "New Users",
          url: RouteConst.NEW_USER
        }
      ]
    },
    {
      title: "Trade Routes",
      key: "RoutesMain",
      icon: "fe fe-map",
      children: [
        {
          title: "Trade Routes",
          key: "TradeRoutes",
          url: RouteConst.TRADE_ROUTES
        },
        {
          title: "Trade Routes Creation",
          key: "RouteCreation",
          url: RouteConst.CREATE_TRADE_ROUTES
        },
        {
          title: "Documents",
          key: "Document",
          url: RouteConst.DOCUMENT
        }
      ]
    },
    {
      title: "Product Template",
      key: "Product",
      icon: "fe fe-package",
      children: [
        {
          title: "Product Template Database",
          key: "ProductDatabase",
          url: RouteConst.PRODUCT_DATABASE
        },
        {
          title: "Product Template Creation",
          key: "ProductCreation",
          url: RouteConst.ADD_PRODUCT
        }
      ]
    },
    {
      title: "Financials",
      key: "Financials",
      icon: "fe fe-trending-up",
      children: [
        {
          title: "Wallet",
          key: "Wallet",
          url: RouteConst.WALLET
        },
        {
          title: "Account Summary",
          key: "accountSummary",
          url: RouteConst.ACCOUNT_SUMMARY
        },
        {
          title: "Withdraw Fund",
          key: "withdrawFund",
          url: RouteConst.WITHDRAW_FUND
        },
        {
          title: "Add Fund",
          key: "Add Fund",
          url: RouteConst.ADD_FUNDS
        }
      ]
    }
  ];
}
