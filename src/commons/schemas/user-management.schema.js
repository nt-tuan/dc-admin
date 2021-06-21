import { Button } from "antd";
import React, { Fragment } from "react";
import { UserBadge } from "components/atoms/user-badge/user-badge.comp";
import { sortAlphabetically } from "utils/sort.util";
import { Link } from "react-router-dom";
import { MARKETPLACE_NAME, RouteConst } from "commons/consts";
import { getCompanyName } from "utils/config.util";

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
  userStatus: "userStatus",
  // enableMarketplaceCredit: "enableMarketplaceCredit",
  // enableProductCreation: "enableProductCreation",
  approved: "approved"
};

const LABELS = {
  [FIELDS.companyName]: "Company",
  [FIELDS.ownerName]: "Owner",
  [FIELDS.username]: "Username",
  [FIELDS.email]: "Email",
  [FIELDS.country]: "Country",
  [FIELDS.contact]: "Contact",
  [FIELDS.reputation]: "Scores",
  [FIELDS.badges]: "Badges",
  [FIELDS.userStatus]: "Status",
  // [FIELDS.enableMarketplaceCredit]: "Marketplace credit",
  // [FIELDS.enableProductCreation]: "Product Creation",
  [FIELDS.approved]: "Approved"
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
  [USER_MGT_STATUS.LIVE_SELLER]: "Live Seller",
  [USER_MGT_STATUS.SELLING_SELLER]: "Selling Seller",
  [USER_MGT_STATUS.INACTIVE_SELLER]: "Inactive Seller",
  [USER_MGT_STATUS.SUSPENDED]: "Suspended",
  [USER_MGT_STATUS.LIVE_BUYER]: "Live Buyer",
  [USER_MGT_STATUS.BUYING_BUYER]: "Buying Buyer",
  [USER_MGT_STATUS.INACTIVE_BUYER]: "Inactive Buyer"
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

export const userMgtTableSchema = ({
  onUnlock,
  onLock,
  onViewAssignBadges,
  onHandleMarketplaceCredit,
  onHandleUpdateProductCreationPermission,
  hiddenStatus = false
}) => (sortedInfo, CustomHighlighter, searchText, hiddenColumns) => {
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
      title: LABELS[FIELDS.reputation],
      dataIndex: FIELDS.reputation,
      key: FIELDS.reputation,
      sorter: (a, b) => a[FIELDS.reputation] - b[FIELDS.reputation],
      sortOrder: sortedInfo.columnKey === FIELDS.reputation && sortedInfo.order,
      render: (reputation) => (
        <CustomHighlighter searchText={searchText} value={reputation || "0"} />
      )
    },
    {
      title: LABELS[FIELDS.badges],
      dataIndex: FIELDS.badges,
      key: FIELDS.badges,
      // sorter: (a, b) => a.reputationList.value - b.reputationList.value,
      // sortOrder: sortedInfo.columnKey === FIELDS.reputationList && sortedInfo.order,
      render: (badges, record) => {
        const { badgeDTOList } = record;
        return (
          <Fragment>
            <div className="d-flex align-items-center h-100">
              {badges &&
                badges
                  .sort((a, b) => b.value - a.value)
                  .map((badge, index) => (
                    <UserBadge key={badge.type} type={badge.type} value={badge.value} />
                  ))}
              {badgeDTOList.map((badge) => {
                return (
                  <span className="pr-1 pl-1 d-block mr-1" style={{ width: 40 }}>
                    <div title={badge.name} style={{ width: 40, height: 40 }}>
                      <img height={40} width={40} src={badge.url} alt={""} />
                    </div>
                  </span>
                );
              })}
            </div>
          </Fragment>
        );
      }
    },
    {
      title: LABELS[FIELDS.userStatus],
      dataIndex: FIELDS.userStatus,
      key: FIELDS.userStatus,
      sorter: (a, b) => sortAlphabetically(a[FIELDS.userStatus], b[FIELDS.userStatus]),
      sortOrder: sortedInfo.columnKey === FIELDS.userStatus && sortedInfo.order,
      render: (userStatus) => <CustomHighlighter searchText={searchText} value={userStatus} />
    },
    // {
    //   title: LABELS[FIELDS.enableMarketplaceCredit],
    //   dataIndex: FIELDS.enableMarketplaceCredit,
    //   key: FIELDS.enableMarketplaceCredit,
    //   render: (isEnabled, { id }) => (
    //     <Switch
    //       defaultChecked={isEnabled}
    //       onChange={() => onHandleMarketplaceCredit(id, !isEnabled)}
    //     />
    //   )
    // },
    // {
    //   title: LABELS[FIELDS.enableProductCreation],
    //   dataIndex: FIELDS.enableProductCreation,
    //   key: FIELDS.enableProductCreation,
    //   render: (isEnabled, { id, companyType }) => (
    //     <Switch
    //       checked={isEnabled}
    //       onChange={() => onHandleUpdateProductCreationPermission(id, !isEnabled)}
    //       disabled={companyType === "TRADER"}
    //     />
    //   )
    // },
    {
      title: "Manage",
      key: "manage",
      render: ({ id, suspended, username, companyType }) => (
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
            // disabled={companyType === "TRADER"}
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

  if (hiddenStatus) {
    columnsSchema = columnsSchema.filter((col) => col.key !== FIELDS.userStatus);
    if (getCompanyName() === MARKETPLACE_NAME["8Corners"]) {
      columnsSchema = columnsSchema.filter((col) => col.key !== FIELDS.enableMarketplaceCredit);
    }
  }

  return columnsSchema.filter((col) => !hiddenColumns.includes(col.key));
};
