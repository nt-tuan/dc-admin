import React, { useState } from "react";
import { ActiveCreditTab } from "./tabs/active-credit-tab.comp";
import { HistoryCreditTab } from "./tabs/history-credit-tab.comp";
import { Button } from "antd";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";

const TABS_KEYS = {
  ACTIVE: "ACTIVE",
  HISTORY: "HISTORY"
};

const { ACTIVE, HISTORY } = TABS_KEYS;

const CreditStatusPage = () => {
  const [tab, setTab] = useState(ACTIVE);

  const renderActiveTab = () => <ActiveCreditTab />;
  const renderHistoryTab = () => <HistoryCreditTab />;

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
      <Helmet title="Credit Status" />
      <div className="d-flex justify-content-between mb-3 ml-2">
        <div>
          {renderTabButton("Active Credit", ACTIVE)}
          {renderTabButton("History", HISTORY)}
        </div>
        <div title="Marketplace credit">
          <Link to={RouteConst.CREDIT_USERS}>
            <Button type="primary" className="mr-4">
              Assign credit
            </Button>
          </Link>
        </div>
      </div>
      {tab === ACTIVE && renderActiveTab()}
      {tab === HISTORY && renderHistoryTab()}
    </article>
  );
};

export default CreditStatusPage;
