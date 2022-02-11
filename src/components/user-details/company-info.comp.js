import Box from "@mui/material/Box";
import { DTCSection } from "components/commons";
import { DatetimeUtils } from "utils/date-time.util";
import Grid from "@mui/material/Grid";
import { Property } from "components/commons/property";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WEEK_DAYS } from "commons/consts";
import countryList from "assets/country.json";

export const CompanyInfo = ({ companyInfo, companyAddress }) => {
  return (
    <Box>
      <Typography mb={1} variant="h4" color="error">
        Company Information
      </Typography>
      <Box mb={4}>
        <CompanyInfoReadonly companyInfo={companyInfo} />
      </Box>
      <CompanyAddressReadonly companyAddress={companyAddress} />
    </Box>
  );
};

const CompanyInfoReadonly = ({ companyInfo }) => {
  return (
    <Stack direction="column" alignItems="stretch">
      {Object.keys(FIELDS).map((field) => {
        let value = companyInfo[field];
        if ([FIELDS.workingStartTime, FIELDS.workingEndTime].includes(field)) {
          value = DatetimeUtils.minutesTotime(value, true);
        }
        if (field === FIELDS.workingDays) {
          value = value
            ? value
                .split(",")
                .map((workDay) => WEEK_DAYS[workDay])
                .join(", ")
            : "Unset";
        }
        return <Property key={field} label={LABELS[field]} value={value} />;
      })}
    </Stack>
  );
};

const CompanyAddressReadonly = ({ companyAddress }) => {
  return (
    <Box>
      <Typography mb={1} variant="h4" color="error">
        Company Address
      </Typography>

      <Grid container className="row" spacing={1}>
        {companyAddress.map((address) => (
          <Grid item xs={12} lg={6} key={address.id}>
            <DTCSection>
              <DTCSection.Content>
                {Object.keys(ADDRESS_FIELDS).map((field) => {
                  let value = address[field];
                  if (field === ADDRESS_FIELDS.country) {
                    const parsedCountry =
                      countryList.find((c) => c.alpha2Code === address[field]) || {};
                    value = parsedCountry.name;
                  }
                  return <Property key={field} label={ADDRESS_LABELS[field]} value={value} />;
                })}
              </DTCSection.Content>
            </DTCSection>
          </Grid>
        ))}
      </Grid>
    </Box>
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
