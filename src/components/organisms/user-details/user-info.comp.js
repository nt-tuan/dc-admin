import React, { Fragment } from "react";
import countryList from "assets/country.json";

export const UserProfile = ({ data }) => {
  return (
    <Fragment>
      <h5 className="text-danger">Profile Information</h5>
      <div className="d-flex mb-4 align-items-center w-50">
        <span className="w-100">
          {Object.keys(FIELDS).map((field) => {
            let value = data[field];
            if (field === FIELDS.country) {
              const parsedCountry =
                countryList.find((c) => c.alpha2Code === data[field].toUpperCase()) || {};
              value = parsedCountry.name;
            }
            return (
              <div className="d-flex justify-content-between" key={field}>
                <b>{LABELS[field]}</b>
                <div>{value}</div>
              </div>
            );
          })}
        </span>
      </div>
    </Fragment>
  );
};

const FIELDS = {
  username: "username",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  email: "email",
  country: "country",
  phone: "phone"
};

const LABELS = {
  [FIELDS.username]: "User Name",
  [FIELDS.firstName]: "First Name",
  [FIELDS.middleName]: "Middle Name",
  [FIELDS.lastName]: "Last Name",
  [FIELDS.email]: "Email",
  [FIELDS.country]: "Country",
  [FIELDS.phone]: "Phone Number"
};
