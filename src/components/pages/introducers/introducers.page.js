import { Button } from "antd";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";
import { IntroducerActiveTab } from "./tab/introducer-active-tab.comp";
import { IntroducerInActiveTab } from "./tab/introducer-inactive-tab.comp";
import { MARKETPLACE_NAME } from "commons/consts";
import { Redirect } from "react-router-dom";

const TAB_KEYS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};

const { ACTIVE, INACTIVE } = TAB_KEYS;

const IntroducersPage = memo(() => {
  const [tab, setTab] = useState(ACTIVE);

  const renderActiveTab = () => <IntroducerActiveTab />;
  const renderInActiveTab = () => <IntroducerInActiveTab />;

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

  if (process.env.REACT_APP_COMPANY_NAME !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }

  return (
    <article>
      <Helmet title="Introducers" />
      {renderTabButton("Active", ACTIVE)}
      {renderTabButton("Inactive", INACTIVE)}
      {tab === ACTIVE && renderActiveTab()}
      {tab === INACTIVE && renderInActiveTab()}
    </article>
  );
});

export default IntroducersPage;