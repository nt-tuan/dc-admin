import React, { Fragment } from "react";
import { sortAlphabetically } from "utils/sort.util";
import { Button, Tooltip } from "antd";

const FIELDS = {
  createdDate: "createdDate",
  name: "name",
  type: "routeDocumentTypeEnum",
  url: "url",
  countRoutes: "countRoutes"
};

const LABELS = {
  [FIELDS.createdDate]: "Timestamp",
  [FIELDS.name]: "Document Name",
  [FIELDS.type]: "Document Type",
  [FIELDS.url]: "Document Sample",
  [FIELDS.countRoutes]: "Document Linked Routes"
};

// active tab
const getTableSchema = (onEditClick, onDeleteClick, defaultDocuments) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const isDefaultDocument = (doc) =>
    defaultDocuments?.some((defaultDoc) => defaultDoc.id === doc.id);
  const columnsSchema = [
    {
      title: LABELS[FIELDS.createdDate],
      dataIndex: FIELDS.createdDate,
      key: FIELDS.createdDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.createdDate], b[FIELDS.createdDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.createdDate && sortedInfo.order,
      render: (createdDate) => (
        <CustomHighlighter searchText={searchText} value={createdDate || ""} />
      )
    },
    {
      title: LABELS[FIELDS.name],
      dataIndex: FIELDS.name,
      key: FIELDS.name,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.name], b[FIELDS.name]),
      sortOrder: sortedInfo.columnKey === FIELDS.name && sortedInfo.order,
      render: (name) => <CustomHighlighter searchText={searchText} value={name || ""} />
    },
    {
      title: LABELS[FIELDS.type],
      dataIndex: FIELDS.type,
      key: FIELDS.type,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.type], b[FIELDS.type]),
      sortOrder: sortedInfo.columnKey === FIELDS.to && sortedInfo.order,
      render: (type) => <CustomHighlighter searchText={searchText} value={type || ""} />
    },
    {
      title: LABELS[FIELDS.countRoutes],
      dataIndex: FIELDS.countRoutes,
      key: FIELDS.countRoutes,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.countRoutes], b[FIELDS.countRoutes]),
      sortOrder: sortedInfo.columnKey === FIELDS.countRoutes && sortedInfo.order,
      render: (countRoutes) => <div>{countRoutes}</div>
    },
    {
      title: "Manage",
      key: "manage",
      render: (doc) => (
        <React.Fragment>
          <Fragment>
            <Button
              disabled={isDefaultDocument(doc)}
              type="primary"
              className="dtc-min-width-50 mr-2"
              onClick={() => onEditClick(doc.id)}
            >
              <i className="fe fe-edit" style={{ verticalAlign: "middle" }}></i>
            </Button>
            <Button
              type="danger"
              className="dtc-min-width-50 mr-2"
              onClick={() => onDeleteClick(doc.id)}
              disabled={isDefaultDocument(doc)}
            >
              <i className="fe fe-trash" style={{ verticalAlign: "middle" }}></i>
            </Button>
            <Tooltip title="Download sample document">
              <Button
                className="dtc-min-width-50 mr-2"
                type="primary"
                disabled={!doc.url}
                href={doc.url}
              >
                <i className="fe fe-download" style={{ verticalAlign: "middle" }} />
              </Button>
            </Tooltip>
          </Fragment>
        </React.Fragment>
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};

export const DOCUMENT_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  getTableSchema: getTableSchema
});
