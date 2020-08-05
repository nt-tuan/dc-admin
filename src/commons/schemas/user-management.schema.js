import { Button, Rate } from "antd";
import React, { Fragment } from "react";
import { UserBadge } from "components/atoms/user-badge/user-badge.comp";
import { sortAlphabetically } from "utils/sort.util";
import { roundToHalfDecimal } from "utils/general.util";
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
  reputation: "reputation",
  badges: "badges",
  userStatus: "userStatus"
};

const LABELS = {
  [FIELDS.companyName]: "Company",
  [FIELDS.ownerName]: "Owner",
  [FIELDS.username]: "Username",
  [FIELDS.email]: "Email",
  [FIELDS.country]: "Country",
  [FIELDS.contact]: "Contact",
  [FIELDS.reputation]: "Reputation",
  [FIELDS.badges]: "Badges",
  [FIELDS.userStatus]: "Status"
};

const USER_MGT_STATUS = {
  LIVE_SELLER: "LIVE_SELLER",
  SELLING_SELLER: "SELLING_SELLER",
  INACTIVE_SELLER: "INACTIVE_SELLER",
  SUSPENDED: "SUSPENDED",
  LIVE_BUYER: "LIVE_BUYER",
  BUYING_BUYER: "BUYING_BUYER",
  INACTIVE_BUYER: "INACTIVE_BUYER"
};

const USER_MGT_STATUS_LABELS = {
  [USER_MGT_STATUS.LIVE_SELLER]: "Live Sellers",
  [USER_MGT_STATUS.SELLING_SELLER]: "Selling Sellers",
  [USER_MGT_STATUS.INACTIVE_SELLER]: "Inactive Sellers",
  [USER_MGT_STATUS.SUSPENDED]: "Suspended",
  [USER_MGT_STATUS.LIVE_BUYER]: "Live Buyers",
  [USER_MGT_STATUS.BUYING_BUYER]: "Buying Buyers",
  [USER_MGT_STATUS.INACTIVE_BUYER]: "Inactive Buyers"
};

const BADGE_TYPES = {
  STATUS_BADGE: "STATUS_BADGE",
  NUMBER_BADGE: "NUMBER_BADGE",
  VALUE_BADGE: "VALUE_BADGE",
  DISTRIBUTOR: "DISTRIBUTOR",
  MANUFACTURE: "MANUFACTURE",
  VERIFIED: "VERIFIED"
};

const BADGE_LABELS = {
  [BADGE_TYPES.STATUS_BADGE]: "Status Badge",
  [BADGE_TYPES.NUMBER_BADGE]: "Number Badge",
  [BADGE_TYPES.VALUE_BADGE]: "Value Badge",
  [BADGE_TYPES.DISTRIBUTOR]: "Distributor",
  [BADGE_TYPES.MANUFACTURE]: "Manufacturer",
  [BADGE_TYPES.VERIFIED]: "User Verified Badge"
};

export const USER_MANAGEMENT_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  STATUS: USER_MGT_STATUS,
  STATUS_LABELS: USER_MGT_STATUS_LABELS,
  BADGE_TYPES: BADGE_TYPES,
  BADGE_LABELS: BADGE_LABELS
});

export const userMgtTableSchema = ({ onUnlock, onLock, onViewAssignBadges }) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
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
      title: LABELS[FIELDS.reputation],
      dataIndex: FIELDS.reputation,
      key: FIELDS.reputation,
      sorter: (a, b) => a[FIELDS.reputation] - b[FIELDS.reputation],
      sortOrder: sortedInfo.columnKey === FIELDS.reputation && sortedInfo.order,
      render: (reputation) => <Rate allowHalf value={roundToHalfDecimal(reputation)} disabled />
    },
    {
      title: LABELS[FIELDS.badges],
      dataIndex: FIELDS.badges,
      key: FIELDS.badges,
      // sorter: (a, b) => a.reputationList.value - b.reputationList.value,
      // sortOrder: sortedInfo.columnKey === FIELDS.reputationList && sortedInfo.order,
      render: (badges) => (
        <Fragment>
          <div className="d-flex align-items-center h-100">
            {badges &&
              badges
                .sort((a, b) => b.value - a.value)
                .map((badge, index) => (
                  <UserBadge key={badge.type} type={badge.type} value={badge.value} />
                ))}
          </div>
        </Fragment>
      )
    },
    {
      title: LABELS[FIELDS.userStatus],
      dataIndex: FIELDS.userStatus,
      key: FIELDS.userStatus,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.userStatus], b[FIELDS.userStatus]),
      sortOrder: sortedInfo.columnKey === FIELDS.userStatus && sortedInfo.order,
      render: (userStatus) => <CustomHighlighter searchText={searchText} value={userStatus} />
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, suspended, username }) => (
        <Fragment>
          {suspended === true ? (
            <Button onClick={() => onUnlock(id)} type="primary" className="dtc-min-width-50 mr-2">
              <i className="fe fe-play" style={{ verticalAlign: "middle" }}></i>
            </Button>
          ) : (
            <Button onClick={() => onLock(id)} type="danger" className="dtc-min-width-50 mr-2">
              <i className="fe fe-pause" style={{ verticalAlign: "middle" }}></i>
            </Button>
          )}
          <Button
            type="primary"
            className="dtc-min-width-50 mr-2"
            onClick={() => onViewAssignBadges(id)}
          >
            <i className="fe fe-award" style={{ verticalAlign: "middle" }}></i>
          </Button>
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
