import React from "react";
import { Helmet } from "react-helmet";
import { AccountSummary, WalletDashboard } from "components/organisms";

const walletDashboard = {
  totalBalance: 1000,
  withdrawal: 500
};

const WalletPage = () => {
  return (
    <article>
      <Helmet title="Wallet" />
      <WalletDashboard walletDashboard={walletDashboard} />
      <AccountSummary />
    </article>
  );
};

export default WalletPage;
