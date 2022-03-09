import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Loader } from "@/components/commons";
import { PageContainer } from "../components/page-container.comp";
import { PreferredFrequency } from "../components/preferred-frequency.comp";
import { TwoFactorMethodSelect } from "../components/two-factor-method-select.comp";
import { TwoFactorValidator } from "@/components/auth/components/two-factor-validator/two-factor-validator.comp";
import Typography from "@mui/material/Typography";
import { VerifyStatusEnum } from "@/components/auth/providers/use-two-factor-validator";
import { parseTfaSetting } from "../mapper";
import { selectBrowserFingerprint } from "@/redux/settings/settings.duck";
import { useAllTwoFactorValidator } from "@/components/auth/providers/use-all-two-factor-validators";
import { useSelector } from "react-redux";
import { useTwoFactorAuthentication } from "../controllers/use-two-factor-authentication";
import { useUserProfile } from "../services/use-user-profile";

const Content = ({ data }) => {
  const {
    is2FA,
    change2FA,
    selectedMethod,
    setSelectedMethod,
    selectedFrequency,
    setSelectedFrequency,
    updateTfaSetting,
    isUpdatingTfaSetting
  } = useTwoFactorAuthentication(data);
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);
  const twoFactorValidatorProvider = useAllTwoFactorValidator({
    selectedMethod,
    phone: data.phone
  });
  const availableMethods = twoFactorValidatorProvider.availableProviders;
  const handleUpdate = () => {
    const nextData = {
      tfaType: parseTfaSetting(is2FA, selectedMethod, selectedFrequency),
      browserId: BrowserFingerprint
    };
    updateTfaSetting(nextData);
  };
  return (
    <>
      <Typography mb={4} variant="body2">
        Two-factor authentication (2FA) requires users to enter a one-time verification code sent
        using your preferred channel in order to access your account.
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={is2FA} onChange={(event) => change2FA(event.target.checked)} />}
        label={<Typography variant="body2">Enable two step authentication</Typography>}
      />
      {is2FA && (
        <Box mt={3}>
          <PreferredFrequency
            selectedFrequency={selectedFrequency}
            setSelectedFrequency={setSelectedFrequency}
          />
        </Box>
      )}
      {is2FA && twoFactorValidatorProvider.verifyStatus !== VerifyStatusEnum.VERIFIED && (
        <Box mt={2}>
          <TwoFactorMethodSelect
            availableMethods={availableMethods}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
        </Box>
      )}
      {is2FA && selectedMethod && selectedFrequency && (
        <Box mt={2}>
          <TwoFactorValidator
            data={data}
            selectedMethod={selectedMethod}
            selectedFrequency={selectedFrequency}
            twoFactorValidatorProvider={twoFactorValidatorProvider}
            onUpdate={handleUpdate}
            isUpdating={isUpdatingTfaSetting}
          />
        </Box>
      )}
    </>
  );
};
const TwoFactorAuthentication = () => {
  const { data, isLoading } = useUserProfile();
  return (
    <PageContainer title="Two-Factor Authentication">
      {isLoading && <Loader />}
      {data && <Content data={data} />}
    </PageContainer>
  );
};
export default TwoFactorAuthentication;
