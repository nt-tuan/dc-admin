import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "antd";
import { useHistory, useLocation } from "react-router-dom";

import { OrderActiveTab } from "./tabs/order-active-tab.comp";
import { OrderHistoryTab } from "./tabs/order-history-tab.comp";
import { getURLParams } from "utils/url.util";

const TAB_KEYS = {
  PAST_ORDERS: "PAST_ORDERS",
  ACTIVE_ORDERS: "ACTIVE_ORDERS"
};

const { PAST_ORDERS, ACTIVE_ORDERS } = TAB_KEYS;

const renderActive = () => <OrderActiveTab />;
const renderHistory = () => <OrderHistoryTab />;

const OrdersPage = () => {
  const { search } = useLocation();
  const history = useHistory();

  //Check URL to return Order Tab
  const isPastOrders = React.useMemo(
    () => search && getURLParams(search).find((item) => item.isPastOrders),
    [search]
  );

  const [tab, setTab] = useState(isPastOrders ? PAST_ORDERS : ACTIVE_ORDERS);

  const handleChangeTab = (key) => {
    setTab(key);
    //Reset the search keyword when toggle between tabs
    if (search) history.replace({ search: "" });
  };

  const renderTabButton = (tabName, key) => {
    return (
      <Button
        shape="round"
        type={tab === key ? "primary" : "default"}
        className="mr-2"
        onClick={() => handleChangeTab(key)}
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
