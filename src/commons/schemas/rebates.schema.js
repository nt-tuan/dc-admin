import { sortAlphabetically } from "utils/sort.util";
import React, { Fragment } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";

const FIELDS = {
  timestamp: "createdDate",
  buyerCompanyName: "toCompanyName",
  productBrand: "brand",
  ownerName: "ownerName",
  ownerEmail: "ownerEmail",
  contact: "ownerPhone",
  rebatePercentage: "value"
};

const LABELS = {
  [FIELDS.timestamp]: "Timestamp",
  [FIELDS.buyerCompanyName]: "Buyer company",
  [FIELDS.productBrand]: "Product brand",
  [FIELDS.ownerName]: "Owner name",
  [FIELDS.ownerEmail]: "Owner email",
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
      title: LABELS[FIELDS.ownerName],
      dataIndex: FIELDS.ownerName,
      key: FIELDS.ownerName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.ownerName], b[FIELDS.ownerName]),
      sortOrder: sortedInfo.columnKey === FIELDS.ownerName && sortedInfo.order,
      render: (ownerName) => <CustomHighlighter searchText={searchText} value={ownerName || ""} />
    },
    {
      title: LABELS[FIELDS.ownerEmail],
      dataIndex: FIELDS.ownerEmail,
      key: FIELDS.ownerEmail,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.ownerEmail], b[FIELDS.ownerEmail]),
      sortOrder: sortedInfo.columnKey === FIELDS.ownerEmail && sortedInfo.order,
      render: (ownerEmail) => <CustomHighlighter searchText={searchText} value={ownerEmail || ""} />
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
