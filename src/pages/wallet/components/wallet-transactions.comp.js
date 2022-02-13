import { DTCSection, DTCTable } from "components/commons";
import { WALLET_SCHEMA, getWalletDescriptions } from "../wallet.schema";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DatetimeUtils } from "utils/date-time.util";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { toCurrency } from "utils/general.util";

const { FIELDS, LABELS } = WALLET_SCHEMA;
const moneyFormatter = (params) => toCurrency(params.value);

export const WalletTransactions = ({ transactionDetails, onDownload }) => {
  const columns = React.useMemo(() => {
    const descriptionSet = getWalletDescriptions();
    return [
      {
        headerName: LABELS[FIELDS.createdDate],
        field: FIELDS.createdDate,
        valueFormatter: (params) => DatetimeUtils.formatDateTime(params.value),
        width: 150
      },
      {
        headerName: LABELS[FIELDS.type],
        field: FIELDS.type,
        width: 200
      },
      {
        headerName: LABELS[FIELDS.orderNumber],
        field: FIELDS.orderNumber,
        width: 200
      },
      {
        headerName: LABELS[FIELDS.productDetails],
        field: FIELDS.productDetails,
        renderCell: (params) => (
          <Tooltip title={params.value} placement="top-start">
            <span>{params.value}</span>
          </Tooltip>
        ),
        width: 200
      },
      {
        headerName: LABELS[FIELDS.description],
        field: "description",
        renderCell: (params) => {
          const type = params.row?.type;
          if (type in descriptionSet) return descriptionSet[type];
          return "";
        },
        width: 200
      },
      {
        headerName: LABELS[FIELDS.credit],
        field: FIELDS.credit,
        valueFormatter: moneyFormatter,
        type: "number",
        align: "right",
        width: 200
      },
      {
        headerName: LABELS[FIELDS.debit],
        field: FIELDS.debit,
        valueFormatter: moneyFormatter,
        type: "number",
        align: "right",
        width: 200
      }
    ];
  }, []);

  return (
    <DTCSection>
      <DTCSection.Header>Account Summary</DTCSection.Header>
      <DTCSection.Content>
        <Stack
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
          direction="row"
          justifyContent="space-between"
        >
          <Button size="small" variant="outlined">
            Transaction Details
          </Button>
          <Button size="small" variant="contained" onClick={onDownload}>
            <DownloadIcon />
            Download
          </Button>
        </Stack>
        <Box sx={{ height: "500px" }}>
          <DTCTable
            columnBuffer={columns.length}
            loading={transactionDetails == null}
            dataSource={transactionDetails ?? []}
            columns={columns}
          />
        </Box>
      </DTCSection.Content>
    </DTCSection>
  );
};
