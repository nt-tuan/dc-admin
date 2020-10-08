import { Button, Tooltip } from "antd";
import React, { Fragment } from "react";
import { sortAlphabetically } from "utils/sort.util";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";

const FIELDS = {
  id: "id",
  companyName: "companyName",
  ownerName: "ownerName",
  username: "username",
  email: "email",
  country: "country",
  contact: "contact",
  userStatus: "userStatus"
};

const LABELS = {
  [FIELDS.companyName]: "Company",
  [FIELDS.ownerName]: "Owner",
  [FIELDS.username]: "Username",
  [FIELDS.email]: "Email",
  [FIELDS.country]: "Country",
  [FIELDS.contact]: "Contact"
};

export const NEW_USER_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS
});

export const newUserTableSchema = (onApprove) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  let columnsSchema = [
    {
      title: LABELS[FIELDS.companyName],
      dataIndex: FIELDS.companyName,
      key: FIELDS.companyName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.companyName], b[FIELDS.companyName]),
      sortOrder: sortedInfo.columnKey === FIELDS.companyName && sortedInfo.order,
      render: (companyName) => <CustomHighlighter searchText={searchText} value={companyName} />
    },
    {
      title: LABELS[FIELDS.ownerName],
      dataIndex: FIELDS.ownerName,
      key: FIELDS.ownerName,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.ownerName], b[FIELDS.ownerName]),
      sortOrder: sortedInfo.columnKey === FIELDS.ownerName && sortedInfo.order,
      render: (ownerName) => <CustomHighlighter searchText={searchText} value={ownerName} />
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
      title: LABELS[FIELDS.email],
      dataIndex: FIELDS.email,
      key: FIELDS.email,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.email], b[FIELDS.email]),
      sortOrder: sortedInfo.columnKey === FIELDS.email && sortedInfo.order,
      render: (email) => <CustomHighlighter searchText={searchText} value={email} />
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
      title: LABELS[FIELDS.contact],
      dataIndex: FIELDS.contact,
      key: FIELDS.contact,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.contact], b[FIELDS.contact]),
      sortOrder: sortedInfo.columnKey === FIELDS.contact && sortedInfo.order,
      render: (contact) => <CustomHighlighter searchText={searchText} value={contact} />
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, username }) => (
        <Fragment>
          <Tooltip placement="leftTop" title="Approve">
            <Button onClick={() => onApprove(id)} type="primary" className="dtc-min-width-50 mr-2">
              <i className="fe fe-check" style={{ verticalAlign: "middle" }}></i>
            </Button>
          </Tooltip>
          <Link to={`${RouteConst.USER_DETAILS}?username=${username}&companyId=${id}`}>
            <Button type="primary" className="dtc-min-width-50 mr-2">
              <i className="fe fe-navigation" style={{ verticalAlign: "middle" }}></i>
            </Button>
          </Link>
        </Fragment>
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
