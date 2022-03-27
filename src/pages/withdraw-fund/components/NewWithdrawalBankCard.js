import React from "react";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import styled from "@mui/material/styles/styled";

const CardBox = styled(Card)(
  ({ theme, isfocus, selectbank }) => ({
    border: isfocus === "true" ? `2px solid ${theme.palette.primary.main}` : `2px solid #E5E5E5`,
    backgroundColor: isfocus === "false" && selectbank !== undefined ? "#E5E5E5" : "",
    cursor: "pointer"
  }),
  { name: "CardBox" }
);

export default function NewWithdrawalBankCard({ isFocus, name, accountNumber, selectedBank }) {
  const lastDigits = accountNumber?.substring(accountNumber.length - 4);

  return (
    <CardBox variant="outlined" isfocus={isFocus} selectbank={selectedBank}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              color={isFocus === "false" && selectedBank !== undefined ? "textSecondary" : ""}
            >
              <b>{name}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2">
              Account Number
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2">
              ****{lastDigits}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </CardBox>
  );
}
