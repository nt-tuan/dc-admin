import {
  AutocompleteField,
  CountryField,
  RenderField,
  SelectField,
  TextField
} from "components/commons/fields";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { KYC3_SCHEMA } from "commons/schemas";
import React from "react";
import { SwiftCodeField } from "./swift-code-field.comp";
import Typography from "@mui/material/Typography";
import currencyList from "assets/currency.json";

const LABELS = KYC3_SCHEMA.KYC3_LABEL;
const BANK_TYPES = {
  CHIPS: "CHIPS",
  ACH: "ACH",
  SWIFT: "SWIFT"
};

export const FormView = ({ name, companyName, form }) => {
  const getName = (fieldName) => {
    if (!name) console.log(!name);
    if (!name) return fieldName;
    return `${name}.${fieldName}`;
  };
  const currenciesDataSource = React.useMemo(() => {
    return Object.entries(currencyList).map(([value, label]) => ({
      value,
      label: `${label} (${value})`
    }));
  }, []);
  const validateAccountName = (value) => {
    if (!value) {
      return;
    }
    const splitValue = value?.toLowerCase().split(" ");
    const splitCompanyName = companyName?.toLowerCase().split(" ");
    let isOk = false;
    let i = 0;
    while (isOk === false && i < splitValue.length) {
      if (splitCompanyName.includes(splitValue[i])) {
        isOk = true;
      }
      i++;
    }

    if (!isOk) {
      return "The Beneficiary Name should include at least one word in the Business Name (Company Name)";
    }
  };
  return (
    <Box>
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            fieldConfig={{ validate: validateAccountName }}
            name={getName("accountName")}
            label={LABELS.accountName}
            placeholder="Recipient's Bank Account Name"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            name={getName("name")}
            label={LABELS.name}
            placeholder="Recipient's Beneficiary Bank"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SelectField
            fullWidth
            name={getName("bankIdType")}
            label={LABELS.bankIdType}
            placeholder="Bank ID Type"
            dataSource={Object.keys(BANK_TYPES).map((value) => ({ label: value, value }))}
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
            label={LABELS.accountNumber}
            placeholder="Recipient's Bank Account Number"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("iban")}
            label={LABELS.iban}
            placeholder="Recipient's Bank IBAN"
          />
        </Grid>
        <RenderField>
          {({ getFieldValue }) => {
            const bankIdType = getFieldValue(getName("bankIdType"));
            const sortCodeDisabled = bankIdType !== BANK_TYPES.SWIFT;
            const abaDisabled = bankIdType !== BANK_TYPES.ACH && bankIdType !== BANK_TYPES.CHIPS;
            return (
              <>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    disabled={sortCodeDisabled}
                    variant={sortCodeDisabled ? "filled" : undefined}
                    name={getName("sortCode")}
                    label={LABELS.sortCode}
                    placeholder="Recipient's Bank Sort Code"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    disabled={abaDisabled}
                    variant={abaDisabled ? "filled" : undefined}
                    name={getName("abaNumber")}
                    label={LABELS.abaNumber}
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
            label={LABELS.address}
            placeholder="Recipient's Bank Address"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("city")}
            label={LABELS.city}
            placeholder="Recipient's Bank City"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("state")}
            label={LABELS.state}
            placeholder="Recipient's Bank State"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CountryField
            fullWidth
            name={getName("country")}
            label={LABELS.country}
            placeholder="Recipient's Bank Country"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("postalCode")}
            label={LABELS.country}
            placeholder="Recipient's Bank Postal/Zip Code/P.O.Box"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AutocompleteField
            label={LABELS.currency}
            placeholder="Bank Currency"
            name={getName("currency")}
            fullWidth
            dataSource={currenciesDataSource}
            required
          />
        </Grid>
      </Grid>
      <Typography py={2} color="primary" variant="h4">
        Beneficiary Address
      </Typography>
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientAddress")}
            label={LABELS.recipientAddress}
            placeholder="Beneficiary Address"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientCity")}
            label={LABELS.recipientCity}
            placeholder="Beneficiary City"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientState")}
            label={LABELS.recipientState}
            placeholder="Beneficiary State"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CountryField
            fullWidth
            name={getName("recipientCountry")}
            label={LABELS.recipientCountry}
            placeholder="Beneficiary Country"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            name={getName("recipientPostalCode")}
            label={LABELS.recipientPostalCode}
            placeholder="Beneficiary PostalCode"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
