import { IntroducerContainer } from "components/organisms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { IntroducerService } from "services";
import { DatetimeUtils } from "utils/date-time.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import countryList from "assets/country.json";

const { formatDateTime } = DatetimeUtils;

export const IntroducerActiveTab = memo(() => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const getAllRecords = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      let res = await getAllRecordsFromAPI(IntroducerService.getActiveIntroducer);
      res = res.map((item) => ({
        ...item,
        createdDate: formatDateTime(item.createdDate),
        expiryDate: formatDateTime(item.expiryDate),
        country: countryList.find((c) => c.alpha2Code === item.country).name,
        phone: `+${item.phone}`
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
