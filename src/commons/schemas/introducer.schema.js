import { Button } from "antd";
import { RouteConst } from "commons/consts";
import React from "react";
import { Link } from "react-router-dom";
import { toCurrency } from "utils/general.util";
import { sortAlphabetically } from "utils/sort.util";

const STATUS = {
  ACTIVE: "ACTIVE",
  PENDING_KYC: "PENDING_KYC",
  EXPIRED: "EXPIRED"
};

const STATUS_LABELS = {
  [STATUS.ACTIVE]: "Active",
  [STATUS.PENDING_KYC]: "Pending",
  [STATUS.EXPIRED]: "Expired"
};

const FIELDS = {
  companyName: "companyName",
  createdDate: "createdDate",
  expiryDate: "expiryDate",
  numberOfTraders: "numberOfTraders",
  numberOfTrade: "numberOfTrade",
  status: "status",
  totalCommission: "totalCommission",
  username: "username",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  country: "country",
  email: "email",
  phone: "phone"
};

const LABELS = {
  [FIELDS.companyName]: "Introducer Company Name",
  [FIELDS.createdDate]: "Timestamp",
  [FIELDS.expiryDate]: "Expiry Date",
  [FIELDS.numberOfTraders]: "Number of Traders",
  [FIELDS.numberOfTrade]: "Number of successful trade done by traders",
  [FIELDS.status]: "Status",
  [FIELDS.totalCommission]: "Total Commission paid to Introducer",
  [FIELDS.username]: "Introducer’s username",
  [FIELDS.firstName]: "First name",
  [FIELDS.lastName]: "Last name",
  [FIELDS.middleName]: "Middle name",
  [FIELDS.country]: "Country",
  [FIELDS.email]: "Email",
  [FIELDS.phone]: "Phone number"
};

export const INTRODUCER_SCHEMA = Object.freeze({
  FIELDS,
  LABELS
});

