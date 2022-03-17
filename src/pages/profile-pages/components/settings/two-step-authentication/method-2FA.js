import * as USER_DUCK from "redux/user/user.duck";

import { MESSAGES, RouteConst, TWO_FACTOR_AUTH_TYPES, USER_TABS_NAME } from "commons/consts";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleAuthenticator from "components/auth/GoogleAuthenticator";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import { Popconfirm } from "antd";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectBrowserFingerprint } from "redux/settings/settings.duck";
import { update2FASettings } from "services";
import { useBooleanState } from "hooks/utilHooks";
import { useHistory } from "react-router-dom";
import { useMessage } from "@/hooks/use-message";

const getTwoFAType = (method, setting) => {
  if (setting === TWO_FACTOR_AUTH_TYPES.PER_30_DAYS) {
    if (method === "EMAIL") return TWO_FACTOR_AUTH_TYPES.EMAIL_PER_30_DAYS;
    else if (method === "SMS") return TWO_FACTOR_AUTH_TYPES.SMS_PER_30_DAYS;
    else if (method === "GA") return TWO_FACTOR_AUTH_TYPES.GA_PER_30_DAYS;
    else return TWO_FACTOR_AUTH_TYPES.WHATSAPP_PER_30_DAYS;
  } else {
    if (method === "EMAIL") return TWO_FACTOR_AUTH_TYPES.EMAIL_EVERY_LOGIN;
    else if (method === "SMS") return TWO_FACTOR_AUTH_TYPES.SMS_EVERY_LOGIN;
    else if (method === "GA") return TWO_FACTOR_AUTH_TYPES.GA_EVERY_LOGIN;
    else return TWO_FACTOR_AUTH_TYPES.WHATSAPP_EVERY_LOGIN;
  }
};

function Method2FA({ setting }) {
  const message = useMessage();

  const dispatch = useDispatch();
  const user2FASettings = useSelector(USER_DUCK.select2FASettings);
  const [selectedMethod, setSelectedMethod] = React.useState(user2FASettings.tfaMethod);
  const isPhoneVerified = useSelector(USER_DUCK.selectPhoneVerified);
  const isGAVerified = useSelector(USER_DUCK.selectGAVerified);
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);
  const [showGoogleAuthenticator, toogleGoogleAuthenticator] = useBooleanState(false);
  const history = useHistory();
  const onConfirmVerifyPhone = () => {
    history.push({
      pathname: `${RouteConst.PROFILE}/${USER_TABS_NAME.profileInfo}`,
      state: { isVerified: true }
    });
  };
  //** Handle :: Update 2FA Settings  */
  const handleUpdate = () => {
    let tfaType = getTwoFAType(selectedMethod, setting);
    asyncErrorHandlerWrapper(async () => {
      await update2FASettings({ tfaType: tfaType, browserId: BrowserFingerprint });
      dispatch({ type: USER_DUCK.LOAD_CURRENT_ACCOUNT });
      message.success("Update Successful");
    });
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  if (setting == null || setting === "DISABLE") return null;

  return (
    <Box w="100%">
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Two-Factor Authentication (2FA) Methods
          </Typography>
          <Typography>
            You can select your preferred method to receive the two-factor authentication code.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
            <FormControlLabel value="EMAIL" control={<Radio />} label="Email" />
            <FormControlLabel
              value="SMS"
              control={<Radio />}
              label={
                <Stack direction="row" alignItems="center">
                  <Box>SMS</Box>
                  <Popconfirm
                    title={MESSAGES.VERIFY_PHONE_TO_USE_THIS_FEATURE}
                    onConfirm={onConfirmVerifyPhone}
                    okText="Yes"
                    cancelText="No"
                  >
                    <InfoIcon hidden={isPhoneVerified} />
                  </Popconfirm>
                </Stack>
              }
            />
            <FormControlLabel
              value="GA"
              control={<Radio />}
              label={
                <Stack direction="row" alignItems="center">
                  <Box>Google Authenticator</Box>
                  <InfoIcon
                    hidden={isGAVerified}
                    onClick={() => toogleGoogleAuthenticator(!toogleGoogleAuthenticator)}
                  />
                  {showGoogleAuthenticator && (
                    <GoogleAuthenticator
                      isGAVerified={showGoogleAuthenticator}
                      toogleGoogleAuthenticator={() =>
                        toogleGoogleAuthenticator(!showGoogleAuthenticator)
                      }
                    />
                  )}
                </Stack>
              }
            />
          </RadioGroup>

          <Button variant="contained" onClick={handleUpdate}>
            Update 2FA Settings
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Method2FA;
