import React from "react";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LABEL_BY_BANK_TYPE } from "../bank-type.enum";
import Divider from "@mui/material/Divider";
import { Country } from "@/components/commons";
import { useBreakpoints } from "@/utils/use-breakpoints";

const LabelValue = ({ label, value }) => {
  const { isSmall } = useBreakpoints();
  return (
    <Stack direction={isSmall ? "column" : "row"} alignItems="flex-start">
      <Box width={300}>
        <Typography fontWeight="bold" variant="body2" component="div">
          {label}
        </Typography>
      </Box>
      <Box width={380}>
        <Typography variant="body2" component="div">
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

const Address = (bankData) => {
  return (
    <Stack>
      {bankData.address && <Box>{bankData.address}</Box>}
      {bankData.city && <Box>{bankData.city}</Box>}
      {bankData.state && <Box>{bankData.state}</Box>}
      {bankData.country && (
        <Box>
          <Country code={bankData.country} />
        </Box>
      )}
      {bankData.postalCode && <Box>{bankData.postalCode}</Box>}
    </Stack>
  );
};

export const BankDetailView = ({ bankData }) => {
  const bankTypeLabel = LABEL_BY_BANK_TYPE[bankData.bankIdType];

  return (
    <Stack spacing={2} justifyContent="space-between" maxWidth={680}>
      <LabelValue label="Beneficiary Name" value={bankData?.accountName} />
      <Divider />
      <LabelValue label="Beneficiary Bank" value={bankData?.name} />
      <Divider />
      <LabelValue label="Bank ID Type" value={bankData?.bankIdType} />
      <Divider />
      <LabelValue label={bankTypeLabel ?? "SWIFT Code"} value={bankData?.accountName} />
      <Divider />
      <LabelValue label="Beneficiary Bank Account Number" value={bankData?.accountNumber} />
      <Divider />
      <LabelValue label="Recepient’s Bank IBAN" value={bankData?.iban} />
      <Divider />
      <LabelValue label="Recepient’s Bank Sort Code" value={bankData?.sortCode} />
      <Divider />
      <LabelValue label="Recepient’s Bank ABA Number" value={bankData?.abaNumber} />
      <Divider />
      <LabelValue label="Bank Address" value={<Address {...bankData} />} />
      <Divider />
      <LabelValue label="Bank Currency" value={bankData?.currency} />
      <Divider />
      <LabelValue
        label="Beneficiary Address"
        value={
          <Address
            address={bankData.recipientAddress}
            city={bankData.recipientCity}
            state={bankData.recipientState}
            country={bankData.recipientCountry}
            postalCode={bankData.postalCode}
          />
        }
      />
    </Stack>
  );
};
