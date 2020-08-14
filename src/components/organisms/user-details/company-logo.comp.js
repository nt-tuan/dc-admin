import React, { Fragment } from "react";
import { Avatar } from "antd";

export const CompanyLogo = ({ companyInfo }) => {
  return (
    <Fragment bodyStyle={{ padding: "10px 15px" }} hoverable={true} className="dtc-br-10">
      <h5 className="text-danger">Company Logo</h5>
      <div className="d-flex mb-4 align-items-center w-75">
        <div style={{ width: 100, height: 100 }} className="mr-3">
          <Avatar
            shape="square"
            size={100}
            src={companyInfo && companyInfo.logoUrl}
            icon={companyInfo.logoUrl || <i className="fe fe-user" />}
            className="mr-3 dtc-cursor-pointer"
          />
        </div>
      </div>
    </Fragment>
  );
};
