import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { RouteConst } from "commons/consts";
import { CardsWrapper } from "components/molecules";

export const WalletDashboard = ({ walletDashboard }) => {
  const cards = {
    totalBalance: {
      name: "totalBalance",
      icon: <i className="fas fa-money-check-alt"></i>,
      title: "Current Total Balance",
      value: walletDashboard.totalBalance,
      func: () => {},
      description: "Current Total Balance : Total Balance in your wallet"
    },
    pendingWithdrawal: {
      name: "pendingWithdrawal",
      icon: <i className="fas fa-folder-minus"></i>,
      title: "Pending Withdrawal",
      value: walletDashboard.withdrawal,
      func: () => history.push(RouteConst.WALLET),
      description: "Funds being processed for your withdrawal request"
    }
  };
  return (
    <section className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
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
      <CardsWrapper cards={cards} currency="$" />
    </section>
  );
};
