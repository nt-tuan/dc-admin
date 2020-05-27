import { Button } from "antd";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";

const TAB_KEYS = {
  BUYER: "BUYER",
  SELLER: "SELLER",
  ALL_USER: "ALL_USER"
};

const { SELLER, BUYER, ALL_USER } = TAB_KEYS;

export const UserManagementPageContainer = memo(
  ({ title, renderBuyer, renderSeller, renderAllUser }) => {
    const [tab, setTab] = useState(BUYER);

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
        <Helmet title={title} />
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
  }
);
