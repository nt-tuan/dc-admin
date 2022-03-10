export const featuresAndModulesConst = {
  paymentServices: {
    name: "paymentServices",
    label: "External Payment & Services",
    tooltipTitle: `This feature adds a section in the Seller’s offer form called "Order Fulfillment" where the Seller has the option to choose between 1) Marketplace Services 2) External Payment & Services or choose both to allow the buyer to set their preference. If the Traders agree on using "External Payment & Services", the trade cycle is completed after confirming the Pro Forma Invoice. In this case, the Marketplace Wallet and Logistics Services are not used by either trader.`
  },
  registration: {
    name: "registration",
    label: "Registration: Skip Email Verification Step",
    tooltipTitle: `This feature allows traders to log in the Marketplace upon registration and skips the email verification step. The traders will still need to complete the vetting process before gaining full access to trade on the Marketplace.`
  },
  staggeredKYC: {
    name: "staggeredKYC",
    label: "Staggered KYC",
    tooltipTitle: `This feature gives traders access to the Marketplace upon registration and email verification to login, yet limits their trading activities before completing the vetting process. The limitations are; as a Seller: is able to post product offers, however will not be able to respond to bids nor start trading before completing the vetting process; as a Buyer: is able to see and review all sellers’ offers on the marketplace, however will not be able to place a bid nor start trading before completing the vetting process, which activates their wallet for trading.`
  },
  timeConstraint: {
    name: "timeConstraint",
    label: "Time Constraint",
    tooltipTitle: `This feature adds a timer of 2 working days to the following steps of the trade cycle; Confirm Pro Forma Invoice, Provide Shipping Details, Upload Shipping Documents, and Choose Logistics Provider.`
  }
};

export const whoCreateProductConst = {
  marketplace: {
    name: "marketplace",
    label: "Marketplace creates Products",
    value: "MARKETPLACE"
  },
  seller: {
    name: "seller",
    label: "Seller creates Products",
    value: "SELLER"
  },
  both: {
    name: "both",
    label: "Both Marketplace and Seller create Products",
    value: "BOTH"
  }
};

export const hotJarLink = "https://www.hotjar.com/";
