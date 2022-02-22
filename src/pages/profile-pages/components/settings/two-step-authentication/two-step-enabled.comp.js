import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { TWO_FACTOR_AUTH_TYPES } from "commons/consts";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectBrowserFingerprint } from "redux/settings/settings.duck";
import { update2FASettings } from "services";
import { useSelector } from "react-redux";
import { useMessage } from "@/hooks/use-message";

export const TwoStepEnabled = ({ is2FA, onEnabled, onDisabled }) => {
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);
  const message = useMessage();
  const handle2FACheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked === false) {
      asyncErrorHandlerWrapper(async () => {
        await update2FASettings({
          tfaType: TWO_FACTOR_AUTH_TYPES.DISABLED,
          browserId: BrowserFingerprint
        });
        message.success("Successful");
        onDisabled();
      });
      return;
    }
    onEnabled();
  };
  return (
    <Box>
      <Typography sx={{ mb: 2 }} variant="h4">
        Two-Step Authentication
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={is2FA} onChange={handle2FACheckboxChange} />}
        label="Enable two step authentication"
      />
    </Box>
  );
};
