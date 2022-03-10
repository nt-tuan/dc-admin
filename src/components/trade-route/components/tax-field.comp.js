import { NumberField, RenderField, SelectField, TextField } from "@/components/commons/fields";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";
import React from "react";

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
          <NumberField
            required
            name="mainTax.percent"
            label="Tax Percentage"
            placeholder="Tax Percentage"
          />
          <RenderField>
            {({ getFieldValue }) => {
              const mainTax = getFieldValue("mainTax");
              const maxTaxType = mainTax?.type;
              if (maxTaxType !== "OTHER") return <></>;
              return (
                <TextField required name="mainTax.name" label="Tax Name" placeholder="Tax Name" />
              );
            }}
          </RenderField>
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
