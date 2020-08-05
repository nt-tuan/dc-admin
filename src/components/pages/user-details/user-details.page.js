import React, { useEffect, useState, Fragment, useCallback } from "react";
import {
  UserProfile,
  CompanyInfo,
  OwnerInfo,
  Reputation,
  RebatesInfo
} from "components/organisms/user-details";
import { Button, Checkbox } from "antd";
import { LoadingIndicator } from "components/atoms";
import { useBooleanState } from "hooks/utilHooks";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { UserService } from "services";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import qs from "qs";

const UserDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCheckCreditTerms, toggleIsCheckCreditTerms] = useBooleanState(false);
  const location = useLocation();
  const { username, companyId } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const getUserDetails = useCallback(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await UserService.getUserDetails(username);
      setData(res);
      setLoading(false);
    });
  }, [username]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <Fragment>
      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="air__utils__shadow bg-white p-4 dtc-br-10">
          <div className="w-50">
            <UserProfile data={data.userInfo} />
          </div>
          <div className="mt-3">
            <CompanyInfo
              companyInfo={data.companyInfo}
              companyAddress={data.companyAddressInfoList}
            />
          </div>
          <div className="mt-3">
            <OwnerInfo owners={data.ownerDTOS.map((data) => ({ ...data, ...data.address }))} />
          </div>
          <div className="mt-3">
            <Reputation
              data={{
                reputation: data.companyInfo.reputation,
                reputationList: data.companyInfo.reputationList
              }}
              companyId={companyId}
              setLoading={setLoading}
              getUserDetails={getUserDetails}
            />
          </div>
          <div className="w-75 mt-3">
            <RebatesInfo
              data={data.rebateResponses}
              companyName={data.companyInfo.name}
              companyId={companyId}
              username={data.userInfo.username}
            />
          </div>
          <div className="w-50 mt-3">
            <h5 className="text-danger">Credit Terms</h5>
            <Checkbox checked={isCheckCreditTerms} onClick={() => toggleIsCheckCreditTerms()}>
              Enable Trade Finance for the user
            </Checkbox>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserDetails;
