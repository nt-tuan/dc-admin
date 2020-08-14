import React, { useState, useEffect } from "react";
import { CreditStatusContainer } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { CreditService } from "services";
import { parseDataCredit } from "commons/mappers";

export const ActiveCreditTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(CreditService.getCreditByType, {
        outerParams: { type: 0 }
      });
      const parsedData = parseDataCredit(res);
      setData(parsedData);
      setLoading(false);
    });
  }, []);

  return <CreditStatusContainer data={data} loading={loading} isActive={true} />;
};
