import { useInvalidateUserProfiles, useUserProfile } from "../services/use-user-profile";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { PageContainer } from "../components/page-container.comp";
import Typography from "@mui/material/Typography";
import { updateNotificationChannel } from "../services/user-profile.service";
import { useMutation } from "react-query";

const NotificationsPage = () => {
  const { data, isLoading, isFetching } = useUserProfile();
  const { bySms, byEmail, byWhatsapp } = data || {};
  const invalidate = useInvalidateUserProfiles();
  const { mutate, isLoading: isUpdating } = useMutation(updateNotificationChannel, {
    onSuccess: () => {
      invalidate();
    }
  });
  const update = (e) => {
    const { name, checked } = e.target;
    mutate({ bySms, byEmail, byWhatsapp, [name]: checked });
  };

  return (
    <PageContainer title="Notifications" isLoading={isLoading}>
      <Box>
        <Typography variant="body2">Set your preferred way to receive notifications.</Typography>
      </Box>
      {data && (
        <FormGroup>
          <FormControlLabel
            disabled={isUpdating || isFetching}
            control={<Checkbox name="byWhatsapp" checked={byWhatsapp} onChange={update} />}
            label="Whatsapp"
          />
          <FormControlLabel
            disabled={isUpdating || isFetching}
            control={<Checkbox name="bySms" checked={bySms} onChange={update} />}
            label="SMS"
          />
          <FormControlLabel
            disabled={isUpdating || isFetching}
            control={<Checkbox name="byEmail" checked={byEmail} onChange={update} />}
            label="Email"
          />
        </FormGroup>
      )}
    </PageContainer>
  );
};
export default NotificationsPage;
