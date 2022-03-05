import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { forgetBrowser } from "services";
import { selectBrowserFingerprint } from "redux/settings/settings.duck";
import { useMessage } from "@/hooks/use-message";
import { useSelector } from "react-redux";
export const ForgotDevice = () => {
  const message = useMessage();
  const BrowserFingerprint = useSelector(selectBrowserFingerprint);
  const handleForgetThisComputer = () => {
    asyncErrorHandlerWrapper(async () => {
      await forgetBrowser({ browserId: BrowserFingerprint });
      message.success("Successful");
    });
  };
  return (
    <Box w="100%">
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Remembered Computer
          </Typography>
          <div>
            Your remembered computer will only be required to go through two-factor authentication
            once every 30 days.
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Button onClick={handleForgetThisComputer} variant="contained">
            Forget This Computer
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
