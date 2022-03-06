import React, { memo } from "react";

import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";

const Item = ({ label, value }) => {
  return (
    <Stack py={2} direction="row" alignItems="flex-start" borderBottom={1} borderColor="grey.300">
      <Box width={300} fontWeight="bold">
        {label}
      </Box>
      <Box sx={{ flexGrow: 1 }}>{value}</Box>
    </Stack>
  );
};
export const PersonalInformationView = memo(({ data }) => {
  return (
    <Stack maxWidth={680}>
      <Item label="First Name" value={data.firstName} />
      <Item label="Last Name" value={data.lastName} />
      <Item label="Email" value={data.email} />
      <Item
        label="Phone Number"
        value={
          <Stack direction="row" spacing={2} alignItems="center">
            <span>{data.phone}</span>
            {data.phoneVerified && <CheckCircleIcon color="success" />}
          </Stack>
        }
      />
    </Stack>
  );
});
