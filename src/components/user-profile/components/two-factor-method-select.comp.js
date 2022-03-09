import { MethodEnum, MethodLabelEnum } from "../constants/tfa.enum";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import Typography from "@mui/material/Typography";

export const TwoFactorMethodSelect = ({ selectedMethod, setSelectedMethod, availableMethods }) => {
  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <>
      <Typography mb={2} variant="h6">
        Method
      </Typography>
      <RadioGroup row value={selectedMethod} onChange={handleMethodChange}>
        {Object.keys(MethodEnum).map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={<Typography variant="body2">{MethodLabelEnum[value]}</Typography>}
            disabled={!availableMethods.includes(value)}
          />
        ))}
      </RadioGroup>
    </>
  );
};
