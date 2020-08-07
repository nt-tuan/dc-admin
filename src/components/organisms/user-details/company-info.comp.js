import React, { Fragment } from "react";
import { Avatar, Card } from "antd";
import styles from "./shared-styles.module.scss";
import { DatetimeUtils } from "utils/date-time.util";
import { WEEK_DAYS } from "commons/consts";
import countryList from "assets/country.json";

export const CompanyInfo = ({ companyInfo, companyAddress }) => {
  return (
    <Fragment>
      <h5 className="text-danger">Company Information</h5>
      <div className="d-flex mb-4 align-items-center w-50">
        <Avatar
          shape="square"
          size={100}
          src={companyInfo && companyInfo.logoUrl}
          icon={companyInfo.logoUrl || <i className="fe fe-user" />}
          className="mr-3 dtc-cursor-pointer"
        />
        <span className="w-100">
          <CompanyInfoReadonly companyInfo={companyInfo} />
        </span>
      </div>
      <CompanyAddressReadonly companyAddress={companyAddress} />
    </Fragment>
  );
};

const CompanyInfoReadonly = ({ companyInfo }) => {
  return (
    <div>
      {Object.keys(FIELDS).map((field) => {
        let value = companyInfo[field];
        if ([FIELDS.workingStartTime, FIELDS.workingEndTime].includes(field)) {
          value = DatetimeUtils.minutesTotime(value, true);
        }
        if (field === FIELDS.workingDays) {
          value = value
            .split(",")
            .map((workDay) => WEEK_DAYS[workDay])
            .join(", ");
        }
        return (
          <div className="d-flex justify-content-between" key={field}>
            <b>{LABELS[field]}</b>
            <div className={styles["text-ellipsis"]}>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

const CompanyAddressReadonly = ({ companyAddress }) => {
  return (
    <div className="mt-3">
      <h6>Company Address</h6>
      <div className="row">
        {companyAddress.map((address, index) => (
          <div className="col-12 col-lg-6 mb-4" key={address.id || index}>
            <Card bodyStyle={{ padding: "10px 15px" }} hoverable={true} className="dtc-br-10">
              {Object.keys(ADDRESS_FIELDS).map((field) => {
                let value = address[field];
                if (field === ADDRESS_FIELDS.country) {
                  const parsedCountry =
                    countryList.find((c) => c.alpha2Code === address[field]) || {};
                  value = parsedCountry.name;
                }
                return (
                  <div className="d-flex justify-content-between" key={field}>
                    <b>{ADDRESS_LABELS[field]}</b>
                    <div title={value} className={styles["text-ellipsis"]}>
                      {value}
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const FIELDS = {
  name: "name",
  registrationNumber: "registrationNumber",
  timezone: "timezone",
  workingStartTime: "workingStartTime",
  workingEndTime: "workingEndTime",
  workingDays: "workingDays",
  officeNumber: "officeNumber"
};

const LABELS = {
  [FIELDS.name]: "Company Name",
  [FIELDS.registrationNumber]: "Company Registration Number",
  [FIELDS.timezone]: "Timezone",
  [FIELDS.workingStartTime]: "Office Hours (Start Time)",
  [FIELDS.workingEndTime]: "Office Hours (End Time)",
  [FIELDS.workingDays]: "Working Days",
  [FIELDS.officeNumber]: "Office Number"
};

const ADDRESS_FIELDS = {
  addressLine1: "addressLine1",
  city: "city",
  country: "country",
  state: "state",
  postalCode: "postalCode",
  email: "email",
  phone: "phone"
};

const ADDRESS_LABELS = {
  [ADDRESS_FIELDS.addressLine1]: "Address Line 1",
  [ADDRESS_FIELDS.city]: "City",
  [ADDRESS_FIELDS.country]: "Country",
  [ADDRESS_FIELDS.state]: "State",
  [ADDRESS_FIELDS.postalCode]: "Postal Code",
  [ADDRESS_FIELDS.email]: "Email",
  [ADDRESS_FIELDS.phone]: "Phone Number"
};
