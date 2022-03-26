import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";

const Item = ({ label, value }) => {
  return (
    <Stack py={2} direction="row" alignItems="flex-start" borderBottom={1} borderColor="grey.300">
      <Box width={300}>
        <Typography variant="body2" fontWeight="bold">
          {label}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography component="div" textAlign="right" variant="body2">
          {value}
        </Typography>
      </Box>
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
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <span>{data.phone}</span>
            {data.phoneVerified && <CheckCircleIcon color="success" />}
          </Stack>
        }
      />
    </Stack>
  );
});
