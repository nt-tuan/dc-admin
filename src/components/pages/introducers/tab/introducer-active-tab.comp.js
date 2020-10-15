import { IntroducerContainer } from "components/organisms";
import React, { memo, useCallback, useEffect, useState } from "react";
import { IntroducerService } from "services";
import { DatetimeUtils } from "utils/date-time.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";

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
// const fakedData = [
//   {
//     id: "ghf7sdjs3-safsf-443",
//     companyName: "Bimonter",
//     country: "SG",
//     email: "ahahah@yopmail.com",
//     expiryDate: "2020-10-07T04:16:26.896Z",
//     firstName: "HGD",
//     lastName: "WSW",
//     middleName: "UHU",
//     phone: "018 394853",
//     username: "AHA",
//     createdDate: "2020-10-07T04:49:36.356Z",
//     numberOfTraders: 7,
//     numberOfTrade: 23,
//     status: "ACTIVE",
//     totalCommission: 0
//   }
// ];
