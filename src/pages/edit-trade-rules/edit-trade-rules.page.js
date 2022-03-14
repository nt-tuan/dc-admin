import { DTCSection } from "components/commons";
import { TradeRules } from "components/trade-route";
import qs from "qs";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ProductRuleService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

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
    // TODO: @HauDo please resolve this
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
