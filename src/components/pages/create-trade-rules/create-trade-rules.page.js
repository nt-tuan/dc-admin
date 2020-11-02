import { TradeRules } from "components/organisms";
import React, { memo } from "react";
import { Helmet } from "react-helmet";

const CreateTradeRulesPage = memo(() => {
  return (
    <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      <Helmet title="Create Trade Rules" />
      <TradeRules />
    </div>
  );
});

export default CreateTradeRulesPage;
