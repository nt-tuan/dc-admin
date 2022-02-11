import { Divider, styled } from "@mui/material";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Grid from "@mui/material/Grid";
import { KYC3_SCHEMA } from "commons/schemas";
import Typography from "@mui/material/Typography";
import { areObjectValuesUndefined } from "utils";
import countryList from "assets/country.json";

const { BANK_DETAILS, KYC3_LABEL } = KYC3_SCHEMA;

const CopyButton = ({ isCopied, onClick }) => {
  return (
    <Button onClick={onClick} startIcon={isCopied ? <CheckIcon /> : <ContentCopyIcon />}>
      Copy
    </Button>
  );
};

const Row = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingLeft: 4,
  paddingRight: 4
});

export const BankDetailsReadonly = ({
  handleCopyText,
  bankDetails,
  showTitle = true,
  schema = BANK_DETAILS,
  label = KYC3_LABEL,
  isCopy = false
}) => {
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  const [isCopyClickedList, setIsCopyClickedList] = useState();

  const renderTitle = (index) => {
    switch (index) {
      case 0:
        return "Primary Bank Account";
      case 1:
        return "Secondary Bank Account";
      default:
        return null;
    }
  };

  const handleCopyTitle = (value) => {
    handleCopyText(value);
    setIsCopyClicked(true);
    setIsCopyClickedList(true);

    setTimeout(() => {
      setIsCopyClicked(false);
    }, 1000);
  };

  const handleCopyListData = (value) => {
    handleCopyText(value);
    setIsCopyClicked(false);
    setIsCopyClickedList(value);

    setTimeout(() => {
      setIsCopyClickedList(false);
    }, 1000);
  };

  let labelSwiftCodePrimary;
  let labelSwiftCodeSecondary;

  const renderLabelCode = (value, field, index) => {
    let labelBank = label[field];

    /**
     * Bank Details will return 2 Bank Type which is Primary and Secondary Bank Account ( as user registered secondary bank account)
     * index === 0 => Primary Bank Account
     * index === 1 => Secondary Bank Account
     * **/

    // Render Primary Bank
    if (index === 0) {
      if (value === "ACH" && field === "bankIdType") {
        labelSwiftCodePrimary = "ACH Company ID";
      }
      if (value === "SWIFT" && field === "bankIdType") {
        labelSwiftCodePrimary = "SWIFT Code";
      }
      if (value === "CHIPS" && field === "bankIdType") {
        labelSwiftCodePrimary = "CHIPS UID";
      }
      if (field === "swiftCode") {
        labelBank = labelSwiftCodePrimary || "SWIFT Code";
      }
    } else {
      if (value === "ACH" && field === "bankIdType") {
        labelSwiftCodeSecondary = "ACH Company ID";
      }

      if (value === "SWIFT" && field === "bankIdType") {
        labelSwiftCodeSecondary = "SWIFT Code";
      }

      if (value === "CHIPS" && field === "bankIdType") {
        labelSwiftCodeSecondary = "CHIPS UID";
      }

      if (field === "swiftCode") {
        labelBank = labelSwiftCodeSecondary;
      }
    }
    return labelBank;
  };

  return (
    <Grid container>
      {bankDetails
        .filter((account) => areObjectValuesUndefined(account) === false)
        .map((record, index) => (
          <Grid
            item
            key={record.id || index}
            xs={12}
            lg={bankDetails.length === 1 ? 12 : 6}
            sx={{ marginBottom: 2 }}
          >
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                width: "100%"
              }}
            >
              {isCopy && (
                <Box sx={{ backgroundColor: "grey.200" }}>
                  <CopyButton
                    onClick={() => handleCopyTitle(bankDetails)}
                    isCopied={isCopyClicked}
                  />
                  and Paste the details onto your bank's website
                </Box>
              )}
              {showTitle && (
                <Box py={2} pl={1} sx={{ color: "primary.main" }}>
                  <Typography variant="h4">{renderTitle(index)}</Typography>
                </Box>
              )}
              {Object.values(schema).map((field, schemaKeyIndex) => (
                <Box key={field}>
                  <Divider />
                  <Row>
                    <Row
                      sx={{
                        color: field === "paymentReference" ? "error.main" : undefined,
                        width: "100%",
                        justifyContent: "space-between",
                        flexGrow: 1
                      }}
                    >
                      <Box sx={{ marginRight: 2 }}>
                        <strong>{renderLabelCode(record[field], field, schemaKeyIndex)}</strong>
                      </Box>
                      <Box
                        sx={{
                          fontWeight: field === "paymentReference" ? "bold" : undefined,
                          paddingRight: 2
                        }}
                      >
                        {field === BANK_DETAILS.nationality
                          ? countryList.find((c) => c.alpha2Code === record[field]).name
                          : record[field]}
                      </Box>
                    </Row>
                    {isCopy && (
                      <CopyButton
                        onClick={() => handleCopyListData(record[field])}
                        isCopied={isCopyClickedList === record[field] || isCopyClicked}
                      />
                    )}
                  </Row>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};
