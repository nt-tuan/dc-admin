import { Button, Col, Row } from "antd";
import { RouteConst } from "commons/consts";
import React, { memo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { TradeRulesActiveTab } from "./trade-rules-active/trade-rules-active.comp";
import { TradeRulesPendingTab } from "./trade-rules-pending/trade-rules-pending.comp";

const TAB_KEYS = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING"
};

const { ACTIVE, PENDING } = TAB_KEYS;

const TradeRulesPage = memo(() => {
  const [tab, setTab] = useState(ACTIVE);

  const renderActiveTab = () => <TradeRulesActiveTab status={tab} />;
  const renderPendingTab = () => <TradeRulesPendingTab status={tab} />;

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
      <Helmet title="Trade Rules" />
      <Row className="d-flex justify-content-between mb-3 ml-2">
        <Col>
          {renderTabButton("Active", ACTIVE)}
          {renderTabButton("Pending", PENDING)}
        </Col>
        <Col className="mr-4">
          <Link to={RouteConst.CREATE_TRADE_RULES}>
            <Button type="primary">Create Trade Rules</Button>
          </Link>
        </Col>
      </Row>

      {tab === ACTIVE && renderActiveTab()}
      {tab === PENDING && renderPendingTab()}
    </article>
  );
});

export default TradeRulesPage;
