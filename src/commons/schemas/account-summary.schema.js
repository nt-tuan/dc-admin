import React from "react";
import { sortAlphabetically } from "utils/sort.util";

const FIELDS = {
  createdDate: "createdDate",
  number: "number",
  destinationCity: "destinationCity",
  destinationCountry: "destinationCountry",
  originCity: "originCity",
  originCountry: "originCountry",
  totalPrice: "totalPrice",
  commission: "commission",
  paymentDueDate: "paymentDueDate"
};

const LABELS = {
  [FIELDS.createdDate]: "Order Date",
  [FIELDS.number]: "Order Number",
  [FIELDS.destinationCity]: "Destination City",
  [FIELDS.destinationCountry]: "Destination Country",
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
      title: LABELS[FIELDS.createdDate],
      dataIndex: FIELDS.createdDate,
      key: FIELDS.createdDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.createdDate], b[FIELDS.createdDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.createdDate && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: LABELS[FIELDS.number],
      dataIndex: FIELDS.number,
      key: FIELDS.number,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.number], b[FIELDS.number]),
      sortOrder: sortedInfo.columnKey === FIELDS.number && sortedInfo.order,
      render: (number) => <CustomHighlighter searchText={searchText} value={number} />
    },
    {
      title: LABELS[FIELDS.destinationCity],
      dataIndex: FIELDS.destinationCity,
      key: FIELDS.destinationCity,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.destinationCity], b[FIELDS.destinationCity]),
      sortOrder: sortedInfo.columnKey === FIELDS.destinationCity && sortedInfo.order,
      render: (destinationCity) => (
        <CustomHighlighter searchText={searchText} value={destinationCity} />
      )
    },
    {
      title: LABELS[FIELDS.destinationCountry],
      dataIndex: FIELDS.destinationCountry,
      key: FIELDS.destinationCountry,
      sorter: (a, b) =>
        sortAlphabetically(a[FIELDS.destinationCountry], b[FIELDS.destinationCountry]),
      sortOrder: sortedInfo.columnKey === FIELDS.destinationCountry && sortedInfo.order,
      render: (destinationCountry) => (
        <CustomHighlighter searchText={searchText} value={destinationCountry} />
      )
    },
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
