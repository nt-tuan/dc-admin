import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { NumberField, SelectField } from "@/components/commons/fields";

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";

export const TaxField = () => {
  const { setFieldValue, values } = useFormikContext();
  const handleApplyTax = (event) => {
    if (event.target.value === "true") {
      setFieldValue("mainTax", {
        type: "",
        percent: ""
      });
      return;
    }
    setFieldValue("mainTax", null);
  };
  const taxApplied = values?.mainTax != null;
  return (
    <Stack>
      <ApplyTaxField value={taxApplied} onChange={handleApplyTax} />
      {taxApplied && (
        <Stack spacing={1} width={300}>
          <SelectField
            name="mainTax.type"
            dataSource={[
              { label: "VAT", value: "VAT" },
              { label: "Sales Tax", value: "SALES" },
              { label: "Other", value: "OTHER" }
            ]}
            label="Type of Tax"
            placeholder="Tax % applied to product"
            required
          />
          <NumberField required name="mainTax.percent" placeholder="Tax Percentage" />
        </Stack>
      )}
    </Stack>
  );
};

const ApplyTaxField = ({ value, onChange }) => {
  return (
    <Grid direction="row" alignItems="center" container spacing={2}>
      <Grid item>
        <Typography>Does this Trade Route and Product Category incur any Tax?</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <RadioGroup row name="applyType" value={value} onChange={onChange}>
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};
