import Box from "@mui/material/Box";
import { Loader } from "@/components/commons";
import { PreferredFrequency } from "./preferred-frequency.comp";
import { TwoFactorMethodSelect } from "./two-factor-method-select.comp";
import Typography from "@mui/material/Typography";
import { TFACheckbox } from "./tfa-checkbox";
import { useTFASettings } from "../controllers/use-tfa-settings";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { sendTfaCode } from "../services/auth.service";
import { update2FASettings } from "@/components/user-profile/services/user-profile.service";
import { TfaTypeEnum } from "../models/enums";
import { TFAUpdateButton } from "./tfa-update-button";

const Content = ({ data }) => {
  const {
    is2FA,
    browserId,
    change2FA,
    selectedMethod,
    selectedFrequency,
    handleFrequencyChange,
    handleMethodChange,
    openMethodSelect,
    isOpenUpdatingTfa,
    stopUpdatingTfa
  } = useTFASettings(data);

  return (
    <>
      <Typography mb={4} variant="body2">
        Two-factor authentication (2FA) requires users to enter a one-time verification code sent
        using your preferred channel in order to access your account.
      </Typography>
      <TFACheckbox
        tfaType={data?.tfaType}
        isTFAEnabled={is2FA}
        onChange={change2FA}
        requestVerifyFn={() =>
          sendTfaCode({
            tfaType: data?.tfaType,
            browserId
          })
        }
        validateFn={(code) =>
          update2FASettings({
            code,
            tfaType: TfaTypeEnum.DISABLED,
            browserId
          })
        }
      />

      {is2FA && (
        <Box mt={3}>
          <PreferredFrequency
            selectedFrequency={selectedFrequency}
            onChange={handleFrequencyChange}
          />
        </Box>
      )}
      {is2FA && (
        <Box mt={2}>
          <TwoFactorMethodSelect
            data={data}
            isOpenUpdatingTfa={isOpenUpdatingTfa}
            onUpdate={openMethodSelect}
            onChange={handleMethodChange}
            selectedMethod={selectedMethod}
            tfaType={data.tfaType}
          />
        </Box>
      )}
      {is2FA && selectedMethod && selectedFrequency && isOpenUpdatingTfa && (
        <Box mt={2}>
          <TFAUpdateButton
            data={data}
            selectedMethod={selectedMethod}
            selectedFrequency={selectedFrequency}
            onSuccess={stopUpdatingTfa}
          />
        </Box>
      )}
    </>
  );
};
export const TFASettings = () => {
  const { data, isLoading } = useUserProfile();
  if (isLoading) return <Loader />;
  return <>{data && <Content data={data} />}</>;
};
