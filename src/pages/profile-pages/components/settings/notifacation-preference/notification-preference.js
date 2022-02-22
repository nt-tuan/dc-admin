import * as USER_DUCK from "redux/user/user.duck";

import { MESSAGES, NOTIFICATION_CHANNELS } from "commons/consts";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { PhoneVerifiedRequiredCheckbox } from "./phone-verified-required-checkbox.comp";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectUsers } from "redux/user/user.duck";
import { updateNotificationChannel } from "services/user-profile.service";
import { useMessage } from "@/hooks/use-message";

function NotificationPreference() {
  const message = useMessage();

  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [
    { phoneVerified, bySms, byWeb, byEmail, byWhatsapp },
    setNotificationSettings
  ] = React.useState(users);
  React.useEffect(() => {
    setNotificationSettings(users);
  }, [users]);
  const handleCheck = (event) => {
    setNotificationSettings((current) => ({
      ...current,
      [event.target.name]: event.target.checked
    }));
  };
  const handleUpdate = () => {
    const parsedValues = {
      byEmail,
      byWeb,
      byWhatsapp: phoneVerified ? byWhatsapp : false,
      bySms: phoneVerified ? bySms : false
    };
    if (parsedValues) {
      asyncErrorHandlerWrapper(async () => {
        await updateNotificationChannel(parsedValues);
        message.success(MESSAGES.UPDATE_SUCCESSFUL);
        dispatch({ type: USER_DUCK.LOAD_CURRENT_ACCOUNT });
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Notification Preference
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
        <PhoneVerifiedRequiredCheckbox
          label="Whatsapp"
          name="byWhatsapp"
          value={NOTIFICATION_CHANNELS.WHATSAPP}
          checked={byWhatsapp}
          onChange={handleCheck}
        />
        <PhoneVerifiedRequiredCheckbox
          label="SMS"
          name="bySms"
          value={NOTIFICATION_CHANNELS.SMS}
          checked={bySms}
          onChange={handleCheck}
        />
        <FormControlLabel
          label="Website"
          control={
            <Checkbox
              name="byWeb"
              value={NOTIFICATION_CHANNELS.WEB}
              checked={byWeb}
              onChange={handleCheck}
            />
          }
        />
        <FormControlLabel
          label="Email"
          control={
            <Checkbox
              name="byEmail"
              value={NOTIFICATION_CHANNELS.EMAIL}
              checked={byEmail}
              onChange={handleCheck}
            />
          }
        />
      </Stack>
      <Stack alignItems="flex-end">
        <Button onClick={handleUpdate} variant="contained">
          Update
        </Button>
      </Stack>
    </div>
  );
}

NotificationPreference.propTypes = {};

export default NotificationPreference;
