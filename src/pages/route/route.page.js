import { DTCTabs, useTabSearchParams } from "components/commons";

import { DefaultRouteTab } from "./tabs/default-route-tab";
import { Helmet } from "react-helmet";
import React from "react";
import { RouteTab } from "./tabs/route-tab";

const TAB_KEYS = {
  DEFAULT_ROUTE: "DEFAULT_ROUTE",
  ROUTE: "ROUTE"
};

const { DEFAULT_ROUTE, ROUTE } = TAB_KEYS;

const tabs = [
  {
    label: "Trade Routes",
    key: ROUTE,
    component: <RouteTab />
  },
  {
    label: "Default Trade Routes",
    key: DEFAULT_ROUTE,
    component: <DefaultRouteTab />
  }
];

const RoutePage = () => {
  const [value, onChange] = useTabSearchParams(tabs);

  return (
    <article>
      <Helmet title="Trade Routes" />

      <DTCTabs value={value} onChange={onChange} tabs={tabs} />
    </article>
  );
};

export default RoutePage;
