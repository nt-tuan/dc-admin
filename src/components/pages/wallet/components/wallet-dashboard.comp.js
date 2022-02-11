import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Button from "@mui/material/Button";
import { DTCSection } from "components/commons";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import React from "react";
import { RouteConst } from "commons/consts";
import Stack from "@mui/material/Stack";
import { StatisticStat } from "./statistic-stat.comp";

const GridItem = (props) => {
  return (
    <Grid item xs={12} md={6}>
      <StatisticStat {...props} />
    </Grid>
  );
};

export const WalletDashboard = ({ walletDashboard }) => {
  return (
    <DTCSection>
      <DTCSection.Header
        actions={
          <Stack spacing={1} direction="row">
            <Link to={RouteConst.ADD_FUNDS}>
              <Button size="small" variant="contained">
                Add Funds
              </Button>
            </Link>
            <Link to={RouteConst.WITHDRAW_FUND}>
              <Button size="small" variant="contained">
                Withdraw Funds
              </Button>
            </Link>
          </Stack>
        }
      >
        Wallet Dashboard
      </DTCSection.Header>

      <DTCSection.Content>
        <Grid container spacing={2}>
          <GridItem
            title="Current Total Balance"
            value={walletDashboard.totalBalance}
            description="Current Total Balance : Total Balance in your wallet"
            icon={<AccountBalanceWalletIcon sx={{ fontSize: "36px" }} />}
          />
          <GridItem
            title="Pending Withdrawal"
            value={walletDashboard.pendingWithdrawal}
            description="Funds being processed for your withdrawal request"
            icon={<AccountBalanceWalletIcon sx={{ fontSize: "36px" }} />}
          />
        </Grid>
      </DTCSection.Content>
    </DTCSection>
  );
};
