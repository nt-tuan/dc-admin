import { DTCSection, DTCTable } from "@/components/commons";
import React, { useEffect, useState } from "react";
import { getAllRecordsFromAPI, handleDownloadExcel } from "@/utils/general.util";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { FinancialService } from "@/services";
import { SORT_ORDERS } from "@/commons/consts";
import { WITHDRAWAL_SCHEMA } from "../withdrawal.schema";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { withdrawHistoryMapper } from "../withdraw.mapper";
const { LABELS, FIELDS } = WITHDRAWAL_SCHEMA;

const { parseDataToExcel, parseDataToGridView } = withdrawHistoryMapper;

export const HistoryWithdrawalTab = () => {
  const [data, setData] = useState();
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(FinancialService.getWithdrawals, {
        sortTerm: "createdDate",
        sortOrder: SORT_ORDERS.DESC,
        outerParams: { status: "COMPLETED" }
      });
      setData(parseDataToGridView(res));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "History-withdrawal";
    const fileSheet = "HistoryWithdrawal";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  const columns = [
    {
      headerName: LABELS[FIELDS.requestedDate],
      field: FIELDS.requestedDate,
      width: 150
    },
    {
      headerName: LABELS[FIELDS.processedDate],
      field: FIELDS.processedDate,
      width: 150
    },
    {
      headerName: LABELS[FIELDS.id],
      field: FIELDS.id,
      width: 150
    },
    {
      headerName: LABELS[FIELDS.accountNumber],
      field: FIELDS.accountNumber,
      width: 150
    },
    {
      headerName: LABELS[FIELDS.amount],
      field: FIELDS.amount,
      align: "right",
      width: 150
    },
    {
      headerName: LABELS[FIELDS.status],
      field: FIELDS.status
    }
  ];

  return (
    <DTCSection>
      <DTCSection.Header
        actions={
          <Button
            disabled={data == null || data.length === 0}
            startIcon={<DownloadIcon />}
            variant="contained"
            size="small"
            onClick={handleDownload}
          >
            Download
          </Button>
        }
      >
        Wallet History
      </DTCSection.Header>
      <DTCSection.Content>
        <Box sx={{ height: "500px" }}>
          <DTCTable
            loading={data == null}
            dataSource={data ?? []}
            columns={columns}
            columnBuffer={columns.length}
          />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};
