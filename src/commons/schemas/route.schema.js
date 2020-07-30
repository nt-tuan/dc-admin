import React, { Fragment } from "react";
import { sortAlphabetically } from "utils/sort.util";
import { Button } from "antd";

const FIELDS = {
  timestamp: "createdDate",
  route: "route",
  to: "to",
  from: "from"
};

const LABELS = {
  [FIELDS.timestamp]: "Time Stamp",
  [FIELDS.route]: "Route",
  [FIELDS.to]: "To",
  [FIELDS.from]: "From"
};

// active tab
const routeTableSchema = (onEditClick, onDeleteClick) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp || ""} />
    },
    {
      title: LABELS[FIELDS.route],
      dataIndex: FIELDS.route,
      key: FIELDS.route,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.route], b[FIELDS.route]),
      sortOrder: sortedInfo.columnKey === FIELDS.route && sortedInfo.order,
      render: (route) => <CustomHighlighter searchText={searchText} value={route || ""} />
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
      title: LABELS[FIELDS.from],
      dataIndex: FIELDS.from,
      key: FIELDS.from,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.from], b[FIELDS.from]),
      sortOrder: sortedInfo.columnKey === FIELDS.from && sortedInfo.order,
      render: (from) => <CustomHighlighter searchText={searchText} value={from || ""} />
    },
    {
      title: "Manage",
      key: "manage",
      render: () => (
        <React.Fragment>
          <Fragment>
            <Button type="primary" className="dtc-min-width-50 mr-2" onClick={onEditClick}>
              <i className="fe fe-edit" style={{ verticalAlign: "middle" }}></i>
            </Button>
            <Button type="danger" className="dtc-min-width-50 mr-2" onClick={onDeleteClick}>
              <i className="fe fe-trash" style={{ verticalAlign: "middle" }}></i>
            </Button>
          </Fragment>
        </React.Fragment>
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};

export const ROUTE_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  getTableSchema: routeTableSchema
});
