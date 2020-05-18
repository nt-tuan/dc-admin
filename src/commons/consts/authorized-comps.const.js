import { PERMISSIONS_IDS, PERMISSION_LEVELS } from "./permissions";
import { ROUTES } from "./system";

const { VIEW, VIEW_AND_ACTION, APPROVER, NONE } = PERMISSION_LEVELS;

const SELLER_PROFILE_AUTHORIZED_ROUTES = Object.freeze({
  [ROUTES.SELLER_PROFILE_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_PROFILE_INFO_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_COMPANY_INFO_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_OWNER_INFO_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_BANK_DETAILS_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_DOCUMENTS_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_SECURITY_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_TAB_SETTING_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const BUYER_PROFILE_AUTHORIZED_ROUTES = Object.freeze({
  [ROUTES.BUYER_PROFILE_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_PROFILE_INFO_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_COMPANY_INFO_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_OWNER_INFO_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_BANK_DETAILS_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_DOCUMENTS_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_SECURITY_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_TAB_SETTING_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_SUB_LIST]: {
    requiredPermission: PERMISSIONS_IDS.SET_NOTIFICATION_PRODUCT,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const SELLER_POST_PRODUCT_DISTICHAIN_AUTHORIZED_ROUTES = Object.freeze({
  [ROUTES.SELLER_PENDING_APPROVAL_POST_PRODUCT]: {
    requiredPermission: PERMISSIONS_IDS.POST_PRODUCT_DISTICHAIN,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const BUYER_POST_PRODUCT_DISTICHAIN_AUTHORIZED_ROUTES = Object.freeze({
  [ROUTES.BUYER_PENDING_APPROVAL_POST_PRODUCT]: {
    requiredPermission: PERMISSIONS_IDS.POST_PRODUCT_DISTICHAIN,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const AUTHORIZED_ROUTES = Object.freeze({
  ...SELLER_PROFILE_AUTHORIZED_ROUTES,
  ...BUYER_PROFILE_AUTHORIZED_ROUTES,
  ...SELLER_POST_PRODUCT_DISTICHAIN_AUTHORIZED_ROUTES,
  ...BUYER_POST_PRODUCT_DISTICHAIN_AUTHORIZED_ROUTES,
  [ROUTES.ADMIN_USER_MANAGEMENT_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.ADMIN,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },
  [ROUTES.ADMIN_USER_MANAGEMENT_ADD_USER_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.ADMIN,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },
  [ROUTES.BUYER_INVENTORY_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.MANAGE_USER_INVENTORY,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_INVENTORY_ROUTE]: {
    requiredPermission: PERMISSIONS_IDS.MANAGE_USER_INVENTORY,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_CANCELLED_ORDER]: {
    requiredPermission: PERMISSIONS_IDS.CANCELLED_ORDER,
    viewableLevels: [VIEW]
  },
  [ROUTES.BUYER_CANCELLED_ORDER]: {
    requiredPermission: PERMISSIONS_IDS.CANCELLED_ORDER,
    viewableLevels: [VIEW]
  },

  [ROUTES.SELLER_UPLOAD_SERIAL_NUMBER]: {
    requiredPermission: PERMISSIONS_IDS.SERIAL_NUMBER,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_SERIAL_NUMBER]: {
    requiredPermission: PERMISSIONS_IDS.SERIAL_NUMBER,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },

  [ROUTES.SELLER_REVIEW_ORDER]: {
    requiredPermission: PERMISSIONS_IDS.REVIEW_RATING,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.BUYER_REVIEW_ORDER]: {
    requiredPermission: PERMISSIONS_IDS.REVIEW_RATING,
    viewableLevels: [VIEW_AND_ACTION]
  },
  [ROUTES.SELLER_BIDDING_ARENA]: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },
  [ROUTES.BUYER_BIDDING_ARENA]: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  }
});

const INVENTORY_COMPS = Object.freeze({
  InventoryLeftMenu: {
    requiredPermission: PERMISSIONS_IDS.MANAGE_USER_INVENTORY,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },
  ImportInventoryBtn: {
    requiredPermission: PERMISSIONS_IDS.MANAGE_USER_INVENTORY,
    viewableLevels: [VIEW_AND_ACTION]
  },
  InventorySellBtn: {
    requiredPermission: PERMISSIONS_IDS.MANAGE_USER_INVENTORY,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },
  InventoryDeleteBtn: {
    requiredPermission: PERMISSIONS_IDS.MANAGE_USER_INVENTORY,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const USER_PROFILE_COMPS = Object.freeze({
  UserProfileLeftMenu: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  },
  UserProfileTopMenu: {
    requiredPermission: PERMISSIONS_IDS.PROFILE,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const POST_PRODUCT_COMPS = Object.freeze({
  SaleProductSubmitBtn: {
    requiredPermission: PERMISSIONS_IDS.POST_PRODUCT_DISTICHAIN,
    viewableLevels: [VIEW_AND_ACTION, APPROVER]
  },
  PostProductApprover: {
    requiredPermission: PERMISSIONS_IDS.POST_PRODUCT_DISTICHAIN,
    viewableLevels: [APPROVER]
  },
  PostProductSubUser: {
    requiredPermission: PERMISSIONS_IDS.POST_PRODUCT_DISTICHAIN,
    viewableLevels: [VIEW_AND_ACTION]
  }
});

const BID_PRODUCT_COMPS = Object.freeze({
  BidProductApprovals: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [APPROVER]
  },
  BidProductPendingApprovals: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [VIEW_AND_ACTION]
  },
  BiddingArenaLeftMenu: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },
  BidProductViewAction: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [VIEW_AND_ACTION, APPROVER]
  },
  OnlyViewBidProduct: {
    requiredPermission: PERMISSIONS_IDS.BID_PRODUCT,
    viewableLevels: [VIEW]
  }
});

export const AUTHORIZED_COMPS = Object.freeze({
  UserManagementMenuItem: {
    requiredPermission: PERMISSIONS_IDS.ADMIN,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },

  AuditLogMenuItem: {
    requiredPermission: PERMISSIONS_IDS.ADMIN,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },

  ...USER_PROFILE_COMPS,

  ...INVENTORY_COMPS,

  ...POST_PRODUCT_COMPS,

  ...BID_PRODUCT_COMPS,

  CancelledOrderLeftMenu: {
    requiredPermission: PERMISSIONS_IDS.CANCELLED_ORDER,
    viewableLevels: [VIEW]
  },

  SubscribeButton: {
    requiredPermission: PERMISSIONS_IDS.SET_NOTIFICATION_PRODUCT,
    viewableLevels: [VIEW_AND_ACTION]
  },

  UserSubListTopMenu: {
    requiredPermission: PERMISSIONS_IDS.SET_NOTIFICATION_PRODUCT,
    viewableLevels: [VIEW_AND_ACTION]
  },

  SerialNumberViewAction: {
    requiredPermission: PERMISSIONS_IDS.SERIAL_NUMBER,
    viewableLevels: [VIEW]
  },

  SerialNumberUploadAction: {
    requiredPermission: PERMISSIONS_IDS.SERIAL_NUMBER,
    viewableLevels: [VIEW_AND_ACTION]
  },

  SellerInspectionReportView: {
    requiredPermission: PERMISSIONS_IDS.INSPECTION_REPORT,
    viewableLevels: [VIEW, VIEW_AND_ACTION]
  },

  BuyerInspectionReportView: {
    requiredPermission: PERMISSIONS_IDS.INSPECTION_REPORT,
    viewableLevels: [VIEW]
  },

  BuyerInspectionReportViewAction: {
    requiredPermission: PERMISSIONS_IDS.INSPECTION_REPORT,
    viewableLevels: [VIEW_AND_ACTION]
  },

  ReviewRatingAction: {
    requiredPermission: PERMISSIONS_IDS.REVIEW_RATING,
    viewableLevels: [VIEW_AND_ACTION]
  },

  ProvideShippingView: {
    requiredPermission: PERMISSIONS_IDS.PROVIDE_SHIPPING_INFORMATION,
    viewableLevels: [VIEW]
  },

  ProvideShippingViewAction: {
    requiredPermission: PERMISSIONS_IDS.PROVIDE_SHIPPING_INFORMATION,
    viewableLevels: [VIEW_AND_ACTION]
  },

  ProvideShippingNone: {
    requiredPermission: PERMISSIONS_IDS.PROVIDE_SHIPPING_INFORMATION,
    viewableLevels: [NONE]
  },

  ViewProviderButton: {
    requiredPermission: PERMISSIONS_IDS.LOGISTICS_PROVIDER,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },
  ViewQuoteDetailButton: {
    requiredPermission: PERMISSIONS_IDS.LOGISTICS_PROVIDER,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },
  AcceptProviderButton: {
    requiredPermission: PERMISSIONS_IDS.LOGISTICS_PROVIDER,
    viewableLevels: [VIEW_AND_ACTION, APPROVER]
  },

  InitiatorOrderManagement: {
    requiredPermission: PERMISSIONS_IDS.ADMIN,
    viewableLevels: [VIEW, VIEW_AND_ACTION, APPROVER]
  },

  ...AUTHORIZED_ROUTES
});
