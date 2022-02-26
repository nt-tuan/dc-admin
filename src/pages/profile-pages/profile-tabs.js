import { DTCSection, DTCTabs, useTabPathParams } from "components/commons";
import { InformationTab, SettingTab } from "./components";
import { RouteConst, USER_TABS_NAME } from "commons/consts";

import { BankDetailsTab } from "components/bank-details";
import React from "react";

const dataDefaultTabs = [
  {
    label: "Profile Information",
    key: USER_TABS_NAME.profileInfo,
    component: <InformationTab />
  },
  {
    label: "Bank Details",
    key: USER_TABS_NAME.bankDetails,
    component: <BankDetailsTab />
  },
  {
    label: "Settings",
    key: USER_TABS_NAME.settings,
    component: <SettingTab />
  }
];
const ProfileTabs = () => {
  const [value, onChange] = useTabPathParams(dataDefaultTabs, RouteConst.PROFILE_PAGES, "tabName");
  return (
    <DTCSection>
      <DTCSection.Content>
        <DTCTabs value={value} onChange={onChange} tabs={dataDefaultTabs} />
      </DTCSection.Content>
    </DTCSection>
  );
};

export default ProfileTabs;
