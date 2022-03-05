import Box from "@mui/material/Box";
import { CountryField } from "@/components/commons/fields";
import Grid from "@mui/material/Grid";
import React from "react";

export const RouteField = ({ fromName = "fromCountry", toName = "toCountry", disabled }) => {
  return (
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <CountryField
            fullWidth
            disabled={disabled}
            name={fromName}
            label="From"
            placeholder="From"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CountryField
            fullWidth
            disabled={disabled}
            name={toName}
            label="To"
            placeholder="To"
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
};
