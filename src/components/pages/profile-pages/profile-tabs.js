import { BankDetailsTab, InformationTab, SettingTab } from "./components";
import { DTCSection, DTCTabs, useTabSearchParams } from "components/commons";

import React from "react";
import { USER_TABS_NAME } from "commons/consts";

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
  const [value, onChange] = useTabSearchParams(dataDefaultTabs);
  return (
    <DTCSection>
      <DTCSection.Content>
        <DTCTabs value={value} onChange={onChange} tabs={dataDefaultTabs} />
      </DTCSection.Content>
    </DTCSection>
  );
};

export default ProfileTabs;
