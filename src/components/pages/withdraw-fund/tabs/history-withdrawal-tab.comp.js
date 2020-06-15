import React, { useState, useEffect } from "react";
import { getHistoryWithdrawalTableSchema, WITHDRAWAL_SCHEMA } from "commons/schemas";
import XLSX from "xlsx";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "commons/consts";
import { Button, message } from "antd";
import { DTCTable } from "components/atoms";
import { DownloadOutlined } from "@ant-design/icons";

const { FIELDS, LABELS } = WITHDRAWAL_SCHEMA;

const fakedData = [
  {
    id: 0,
    requestedDate: "2020-05-25T19:17:50",
    processedDate: "2020-05-30T09:17:50",
    withdrawalId: 10,
    depositedAccount: "Acc No.4",
    debit: 11,
    currency: "USD",
    status: "status"
  },
  {
    id: 1,
    requestedDate: "2020-05-22T09:17:50",
    processedDate: "2020-05-21T09:17:50",
    withdrawalId: 13,
    depositedAccount: "Acc No.5",
    debit: 14,
    currency: "USD",
    status: "status1"
  }
];

const columns = () => {
  const columns = getHistoryWithdrawalTableSchema();
  return [
    columns[FIELDS.requestedDate],
    columns[FIELDS.processedDate],
    columns[FIELDS.withdrawalId],
    columns[FIELDS.depositedAccount],
    columns[FIELDS.debit],
    columns[FIELDS.currency],
    columns[FIELDS.status]
  ];
};

const parseDataToExcel = (dataHistory) => {
  if (!Array.isArray(dataHistory) || dataHistory.length <= 0) {
    return [];
  }
  const labelIndex = {
    [FIELDS.requestedDate]: 0,
    [FIELDS.processedDate]: 1,
    [FIELDS.withdrawalId]: 2,
    [FIELDS.depositedAccount]: 3,
    [FIELDS.debit]: 4,
    [FIELDS.currency]: 5,
    [FIELDS.status]: 6
  };
  const parsedHistory = [Object.keys(labelIndex).map((prop) => LABELS[FIELDS[prop]])];
  dataHistory.forEach((withdrawal) => {
    let parsedWithdrawal = new Array(7);
    Object.keys(withdrawal).forEach((prop) => {
      if (labelIndex[prop] !== undefined) {
        parsedWithdrawal[labelIndex[prop]] = withdrawal[prop];
      }
    });
    parsedHistory.push(parsedWithdrawal);
  });
  return parsedHistory;
};

export const HistoryWithdrawalTab = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const formatedData = fakedData.map((order) => ({
      ...order,
      requestedDate: dayjs(order.requestedDate).format(DATETIME_FORMAT),
      processedDate: dayjs(order.processedDate).format(DATETIME_FORMAT)
    }));
    setData(formatedData);
  }, []);

  const handleDownloadHistoryWithdrawal = () => {
    const parsedData = parseDataToExcel(data);
    if (parsedData.length) {
      const sheet = XLSX.utils.json_to_sheet(parsedData, {
        skipHeader: true
      });
      const excelBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(excelBook, sheet, "history-withdrawal");
      XLSX.writeFile(excelBook, "History-Withdrawal.xlsx", {
        bookType: "xlsx",
        type: "file",
        sheet: "history-withdrawal"
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
          onClick={handleDownloadHistoryWithdrawal}
        >
          Download
        </Button>
      </div>
      <DTCTable
        showSettings={false}
        loading={false}
        dataSource={data.map((data) => ({
          ...data,
          requestedDate: dayjs(data.requestedDate).format(DATETIME_FORMAT),
          processedDate: dayjs(data.processedDate).format(DATETIME_FORMAT)
        }))}
        onChange={(value) => setData(value)}
        schema={columns}
      />
    </div>
  );
};
