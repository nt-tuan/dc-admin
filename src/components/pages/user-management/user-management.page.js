import React, { memo, useState } from "react";
import { UserManagementAllUserTab } from "./tabs/user-mgt-all-user-tab.comp";
import { UserManagementBuyerTab } from "./tabs/user-mgt-buyer-tab.comp";
import { UserManagementSellerTab } from "./tabs/user-mgt-seller-tab.comp";
import { Helmet } from "react-helmet";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { MARKETPLACE_NAME, RouteConst } from "commons/consts";

const TAB_KEYS = {
  BUYER: "BUYER",
  SELLER: "SELLER",
  ALL_USER: "ALL_USER"
};

const { SELLER, BUYER, ALL_USER } = TAB_KEYS;

export const UserManagementPage = () => {
  const [tab, setTab] = useState(ALL_USER);
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
      <div className="d-flex justify-content-between mb-3 ml-2">
        <div>
          {renderTabButton("All User", ALL_USER)}
          {renderTabButton("Buyer", BUYER)}
          {renderTabButton("Seller", SELLER)}
        </div>
      </div>
      {tab === ALL_USER && renderAllUser()}
      {tab === BUYER && renderBuyer()}
      {tab === SELLER && renderSeller()}
    </article>
  );
};

export default memo(UserManagementPage);
