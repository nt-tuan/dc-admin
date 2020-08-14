import React, { useState } from "react";
import { CreditRequestTab } from "./tabs/credit-request-tab.comp";
import { CreditRequestHistoryTab } from "./tabs/credit-request-history-tab.comp";
import { Button } from "antd";
import { Helmet } from "react-helmet";

const TAB_KEYS = {
  REQUEST: "REQUEST",
  HISTORY: "HISTORY"
};

const { REQUEST, HISTORY } = TAB_KEYS;

const CreditRequestPage = () => {
  const [tab, setTab] = useState(REQUEST);

  const renderRequestTab = () => <CreditRequestTab />;
  const renderHistoryTab = () => <CreditRequestHistoryTab />;

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
      <Helmet title="Credit Request" />
      {renderTabButton("Credit Request", REQUEST)}
      {renderTabButton("History", HISTORY)}
      {tab === REQUEST && renderRequestTab()}
      {tab === HISTORY && renderHistoryTab()}
    </article>
  );
};

export default CreditRequestPage;
