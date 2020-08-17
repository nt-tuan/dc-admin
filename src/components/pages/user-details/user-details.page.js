import { Checkbox } from "antd";
import { LoadingIndicator } from "components/atoms";
import {
  CompanyInfo,
  OwnerInfo,
  RebatesInfo,
  Reputation,
  UserProfile,
  CompanyLogo
} from "components/organisms/user-details";
import qs from "qs";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { UserService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

const UserDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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

  const handleMarketplaceCredit = (id, isEnable) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await UserService.manageMarketplaceCredit(id, isEnable);
      getUserDetails();
    });
  };

  return (
    <Fragment>
      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="air__utils__shadow bg-white p-4 dtc-br-10">
          {data.companyInfo.logoUrl && (
            <>
              <div>
                <CompanyLogo companyInfo={data.companyInfo} />
              </div>
              <hr />
            </>
          )}

          <div className="mt-3">
            <UserProfile data={data.userInfo} />
          </div>
          <hr />
          <div className="mt-3">
            <CompanyInfo
              companyInfo={data.companyInfo}
              companyAddress={data.companyAddressInfoList}
            />
          </div>
          <hr />
          <div className="mt-3">
            <OwnerInfo owners={data.ownerDTOS.map((data) => ({ ...data, ...data.address }))} />
          </div>
          <hr />
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
              setLoading={setLoading}
              getUserDetails={getUserDetails}
            />
          </div>
          <div className="w-50 mt-3">
            <h5 className="text-danger">Marketplace Credit</h5>
            <Checkbox
              checked={data.companyInfo.enableMarketplaceCredit}
              onClick={() =>
                handleMarketplaceCredit(
                  data.companyInfo.id,
                  !data.companyInfo.enableMarketplaceCredit
                )
              }
            >
              Enable Marketplace Credit for the user
            </Checkbox>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserDetails;
