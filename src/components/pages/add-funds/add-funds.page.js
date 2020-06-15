import React, { Fragment } from "react";
import { BankDetailsReadonly } from "components/molecules";

const fakedData = [
  {
    accountHolder: "First Century Bank",
    name: "US Bank",
    accountNumber: "01234567",
    iban: "AE82 WEST 123 4567",
    nationality: "UAE",
    swiftCode: "AEIUFPIRRO82"
  }
];

const AddFundsPage = () => {
  return (
    <Fragment>
      <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3 d-flex align-items-center">
        <h5 className="text-primary mr-1">Total Balance: </h5>
        <h5>$10000</h5>
      </div>
      <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
        <h5 className="text-capitalize mb-2 text-primary font-weight-bold">
          Add Funds to your wallet
        </h5>
        <div className="mt-2 mb-3">
          <div className="font-weight-bold">
            In order to add funds in your wallet, please transfer your funds to the Bank Account
            below.
          </div>
          <div className="text-danger font-weight-bold">
            IMPORTANT: Please add Genko_Trading as reference while transferring the funds.
          </div>
        </div>
        <BankDetailsReadonly bankDetails={fakedData} showTitle={false} showHeader={false} />
      </div>
    </Fragment>
  );
};

export default AddFundsPage;
