import { Button } from "antd";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";

const TAB_KEYS = {
  PAST_ORDERS: "PAST_ORDERS",
  ACTIVE_ORDERS: "ACTIVE_ORDERS"
};

const { PAST_ORDERS, ACTIVE_ORDERS } = TAB_KEYS;

export const OrderPageContainer = memo(({ title, renderActive, renderHistory }) => {
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
      <Helmet title={title} />
      <div className="flex mb-3 ml-2">
        {renderTabButton("Active Orders", ACTIVE_ORDERS)}
        {renderTabButton("Order History", PAST_ORDERS)}
      </div>
      {tab === ACTIVE_ORDERS && renderActive()}
      {tab === PAST_ORDERS && renderHistory()}
    </article>
  );
});
