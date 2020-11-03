import { TradeRules } from "components/organisms";
import React, { memo, useCallback, useEffect, useState } from "react";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { ProductRuleService } from "services";
import { Helmet } from "react-helmet";

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
    <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
      <Helmet title="Edit Trade Rules" />
      <TradeRules initialValues={data} />
    </div>
  );
});

export default EditTradeRulesPage;
