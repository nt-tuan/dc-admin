import React from "react";
import { Helmet } from "react-helmet";
import { WalletDashboard } from "components/organisms/containers/wallet/wallet-dashboard.container.comp";
import { AccountSummary } from "components/organisms/containers/wallet/account-summary-container.comp";

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
