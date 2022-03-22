import Box from "@mui/material/Box";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import countryList from "@/assets/country";

export const UserProfile = ({ data }) => {
  return (
    <Box>
      <Typography variant="h5" color="error" mb={1}>
        Profile Information
      </Typography>
      <Stack direction="column" mb={4} alignItems="stretch" w={50}>
        {Object.keys(FIELDS).map((field) => {
          let value = data[field];
          if (field === FIELDS.country) {
            const parsedCountry =
              countryList.find((c) => c.alpha2Code === data[field].toUpperCase()) || {};
            value = parsedCountry.name;
          }
          return (
            <Stack justifyContent="space-between" direction="row" key={field}>
              <b>{LABELS[field]}</b>
              <div>{value}</div>
            </Stack>
          );
        })}
      </Stack>
    </Box>
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
