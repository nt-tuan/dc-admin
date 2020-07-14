import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { RouteConst } from "commons/consts";
import { CardsWrapper } from "components/molecules";
import { DTCSection } from "components";

export const WalletDashboard = ({ cards }) => {
  return (
    <DTCSection>
      <div className="d-flex justify-content-between flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row">
        <h5 className="text-capitalize mb-2 text-primary font-weight-bold">Wallet Dashboard</h5>
        <div>
          <Link to={RouteConst.ADD_FUNDS}>
            <Button type="primary" shape="round" className="mr-2 mb-2">
              Add Funds
            </Button>
          </Link>
          <Link to={RouteConst.WITHDRAW_FUND}>
            <Button type="primary" shape="round" className="mb-2">
              Withdraw Funds
            </Button>
          </Link>
        </div>
      </div>
      <CardsWrapper cards={cards} />
    </DTCSection>
  );
};
