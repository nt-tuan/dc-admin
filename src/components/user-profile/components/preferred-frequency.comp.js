import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React from "react";

export const PreferredFrequency = ({ selectedFrequency, setSelectedFrequency }) => {
  const handleSettingChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  return (
    <Box>
      <Typography mb={2} variant="h6">
        Preferred Frequency
      </Typography>
      <RadioGroup value={selectedFrequency} onChange={handleSettingChange}>
        <FormControlLabel
          value="PER_30_DAYS"
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
