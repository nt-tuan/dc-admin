import { DTCTabs, useTabSearchParams } from "components/commons";
import { DefaultRouteTab, RouteTab } from "../components/tabs";

import { Helmet } from "react-helmet";
import React from "react";

const TAB_KEYS = {
  DEFAULT_ROUTE: "DEFAULT_ROUTE",
  ROUTE: "ROUTE"
};

const { ROUTE, DEFAULT_ROUTE } = TAB_KEYS;

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
