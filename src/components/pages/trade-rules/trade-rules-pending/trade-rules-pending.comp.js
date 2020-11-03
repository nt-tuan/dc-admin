import { getTraderRulesPending } from "commons/schemas/trade-rules.schema";
import { DTCTable } from "components/atoms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ProductRuleService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";

export const TradeRulesPendingTab = memo((status) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getPendingData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const result = await getAllRecordsFromAPI(ProductRuleService.getProductTradeRules, {
        outerParams: status
      });
      setData(result);
      setLoading(false);
    });
  }, [status]);

  useEffect(() => {
    getPendingData();
  }, [getPendingData]);
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
