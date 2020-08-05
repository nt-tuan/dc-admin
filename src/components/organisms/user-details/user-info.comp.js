import React, { Fragment } from "react";

export const UserProfile = ({ data }) => {
  return (
    <Fragment>
      <h5 className="text-danger">Profile Information</h5>
      {Object.keys(FIELDS).map((field) => (
        <div className="d-flex justify-content-between" key={field}>
          <b>{LABELS[field]}</b>
          <div>{data[field]}</div>
        </div>
      ))}
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
