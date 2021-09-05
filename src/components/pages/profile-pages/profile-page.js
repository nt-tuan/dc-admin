import React, { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col } from "antd";
import { useRouteMatch, useLocation } from "react-router-dom";
import capitalize from "lodash/capitalize";
//** Const */
import { getPrefixUrl } from "utils";

//** Components */
import ProfileCard from "./profile-card";
import ProfileTabs from "./profile-tabs";

import {
  selectSuccessfulTransactions,
  selectLargestTransactionValue,
  selectUsername,
  selectCompanyName
} from "redux/user/user.duck";

const ProfilePage = memo(() => {
  const match = useRouteMatch();
  const location = useLocation();

  //** get tabName from URL */
  const tabName = match.params.tabName;
  const [currentTab, setCurrentTab] = useState(tabName ? tabName : null);

  //** Get data from redux */
  const successfulTransactions = useSelector(selectSuccessfulTransactions);
  const largestTransactionValue = useSelector(selectLargestTransactionValue);
  const username = useSelector(selectUsername);
  const company = useSelector(selectCompanyName);
  const arrSubPaths = location?.pathname?.split("/");
  const roleUrl = `${arrSubPaths[0]}/${arrSubPaths[1]}/${arrSubPaths[2]}`;

  //** Set default when access from URL */
  useEffect(() => {
    setCurrentTab(tabName);
  }, [tabName, location]);

  //** Handle tab click */
  const handleTabClick = (tabName) => {
    window.history.pushState(null, null, `${roleUrl}/${tabName}`);
    setCurrentTab(tabName);
  };

  return (
    <Row gutter={[24, 16]}>
      <Helmet title={`Profile | ${currentTab && capitalize(currentTab.split("-").join(" "))}`} />
      <Col xl={8} lg={24} md={24}>
        <ProfileCard
          title={username}
          company={company}
          successfulTransactions={successfulTransactions}
          largestTransactionValue={largestTransactionValue}
        />
      </Col>
      <Col xl={16} lg={24} md={24}>
        <ProfileTabs currentTab={currentTab} handleTabClick={handleTabClick} />
      </Col>
    </Row>
  );
});

export default ProfilePage;
