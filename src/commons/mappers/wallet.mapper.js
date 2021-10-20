import React from "react";
import { toCurrency, toNumber } from "utils/general.util";
import { DatetimeUtils } from "utils/date-time.util";
import { WALLET_SCHEMA } from "commons/schemas/wallet.schema";
import { RouteConst } from "commons/consts";

const { FIELDS, LABELS, WALLET_DESCRIPTIONS, WALLET_TRANSACTION_TYPE_LABELS } = WALLET_SCHEMA;
const { formatDateTime } = DatetimeUtils;

const parseDataToExcel = (wallet) => {
  if (!Array.isArray(wallet) || wallet.length <= 0) {
    return [];
  }

  const columns = {
    [FIELDS.timestamp]: 0,
    [FIELDS.type]: 1,
    [FIELDS.number]: 2,
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
      if (columns[field] !== undefined) {
        if (field === FIELDS.timestamp) {
          row[columns[field]] = item[field] ? formatDateTime(item[field]) : "";
        } else if (
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
        } else {
          row[columns[field]] = item[field];
        }
      }
    });
    dataExcel.push(row);
  });
  return dataExcel;
};

const parseDataToGridView = (data) => {
  let newData = [...data];
  if (newData && Array.isArray(newData)) {
    newData = newData.map((wallet) => {
      const {
        timestamp,
        blockedFund,
        credit,
        debit,
        totalBlockFund,
        availableBalance,
        currentBalance,
        type,
        number
      } = wallet;
      return {
        ...wallet,
        id: number,
        timestamp: timestamp ? formatDateTime(timestamp) : "",
        blockedFund: toCurrency(blockedFund),
        credit: toCurrency(credit),
        debit: toCurrency(debit),
        totalBlockFund: toCurrency(totalBlockFund),
        availableBalance: toCurrency(availableBalance),
        currentBalance: toCurrency(currentBalance),
        description: WALLET_DESCRIPTIONS[type],
        type: WALLET_TRANSACTION_TYPE_LABELS[type]
      };
    });
  }

  return newData;
};

const parseDataToWalletDashBoard = (data) => {
  return {
    totalBalance: {
      name: "totalBalance",
      icon: <i className="fas fa-money-check-alt"></i>,
      title: "Current Total Balance",
      value: data.totalBalance,
      func: () => {},
      description: "Current Total Balance : Total Balance in your wallet"
    },
    pendingWithdrawal: {
      name: "pendingWithdrawal",
      icon: <i className="fas fa-folder-minus"></i>,
      title: "Pending Withdrawal",
      value: data.pendingWithdrawal,
      func: () => window.history.push(RouteConst.WALLET),
      description: "Funds being processed for your withdrawal request"
    }
  };
};

export const walletMapper = {
  parseDataToExcel,
  parseDataToGridView,
  parseDataToWalletDashBoard
};
