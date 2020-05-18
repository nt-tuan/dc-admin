import { ROUTES } from "commons/consts";

const actions = {
  SET_STATE: "menu/SET_STATE",
  SET_BUYER_DATA: "menu/SET_BUYER_DATA",
  SET_SELLER_DATA: "menu/SET_SELLER_DATA",
  SET_ADMIN_DATA: "menu/SET_ADMIN_DATA",
  SET_USER_DATA: "menu/SET_USER_DATA"
};

export default actions;

export async function getBuyerData() {
  return [
    {
      title: "Dashboard",
      key: "Dashboard",
      icon: "fa fa-dashboard",
      url: ROUTES.BUYER_DASHBOARD_ROUTE
    },
    {
      title: "Marketplace",
      key: "Marketplace",
      icon: "fe fe-shopping-cart ",
      url: ROUTES.BUYER_MARKETPLACE_ROUTE
    },
    {
      title: "Inventory",
      key: "Inventory",
      icon: "fe fe-grid",
      children: [
        {
          title: "Inventory Management",
          key: "inventoryManagement",
          url: ROUTES.BUYER_INVENTORY_ROUTE
        },
        {
          title: "Item Search",
          key: "itemSearch",
          url: ROUTES.BUYER_ITEM_SEARCH_ROUTE
        }
      ]
    },
    {
      title: "Bidding Arena",
      key: "BiddingArena",
      icon: "fa fa-dollar",
      url: ROUTES.BUYER_BIDDING_ARENA
    },
    {
      title: "Orders",
      key: "Orders",
      icon: "fe fe-layers",
      children: [
        {
          title: "Order Management",
          key: "orderManagement",
          url: ROUTES.BUYER_ORDER_MANAGEMENT
        },
        {
          title: "Track Orders",
          key: "trackOrder",
          url: ROUTES.BUYER_TRACK_ORDERS
        },
        {
          title: "Track Shipment",
          key: "trackShipping",
          url: ROUTES.BUYER_TRACK_SHIPMENT
        },
        {
          title: "Cancelled Orders",
          key: "cancelledOrder",
          url: ROUTES.BUYER_CANCELLED_ORDER
        }
      ]
    },
    {
      title: "Post Delivery",
      key: "PostDelivery",
      icon: "fe fe-flag",
      children: [
        {
          title: "Tax Invoice Request",
          key: "taxInvoiceRequest",
          url: ROUTES.BUYER_INVENTORY_ROUTE
        },
        {
          title: "Review / Rating",
          key: "reviewRating",
          url: ROUTES.BUYER_INVENTORY_ROUTE
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
          url: ROUTES.BUYER_WALLET
        },
        {
          title: "Account Summary",
          key: "accountSummary",
          url: ROUTES.BUYER_ACCOUNT_SUMMARY
        },
        {
          title: "Withdraw Fund",
          key: "Withdraw Fund",
          url: ""
        },
        {
          title: "Add Fund",
          key: "Add Fund",
          url: ""
        }
      ]
    },
    {
      title: "Approvals",
      key: "Approvals",
      icon: "fe fe-user-check",
      url: ROUTES.BUYER_APPROVAL_ROUTE
    }
  ];
}

export async function getSellerData() {
  return [
    {
      title: "Dashboard",
      key: "Dashboard",
      icon: "fa fa-dashboard",
      url: ROUTES.SELLER_DASHBOARD_ROUTE
    },
    {
      title: "Marketplace",
      key: "Marketplace",
      icon: "fe fe-shopping-cart",
      url: ROUTES.SELLER_MARKETPLACE_ROUTE
    },
    {
      title: "Inventory",
      key: "Inventory",
      icon: "fe fe-grid",
      children: [
        {
          title: "Inventory Management",
          key: "inventoryManagement",
          url: ROUTES.SELLER_INVENTORY_ROUTE
        },
        {
          title: "Item Listing",
          key: "itemListing",
          url: ROUTES.SELLER_ITEM_LISTING_ROUTE
        }
      ]
    },
    {
      title: "Bidding Arena",
      key: "BiddingArena",
      icon: "fa fa-dollar",
      url: ROUTES.SELLER_BIDDING_ARENA
    },
    {
      title: "Orders",
      key: "Orders",
      icon: "fe fe-layers",
      children: [
        {
          title: "Order Management",
          key: "orderManagement",
          url: ROUTES.SELLER_ORDER_MANAGEMENT
        },
        {
          title: "Return Management",
          key: "returnManagement",
          url: ROUTES.SELLER_INVENTORY_ROUTE
        },
        {
          title: "Track Orders",
          key: "trackOrder",
          url: ROUTES.SELLER_TRACK_ORDERS
        },
        {
          title: "Track Shipment",
          key: "trackShipping",
          url: ROUTES.SELLER_TRACK_SHIPMENT
        },
        {
          title: "Cancelled Orders",
          key: "cancelledOrder",
          url: ROUTES.SELLER_CANCELLED_ORDER
        }
      ]
    },
    {
      title: "Post Delivery",
      key: "PostDelivery",
      icon: "fe fe-flag",
      children: [
        {
          title: "VAT Invoice Request",
          key: "vatInvoiceRequest",
          url: ROUTES.SELLER_INVENTORY_ROUTE
        },
        {
          title: "Review / Rating",
          key: "reviewRating",
          url: ROUTES.SELLER_INVENTORY_ROUTE
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
          url: ROUTES.SELLER_WALLET
        },
        {
          title: "Account Summary",
          key: "accountSummary",
          url: ROUTES.SELLER_ACCOUNT_SUMMARY
        },
        {
          title: "Withdraw Fund",
          key: "Withdraw Fund",
          url: ""
        },
        {
          title: "Add Fund",
          key: "Add Fund",
          url: ""
        }
      ]
    },
    {
      title: "Approvals",
      key: "Approvals",
      icon: "fe fe-user-check",
      url: ROUTES.SELLER_APPROVAL_ROUTE
    }
  ];
}

export function getAdminData() {
  return getSellerData();
}
