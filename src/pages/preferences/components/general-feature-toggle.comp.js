import React, { memo } from "react";
import { Typography, Box, FormGroup, Checkbox } from "@mui/material";
import FieldInput from "./general-field-input.comp";
import { featuresAndModulesConst } from "../constant/general-data";

const FeaturesToggleForm = ({ data, handleChange }) => {
  return (
    <>
      <Box marginBottom={3}>
        <Typography>
          Configure your marketplace by selecting what features and modules help run your operation
          smoothly
        </Typography>
      </Box>
      <Box marginLeft={-1}>
        <FormGroup onChange={handleChange}>
          <FieldInput
            icon={
              <Checkbox
                checked={data.paymentServices}
                name={featuresAndModulesConst.paymentServices.name}
              />
            }
            label={featuresAndModulesConst.paymentServices.label}
            tooltipTitle={featuresAndModulesConst.paymentServices.tooltipTitle}
          />
          <FieldInput
            icon={
              <Checkbox
                checked={data.registration}
                name={featuresAndModulesConst.registration.name}
              />
            }
            label={featuresAndModulesConst.registration.label}
            tooltipTitle={featuresAndModulesConst.registration.tooltipTitle}
          />
          <FieldInput
            icon={
              <Checkbox
                checked={data.staggeredKYC}
                name={featuresAndModulesConst.staggeredKYC.name}
              />
            }
            label={featuresAndModulesConst.staggeredKYC.label}
            tooltipTitle={featuresAndModulesConst.staggeredKYC.tooltipTitle}
          />
          <FieldInput
            icon={
              <Checkbox
                checked={data.timeConstraint}
                name={featuresAndModulesConst.timeConstraint.name}
              />
            }
            label={featuresAndModulesConst.timeConstraint.label}
            tooltipTitle={featuresAndModulesConst.timeConstraint.tooltipTitle}
          />
        </FormGroup>
      </Box>
    </>
  );
};

export default memo(FeaturesToggleForm);
