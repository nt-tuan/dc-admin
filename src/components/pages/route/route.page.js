import React, { useState } from "react";
import { DefaultRouteTab } from "./tabs/default-route-tab";
import { RouteTab } from "./tabs/route-tab";
import { Helmet } from "react-helmet";
import { Button } from "antd";

const TAB_KEYS = {
  DEFAULT_ROUTE: "DEFAULT_ROUTE",
  ROUTE: "ROUTE"
};

const { DEFAULT_ROUTE, ROUTE } = TAB_KEYS;

const renderRouteTab = () => <RouteTab />;
const renderDefaultRouteTab = () => <DefaultRouteTab />;

const RoutePage = () => {
  const [tab, setTab] = useState(ROUTE);

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
      <Helmet title="Trade Routes" />
      <div className="flex mb-3 ml-2">
        {renderTabButton("Trade Routes", ROUTE)}
        {renderTabButton("Default Trade Routes", DEFAULT_ROUTE)}
      </div>
      {tab === ROUTE && renderRouteTab()}
      {tab === DEFAULT_ROUTE && renderDefaultRouteTab()}
    </article>
  );
};

export default RoutePage;
