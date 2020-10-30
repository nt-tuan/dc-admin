import { Button, Tag } from "antd";
import { RouteConst } from "commons/consts";
import React from "react";
import { Link } from "react-router-dom";
import { toCurrency } from "utils/general.util";
import { sortAlphabetically } from "utils/sort.util";
import { PlusOutlined, DeleteOutlined, PauseOutlined, FormOutlined } from "@ant-design/icons";

const STATUS = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  DELETE: "DELETE"
};

const STATUS_LABELS = {
  [STATUS.ACTIVE]: "Active",
  [STATUS.SUSPENDED]: "Suspended"
};

const FIELDS = {
  id: "id",
  timestamp: "timestamp",
  category: "productCategory",
  categoryId: "productCategoryId",
  type: "productType",
  typeId: "productTypeId",
  productName: "productName",
  manage: "manage",
  numberOfDocuments: "numberOfDocuments",
  status: "status"
};

const LABELS = {
  [FIELDS.timestamp]: "Timestamp",
  [FIELDS.category]: "Product Category",
  [FIELDS.type]: "Product Type",
  [FIELDS.productName]: "Product Name",
  [FIELDS.numberOfDocuments]: "No of Document",
  [FIELDS.status]: "Status",
  [FIELDS.manage]: "Manage"
};

export const TRADE_RULES_SCHEMA = Object.freeze({
  FIELDS,
  LABELS,
  STATUS,
  STATUS_LABELS
});

export const getTraderRulesActive = (
  handleCreateTradeRules,
  handleSuspendTradeRulesModal,
  handleDeleteTradeRulesModal
) => (sortedInfo, CustomHighlighter, searchText, hiddenColumns) => {
  const schema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: LABELS[FIELDS.category],
      dataIndex: FIELDS.category,
      key: FIELDS.category,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.category], b[FIELDS.category]),
      sortOrder: sortedInfo.columnKey === FIELDS.category && sortedInfo.order,
      render: (category) => <CustomHighlighter searchText={searchText} value={category} />
    },
    {
      title: LABELS[FIELDS.type],
      dataIndex: FIELDS.type,
      key: FIELDS.type,
      sorter: (a, b) => a[FIELDS.type] - b[FIELDS.type],
      sortOrder: sortedInfo.columnKey === FIELDS.type && sortedInfo.order,
      render: (type) => <CustomHighlighter searchText={searchText} value={type} />
    },
    {
      title: LABELS[FIELDS.productName],
      dataIndex: FIELDS.productName,
      key: FIELDS.productName,
      sorter: (a, b) => a[FIELDS.productName] - b[FIELDS.productName],
      sortOrder: sortedInfo.columnKey === FIELDS.productName && sortedInfo.order,
      render: (productName) => <CustomHighlighter searchText={searchText} value={productName} />
    },
    {
      title: LABELS[FIELDS.numberOfDocuments],
      dataIndex: FIELDS.numberOfDocuments,
      key: FIELDS.numberOfDocuments,
      sorter: (a, b) => a[FIELDS.numberOfDocuments] - b[FIELDS.numberOfDocuments],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfDocuments && sortedInfo.order,
      render: (numberOfDocuments) => (
        <CustomHighlighter searchText={searchText} value={toCurrency(numberOfDocuments)} />
      )
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.status], b[FIELDS.status]),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (statusValue) => (
        <Tag className={`text-white font-size-10 ${getStatusClass[statusValue]}`}>
          <CustomHighlighter searchText={searchText} value={STATUS_LABELS[STATUS[statusValue]]} />
        </Tag>
      )
    },
    {
      title: LABELS[FIELDS.manage],
      key: FIELDS.manage,
      render: (trade) => {
        const { status } = trade;
        return (
          <>
            {status === STATUS.ACTIVE ? (
              <>
                <Link to={RouteConst.TRADE_RULES}>
                  <Button
                    type="primary"
                    className="dtc-min-width-50 mr-2"
                    icon={<FormOutlined />}
                  />
                </Link>
                <Button
                  onClick={() => handleSuspendTradeRulesModal()}
                  type="primary"
                  className="dtc-min-width-50 mr-2"
                >
                  <i className="fe fe-play" style={{ verticalAlign: "middle" }}></i>
                </Button>
                <Button
                  onClick={() => handleSuspendTradeRulesModal()}
                  type="danger"
                  className="dtc-min-width-50 mr-2"
                  icon={<PauseOutlined />}
                />
                <Button
                  onClick={() => handleDeleteTradeRulesModal()}
                  type="danger"
                  className="dtc-min-width-50 mr-2"
                  icon={<DeleteOutlined />}
                />
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => handleCreateTradeRules()}
                icon={<PlusOutlined />}
                className="dtc-min-width-50 mr-2"
              />
            )}
          </>
        );
      }
    }
  ];

  return schema.filter((column) => !hiddenColumns.includes(column.key));
};
const getStatusClass = { ACTIVE: "dtc-bg-green", SUSPENDED: "dtc-bg-blue" };
