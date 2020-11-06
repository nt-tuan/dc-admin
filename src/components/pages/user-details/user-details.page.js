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
import { UserService, CompanyService } from "services";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { Helmet } from "react-helmet";

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

  const handleProductCreationPermission = (id, isEnable) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await CompanyService.updateProductCreationPermission(id, isEnable);
      getUserDetails();
    });
  };

  const handleApprove = (companyId) => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      await CompanyService.approveNewCompany({ companyId });
      getUserDetails();
    });
  };

  return (
    <Fragment>
      <Helmet title="User Detail" />
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
              user={data}
              companyId={companyId}
              setLoading={setLoading}
              getUserDetails={getUserDetails}
              isEditable={data.companyInfo.companyType !== "TRADER"}
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
              isEditable={data.companyInfo.companyType !== "TRADER"}
            />
          </div>
          {data.companyInfo.companyType !== "TRADER" && (
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
          )}
          {`${process.env.REACT_APP_COMPANY_NAME}` === "Extravaganza" ? (
            <div>
              <div className="w-50 mt-3">
                <h5 className="text-danger">Product Creation</h5>
                <Checkbox
                  checked={data.companyInfo.enableProductCreation}
                  onClick={() =>
                    handleProductCreationPermission(
                      data.companyInfo.id,
                      !data.companyInfo.enableProductCreation
                    )
                  }
                >
                  Enable Product Creation
                </Checkbox>
              </div>
              <div className="w-50 mt-3">
                <h5 className="text-danger">User Approval</h5>
                <Checkbox
                  checked={data.companyInfo.approved}
                  onClick={() => handleApprove(data.companyInfo.id)}
                  disabled={data.companyInfo.approved}
                >
                  Approve User
                </Checkbox>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

export default UserDetails;
