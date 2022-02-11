import { DTCTabs, useTabSearchParams } from "components/commons";
import React, { memo } from "react";

import { Helmet } from "react-helmet";
import { HistoryWithdrawalTab } from "./components/history-withdrawal-tab.comp";
import { PendingWithdrawalTab } from "./components/pending-withdrawal-tab.comp";
import { RequestWithdrawalTab } from "./components/request-withdrawal-tab.comp";

const tabs = [
  {
    key: "REQUEST_WITHDRAWAL",
    label: "Request Withdrawal",
    component: <RequestWithdrawalTab />
  },
  {
    key: "PENDING_WITHDRAWAL",
    label: "Pending Withdrawal",
    component: <PendingWithdrawalTab />
  },
  {
    key: "WITHDRAWAL_HISTORY",
    label: "Withdrawal History",
    component: <HistoryWithdrawalTab />
  }
];

const WithdrawalPage = memo(() => {
  const [value, handleChange] = useTabSearchParams(tabs);
  return (
    <article>
      <Helmet title="Withdraw Fund" />
      <DTCTabs tabs={tabs} value={value} onChange={handleChange} />
    </article>
  );
});

export default WithdrawalPage;
