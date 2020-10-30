import { MARKETPLACE_NAME } from "commons/consts";
import React, { memo, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import qs from "qs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { IntroducerService } from "services";
import moment from "moment";
import { LoadingIndicator } from "components/atoms";
import { CreateIntroducerForm } from "components/molecules";
import { useDispatch } from "react-redux";
import * as USER_DUCK from "redux/user/user.duck";

const EditIntroducerPage = memo(() => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const location = useLocation();
  const { id } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const dispatch = useDispatch();

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
  }, []);

  if (process.env.REACT_APP_COMPANY_NAME !== MARKETPLACE_NAME["8Corners"]) {
    return <Redirect to="/" />;
  }

  const updateIntroducerDetailsFormAPI = (data, { onError }) => {
    dispatch({
      type: USER_DUCK.UPDATE_PROFILE_INTRODUCER,
      payload: { values: data, id: id, onError }
    });
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      {loading ? (
        <div className="text-center">
          <LoadingIndicator />
        </div>
      ) : (
        <CreateIntroducerForm
          name="Edit Introducer"
          initialValues={data}
          isEdit={true}
          id={id}
          onSubmitData={updateIntroducerDetailsFormAPI}
        />
      )}
    </div>
  );
});

export default EditIntroducerPage;
