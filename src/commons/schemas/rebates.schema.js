import { sortAlphabetically } from "utils/sort.util";
import React, { Fragment } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";

const FIELDS = {
  timestamp: "timestamp",
  buyerCompanyName: "toCompanyName",
  productBrand: "brand",
  ownerNameEmail: "ownerNameEmail",
  contact: "contact",
  rebatePercentage: "value"
};

const LABELS = {
  [FIELDS.timestamp]: "Timestamp",
  [FIELDS.buyerCompanyName]: "Buyer company",
  [FIELDS.productBrand]: "Product brand",
  [FIELDS.ownerNameEmail]: "Owner name email",
  [FIELDS.contact]: "Contact",
  [FIELDS.rebatePercentage]: "Rebate percentage"
};

export const REBATES_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});

export const rebatesTableSchema = (onDelete) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: LABELS[FIELDS.timestamp],
      dataIndex: FIELDS.timestamp,
      key: FIELDS.timestamp,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.timestamp], b[FIELDS.timestamp]),
      sortOrder: sortedInfo.columnKey === FIELDS.timestamp && sortedInfo.order,
      render: (timestamp) => <CustomHighlighter searchText={searchText} value={timestamp || ""} />
    },
    {
      title: LABELS[FIELDS.buyerCompanyName],
      dataIndex: FIELDS.buyerCompanyName,
      key: FIELDS.buyerCompanyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.buyerCompanyName], b[FIELDS.buyerCompanyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.buyerCompanyName && sortedInfo.order,
      render: (buyerCompanyName) => (
        <CustomHighlighter searchText={searchText} value={buyerCompanyName || ""} />
      )
    },
    {
      title: LABELS[FIELDS.productBrand],
      dataIndex: FIELDS.productBrand,
      key: FIELDS.productBrand,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.productBrand], b[FIELDS.productBrand]),
      sortOrder: sortedInfo.columnKey === FIELDS.productBrand && sortedInfo.order,
      render: (productBrand) => (
        <CustomHighlighter searchText={searchText} value={productBrand || ""} />
      )
    },
    {
      title: LABELS[FIELDS.ownerNameEmail],
      dataIndex: FIELDS.ownerNameEmail,
      key: FIELDS.ownerNameEmail,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.ownerNameEmail], b[FIELDS.ownerNameEmail]),
      sortOrder: sortedInfo.columnKey === FIELDS.ownerNameEmail && sortedInfo.order,
      render: (ownerNameEmail) => (
        <CustomHighlighter searchText={searchText} value={ownerNameEmail || ""} />
      )
    },
    {
      title: LABELS[FIELDS.contact],
      dataIndex: FIELDS.contact,
      key: FIELDS.contact,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.contact], b[FIELDS.contact]),
      sortOrder: sortedInfo.columnKey === FIELDS.contact && sortedInfo.order,
      render: (contact) => <CustomHighlighter searchText={searchText} value={contact || ""} />
    },
    {
      title: LABELS[FIELDS.rebatePercentage],
      dataIndex: FIELDS.rebatePercentage,
      key: FIELDS.rebatePercentage,
      sorter: (a, b) => a[FIELDS.rebatePercentage] - b[FIELDS.rebatePercentage],
      sortOrder: sortedInfo.columnKey === FIELDS.rebatePercentage && sortedInfo.order,
      render: (rebatePercentage) => (
        <CustomHighlighter searchText={searchText} value={rebatePercentage || ""} />
      )
    },
    {
      title: "Manage",
      render: ({ id, toCompanyName }) => (
        <Fragment>
          <Link to={RouteConst.EDIT_REBATES.replace(":id", `${toCompanyName}?id=${id}`)}>
            <Button type="primary">Edit</Button>
          </Link>
          <Button type="primary" className="ml-2" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </Fragment>
      )
    }
  ];
  return schema.filter((col) => !hiddenColumns.includes(col.key));
};
