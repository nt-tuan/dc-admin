import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Property } from "components/commons/property";
import React from "react";
import Typography from "@mui/material/Typography";
import countryList from "assets/country.json";

export const OwnerInfo = ({ owners }) => {
  return (
    <Box>
      <Typography variant="h4" color="error" mb={1}>
        Owner Information
      </Typography>
      {owners.map((owner) => {
        const parsedCountry = countryList.find((c) => c.alpha2Code === owner[FIELDS.country]) || {};
        const parsedNationality =
          countryList.find((c) => c.alpha2Code === owner[FIELDS.nationality]) || {};
        return (
          <Grid key={owner.id} container mb={2} columnSpacing={3} rowSpacing={1}>
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
                <Grid item xs={12} sm={12} md={6} lg={4} key={field}>
                  <Property value={value} label={LABELS[field]} />
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Box>
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

// const OWNER_DOCUMENT_DETAILS_TYPES = Object.freeze({
//   PASSPORT_FRONT: "Passport front image",
//   PASSPORT_BACK: "Passport back image",
//   PASSPORT_LIVE: "Passport live image",
//   DRIVINGLICENCE_FRONT: "Driving Licence front image",
//   DRIVINGLICENCE_BACK: "Driving Licence back image",
//   DRIVINGLICENCE_LIVE: "Driving Licence live image",
//   IDENTITYCARD_FRONT: "Identity Card front image",
//   IDENTITYCARD_BACK: "Identity Card back image",
//   IDENTITYCARD_LIVE: "Identity Card live image",
//   RESIDENCEPERMIT_FRONT: "Resident Permit front image",
//   RESIDENCEPERMIT_BACK: "Resident Permit back image",
//   RESIDENCEPERMIT_LIVE: "Resident Permit live image",
//   VOTERID_FRONT: "Voter ID front image",
//   VOTERID_BACK: "Voter ID back image",
//   VOTERID_LIVE: "Voter ID live image"
// });
