import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { DTCModal } from "@/components/commons";
import { toCurrency } from "@/utils/general.util";

export default function NewWithdrawalTransactionModal({
  open,
  onClose,
  onSubmit,
  bankAccount,
  amount
}) {
  const lastDigits = bankAccount?.substring(bankAccount.length - 4);
  return (
    <DTCModal
      open={open}
      onClose={onClose}
      size="small"
      title={
        <Typography variant="inherit" textAlign="center">
          Withdrawal Transaction Submitted
        </Typography>
      }
      content={
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="inherit" textAlign="center">
              Your request to transfer <b>{toCurrency(amount, 2)}</b> from <b>Escrow wallet</b> to
              your bank account ending with ****{lastDigits} is completed. It may take 3-4 working
              days to reflect in your bank account.
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              View Transaction
            </Button>
          </Grid>
        </Grid>
      }
    />
  );
}
