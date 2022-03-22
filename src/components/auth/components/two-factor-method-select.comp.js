import { MethodEnum, MethodLabelEnum } from "../models/enums";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Stack from "@mui/material/Stack";

import { TwoFactorValidator } from "@/components/auth/components/two-factor-validator/two-factor-validator.comp";

const CurrentMethod = ({ selectedMethod, onUpdate, tfaType }) => {
  const Activator = ({ loading, onClick }) => {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>{MethodLabelEnum[selectedMethod]}</Typography>
        <CheckCircleIcon color="success" />
        <Button loading={loading} variant="contained" onClick={onClick}>
          Update Method
        </Button>
      </Stack>
    );
  };
  return (
    <TwoFactorValidator
      tfaType={tfaType}
      Activator={Activator}
      onSuccess={onUpdate}
      config={{
        ga: { isSetup: false }
      }}
    />
  );
};
const MethodSelect = ({ selectedMethod, onChange }) => {
  return (
    <RadioGroup row value={selectedMethod} onChange={onChange}>
      {Object.keys(MethodEnum).map((value) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio />}
          label={<Typography variant="body2">{MethodLabelEnum[value]}</Typography>}
        />
      ))}
    </RadioGroup>
  );
};

export const TwoFactorMethodSelect = ({
  selectedMethod,
  onChange,
  tfaType,
  isOpenUpdatingTfa,
  onUpdate
}) => {
  const handleMethodChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <>
      <Typography mb={2} variant="h6">
        Method
      </Typography>
      {isOpenUpdatingTfa ? (
        <MethodSelect selectedMethod={selectedMethod} onChange={handleMethodChange} />
      ) : (
        <CurrentMethod selectedMethod={selectedMethod} onUpdate={onUpdate} tfaType={tfaType} />
      )}
    </>
  );
};
