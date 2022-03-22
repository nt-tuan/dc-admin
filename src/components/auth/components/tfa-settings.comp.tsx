import Box from "@mui/material/Box";
import { Loader } from "@/components/commons";
import { PreferredFrequency } from "./preferred-frequency.comp";
import { TwoFactorMethodSelect } from "./two-factor-method-select.comp";
import { TwoFactorValidator } from "@/components/auth/components/two-factor-validator/two-factor-validator.comp";
import Typography from "@mui/material/Typography";
import { TFACheckbox } from "./tfa-checkbox";
import { useTFASettings } from "../controllers/use-tfa-settings";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";

const Content = ({ data }) => {
  const {
    is2FA,
    change2FA,
    selectedMethod,
    selectedFrequency,
    handleFrequencyChange,
    handleMethodChange,
    openMethodSelect,
    isOpenUpdatingTfa,
    stopUpdatingTfa,
    currentTfaType
  } = useTFASettings(data);

  return (
    <>
      <Typography mb={4} variant="body2">
        Two-factor authentication (2FA) requires users to enter a one-time verification code sent
        using your preferred channel in order to access your account.
      </Typography>
      <TFACheckbox tfaType={data?.tfaType} isTFAEnabled={is2FA} onChange={change2FA} />

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
          <TwoFactorValidator
            tfaType={currentTfaType}
            onSuccess={stopUpdatingTfa}
            config={{
              ga: { isSetup: true }
            }}
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
