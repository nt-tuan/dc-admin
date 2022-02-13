import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { toCurrency } from "utils/general.util";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const GridItem = ({ title, value, description }) => {
  return (
    <Grid item xs={12} md={6} lg={4} title={description}>
      <Card>
        <CardContent>
          <Stack
            direction="column"
            justifyContent="center"
            sx={{ height: "70px", color: "primary.main" }}
          >
            <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>{title}</Box>
            <Box sx={{ fontSize: "24px", fontWeight: "bold" }}>{value}</Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const WithdrawDashboard = ({ data, sx }) => {
  return (
    <Grid sx={sx} container spacing={2}>
      <GridItem
        description="This is the amount that you can actually request for a withdrawal and can be this whole amount or just a part of it."
        title={<Box>AVAILABLE FOR WITHDRAWAL</Box>}
        value={toCurrency(data.availableBalance)}
      />
      <GridItem
        description="Funds being processed for your withdrawal request"
        title={
          <Box>
            PENDING OUTBOUND <ArrowDropUpIcon sx={{ color: "error.main" }} />{" "}
          </Box>
        }
        value={toCurrency(data.pendingWithdrawal)}
      />
      <GridItem
        description="Some of Sales Invoices and Seller Commissions"
        title={
          <Box>
            PENDING INBOUND <ArrowDropDownIcon sx={{ color: "success.main" }} />
          </Box>
        }
        value={toCurrency(data.pendingInBound)}
      />
    </Grid>
  );
};
