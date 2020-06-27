import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { WalletAccountSummary, WalletDashboard } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { walletMapper } from "commons/mappers";
import { FinancialService } from "services";

const { parseDataToGridView, parseDataToWalletDashBoard } = walletMapper;

const WalletPage = () => {
  const [walletDashboard, setWalletDashboard] = useState({});
  const [transactionDetails, setTransactionDetails] = useState([]);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resDashboard = await FinancialService.getWalletDashboard();
      setWalletDashboard(parseDataToWalletDashBoard(resDashboard));
      const resTransaction = await getAllRecordsFromAPI(
        FinancialService.getWalletTransactionDetails
      );
      setTransactionDetails(parseDataToGridView(resTransaction));
    });
  }, []);

  return (
    <article>
      <Helmet title="Wallet" />
      <WalletDashboard cards={walletDashboard} />
      <WalletAccountSummary transactionDetails={transactionDetails} />
    </article>
  );
};

export default WalletPage;
