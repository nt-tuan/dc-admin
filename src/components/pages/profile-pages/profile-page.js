import React, { memo, useEffect, useState } from "react";
import {
  selectCompanyName,
  selectLargestTransactionValue,
  selectSuccessfulTransactions,
  selectUsername
} from "redux/user/user.duck";
import { useLocation, useRouteMatch } from "react-router-dom";

import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet";
//** Components */
import ProfileCard from "./profile-card";
import ProfileTabs from "./profile-tabs";
import { useSelector } from "react-redux";

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
    <>
      <Helmet title={`Profile | ${currentTab && currentTab.split("-").join(" ")}`} />
      <Grid container columnSpacing={6} rowSpacing={6}>
        <Grid item xs={12} lg={12} xl={4}>
          <ProfileCard
            title={username}
            company={company}
            successfulTransactions={successfulTransactions}
            largestTransactionValue={largestTransactionValue}
          />
        </Grid>
        <Grid item xs={12} lg={12} xl={8}>
          <ProfileTabs currentTab={currentTab} handleTabClick={handleTabClick} />
        </Grid>
      </Grid>
    </>
  );
});

export default ProfilePage;
