import { Button, Col, Row, Tooltip } from "antd";
import React from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { sortAlphabetically } from "utils/sort.util";

const REQUESTED_PRODUCTS_FIELDS = {
  timestamp: "timestamp",
  category: "productCategory",
  type: "productType",
  productName: "productName",
  numberOfRequests: "numberOfRequests",
  manage: "manage"
};

const REQUESTED_PRODUCTS_LABELS = {
  [REQUESTED_PRODUCTS_FIELDS.timestamp]: "Timestamp",
  [REQUESTED_PRODUCTS_FIELDS.category]: "Product Category",
  [REQUESTED_PRODUCTS_FIELDS.type]: "Product Type",
  [REQUESTED_PRODUCTS_FIELDS.productName]: "Product Name",
  [REQUESTED_PRODUCTS_FIELDS.numberOfRequests]: "Number of Requests",
  [REQUESTED_PRODUCTS_FIELDS.manage]: "Manage"
};

export const REQUESTED_PRODUCTS_SCHEMA = {
  FIELDS: REQUESTED_PRODUCTS_FIELDS,
  LABELS: REQUESTED_PRODUCTS_LABELS
};
export const getRequestedProductsSchema = (onReject, onAccept) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: REQUESTED_PRODUCTS_LABELS[REQUESTED_PRODUCTS_FIELDS.timestamp],
      dataIndex: REQUESTED_PRODUCTS_FIELDS.timestamp,
      key: REQUESTED_PRODUCTS_FIELDS.timestamp,
      sorter: (a, b) =>
        sortAlphabetically(
          a[REQUESTED_PRODUCTS_FIELDS.timestamp],
          b[REQUESTED_PRODUCTS_FIELDS.timestamp]
        ),
      sortOrder: sortedInfo.columnKey === REQUESTED_PRODUCTS_FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp} />
    },
    {
      title: REQUESTED_PRODUCTS_LABELS[REQUESTED_PRODUCTS_FIELDS.category],
      dataIndex: REQUESTED_PRODUCTS_FIELDS.category,
      key: REQUESTED_PRODUCTS_FIELDS.category,
      sorter: (a, b) =>
        sortAlphabetically(
          a[REQUESTED_PRODUCTS_FIELDS.category],
          b[REQUESTED_PRODUCTS_FIELDS.category]
        ),
      sortOrder: sortedInfo.columnKey === REQUESTED_PRODUCTS_FIELDS.category && sortedInfo.order,
      render: (category) => <CustomHighlighter searchText={searchText} value={category} />
    },
    {
      title: REQUESTED_PRODUCTS_LABELS[REQUESTED_PRODUCTS_FIELDS.type],
      dataIndex: REQUESTED_PRODUCTS_FIELDS.type,
      key: REQUESTED_PRODUCTS_FIELDS.type,
      sorter: (a, b) =>
        sortAlphabetically(a[REQUESTED_PRODUCTS_FIELDS.type], b[REQUESTED_PRODUCTS_FIELDS.type]),
      sortOrder: sortedInfo.columnKey === REQUESTED_PRODUCTS_FIELDS.type && sortedInfo.order,
      render: (type) => <CustomHighlighter searchText={searchText} value={type} />
    },

    {
      title: REQUESTED_PRODUCTS_LABELS[REQUESTED_PRODUCTS_FIELDS.productName],
      dataIndex: REQUESTED_PRODUCTS_FIELDS.productName,
      key: REQUESTED_PRODUCTS_FIELDS.productName,
      sorter: (a, b) =>
        sortAlphabetically(
          a[REQUESTED_PRODUCTS_FIELDS.productName],
          b[REQUESTED_PRODUCTS_FIELDS.productName]
        ),
      sortOrder: sortedInfo.columnKey === REQUESTED_PRODUCTS_FIELDS.productName && sortedInfo.order,
      render: (productName) => <CustomHighlighter searchText={searchText} value={productName} />
    },
    {
      title: REQUESTED_PRODUCTS_LABELS[REQUESTED_PRODUCTS_FIELDS.numberOfRequests],
      key: REQUESTED_PRODUCTS_FIELDS.numberOfRequests,
      sorter: (a, b) =>
        a[REQUESTED_PRODUCTS_FIELDS.numberOfRequests] -
        b[REQUESTED_PRODUCTS_FIELDS.numberOfRequests],
      sortOrder:
        sortedInfo.columnKey === REQUESTED_PRODUCTS_FIELDS.numberOfRequests && sortedInfo.order,
      render: (product) => {
        console.log("numberOfRequests", product);
        return (
          <Row>
            <Tooltip
              title={
                <>
                  {product.companyNames.map((company) => (
                    <div>{company}</div>
                  ))}
                </>
              }
            >
              <span>{product.numberOfRequests}</span>
            </Tooltip>
          </Row>
        );
      }
    },
    {
      title: REQUESTED_PRODUCTS_LABELS[REQUESTED_PRODUCTS_FIELDS.manage],
      key: REQUESTED_PRODUCTS_FIELDS.manage,
      render: (product) => {
        return (
          <Row>
            <Col span={11}>
              <Button shape="circle" icon={<CheckOutlined />} onClick={() => onAccept(product)} />
            </Col>
            <Col span={11}>
              <Button danger shape="circle" icon={<CloseOutlined />} onClick={onReject} />
            </Col>
          </Row>
        );
      }
    }
  ];

  return schema.filter((column) => !hiddenColumns.includes(column.key));
};
