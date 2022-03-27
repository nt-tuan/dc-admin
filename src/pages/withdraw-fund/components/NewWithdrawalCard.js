import React from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import styled from "@mui/material/styles/styled";
import { toCurrency } from "@/utils/general.util";

const CardBox = styled(Card)(
  ({ theme }) => ({
    border: `2px solid #E5E5E5`,
    cursor: "pointer",
    padding: theme.spacing(2)
  }),
  { name: "CardBox" }
);

export default function NewWithdrawalCard({ balance }) {
  return (
    <CardBox variant="outlined">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography>
            <b>GMEX</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" variant="body2">
            Wallet Balance
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="div">
            <Typography variant="h6" component="span">
              <b>{toCurrency(balance)}</b>
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </CardBox>
  );
}
