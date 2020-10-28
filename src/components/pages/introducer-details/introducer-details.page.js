import { MARKETPLACE_NAME } from "commons/consts";
import React, { memo, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import qs from "qs";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { IntroducerService } from "services/introducer.service";
import moment from "moment";
import { LoadingIndicator } from "components/atoms";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { CreateIntroducerForm } from "components/molecules";
import { Helmet } from "react-helmet";

const IntroducerDetailsPage = memo(() => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const location = useLocation();
  const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      let res = await IntroducerService.getIntroducerDetails(id);
      const { traderDTOList, phone } = res;
      const phoneParsed = phone.split(" ");
      const traderCompanyName = [];
      const traderUserName = [];
      traderDTOList.forEach((trader) => {
        if (trader.username === null) {
          traderCompanyName.push(trader.companyName);
        } else {
          traderUserName.push(trader.username);
        }
      });
      setData({
        ...res,
        expiryDate: moment(res.expiryDate),
        traderCompanyName,
        traderUserName,
        phone: phoneParsed[1],
        phonePrefix: `+${phoneParsed[0]}`
      });
      setLoading(false);
    });
  }, [id]);

  if (process.env.REACT_APP_COMPANY_NAME !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }
  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <Helmet title="Introducer Details" />
      {loading ? (
        <div className="text-center">
          <LoadingIndicator />
        </div>
      ) : (
        <CreateIntroducerForm
          name="Introducer Details"
          initialValues={data}
          isView={true}
          id={id}
        />
      )}
    </div>
  );
});

export default IntroducerDetailsPage;
