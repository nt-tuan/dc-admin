import { RouteConst } from "@/commons/consts";
// import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import OrderIcon from "@/components/icons/order.comp";
import TradersIcon from "@/components/icons/traders.comp";
import TradeRouteIcon from "@/components/icons/trade-route.comp";
import ProductIcon from "@/components/icons/product.comp";
import FinancialsIcon from "@/components/icons/financials.comp";
import PreferencesIcon from "@/components/icons/preferences.comp";
import SettingIcon from "@/components/icons/setting.comp";
import { BankPathEnum } from "@/components/bank-details/bank-path.enum";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import { pimMenu } from "@/pages/pim/routes";

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
  pimMenu,
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
    title: "Settings",
    key: "Settings",
    icon: SettingIcon,
    url: RouteConst.ORGANIZATION_PROFILE
  }
];

const menuSettingsData = [
  {
    title: "Organization Profile",
    key: "Organization Profile",
    icon: CorporateFareRoundedIcon,
    url: RouteConst.ORGANIZATION_PROFILE
  },
  {
    title: "Bank Accounts",
    icon: MonetizationOnIcon,
    key: BankPathEnum.BANK_HOME,
    url: BankPathEnum.BANK_HOME
  },
  {
    title: "Users",
    icon: GroupIcon,
    key: RouteConst.ADMIN_USER_MANAGEMENT,
    url: RouteConst.ADMIN_USER_MANAGEMENT
  },
  {
    title: "Preferences",
    key: "Preferences",
    icon: PreferencesIcon,
    url: RouteConst.PREFERENCES_GENERAL_PAGES
  }
];
const menuPreferencesData = [
  {
    title: "General",
    key: RouteConst.PREFERENCES_GENERAL_PAGES,
    url: RouteConst.PREFERENCES_GENERAL_PAGES
  },
  {
    title: "Branding",
    key: RouteConst.PREFERENCES_BRANDING_PAGES,
    url: RouteConst.PREFERENCES_BRANDING_PAGES
  }
];

export const getMenuData = () => menuData;

export const getMenuSettingsData = () => menuSettingsData;

export const getMenuPreferencesData = () => menuPreferencesData;
