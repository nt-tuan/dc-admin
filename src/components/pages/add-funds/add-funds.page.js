import React, { Fragment, useEffect, useState } from "react";
import { BankDetailsReadonly } from "components/molecules";
import { toCurrency } from "utils/general.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { FinancialService } from "services";
import { Button } from "antd";

const PCC_BANK_DETAILS = {
  bankName: "bankName",
  country: "country",
  city: "city",
  swiftCode: "swiftCode",
  iban: "iban",
  accountCurrency: "accountCurrency"
};

const PCC_BANK_DETAILS_LABEL = {
  [PCC_BANK_DETAILS.bankName]: "Bank name",
  [PCC_BANK_DETAILS.country]: "Country",
  [PCC_BANK_DETAILS.city]: "City/ Town",
  [PCC_BANK_DETAILS.swiftCode]: "SWIFT",
  [PCC_BANK_DETAILS.iban]: "IBAN",
  [PCC_BANK_DETAILS.accountCurrency]: "Account currency"
};

const getData = () => [
  {
    bankName: "ASTROBANK LIMITED",
    country: " CYPRUS",
    city: "NICOSIA(LEFKOSIA)",
    swiftCode: "PIRBCY2NXXX",
    iban: "CY12008001700000000001801302",
    accountCurrency: "USD"
  }
];

const AddFundsPage = () => {
  const [data, setData] = useState({});
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resWalletDashboard = await FinancialService.getWalletDashboard();
      setData(resWalletDashboard);
    });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 1000);
  };

  return (
    <Fragment>
      <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3 d-flex align-items-center">
        <h5 className="text-primary mr-1">Total Balance: </h5>
        <h5>{toCurrency(data.totalBalance)}</h5>
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
            Important: Please add “CY83905000010010011040010011 - {data.walletName}"{" "}
            {document.queryCommandSupported("copy") && (
              <Button
                title="Copy"
                type="primary"
                size="small"
                onClick={() => handleCopy(`CY83905000010010011040010011 - ${data.walletName}`)}
                ghost
              >
                <i className={showCopySuccess ? "fe fe-check" : "fe fe-copy"} />
              </Button>
            )}{" "}
            as reference while transferring the funds.
          </div>
        </div>
        <BankDetailsReadonly
          bankDetails={getData()}
          showHeader={false}
          showTitle={false}
          schema={PCC_BANK_DETAILS}
          label={PCC_BANK_DETAILS_LABEL}
          classname="col-12 mb-4"
        />
      </div>
    </Fragment>
  );
};

export default AddFundsPage;