export const getIntroducerSchema = (onDelete) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const schema = [
    {
      title: LABELS[FIELDS.createdDate],
      dataIndex: FIELDS.createdDate,
      key: FIELDS.createdDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.createdDate], b[FIELDS.createdDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.createdDate && sortedInfo.order,
      render: (createdDate) => <CustomHighlighter searchText={searchText} value={createdDate} />
    },
    {
      title: LABELS[FIELDS.companyName],
      dataIndex: FIELDS.companyName,
      key: FIELDS.companyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.companyName], b[FIELDS.companyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.companyName && sortedInfo.order,
      render: (companyName) => <CustomHighlighter searchText={searchText} value={companyName} />
    },
    {
      title: LABELS[FIELDS.numberOfTraders],
      dataIndex: FIELDS.numberOfTraders,
      key: FIELDS.numberOfTraders,
      sorter: (a, b) => a[FIELDS.numberOfTraders] - b[FIELDS.numberOfTraders],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfTraders && sortedInfo.order,
      render: (numberOfTraders) => (
        <CustomHighlighter searchText={searchText} value={numberOfTraders} />
      )
    },
    {
      title: LABELS[FIELDS.numberOfTrade],
      dataIndex: FIELDS.numberOfTrade,
      key: FIELDS.numberOfTrade,
      sorter: (a, b) => a[FIELDS.numberOfTrade] - b[FIELDS.numberOfTrade],
      sortOrder: sortedInfo.columnKey === FIELDS.numberOfTrade && sortedInfo.order,
      render: (numberOfTrade) => <CustomHighlighter searchText={searchText} value={numberOfTrade} />
    },
    {
      title: LABELS[FIELDS.totalCommission],
      dataIndex: FIELDS.totalCommission,
      key: FIELDS.totalCommission,
      sorter: (a, b) => a[FIELDS.totalCommission] - b[FIELDS.totalCommission],
      sortOrder: sortedInfo.columnKey === FIELDS.totalCommission && sortedInfo.order,
      render: (totalCommission) => (
        <CustomHighlighter searchText={searchText} value={toCurrency(totalCommission)} />
      )
    },
    {
      title: LABELS[FIELDS.expiryDate],
      dataIndex: FIELDS.expiryDate,
      key: FIELDS.expiryDate,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.expiryDate], b[FIELDS.expiryDate]),
      sortOrder: sortedInfo.columnKey === FIELDS.expiryDate && sortedInfo.order,
      render: (expiryDate) => <CustomHighlighter searchText={searchText} value={expiryDate} />
    },
    {
      title: LABELS[FIELDS.username],
      dataIndex: FIELDS.username,
      key: FIELDS.username,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.username], b[FIELDS.username]),
      sortOrder: sortedInfo.columnKey === FIELDS.username && sortedInfo.order,
      render: (username) => <CustomHighlighter searchText={searchText} value={username} />
    },
    {
      title: LABELS[FIELDS.firstName],
      dataIndex: FIELDS.firstName,
      key: FIELDS.firstName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.firstName], b[FIELDS.firstName]),
      sortOrder: sortedInfo.columnKey === FIELDS.firstName && sortedInfo.order,
      render: (firstName) => <CustomHighlighter searchText={searchText} value={firstName} />
    },
    {
      title: LABELS[FIELDS.middleName],
      dataIndex: FIELDS.middleName,
      key: FIELDS.middleName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.middleName], b[FIELDS.middleName]),
      sortOrder: sortedInfo.columnKey === FIELDS.middleName && sortedInfo.order,
      render: (middleName) => <CustomHighlighter searchText={searchText} value={middleName} />
    },
    {
      title: LABELS[FIELDS.lastName],
      dataIndex: FIELDS.lastName,
      key: FIELDS.lastName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.lastName], b[FIELDS.lastName]),
      sortOrder: sortedInfo.columnKey === FIELDS.lastName && sortedInfo.order,
      render: (lastName) => <CustomHighlighter searchText={searchText} value={lastName} />
    },
    {
      title: LABELS[FIELDS.country],
      dataIndex: FIELDS.country,
      key: FIELDS.country,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.country], b[FIELDS.country]),
      sortOrder: sortedInfo.columnKey === FIELDS.country && sortedInfo.order,
      render: (country) => <CustomHighlighter searchText={searchText} value={country} />
    },
    {
      title: LABELS[FIELDS.email],
      dataIndex: FIELDS.email,
      key: FIELDS.email,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.email], b[FIELDS.email]),
      sortOrder: sortedInfo.columnKey === FIELDS.email && sortedInfo.order,
      render: (email) => <CustomHighlighter searchText={searchText} value={email} />
    },
    {
      title: LABELS[FIELDS.phone],
      dataIndex: FIELDS.phone,
      key: FIELDS.phone,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.phone], b[FIELDS.phone]),
      sortOrder: sortedInfo.columnKey === FIELDS.phone && sortedInfo.order,
      render: (phone) => <CustomHighlighter searchText={searchText} value={phone} />
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.status], b[FIELDS.status]),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => (
        <CustomHighlighter searchText={searchText} value={STATUS_LABELS[STATUS[status]]} />
      )
    },
    {
      title: "Action",
      key: "action",
      render: ({ id }) => (
        <div className="d-flex">
          <Link to={`${RouteConst.INTRODUCER_DETAILS}?id=${id}`}>
            <Button title="View introducer details" type="primary">
              <i className="fe fe-eye" />
            </Button>
          </Link>
          <Link to={`${RouteConst.INTRODUCER_EDIT}?id=${id}`}>
            <Button title="Edit introducer details" className="mx-2" type="primary">
              <i className="fe fe-edit" />
            </Button>
          </Link>
          <Button type="danger" onClick={() => onDelete(id)}>
            <i className="fe fe-trash-2" />
          </Button>
        </div>
      )
    }
  ];

  return schema.filter((column) => !hiddenColumns.includes(column.key));
};
