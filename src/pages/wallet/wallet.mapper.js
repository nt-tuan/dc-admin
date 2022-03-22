import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { DatetimeUtils } from "@/utils/date-time.util";
import PaymentsIcon from "@mui/icons-material/Payments";
import React from "react";
import { WALLET_SCHEMA } from "./wallet.schema";
import { toNumber } from "@/utils/general.util";

const { FIELDS, LABELS } = WALLET_SCHEMA;
const { formatDateTime } = DatetimeUtils;

export const parseDataToExcel = (wallet) => {
  if (!Array.isArray(wallet) || wallet.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.createdDate]: 0,
    [FIELDS.type]: 1,
    [FIELDS.orderNumber]: 2,
    [FIELDS.productDetails]: 3,
    [FIELDS.description]: 4,
    [FIELDS.currency]: 5,
    [FIELDS.blockedFund]: 6,
    [FIELDS.credit]: 7,
    [FIELDS.debit]: 8,
    [FIELDS.totalBlockFund]: 9,
    [FIELDS.availableBalance]: 10,
    [FIELDS.currentBalance]: 11
  };
  // add first row as label
  const dataExcel = [Object.keys(columns).map((field) => LABELS[field])];

  wallet.forEach((item) => {
    let row = new Array(12);
    Object.keys(item).forEach((field) => {
      if (columns[field] === undefined) return;
      if (field === FIELDS.createdDate) {
        row[columns[field]] = formatDateTime(item[field]);
        return;
      }
      if (
        [
          FIELDS.blockedFund,
          FIELDS.credit,
          FIELDS.debit,
          FIELDS.totalBlockFund,
          FIELDS.currentBalance,
          FIELDS.availableBalance
        ].includes(field)
      ) {
        row[columns[field]] = toNumber(item[field]);
        return;
      }
      row[columns[field]] = item[field];
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

export const parseDataToWalletDashBoard = (data) => {
  return {
    totalBalance: {
      name: "totalBalance",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: "36px" }} />,
      title: "Current Total Balance",
      value: data.totalBalance,
      description: "Current Total Balance : Total Balance in your wallet"
    },
    pendingWithdrawal: {
      name: "pendingWithdrawal",
      icon: <PaymentsIcon sx={{ fontSize: "36px" }} />,
      title: "Pending Withdrawal",
      value: data.pendingWithdrawal,
      description: "Funds being processed for your withdrawal request"
    }
  };
};
