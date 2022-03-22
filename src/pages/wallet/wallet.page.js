import Stack from "@mui/material/Stack";
import { parseDataToExcel } from "./wallet.mapper";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FinancialService } from "@/services";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { WalletDashboard } from "./components/wallet-dashboard.comp";
import { WalletTransactions } from "./components/wallet-transactions.comp";
import { handleDownloadExcel, getAllRecordsFromAPI } from "@/utils/general.util";

const WalletPage = () => {
  const [walletDashboard, setWalletDashboard] = useState({});
  const [transactionDetails, setTransactionDetails] = useState();
  const handleDownload = () => {
    const dataExcel = parseDataToExcel(transactionDetails);
    const fileName = "Wallet-account-summary";
    const fileSheet = "WalletAccountSummary";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resDashboard = await FinancialService.getWalletDashboard();
      setWalletDashboard(resDashboard);
      const resTransaction = await getAllRecordsFromAPI(
        FinancialService.getWalletTransactionDetails,
        {
          sortTerm: "createdDate",
          sortOrder: "desc"
        }
      );
      setTransactionDetails(resTransaction);
    });
  }, []);

  return (
    <article>
      <Helmet title="Wallet" />
      <Stack spacing={4}>
        <WalletDashboard walletDashboard={walletDashboard} />
        <WalletTransactions transactionDetails={transactionDetails} onDownload={handleDownload} />
      </Stack>
    </article>
  );
};

export default WalletPage;
