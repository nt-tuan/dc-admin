import { DTCSection, DTCTable } from "@/components/commons";
import React, { useEffect, useState } from "react";
import { getAllRecordsFromAPI, handleDownloadExcel } from "@/utils/general.util";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DatetimeUtils } from "@/utils/date-time.util";
import { FinancialService } from "@/services";
import { SORT_ORDERS } from "@/commons/consts";
import { WITHDRAWAL_SCHEMA } from "../withdrawal.schema";
import { asyncErrorHandlerWrapper } from "@/utils/error-handler.util";
import { withdrawPendingMapper } from "../withdraw.mapper";

const { LABELS, FIELDS } = WITHDRAWAL_SCHEMA;

const { parseDataToExcel, parseDataToGridView } = withdrawPendingMapper;

export const PendingWithdrawalTab = () => {
  const [data, setData] = useState();

  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const res = await getAllRecordsFromAPI(FinancialService.getWithdrawals, {
        sortTerm: "createdDate",
        sortOrder: SORT_ORDERS.DESC,
        outerParams: { status: "PENDING" }
      });

      setData(parseDataToGridView(res));
    });
  }, []);

  const handleDownload = () => {
    const dataExcel = parseDataToExcel(data);
    const fileName = "Pending-withdrawal";
    const fileSheet = "PendingWithdrawal";
    handleDownloadExcel(dataExcel, fileName, fileSheet);
  };

  const columns = [
    {
      headerName: "Date",
      field: FIELDS.timestamp,
      valueFormatter: (params) => (params.value ? DatetimeUtils.formatDateTime(params.value) : ""),
      width: 150
    },
    {
      headerName: LABELS[FIELDS.id],
      width: 150,
      field: FIELDS.id
    },
    {
      headerName: LABELS[FIELDS.accountNumber],
      width: 150,
      field: FIELDS.accountNumber
    },
    {
      headerName: LABELS[FIELDS.amount],
      width: 200,
      field: FIELDS.amount,
      align: "right"
    }
  ];

  return (
    <DTCSection>
      <DTCSection.Header
        actions={
          <Button
            disabled={data == null || data.length === 0}
            size="small"
            variant="contained"
            onClick={handleDownload}
          >
            Download
          </Button>
        }
      >
        Wallet Pending
      </DTCSection.Header>

      <DTCSection.Content>
        <Box sx={{ height: "500px" }}>
          <DTCTable
            showSettings={false}
            loading={data == null}
            columns={columns}
            columnBuffer={columns.length}
            dataSource={data ?? []}
          />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};
