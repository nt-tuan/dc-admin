import React from "react";
import { sortAlphabetically } from "utils/sort.util";
import { Button, Tag, Tooltip } from "antd";
import HoverTax from "components/organisms/route/forms/tax-rules/tax-hover.list.comp";
const FIELDS = {
  timestamp: "createdDate",
  categoryName: "categoryName",
  typeName: "typeName",
  to: "toCountry",
  from: "fromCountry",
  hasTaxes: "hasTaxes"
};

const LABELS = {
  [FIELDS.timestamp]: "Timestamp",
  [FIELDS.categoryName]: "Product Category",
  [FIELDS.typeName]: "Product Type",
  [FIELDS.to]: "To",
  [FIELDS.from]: "From",
  [FIELDS.hasTaxes]: "Tax Applied"
};

// active tab
const routeTableSchema = (onEditClick, onDeleteClick, hiddenFromToFields = false) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  let columnsSchema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp || ""} />
    },
    {
      title: LABELS[FIELDS.categoryName],
      dataIndex: FIELDS.categoryName,
      key: FIELDS.categoryName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.categoryName], b[FIELDS.categoryName]),
      sortOrder: sortedInfo.columnKey === FIELDS.categoryName && sortedInfo.order,
      render: (categoryName) => (
        <CustomHighlighter searchText={searchText} value={categoryName || ""} />
      )
    },
    {
      title: LABELS[FIELDS.typeName],
      dataIndex: FIELDS.typeName,
      key: FIELDS.typeName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.typeName], b[FIELDS.typeName]),
      sortOrder: sortedInfo.columnKey === FIELDS.typeName && sortedInfo.order,
      render: (typeName) => <CustomHighlighter searchText={searchText} value={typeName || ""} />
    },
    {
      title: LABELS[FIELDS.from],
      dataIndex: FIELDS.from,
      key: FIELDS.from,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.from], b[FIELDS.from]),
      sortOrder: sortedInfo.columnKey === FIELDS.from && sortedInfo.order,
      render: (from) => <CustomHighlighter searchText={searchText} value={from || ""} />
    },
    {
      title: LABELS[FIELDS.to],
      dataIndex: FIELDS.to,
      key: FIELDS.to,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.to], b[FIELDS.to]),
      sortOrder: sortedInfo.columnKey === FIELDS.to && sortedInfo.order,
      render: (to) => <CustomHighlighter searchText={searchText} value={to || ""} />
    },
    {
      title: LABELS[FIELDS.hasTaxes],
      dataIndex: FIELDS.hasTaxes,
      key: FIELDS.hasTaxes,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.hasTaxes], b[FIELDS.hasTaxes]),
      sortOrder: sortedInfo.columnKey === FIELDS.hasTaxes && sortedInfo.order,
      render: (hasTaxes, record) => {
        return (
          <>
            {hasTaxes === "Yes" ? (
              <Tag color={`green`}>
                <Tooltip color="#ffffff" title={<HoverTax data={record?.taxDetailResponseList} />}>
                  {hasTaxes}
                </Tooltip>
              </Tag>
            ) : (
              <Tag color={`red`}>{hasTaxes}</Tag>
            )}
          </>
        );
      }
    },
    {
      title: "Manage",
      key: "manage",
      render: (record) => (
        <div className="d-flex justify-content-end mr-2">
          <Button
            type="primary"
            className="dtc-min-width-50 mr-2"
            onClick={() => onEditClick(record.id)}
          >
            <i className="fe fe-edit" style={{ verticalAlign: "middle" }}></i>
          </Button>
          <Button
            type="danger"
            className="dtc-min-width-50 mr-2"
            onClick={() => onDeleteClick(record.id)}
          >
            <i className="fe fe-trash" style={{ verticalAlign: "middle" }}></i>
          </Button>
        </div>
      )
    }
  ];

  if (hiddenFromToFields)
    columnsSchema = columnsSchema.filter((col) => col.key !== FIELDS.from && col.key !== FIELDS.to);

  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};

export const ROUTE_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  getTableSchema: routeTableSchema
});
