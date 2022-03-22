import { TFASettings } from "@/components/auth/components/tfa-settings.comp";
import { PageContainer } from "../components/page-container.comp";

const TwoFactorAuthentication = () => {
  return (
    <PageContainer title="Two-Factor Authentication">
      <TFASettings />
    </PageContainer>
  );
};
export default TwoFactorAuthentication;
