import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LoginSetting from "./login";
//** Components */
import NotificationPreference from "./notifacation-preference";
import PassCode from "components/auth/passcode";
import React from "react";
import Stack from "@mui/material/Stack";
import { TwoStepAuthentication } from "./two-step-authentication";
import Typography from "@mui/material/Typography";
function SettingTab() {
  return (
    <Box>
      <Typography variant="h5">Settings</Typography>
      <Divider sx={{ mb: 6, mt: 2 }} />
      <Stack direction="column" spacing={6}>
        <NotificationPreference />
        <Divider />
        <LoginSetting />
        <Divider />
        <TwoStepAuthentication />
        <Divider />
        <PassCode />
      </Stack>
    </Box>
  );
}

SettingTab.propTypes = {};

export default SettingTab;
