import { Button } from "antd";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";
import { HistoryWithdrawalTab } from "./tabs/history-withdrawal-tab.comp";
import { PendingWithdrawalTab } from "./tabs/pending-withdrawal-tab.comp";
import { RequestWithdrawalTab } from "./tabs/request-withdrawal-tab.comp";

const TAB_KEYS = {
  REQUEST_WITHDRAWAL: "REQUEST_WITHDRAWAL",
  PENDING_WITHDRAWAL: "PENDING_WITHDRAWAL",
  WITHDRAWAL_HISTORY: "WITHDRAWAL_HISTORY"
};

const { REQUEST_WITHDRAWAL, PENDING_WITHDRAWAL, WITHDRAWAL_HISTORY } = TAB_KEYS;

const WithdrawalPage = memo(() => {
  const [tab, setTab] = useState(REQUEST_WITHDRAWAL);

  const renderTabButton = (tabName, key) => {
    return (
      <Button
        shape="round"
        type={tab === key ? "primary" : "default"}
        className="mr-2 my-1 my-sm-0"
        onClick={() => setTab(key)}
      >
        {tabName}
      </Button>
    );
  };

  const renderRequestWithdrawal = () => {
    return <RequestWithdrawalTab />;
  };

  const renderPendingWithdrawal = () => {
    return <PendingWithdrawalTab />;
  };

  const renderWithdrawalHistory = () => {
    return <HistoryWithdrawalTab />;
  };

  return (
    <article>
      <Helmet title="Withdraw Fund" />
      <div className="flex mb-3 ml-2">
        {renderTabButton("Request Withdrawal", REQUEST_WITHDRAWAL)}
        {renderTabButton("Pending Withdrawal", PENDING_WITHDRAWAL)}
        {renderTabButton("Withdrawal History", WITHDRAWAL_HISTORY)}
      </div>
      {tab === REQUEST_WITHDRAWAL && renderRequestWithdrawal()}
      {tab === PENDING_WITHDRAWAL && renderPendingWithdrawal()}
      {tab === WITHDRAWAL_HISTORY && renderWithdrawalHistory()}
    </article>
  );
});

export default WithdrawalPage;
