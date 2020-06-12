import React, { useState } from "react";
import { OrderActiveTab } from "./tabs/order-active-tab.comp";
import { OrderHistoryTab } from "./tabs/order-history-tab.comp";
import { Helmet } from "react-helmet";
import { Button } from "antd";

const TAB_KEYS = {
  PAST_ORDERS: "PAST_ORDERS",
  ACTIVE_ORDERS: "ACTIVE_ORDERS"
};

const { PAST_ORDERS, ACTIVE_ORDERS } = TAB_KEYS;

const renderActive = () => <OrderActiveTab />;
const renderHistory = () => <OrderHistoryTab />;

const OrdersPage = () => {
  const [tab, setTab] = useState(ACTIVE_ORDERS);

  const renderTabButton = (tabName, key) => {
    return (
      <Button
        shape="round"
        type={tab === key ? "primary" : "default"}
        className="mr-2"
        onClick={() => setTab(key)}
      >
        {tabName}
      </Button>
    );
  };
  return (
    <article>
      <Helmet title="Order Management" />
      <div className="flex mb-3 ml-2">
        {renderTabButton("Active Orders", ACTIVE_ORDERS)}
        {renderTabButton("Order History", PAST_ORDERS)}
      </div>
      {tab === ACTIVE_ORDERS && renderActive()}
      {tab === PAST_ORDERS && renderHistory()}
    </article>
  );
};

export default OrdersPage;
