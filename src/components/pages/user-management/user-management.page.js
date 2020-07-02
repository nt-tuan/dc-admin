import React, { memo, useState } from "react";
import { UserManagementAllUserTab } from "./tabs/user-mgt-all-user-tab.comp";
import { UserManagementBuyerTab } from "./tabs/user-mgt-buyer-tab.comp";
import { UserManagementSellerTab } from "./tabs/user-mgt-seller-tab.comp";
import { Helmet } from "react-helmet";
import { Button } from "antd";

const TAB_KEYS = {
  BUYER: "BUYER",
  SELLER: "SELLER",
  ALL_USER: "ALL_USER"
};

const { SELLER, BUYER, ALL_USER } = TAB_KEYS;

export const UserManagementPage = () => {
  const [tab, setTab] = useState(BUYER);
  const renderBuyer = () => <UserManagementBuyerTab />;
  const renderSeller = () => <UserManagementSellerTab />;
  const renderAllUser = () => <UserManagementAllUserTab />;

  const renderTabButton = (tabName, key) => {
    return (
      <Button
        shape="round"
        type={tab === key ? "primary" : "default"}
        className="mr-2"
        onClick={() => setTab(key)}
      >
        {tabName}
      </Button>
    );
  };

  return (
    <article>
      <Helmet title="User Management" />
      <div className="flex mb-3 ml-2">
        {renderTabButton("Buyer", BUYER)}
        {renderTabButton("Seller", SELLER)}
        {renderTabButton("All User", ALL_USER)}
      </div>
      {tab === BUYER && renderBuyer()}
      {tab === SELLER && renderSeller()}
      {tab === ALL_USER && renderAllUser()}
    </article>
  );
};

export default memo(UserManagementPage);
