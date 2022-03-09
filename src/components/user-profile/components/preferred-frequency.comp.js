import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import Typography from "@mui/material/Typography";

export const PreferredFrequency = ({ selectedFrequency, setSelectedFrequency }) => {
  const handleSettingChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  return (
    <Box>
      <Typography mb={2} variant="h6">
        Preferred Frequency
      </Typography>
      <RadioGroup value={selectedFrequency} onChange={handleSettingChange} sx={{ gap: 2 }}>
        <FormControlLabel
          value="PER_30_DAYS"
          sx={{ alignItems: "flex-start" }}
          control={<Radio />}
          label={
            <Typography variant="body2">
              Once per computer. Trust this computer and only ask for verification code every 30
              days
            </Typography>
          }
        />
        <FormControlLabel
          value="EVERY_LOGIN"
          control={<Radio />}
          label={
            <Typography variant="body2">
              Every log-in. We'll always ask for a verification code
            </Typography>
          }
        />
      </RadioGroup>
    </Box>
  );
};
