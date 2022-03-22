import { DTCSection, DTCTable } from "@/components/commons";
import React, { useEffect, useState } from "react";
import { getAllRecordsFromAPI, handleDownloadExcel } from "@/utils/general.util";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FinancialService } from "@/services";
import { Helmet } from "react-helmet";
import { SORT_ORDERS } from "@/commons/consts";
import Stack from "@mui/material/Stack";
import { accountSummaryColumns } from "./account-summary.schema";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { financialMapper } from "./account-summary.mapper";

const { parseDataToExcel, parseDataToGridView } = financialMapper;

const AccountSummaryPage = () => {
  const [accountSummary, setAccountSummary] = useState();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resAccountSummary = await getAllRecordsFromAPI(FinancialService.getAccountSummary, {
        sortTerm: "createdDate",
        sortOrder: SORT_ORDERS.DESC
      });
      setAccountSummary(parseDataToGridView(resAccountSummary));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(accountSummary);
    const fileName = `Account-summary`;
    const fileSheet = "AccountSummary";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  return (
    <DTCSection>
      <Helmet title="Account Summary" />
      <DTCSection.Content>
        <Stack mb={2} justifyContent="flex-end" direction="row">
          <Button variant="contained" onClick={handleDownload}>
            Download
          </Button>
        </Stack>
        <Box height={500}>
          <DTCTable
            showSettings={false}
            loading={accountSummary == null}
            dataSource={accountSummary ?? []}
            columns={accountSummaryColumns}
          />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};

export default AccountSummaryPage;
