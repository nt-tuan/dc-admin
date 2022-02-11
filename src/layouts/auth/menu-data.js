import { RouteConst } from "commons/consts";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SettingsIcon from "@mui/icons-material/Settings";
const menuData = [
  {
    title: "Orders",
    key: "Orders",
    icon: <LayersIcon />,
    url: RouteConst.ORDERS
  },
  {
    title: "Traders",
    key: "Traders",
    icon: <PeopleIcon />,
    url: RouteConst.USER_MANAGEMENT
  },
  {
    title: "Trade Routes",
    key: "RoutesMain",
    icon: <MapIcon />,
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
    icon: <CategoryIcon />,
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
    icon: <TrendingUpIcon />,
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
    icon: <SettingsIcon />,
    children: [
      {
        title: "Feature Toggles",
        key: "Feature Toggles",
        url: RouteConst.FEATURE_TOGGLES
      }
    ]
  }
];

export const getMenuData = () => menuData;
