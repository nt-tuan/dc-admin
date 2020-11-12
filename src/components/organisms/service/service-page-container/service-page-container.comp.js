import { Button } from "antd";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";

const TAB_KEYS = {
  LOGISTIC_PROVIDER: "LOGISTIC_PROVIDER",
  INSPECTION_PROVIDER: "INSPECTION_PROVIDER"
};

const { LOGISTIC_PROVIDER, INSPECTION_PROVIDER } = TAB_KEYS;

export const ServicePageContainer = memo(
  ({ title, renderLogisticProvider, renderInspectionProvider }) => {
    const [tab, setTab] = useState(LOGISTIC_PROVIDER);

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
          {renderTabButton("Logistics Provider", LOGISTIC_PROVIDER)}
          {renderTabButton("Inspection Provider", INSPECTION_PROVIDER)}
        </div>
        {tab === LOGISTIC_PROVIDER && renderLogisticProvider()}
        {tab === INSPECTION_PROVIDER && renderInspectionProvider()}
      </article>
    );
  }
);
