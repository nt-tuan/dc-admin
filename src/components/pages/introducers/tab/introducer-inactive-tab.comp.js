import { INTRODUCER_SCHEMA } from "commons/schemas";
import { IntroducerContainer } from "components/organisms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { IntroducerService } from "services";
import { DatetimeUtils } from "utils/date-time.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import countryList from "assets/country.json";

const { formatDateTime } = DatetimeUtils;
const { FIELDS, LABELS } = INTRODUCER_SCHEMA;

export const IntroducerInActiveTab = memo(() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const getAllRecords = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      let res = await getAllRecordsFromAPI(IntroducerService.getInactiveIntroducer);
      res = res.map((item) => ({
        ...item,
        [FIELDS.numberOfTrade]: `${item[FIELDS.numberOfTrade]}`,
        createdDate: formatDateTime(item.createdDate),
        expiryDate: formatDateTime(item.expiryDate),
        country: countryList.find((c) => c.alpha2Code === item.country).name
      }));
      console.log("getAllRecords -> res", res);
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
