import React, { useState, useEffect } from "react";
import { getPendingWithdrawalTableSchema, WITHDRAWAL_SCHEMA } from "commons/schemas";
import { Button, message } from "antd";
import XLSX from "xlsx";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "commons/consts";
import { DTCTable } from "components/atoms";
import { DownloadOutlined } from "@ant-design/icons";

const { FIELDS, LABELS } = WITHDRAWAL_SCHEMA;

const fakedData = [
  {
    id: 0,
    timeStamp: "2020-05-25T09:17:50",
    withdrawalId: 1,
    depositedAccount: "Acc No.1",
    debit: 2,
    currency: "USD"
  },
  {
    id: 1,
    timeStamp: "2020-05-25T09:17:50",
    withdrawalId: 4,
    depositedAccount: "Acc No.2",
    debit: 5,
    currency: "USD"
  }
];

const columns = () => {
  const columns = getPendingWithdrawalTableSchema();
  return [
    columns[FIELDS.timeStamp],
    columns[FIELDS.withdrawalId],
    columns[FIELDS.depositedAccount],
    columns[FIELDS.debit],
    columns[FIELDS.currency]
  ];
};

const parseDataToExcel = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  const labelIndex = {
    [FIELDS.timeStamp]: 0,
    [FIELDS.withdrawalId]: 1,
    [FIELDS.depositedAccount]: 2,
    [FIELDS.debit]: 3,
    [FIELDS.currency]: 4
  };
  const parsedDataArray = [Object.keys(labelIndex).map((prop) => LABELS[FIELDS[prop]])];
  data.forEach((withdraw) => {
    let parsedWithdrawal = new Array(5);
    Object.keys(withdraw).forEach((prop) => {
      if (labelIndex[prop] !== undefined) {
        parsedWithdrawal[labelIndex[prop]] = withdraw[prop];
      }
    });
    parsedDataArray.push(parsedWithdrawal);
  });
  return parsedDataArray;
};

export const PendingWithdrawalTab = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const formatedData = fakedData.map((order) => ({
      ...order,
      timestamp: dayjs(order.timeStamp).format(DATETIME_FORMAT)
    }));
    setData(formatedData);
  }, []);

  const handleDownloadPendingWithdrawal = () => {
    const parsedData = parseDataToExcel(data);
    if (parsedData.length) {
      const sheet = XLSX.utils.json_to_sheet(parsedData, {
        skipHeader: true
      });
      const excelBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(excelBook, sheet, "history-withdrawal");
      XLSX.writeFile(excelBook, "Pending-Withdrawal.xlsx", {
        bookType: "xlsx",
        type: "file",
        sheet: "pending-withdrawal"
      });
    } else {
      message.info("There is no data");
    }
  };

  return (
    <div className="air__utils__shadow bg-white p-4 dtc-br-10">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="text-primary font-weight-bold">Wallet Pending</h5>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownloadPendingWithdrawal}
        >
          Download
        </Button>
      </div>
      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={fakedData.map((data) => ({
          ...data,
          timeStamp: dayjs(data.timeStamp).format(DATETIME_FORMAT)
        }))}
        schema={() => columns()}
      />
    </div>
  );
};
