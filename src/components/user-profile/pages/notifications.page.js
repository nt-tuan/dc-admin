import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

import { AddPhoneModal } from "../components/add-phone-modal/add-phone-modal.comp";
import { PageContainer } from "../components/page-container.comp";
import { useNotificationSettings } from "../controllers/use-notification-settings";

const NotificationsPage = () => {
  const {
    data,
    isLoading,
    isFetching,
    bySms,
    byEmail,
    byWhatsapp,
    phoneVerified,
    isUpdating,
    checkPhoneVeriyAndUpdate,
    update,
    phoneModalOpen,
    closePhoneModal
  } = useNotificationSettings();

  return (
    <PageContainer title="Notifications" isLoading={isLoading}>
      <Box mb={4}>
        <Typography variant="body2">Set your preferred way to receive notifications.</Typography>
      </Box>
      {data && (
        <>
          <FormGroup>
            <FormControlLabel
              disabled={isUpdating || isFetching}
              control={
                <Checkbox
                  name="byWhatsapp"
                  checked={byWhatsapp && phoneVerified}
                  onChange={checkPhoneVeriyAndUpdate}
                />
              }
              label={<Typography variant="body2">Whatsapp</Typography>}
            />
            <FormControlLabel
              disabled={isUpdating || isFetching}
              control={
                <Checkbox
                  name="bySms"
                  checked={bySms && phoneVerified}
                  onChange={checkPhoneVeriyAndUpdate}
                />
              }
              label={<Typography variant="body2">SMS</Typography>}
            />
            <FormControlLabel
              disabled={isUpdating || isFetching}
              control={<Checkbox name="byEmail" checked={byEmail} onChange={update} />}
              label={<Typography variant="body2">Email</Typography>}
            />
          </FormGroup>
          <AddPhoneModal open={phoneModalOpen} onClose={closePhoneModal} onVerify={update} />
        </>
      )}
    </PageContainer>
  );
};

export default NotificationsPage;
