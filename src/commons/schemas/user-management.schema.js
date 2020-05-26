import { Button, Rate } from "antd";
import React, { Fragment } from "react";
import { UserBadge } from "components/atoms/user-badge/user-badge.comp";
import { UtilFacade } from "utils";

const { sortAlphabetically } = UtilFacade.getSortUtils();
const { roundToHalfDecimal } = UtilFacade.getGeneralUtils();

const FIELDS = {
  id: "id",
  company: "company",
  owner: "owner",
  username: "username",
  email: "email",
  country: "country",
  contact: "contact",
  reputation: "reputation",
  reputationList: "reputationList",
  status: "status"
};

const LABELS = {
  [FIELDS.company]: "Company",
  [FIELDS.owner]: "Owner",
  [FIELDS.username]: "Username",
  [FIELDS.email]: "Email",
  [FIELDS.country]: "Country",
  [FIELDS.contact]: "Contact",
  [FIELDS.reputation]: "Reputation",
  [FIELDS.reputationList]: "Badges",
  [FIELDS.status]: "Status"
};

const USER_MGT_STATUS = {
  LIVE_SELLERS: "LIVE_SELLERS",
  BUYING_SELLERS: "BUYING_SELLERS",
  INACTIVE_SELLERS: "INACTIVE_SELLERS",
  SUSPENDED: "SUSPENDED",
  LIVE_BUYERS: "LIVE_BUYERS",
  BUYING_BUYERS: "BUYING_BUYERS",
  INACTIVE_BUYERS: "INACTIVE_BUYERS"
};

const USER_MGT_STATUS_LABELS = {
  [USER_MGT_STATUS.LIVE_SELLERS]: "Live Sellers",
  [USER_MGT_STATUS.BUYING_SELLERS]: "Selling Sellers",
  [USER_MGT_STATUS.INACTIVE_SELLERS]: "Inactive Sellers",
  [USER_MGT_STATUS.SUSPENDED]: "Suspended",
  [USER_MGT_STATUS.LIVE_BUYERS]: "Live Buyers",
  [USER_MGT_STATUS.BUYING_BUYERS]: "Selling Buyers",
  [USER_MGT_STATUS.INACTIVE_BUYERS]: "Inactive Buyers"
};

export const USER_MANAGEMENT_SCHEMA = Object.freeze({
  FIELDS: FIELDS,
  LABELS: LABELS,
  STATUS: USER_MGT_STATUS,
  STATUS_LABELS: USER_MGT_STATUS_LABELS
});

export const userMgtTableSchema = ({ onUnlock, onLock, onViewAssignBadges }) => (
  sortedInfo,
  CustomHighlighter,
  searchText,
  hiddenColumns
) => {
  const columnsSchema = [
    {
      title: LABELS[FIELDS.company],
      dataIndex: FIELDS.company,
      key: FIELDS.company,
      sorter: (a, b) => sortAlphabetically(a.company, b.company),
      sortOrder: sortedInfo.columnKey === FIELDS.company && sortedInfo.order,
      render: (company) => <CustomHighlighter searchText={searchText} value={company} />
    },
    {
      title: LABELS[FIELDS.owner],
      dataIndex: FIELDS.owner,
      key: FIELDS.owner,
      sorter: (a, b) => sortAlphabetically(a.owner, b.owner),
      sortOrder: sortedInfo.columnKey === FIELDS.owner && sortedInfo.order,
      render: (owner) => <CustomHighlighter searchText={searchText} value={owner} />
    },
    {
      title: LABELS[FIELDS.username],
      dataIndex: FIELDS.username,
      key: FIELDS.username,
      sorter: (a, b) => sortAlphabetically(a.username, b.username),
      sortOrder: sortedInfo.columnKey === FIELDS.username && sortedInfo.order,
      render: (username) => <CustomHighlighter searchText={searchText} value={username} />
    },
    {
      title: LABELS[FIELDS.email],
      dataIndex: FIELDS.email,
      key: FIELDS.email,
      sorter: (a, b) => sortAlphabetically(a.email, b.email),
      sortOrder: sortedInfo.columnKey === FIELDS.email && sortedInfo.order,
      render: (email) => <CustomHighlighter searchText={searchText} value={email} />
    },
    {
      title: LABELS[FIELDS.country],
      dataIndex: FIELDS.country,
      key: FIELDS.country,
      sorter: (a, b) => sortAlphabetically(a.country, b.country),
      sortOrder: sortedInfo.columnKey === FIELDS.country && sortedInfo.order,
      render: (country) => <CustomHighlighter searchText={searchText} value={country} />
    },
    {
      title: LABELS[FIELDS.contact],
      dataIndex: FIELDS.contact,
      key: FIELDS.contact,
      sorter: (a, b) => sortAlphabetically(a.contact, b.contact),
      sortOrder: sortedInfo.columnKey === FIELDS.contact && sortedInfo.order,
      render: (contact) => <CustomHighlighter searchText={searchText} value={contact} />
    },
    {
      title: LABELS[FIELDS.status],
      dataIndex: FIELDS.status,
      key: FIELDS.status,
      sorter: (a, b) => sortAlphabetically(a.status, b.status),
      sortOrder: sortedInfo.columnKey === FIELDS.status && sortedInfo.order,
      render: (status) => <CustomHighlighter searchText={searchText} value={status} />
    },
    {
      title: LABELS[FIELDS.reputation],
      dataIndex: FIELDS.reputation,
      key: FIELDS.reputation,
      sorter: (a, b) => a.reputation - b.reputation,
      sortOrder: sortedInfo.columnKey === FIELDS.reputation && sortedInfo.order,
      render: (reputation) => <Rate allowHalf value={roundToHalfDecimal(reputation)} disabled />
    },
    {
      title: LABELS[FIELDS.reputationList],
      dataIndex: FIELDS.reputationList,
      key: FIELDS.reputationList,
      // sorter: (a, b) => a.reputationList.value - b.reputationList.value,
      // sortOrder: sortedInfo.columnKey === FIELDS.reputationList && sortedInfo.order,
      render: (reputationList) => (
        <Fragment>
          <div className="d-flex align-items-center h-100">
            {reputationList &&
              reputationList
                .sort((a, b) => b.value - a.value)
                .map((badge, index) => (
                  <UserBadge key={badge.type} type={badge.type} value={badge.value} />
                ))}
          </div>
        </Fragment>
      )
    },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, status }) => (
        <Fragment>
          {status === USER_MGT_STATUS_LABELS[USER_MGT_STATUS.SUSPENDED] ? (
            <Button onClick={() => onUnlock(id)} type="primary" className="dtc-min-width-50 mr-2">
              <i className="fe fe-play" style={{ verticalAlign: "middle" }}></i>
            </Button>
          ) : (
            <Button onClick={() => onLock(id)} type="danger" className="dtc-min-width-50 mr-2">
              <i className="fe fe-pause" style={{ verticalAlign: "middle" }}></i>
            </Button>
          )}
          <Button type="primary" className="dtc-min-width-50 mr-2" onClick={onViewAssignBadges}>
            <i className="fe fe-award" style={{ verticalAlign: "middle" }}></i>
          </Button>
        </Fragment>
      )
    }
  ];
  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
