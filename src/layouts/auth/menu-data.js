import { RouteConst } from "commons/consts";
import OrderIcon from "@/components/icons/order.comp";
import TradersIcon from "@/components/icons/traders.comp";
import TradeRouteIcon from "@/components/icons/trade-route.comp";
import ProductIcon from "@/components/icons/product.comp";
import FinancialsIcon from "@/components/icons/financials.comp";
import SettingsIcon from "@/components/icons/settings.comp";
import BuildIcon from "@mui/icons-material/Build";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";

const menuData = [
  {
    title: "Orders",
    key: "Orders",
    icon: OrderIcon,
    url: RouteConst.ORDERS
  },
  {
    title: "Traders",
    key: "Traders",
    icon: TradersIcon,
    url: RouteConst.USER_MANAGEMENT
  },
  {
    title: "Trade Routes",
    key: "RoutesMain",
    icon: TradeRouteIcon,
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
    icon: ProductIcon,
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
    icon: FinancialsIcon,
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
    title: "Configuration",
    key: "Configuration",
    icon: SettingsIcon,
    children: [
      {
        title: "Feature Toggles",
        key: "Feature Toggles",
        url: RouteConst.FEATURE_TOGGLES
      }
    ]
  },
  {
    title: "Settings",
    key: "Settings",
    icon: BuildIcon,
    url: RouteConst.ORGANIZATION_PROFILE
  }
];

const menuSettingsData = [
  {
    title: "Organization Profile",
    key: "Organization Profile",
    icon: CorporateFareRoundedIcon,
    url: RouteConst.ORGANIZATION_PROFILE
  }
];

export const getMenuData = () => menuData;

export const getMenuSettingsData = () => menuSettingsData;
