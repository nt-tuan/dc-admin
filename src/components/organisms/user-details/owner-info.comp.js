import React, { Fragment } from "react";

export const OwnerInfo = ({ owners }) => {
  return (
    <Fragment>
      <h5 className="text-danger">Owner Information</h5>
      {owners.map((data) => (
        <div className="row mb-2">
          {Object.keys(FIELDS).map((field) => (
            <div className="d-flex col-lg-4 col-md-6 col-sm-12 mb-1" key={field}>
              <b className="mr-1">{LABELS[field]}:</b>
              {data[field]}
            </div>
          ))}
        </div>
      ))}
    </Fragment>
  );
};

const FIELDS = {
  addressLine1: "addressLine1",
  city: "city",
  country: "country",
  email: "email",
  phone: "phone",
  postalCode: "postalCode",
  secondaryPhone: "secondaryPhone",
  state: "state",
  bankAccountNumber: "bankAccountNumber",
  birthDate: "birthDate",
  driverLicenseNumber: "driverLicenseNumber",
  firstName: "firstName",
  gender: "gender",
  lastName: "lastName",
  middleName: "middleName",
  nationalHealthNumber: "nationalHealthNumber",
  nationalIdNumber: "nationalIdNumber",
  nationality: "nationality",
  occupation: "occupation",
  passportIssueDate: "passportIssueDate",
  passportIssuePlace: "passportIssuePlace",
  passportNumber: "passportNumber",
  passportValidDate: "passportValidDate",
  socialServiceNumber: "socialServiceNumber",
  visaIssueDate: "visaIssueDate",
  visaNumber: "visaNumber",
  visaValidDate: "visaValidDate"
};

const LABELS = {
  addressLine1: "Address Line 1",
  city: "City",
  country: "Country",
  email: "Email",
  phone: "Primary Mobile Number",
  postalCode: "Postal Code",
  secondaryPhone: "Secondary Mobile Number",
  state: "State",
  bankAccountNumber: "Bank Account Number",
  birthDate: "Birthdate",
  driverLicenseNumber: "Driver License Number",
  firstName: "Firstname",
  gender: "Gender",
  lastName: "Lastname",
  middleName: "Middlename",
  nationalHealthNumber: "National Health Number",
  nationalIdNumber: "National Id Number",
  nationality: "Nationality",
  occupation: "Occupation",
  passportIssueDate: "Passport Issue Date",
  passportIssuePlace: "Passport Issue Place",
  passportNumber: "Passport Number",
  passportValidDate: "Passport Valid Date",
  socialServiceNumber: "Social Service Number",
  visaIssueDate: "Visa Issue Date",
  visaNumber: "Visa Number",
  visaValidDate: "Visa Valid Date"
};
