import React from "react";
import { Avatar } from "antd";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const CompanyLogo = ({ logoUrl }) => {
  return (
    <Box sx={{ padding: "10px 15px" }} hoverable={true}>
      <Stack mb={4} alignItems="center" w={75}>
        <Avatar shape="square" size={100} src={logoUrl} icon={logoUrl || <AccountCircleIcon />} />
      </Stack>
    </Box>
  );
};
