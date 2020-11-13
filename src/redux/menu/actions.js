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
      title: "Home",
      key: "Home",
      icon: "fa fa-home",
      url: "/"
    },
    {
      title: "Services",
      key: "Services",
      icon: "fe fe-phone-call",
      url: RouteConst.SERVICE
    },
    {
      title: "Orders",
      key: "Orders",
      icon: "fe fe-layers",
      url: RouteConst.ORDERS
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
        },
        {
          title: "Rebates",
          key: "Rebates",
          url: RouteConst.REBATES
        },
        {
          title: "Create Rebates",
          key: "Create Rebates",
          url: RouteConst.CREATE_REBATES
        }
      ]
    },
    {
      title: "Introducer",
      key: "Introducer",
      icon: "fe fe-award",
      children: [
        {
          title: "Introducers",
          key: "Introducers",
          url: RouteConst.INTRODUCERS
        },
        {
          title: "Create Introducer",
          key: "Create Introducer",
          url: RouteConst.CREATE_INTRODUCER
        }
      ]
    },
    {
      title: "Marketplace Credit",
      key: "Marketplace Credit",
      icon: "fe fe-credit-card",
      children: [
        {
          title: "Credit Request",
          key: "Credit Request",
          url: RouteConst.CREDIT_REQUEST
        },
        {
          title: "Credit Status",
          key: "Credit Status",
          url: RouteConst.CREDIT_STATUS
        },
        {
          title: "Users",
          key: "Users",
          url: RouteConst.CREDIT_USERS
        }
      ]
    },
    {
      title: "Routes",
      key: "RoutesMain",
      icon: "fe fe-map",
      children: [
        {
          title: "Routes",
          key: "Routes",
          url: RouteConst.ROUTE
        },
        {
          title: "Route Creation",
          key: "RouteCreation",
          url: RouteConst.ADD_ROUTE
        },
        {
          title: "Documents",
          key: "Document",
          url: RouteConst.DOCUMENT
        }
      ]
    },
    {
      title: "Product",
      key: "Product",
      icon: "fe fe-package",
      children: [
        {
          title: "Database",
          key: "Database",
          url: RouteConst.PRODUCT_DATABASE
        },
        {
          title: "Product Creation",
          key: "ProductCreation",
          url: RouteConst.ADD_PRODUCT
        },
        {
          title: "Requested Products",
          key: "RequestedProducts",
          url: RouteConst.REQUESTED_PRODUCTS
        }
      ]
    },
    {
      title: "Analytics",
      key: "Analytics",
      icon: "fe fe-pie-chart",
      url: "/notfound"
    },
    {
      title: "Marketing",
      key: "Marketing",
      icon: "fe fe-twitter",
      url: "/notfound"
    },
    {
      title: "Discounts",
      key: "Discounts",
      icon: "fe fe-tag",
      url: "/notfound"
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
    },
    {
      title: "Trade Rules",
      key: "TradeRules",
      icon: "fe fe-navigation-2",
      children: [
        {
          title: "Trade Rules",
          key: "TradeRule",
          url: RouteConst.TRADE_RULES
        },
        {
          title: "Create Trade Rules",
          key: "CreateTradeRule",
          url: RouteConst.CREATE_TRADE_RULES
        }
      ]
    }
  ];
}
