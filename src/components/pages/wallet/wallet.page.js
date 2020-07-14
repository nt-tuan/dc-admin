import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { WalletAccountSummary, WalletDashboard } from "components/organisms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { walletMapper } from "commons/mappers";
import { FinancialService } from "services";
import { SORT_ORDERS } from "commons/consts";

const { parseDataToGridView, parseDataToWalletDashBoard } = walletMapper;

const WalletPage = () => {
  const [walletDashboard, setWalletDashboard] = useState({});
  const [transactionDetails, setTransactionDetails] = useState([]);
  // console.log("transactionDetails", transactionDetails);

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resDashboard = await FinancialService.getWalletDashboard();
      setWalletDashboard(parseDataToWalletDashBoard(resDashboard));
      const resTransaction = await getAllRecordsFromAPI(
        FinancialService.getWalletTransactionDetails,
        {
          sortTerm: "createdDate",
          sortOrder: "desc"
        }
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
