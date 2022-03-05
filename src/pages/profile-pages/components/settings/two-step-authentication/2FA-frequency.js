import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import Typography from "@mui/material/Typography";

function TwoFAFrequency({ setting, setSetting }) {
  const handleSettingChange = (e) => {
    setSetting(e.target.value);
  };
  return (
    <Box w="100%">
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Enable Two-Factor Authentication (2FA)
          </Typography>
          <Typography>
            Two-factor authentication (2FA) requires users to enter a one-time verification code
            sent using your preferred channel in order to access your account.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box>
            <RadioGroup value={setting} onChange={handleSettingChange} sx={{ gap: 2 }}>
              <FormControlLabel
                value="PER_30_DAYS"
                sx={{ alignItems: "flex-start" }}
                control={<Radio />}
                label="Once per computer. Trust this computer and only ask for verification code every 30
                days"
              />
              <FormControlLabel
                value="EVERY_LOGIN"
                control={<Radio />}
                label="Every log-in. We'll always ask for a verification code"
              />
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TwoFAFrequency;
