import React, { memo, useCallback, useEffect, useState } from "react";

import { DTCSection } from "components/commons";
import { Helmet } from "react-helmet";
import { ProductRuleService } from "services";
import { TradeRules } from "components/trade-route";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import qs from "qs";

const EditTradeRulesPage = memo(() => {
  const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [data, setData] = useState([]);
  const getSelectedProduct = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      if (id) {
        const result = await ProductRuleService.getProductTradeRuleDetail(id);
        setData(result);
      }
    });
  }, []);

  useEffect(() => {
    getSelectedProduct();
  }, [getSelectedProduct]);

  return (
    <DTCSection>
      <DTCSection.Content>
        <Helmet title="Edit Trade Rules" />
        <TradeRules initialValues={data} />
      </DTCSection.Content>
    </DTCSection>
  );
});

export default EditTradeRulesPage;
