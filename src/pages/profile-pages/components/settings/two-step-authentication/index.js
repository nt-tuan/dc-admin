import { ForgotDevice } from "./forget-device.comp";
import Method2FA from "./method-2FA";
import React from "react";
import Stack from "@mui/material/Stack";
import TwoFAFrequency from "./2FA-frequency";
import { TwoStepEnabled } from "./two-step-enabled.comp";
import { select2FASettings } from "redux/user/user.duck";
import { useSelector } from "react-redux";

export function TwoStepAuthentication() {
  const user2FASettings = useSelector(select2FASettings);
  const [is2FA, setIs2FA] = React.useState(user2FASettings.tfaType !== "DISABLE");
  const [setting, setSetting] = React.useState(user2FASettings.tfaType);
  React.useEffect(() => {
    setIs2FA(user2FASettings.tfaType !== "DISABLE");
    setSetting(user2FASettings.tfaType);
  }, [user2FASettings.tfaType]);
  return (
    <Stack direction="column" spacing={4}>
      <TwoStepEnabled
        is2FA={is2FA}
        onEnabled={() => setIs2FA(true)}
        onDisabled={() => setIs2FA(false)}
      />
      {is2FA && (
        <>
          <TwoFAFrequency setting={setting} setSetting={setSetting} />
          <Method2FA setting={setting} />
          <ForgotDevice />
        </>
      )}
    </Stack>
  );
}
