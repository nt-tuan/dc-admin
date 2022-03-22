import {
  AutocompleteField,
  CountryField,
  RenderField,
  SelectField,
  TextField
} from "@/components/commons/fields";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { BANK_LABELS } from "../../bank.schema";
import { BANK_TYPE_ENUM } from "../../bank-type.enum";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { SwiftCodeField } from "../../swift-code-field.comp";
import Typography from "@mui/material/Typography";
import currencyList from "@/assets/currency";
import { isAbaRequired, isSortCodeRequired } from "./validation.schema";
import { useFormikContext } from "formik";
import { CurrencyTooltip } from "./currency-tooltip.comp";

export const FormView = ({ name, onSubmit }) => {
  const { setFieldValue } = useFormikContext();

  const getName = (fieldName) => {
    if (!name) return fieldName;
    return `${name}.${fieldName}`;
  };
  const currenciesDataSource = React.useMemo(() => {
    return Object.entries(currencyList).map(([value, label]) => ({
      value,
      label: `${label} (${value})`
    }));
  }, []);

  const handleBankIdTypeChange = (e) => {
    const { value } = e.target;
    if (!isSortCodeRequired(value)) {
      setFieldValue("sortCode", "");
    }
    if (!isAbaRequired(value)) {
      setFieldValue("abaNumber", "");
    }
  };

  return (
    <Box>
      <Grid container columnSpacing={4} rowSpacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            name={getName("accountName")}
            label={BANK_LABELS.accountName}
            placeholder="Recipient's Bank Account Name"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            name={getName("name")}
            label={BANK_LABELS.name}
            placeholder="Recipient's Beneficiary Bank"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SelectField
            fullWidth
            name={getName("bankIdType")}
            label={BANK_LABELS.bankIdType}
            onChangeValue={handleBankIdTypeChange}
            placeholder="Bank ID Type"
            dataSource={Object.keys(BANK_TYPE_ENUM).map((value) => ({ label: value, value }))}
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SwiftCodeField name={getName("swiftCode")} bankIdTypeName={getName("bankIdType")} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("accountNumber")}
            label={BANK_LABELS.accountNumber}
            placeholder="Recipient's Bank Account Number"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("iban")}
            label={BANK_LABELS.iban}
            placeholder="Recipient's Bank IBAN"
            required
          />
        </Grid>
        <RenderField>
          {({ getFieldValue }) => {
            const bankIdType = getFieldValue(getName("bankIdType"));
            const sortCodeDisabled = !isSortCodeRequired(bankIdType);
            const abaDisabled = !isAbaRequired(bankIdType);
            return (
              <>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    disabled={sortCodeDisabled}
                    name={getName("sortCode")}
                    required={!sortCodeDisabled}
                    label={BANK_LABELS.sortCode}
                    placeholder="Recipient's Bank Sort Code"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    disabled={abaDisabled}
                    required={!abaDisabled}
                    name={getName("abaNumber")}
                    label={BANK_LABELS.abaNumber}
                    placeholder="Recipient's Bank ABA number"
                  />
                </Grid>
              </>
            );
          }}
        </RenderField>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("address")}
            label={BANK_LABELS.address}
            placeholder="Recipient's Bank Address"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("city")}
            label={BANK_LABELS.city}
            placeholder="Recipient's Bank City"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("state")}
            label={BANK_LABELS.state}
            placeholder="Recipient's Bank State"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CountryField
            fullWidth
            name={getName("country")}
            label={BANK_LABELS.country}
            placeholder="Recipient's Bank Country"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("postalCode")}
            label={BANK_LABELS.postalCode}
            placeholder="Recipient's Bank Postal/Zip Code/P.O.Box"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AutocompleteField
            label={BANK_LABELS.currency}
            placeholder="Bank Currency"
            name={getName("currency")}
            endAdornment={<CurrencyTooltip />}
            fullWidth
            dataSource={currenciesDataSource}
            required
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4, mx: -3 }} />
      <Typography py={3} variant="h5">
        Beneficiary Address
      </Typography>
      <Grid container columnSpacing={4} rowSpacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientAddress")}
            label={BANK_LABELS.recipientAddress}
            placeholder="Beneficiary Address"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientCity")}
            label={BANK_LABELS.recipientCity}
            placeholder="Beneficiary City"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientState")}
            label={BANK_LABELS.recipientState}
            placeholder="Beneficiary State"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CountryField
            fullWidth
            name={getName("recipientCountry")}
            label={BANK_LABELS.recipientCountry}
            placeholder="Beneficiary Country"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientPostalCode")}
            label={BANK_LABELS.recipientPostalCode}
            placeholder="Beneficiary PostalCode"
            required
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={onSubmit} sx={{ mt: 4 }}>
        Save
      </Button>
    </Box>
  );
};
