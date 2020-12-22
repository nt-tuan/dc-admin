import React from "react";
import PropTypes from "prop-types";
//** components */
import { USER_TABS_NAME } from "commons/consts";
import { InformationTab, BankDetailsTab, SettingTab } from "./components";

import { Tabs } from "antd";

const { TabPane } = Tabs;

const ProfileTabs = (props) => {
  const { currentTab, handleTabClick } = props;

  // Define default tabs
  const dataDefaultTabs = [
    {
      name: "Profile Information",
      key: USER_TABS_NAME.profileInfo,
      component: <InformationTab />
    },
    {
      name: "Bank Details",
      key: USER_TABS_NAME.bankDetails,
      component: <BankDetailsTab />
    },
    {
      name: "Settings",
      key: USER_TABS_NAME.settings,
      component: <SettingTab />
    }
  ];

  return (
    <div className="air__utils__shadow bg-white pt-2 pb-4 pr-4 pl-4 dtc-br-10">
      <Tabs animated={false} onTabClick={handleTabClick} activeKey={currentTab}>
        {dataDefaultTabs.map((item) => (
          <TabPane tab={item.name} key={item.key}>
            {currentTab === item.key ? item.component : null}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

ProfileTabs.propTypes = {
  currentTab: PropTypes.string,
  handleTabClick: PropTypes.func
};

ProfileTabs.defaultProps = {
  title: null, // define title
  handleTabClick: () => {}
};

export default ProfileTabs;
