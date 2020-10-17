import { IntroducerContainer } from "components/organisms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { IntroducerService } from "services";
import { DatetimeUtils } from "utils/date-time.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";

const { formatDateTime } = DatetimeUtils;

export const IntroducerInActiveTab = memo(() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const getAllRecords = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      let res = await getAllRecordsFromAPI(IntroducerService.getInactiveIntroducer);
      res = res.map((item) => ({
        ...item,
        createdDate: formatDateTime(item.createdDate),
        expiryDate: formatDateTime(item.expiryDate)
      }));
      setLoading(false);
      setData(res);
    });
  }, []);

  useEffect(() => {
    getAllRecords();
  }, [getAllRecords]);

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10 mt-3">
      <IntroducerContainer data={data} loading={loading} fetchData={getAllRecords} />
    </div>
  );
});
