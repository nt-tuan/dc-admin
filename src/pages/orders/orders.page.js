import { DTCTabs } from "components/commons";
import { Helmet } from "react-helmet";
import { OrderActiveTab } from "./order-active-tab.comp";
import { OrderHistoryTab } from "./order-history-tab.comp";
import React from "react";
import { useSearchParams } from "hooks/use-search-params";

const tabs = [
  {
    key: "ACTIVE_ORDERS",
    label: "Active Orders",
    component: <OrderActiveTab />
  },
  {
    key: "PAST_ORDERS",
    label: "Order History",
    component: <OrderHistoryTab />
  }
];

const OrdersPage = () => {
  const [filter, setFilter] = useSearchParams();
  const value = React.useMemo(() => {
    if (tabs.some((tab) => tab.key === filter?.tab)) return filter.tab;
    return tabs[0]?.key;
  }, [filter]);

  const handleChange = (newValue) => {
    setFilter({ tab: newValue });
  };

  return (
    <article>
      <Helmet title="Orders" />
      <DTCTabs tabs={tabs} value={value} onChange={handleChange} />
    </article>
  );
};

export default OrdersPage;
