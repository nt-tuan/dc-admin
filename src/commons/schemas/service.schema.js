import { Button, Rate } from "antd";
import React, { Fragment } from "react";
import { UtilFacade } from "utils";

const { sortAlphabetically } = UtilFacade.getSortUtils();
const { roundToHalfDecimal } = UtilFacade.getGeneralUtils();

const FIELDS = {
  id: "id",
  name: "name",
  status: "status",
  reputation: "reputation"
};

const LOGISTIC_PROVIDER_LABELS = {
  [FIELDS.name]: "Logistic Provider Name",
  [FIELDS.reputation]: "Reputation",
  [FIELDS.status]: "Status"
};

const INSPECTION_PROVIDER_LABELS = {
  [FIELDS.name]: "Inspection Provider Name",
  [FIELDS.reputation]: "Reputation",
  [FIELDS.status]: "Status"
};

const SERVICE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};

const SERVICE_STATUS_LABELS = {
  [SERVICE_STATUS.ACTIVE]: "Active",
  [SERVICE_STATUS.INACTIVE]: "Inactive"
};

const shareStyle = { height: "70px", width: "140px" };

export const SERVICE_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LOGISTIC_PROVIDER_LABELS: LOGISTIC_PROVIDER_LABELS,
  INSPECTION_PROVIDER_LABELS: INSPECTION_PROVIDER_LABELS,
  STATUS: SERVICE_STATUS,
  STATUS_LABELS: SERVICE_STATUS_LABELS
});

export const logisticProviderTableSchema = ({ onUnlock, onLock }) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LOGISTIC_PROVIDER_LABELS[FIELDS.name],
      dataIndex: FIELDS.name,
      key: FIELDS.name,
      sorter: (a, b) => sortAlphabetically(a.name, b.name),
      sortOrder: sortedInfo.columnKey === FIELDS.name && sortedInfo.order,
      render: (_, { name, url }) => (
        <Fragment>
          <img alt={name} className="mr-3" src={url} style={shareStyle} />
          <CustomHighlighter className="font-weight-bold" searchText={searchText} value={name} />
        </Fragment>
      )
    },
    {
      title: LOGISTIC_PROVIDER_LABELS[FIELDS.reputation],
      dataIndex: FIELDS.reputation,
      key: FIELDS.reputation,
      sorter: (a, b) => a.reputation - b.reputation,
      sortOrder: sortedInfo.columnKey === FIELDS.reputation && sortedInfo.order,
      render: (reputation) => (
        <Fragment>
          <Rate allowHalf value={roundToHalfDecimal(reputation)} disabled />
        </Fragment>
      )
    },
    {
      title: LOGISTIC_PROVIDER_LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a.status, b.status),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, status }) => (
        <React.Fragment>
          <Fragment>
            {status === SERVICE_STATUS_LABELS[SERVICE_STATUS.INACTIVE] ? (
              <Button onClick={() => onUnlock(id)} type="primary" className="dtc-min-width-50 mr-2">
                <i className="fe fe-unlock" style={{ verticalAlign: "middle" }}></i>
              </Button>
            ) : (
              <Button onClick={() => onLock(id)} type="danger" className="dtc-min-width-50 mr-2">
                <i className="fe fe-lock" style={{ verticalAlign: "middle" }}></i>
              </Button>
            )}
          </Fragment>
        </React.Fragment>
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};

export const inspectionProviderTableSchema = ({ onUnlock, onLock }) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: INSPECTION_PROVIDER_LABELS[FIELDS.name],
      dataIndex: FIELDS.name,
      key: FIELDS.name,
      sorter: (a, b) => sortAlphabetically(a.name, b.name),
      sortOrder: sortedInfo.columnKey === FIELDS.name && sortedInfo.order,
      render: (_, { name, url }) => (
        <Fragment>
          <img alt={name} className="mr-3" src={url} style={shareStyle} />
          <CustomHighlighter className="font-weight-bold" searchText={searchText} value={name} />
        </Fragment>
      )
    },
    {
      title: INSPECTION_PROVIDER_LABELS[FIELDS.reputation],
      dataIndex: FIELDS.reputation,
      key: FIELDS.reputation,
      sorter: (a, b) => a.reputation - b.reputation,
      sortOrder: sortedInfo.columnKey === FIELDS.reputation && sortedInfo.order,
      render: (reputation) => (
        <Fragment>
          <Rate allowHalf value={roundToHalfDecimal(reputation)} disabled />
        </Fragment>
      )
    },
    {
      title: INSPECTION_PROVIDER_LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a.status, b.status),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, status }) => (
        <React.Fragment>
          <Fragment>
            {status === SERVICE_STATUS_LABELS[SERVICE_STATUS.INACTIVE] ? (
              <Button onClick={() => onUnlock(id)} type="primary" className="dtc-min-width-50 mr-2">
                <i className="fe fe-unlock" style={{ verticalAlign: "middle" }}></i>
              </Button>
            ) : (
              <Button onClick={() => onLock(id)} type="danger" className="dtc-min-width-50 mr-2">
                <i className="fe fe-lock" style={{ verticalAlign: "middle" }}></i>
              </Button>
            )}
          </Fragment>
        </React.Fragment>
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
