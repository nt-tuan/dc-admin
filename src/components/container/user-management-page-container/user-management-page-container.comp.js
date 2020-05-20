import { Button } from "antd";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";

const TAB_KEYS = {
  BUYER: "BUYER",
  SELLER: "SELLER"
};

const { SELLER, BUYER } = TAB_KEYS;

export const UserManagementPageContainer = memo(({ title, renderBuyer, renderSeller }) => {
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
      </div>
      {tab === BUYER && renderBuyer()}
      {tab === SELLER && renderSeller()}
    </article>
  );
});
