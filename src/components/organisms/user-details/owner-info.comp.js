import React, { Fragment } from "react";
import countryList from "assets/country.json";

export const OwnerInfo = ({ owners }) => {
  return (
    <Fragment>
      <h5 className="text-danger">Owner Information</h5>
      {owners.map((owner) => {
        const parsedCountry = countryList.find((c) => c.alpha2Code === owner[FIELDS.country]) || {};
        const parsedNationality =
          countryList.find((c) => c.alpha2Code === owner[FIELDS.nationality]) || {};
        return (
          <Fragment>
            <div className="row mb-2">
              {Object.keys(FIELDS).map((field) => {
                let value = owner[field];
                if (field === FIELDS.nationality) {
                  value = parsedNationality.name;
                }
                if (field === FIELDS.country) {
                  value = parsedCountry.name;
                }
                if (field === FIELDS.gender) {
                  value = owner[field] === "F" ? "Female" : "Male";
                }
                return (
                  <div className="d-flex col-lg-4 col-md-6 col-sm-12 mb-1" key={field}>
                    <b className="mr-1">{LABELS[field]}:</b>
                    {value}
                  </div>
                );
              })}
            </div>
            <br />
            <h6>Owners Documents</h6>
            <div>
              {owner.documents &&
                owner.documents.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12 mb-1">
                        <b>Type: </b>
                        {OWNER_DOCUMENT_DETAILS_TYPES[doc.type]}
                      </div>
                      <div className="col-lg-8 col-md-6 col-sm-12 mb-1">
                        <b>Document Name: </b>
                        <a href={doc.url}>{doc.fileName}</a>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </Fragment>
        );
      })}
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

const OWNER_DOCUMENT_DETAILS_TYPES = Object.freeze({
  PASSPORT_FRONT: "Passport front image",
  PASSPORT_BACK: "Passport back image",
  PASSPORT_LIVE: "Passport live image",
  DRIVINGLICENCE_FRONT: "Driving Licence front image",
  DRIVINGLICENCE_BACK: "Driving Licence back image",
  DRIVINGLICENCE_LIVE: "Driving Licence live image",
  IDENTITYCARD_FRONT: "Identity Card front image",
  IDENTITYCARD_BACK: "Identity Card back image",
  IDENTITYCARD_LIVE: "Identity Card live image",
  RESIDENCEPERMIT_FRONT: "Resident Permit front image",
  RESIDENCEPERMIT_BACK: "Resident Permit back image",
  RESIDENCEPERMIT_LIVE: "Resident Permit live image",
  VOTERID_FRONT: "Voter ID front image",
  VOTERID_BACK: "Voter ID back image",
  VOTERID_LIVE: "Voter ID live image"
});
