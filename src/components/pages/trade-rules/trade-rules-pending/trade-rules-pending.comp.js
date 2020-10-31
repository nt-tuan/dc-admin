import { getTraderRulesPending } from "commons/schemas/trade-rules.schema";
import { DTCTable } from "components/atoms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ProductService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

export const TradeRulesPendingTab = memo(() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getPendingData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const result = await ProductService.getProductTradeRulesPending();
      setData(result);
      setLoading(false);
    });
  });
  useEffect(() => {
    getPendingData();
  }, []);
  const handleCreateTradeRules = () => {};

  return (
    <section className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
      <DTCTable
        showSetting={false}
        loading={loading}
        dataSource={data}
        schema={getTraderRulesPending(handleCreateTradeRules)}
      />
    </section>
  );
});
