import { RoutePathEnum } from "../../constants/route-paths.const";

export const USER_TABS_NAME = Object.freeze({
  profileInfo: "profile-info",
  companyInfo: "company-info",
  ownerInfo: "owner-info",
  bankDetails: "bank-details",
  documents: "uploaded-documents",
  security: "add-credit-security",
  settings: "settings",
  rebateDetails: "rebate-details",
  introducer: "introducer-info",
  businessDetails: "business-details"
});
const menuData = [
  {
    title: "Personal Information",
    key: RoutePathEnum.PERSIONAL_INFORMATION,
    url: RoutePathEnum.PERSIONAL_INFORMATION
  },
  {
    title: "Security",
    key: RoutePathEnum.SECURITY,
    url: RoutePathEnum.SECURITY
  },
  {
    title: "Two-Factor Authentification",
    key: RoutePathEnum.TWO_FACTOR_AUTHENTICATION,
    url: RoutePathEnum.TWO_FACTOR_AUTHENTICATION
  },
  {
    title: "Notifications",
    key: RoutePathEnum.NOTIFICATIONS,
    url: RoutePathEnum.NOTIFICATIONS
  }
];

export const getMenuData = () => menuData;
