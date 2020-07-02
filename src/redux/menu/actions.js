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
      title: "Users",
      key: "Users",
      icon: "fe fe-users",
      url: RouteConst.USER_MANAGEMENT
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
    }
  ];
}
