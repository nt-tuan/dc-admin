import React from "react";
import { sortAlphabetically } from "utils/sort.util";

const FIELDS = {
  originCity: "originCity",
  originCountry: "originCountry",
  totalPrice: "totalPrice",
  commission: "commission",
  paymentDueDate: "paymentDueDate"
};

const LABELS = {
  [FIELDS.originCity]: "Origin City",
  [FIELDS.originCountry]: "Origin Country",
  [FIELDS.totalPrice]: "Order Value",
  [FIELDS.paymentDueDate]: "Payment Due Date (Est)",
  [FIELDS.commission]: "Commission"
};

export const ACCOUNT_SUMMARY_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});

export const accountSummaryTableSchema = () => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.originCity],
      dataIndex: FIELDS.originCity,
      key: FIELDS.originCity,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.originCity], b[FIELDS.originCity]),
      sortOrder: sortedInfo.columnKey === FIELDS.originCity && sortedInfo.order,
      render: (originCity) => <CustomHighlighter searchText={searchText} value={originCity} />
    },
    {
      title: LABELS[FIELDS.originCountry],
      dataIndex: FIELDS.originCountry,
      key: FIELDS.originCountry,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.originCountry], b[FIELDS.originCountry]),
      sortOrder: sortedInfo.columnKey === FIELDS.originCountry && sortedInfo.order,
      render: (originCountry) => <CustomHighlighter searchText={searchText} value={originCountry} />
    },
    {
      title: LABELS[FIELDS.totalPrice],
      dataIndex: FIELDS.totalPrice,
      key: FIELDS.totalPrice,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.totalPrice], b[FIELDS.totalPrice]),
      sortOrder: sortedInfo.columnKey === FIELDS.totalPrice && sortedInfo.order,
      render: (totalPrice) => <CustomHighlighter searchText={searchText} value={totalPrice} />
    },
    {
      title: LABELS[FIELDS.commission],
      dataIndex: FIELDS.commission,
      key: FIELDS.commission,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.commission], b[FIELDS.commission]),
      sortOrder: sortedInfo.columnKey === FIELDS.commission && sortedInfo.order,
      render: (commission) => <CustomHighlighter searchText={searchText} value={commission} />
    },
    {
      title: LABELS[FIELDS.paymentDueDate],
      dataIndex: FIELDS.paymentDueDate,
      key: FIELDS.paymentDueDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.paymentDueDate], b[FIELDS.paymentDueDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.paymentDueDate && sortedInfo.order,
      render: (paymentDueDate) => (
        <CustomHighlighter searchText={searchText} value={paymentDueDate} />
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
