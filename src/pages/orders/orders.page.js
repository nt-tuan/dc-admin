import React from "react";
import { OrderPageContainer } from "components";
import { OrderActiveTab } from "./tabs/order-active-tab.comp";
import { OrderHistoryTab } from "./tabs/order-history-tab.comp";

const renderActive = () => <OrderActiveTab />;
const renderHistory = () => <OrderHistoryTab />;

const OrdersPage = () => {
  return (
    <OrderPageContainer
      title="Seller Order Management"
      renderActive={renderActive}
      renderHistory={renderHistory}
    />
  );
};

export default OrdersPage;
