import { Button, Rate } from "antd";
import { DTCHighlighter } from "components";
import React, { Fragment } from "react";
import { sortAlphabetically, roundToHalfDecimal } from "utils";
import { UserBadge } from "components/widgets/general/user-badge/user-badge.comp";

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

export const getUserMgtTableSchema = ({ onUnblock, onBlock, onViewAssignBadges }) => ({
  [FIELDS.company]: {
    title: LABELS[FIELDS.company],
    dataIndex: FIELDS.company,
    key: FIELDS.company,
    sorter: (a, b) => a.company - b.company,
    makeRender: ({ searchText }) => (company) => (
      <DTCHighlighter searchText={searchText} value={company} />
    )
  },
  [FIELDS.owner]: {
    title: LABELS[FIELDS.owner],
    dataIndex: FIELDS.owner,
    key: FIELDS.owner,
    sorter: (a, b) => a.owner - b.owner,
    makeRender: ({ searchText }) => (owner) => (
      <DTCHighlighter searchText={searchText} value={owner} />
    )
  },
  [FIELDS.username]: {
    title: LABELS[FIELDS.username],
    dataIndex: FIELDS.username,
    key: FIELDS.username,
    sorter: (a, b) => sortAlphabetically(a.username, b.username),
    makeRender: ({ searchText }) => (username) => (
      <DTCHighlighter searchText={searchText} value={username} />
    )
  },
  [FIELDS.email]: {
    title: LABELS[FIELDS.email],
    dataIndex: FIELDS.email,
    key: FIELDS.email,
    sorter: (a, b) => sortAlphabetically(a.email, b.email),
    makeRender: ({ searchText }) => (email) => (
      <DTCHighlighter searchText={searchText} value={email} />
    )
  },
  [FIELDS.country]: {
    title: LABELS[FIELDS.country],
    dataIndex: FIELDS.country,
    key: FIELDS.country,
    sorter: (a, b) => a.country - b.country,
    makeRender: ({ searchText }) => (country) => (
      <DTCHighlighter searchText={searchText} value={country} />
    )
  },
  [FIELDS.contact]: {
    title: LABELS[FIELDS.contact],
    dataIndex: FIELDS.contact,
    key: FIELDS.contact,
    sorter: (a, b) => a.contact - b.contact,
    makeRender: ({ searchText }) => (contact) => (
      <DTCHighlighter searchText={searchText} value={contact} />
    )
  },
  [FIELDS.status]: {
    title: LABELS[FIELDS.status],
    dataIndex: FIELDS.status,
    key: FIELDS.status,
    sorter: (a, b) => a.status - b.status,
    makeRender: ({ searchText }) => (status) => (
      <DTCHighlighter searchText={searchText} value={status} />
    )
  },
  [FIELDS.reputation]: {
    title: LABELS[FIELDS.reputation],
    dataIndex: FIELDS.reputation,
    key: FIELDS.reputation,
    sorter: (a, b) => a.reputation - b.reputation,
    makeRender: ({ searchText }) => (reputation) => (
      <Rate allowHalf value={roundToHalfDecimal(reputation)} disabled />
    )
  },
  [FIELDS.reputationList]: {
    title: LABELS[FIELDS.reputationList],
    dataIndex: FIELDS.reputationList,
    key: FIELDS.reputationList,
    sorter: (a, b) => a.reputationList - b.reputationList,
    makeRender: ({ searchText }) => (reputationList) => (
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
  manage: {
    title: "Manage",
    makeRender: () => ({ status, id }) => {
      return (
        <React.Fragment>
          <Fragment>
            {status === USER_MGT_STATUS_LABELS[USER_MGT_STATUS.SUSPENDED] ? (
              <Button
                onClick={() => onUnblock(id)}
                type="primary"
                className="dtc-min-width-50 mr-2"
              >
                <i className="fe fe-play" style={{ verticalAlign: "middle" }}></i>
              </Button>
            ) : (
              <Button onClick={() => onBlock(id)} type="danger" className="dtc-min-width-50 mr-2">
                <i className="fe fe-pause" style={{ verticalAlign: "middle" }}></i>
              </Button>
            )}

            <Button type="primary" className="dtc-min-width-50 mr-2" onClick={onViewAssignBadges}>
              <i className="fe fe-edit-2" style={{ verticalAlign: "middle" }}></i>
            </Button>
          </Fragment>
        </React.Fragment>
      );
    }
  }
});
