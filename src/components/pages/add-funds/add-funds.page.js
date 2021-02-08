import React, { Fragment, useEffect, useState } from "react";
import { BankDetailsReadonly } from "components/molecules";
import { toCurrency } from "utils/general.util";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { FinancialService } from "services";
import { Helmet } from "react-helmet";
import "./add-funds.page.scss";

const PCC_BANK_DETAILS = {
  beneficiary: "beneficiary",
  accountNo: "accountNo",
  bankName: "bankName",
  abaRoutingCode: "abaRoutingCode",
  swiftCode: "swiftCode",
  currency: "currency",
  paymentReference: "paymentReference"
};

const PCC_BANK_DETAILS_LABEL = {
  [PCC_BANK_DETAILS.beneficiary]: "Beneficiary Name",
  [PCC_BANK_DETAILS.accountNo]: "Account No",
  [PCC_BANK_DETAILS.bankName]: "Bank Name and Address",
  [PCC_BANK_DETAILS.abaRoutingCode]: "ABA Routing Code",
  [PCC_BANK_DETAILS.swiftCode]: "Swift Code",
  [PCC_BANK_DETAILS.currency]: "Currency",
  [PCC_BANK_DETAILS.paymentReference]: "Payment Reference"
};

const getData = (walletName) => [
  {
    beneficiary: "SECDEX DIGITAL CUSTODIAN LIMITED",
    accountNo: "1504144344",
    bankName: "SIGNATURE BANK, 565 Fifth Avenue New York NY 10017, USA",
    abaRoutingCode: "026013576",
    swiftCode: "SIGNUS33 or SIGNUS33XXX",
    currency: "USD",
    paymentReference: walletName
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
    navigator.clipboard.writeText(JSON.stringify(text));
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 1000);
  };

  return (
    <Fragment>
      <Helmet title="Add Fund" />
      <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3 d-flex align-items-center">
        <h5 className="text-primary mr-1">Total Balance: </h5>
        <h5>{toCurrency(data.totalBalance)}</h5>
      </div>
      <div className="air__utils__shadow p-3 dtc-br-10 bg-white mb-3">
        <h5 className="text-capitalize mb-2 text-primary font-weight-bold">
          Add Funds to your wallet
        </h5>
        <div className="mt-2 mb-3">
          <div className="">
            <p>To add funds into your wallet, please follow the steps below:</p>
            <ul className="list__item">
              <b className="list__item__number">
                <span>1</span>
                <span>
                  Log in to your bank's website or visit your local branch and make a wire transfer.
                </span>
              </b>
              <li>
                <span className="blue-item">-</span> Only transfer from your registered Business
                Bank Account. Funds received from any other Bank account will not be allowed and
                will be returned. This will cause a delay and you will have to bear any bank charges
                incurred.
              </li>
            </ul>
            <ul className="list__item">
              <b className="list__item__number">
                <span>2</span>
                <span>
                  Transfer the required amount in USD into your Trading Wallet using the following
                  information:
                </span>
              </b>
              <li>
                <span className="blue-item">-</span> Copy and paste the beneficiary details shown
                below in to your bank’s website.
              </li>
              <li>
                <span className="blue-item">-</span> <span className="blue-item">Copy</span> and{" "}
                <span className="blue-item">Paste </span> the <b>‘Reference number’</b> exactly as
                shown in ‘Payment reference’ below.<b className="red-color"> This is mandatory</b>{" "}
                and if this is missing or not exactly matching, there will be a delay in your funds
                reaching your Trading Wallet and may well be returned back to your bank. You will
                have to bear any bank charges incurred.{" "}
              </li>
              <li>
                <span className="blue-item">-</span> We do not charge any Bank charges for receiving
                funds in to your Wallet. Please ensure you select to pay your local bank’s transfer
                fees so that the net USD amount received in your Trading Wallet meets the required
                amount for the total costs of your order transaction(s). If there is any shortage,
                you will need to submit another transfer to make up the shortfall and will cause
                delay and additional Transfer fees your bank may charge. <b>As a Tip</b>, it’s
                always better to add some extra funds as a safety which you can always withdraw
                anytime after the order transaction is settled.
              </li>
              <li>
                <span className="blue-item">-</span> <b>Example of Total NET funds:</b> Transaction
                Invoice = $1,000, Logistics = $200, Insurance = $2. For this transaction, you need
                to specify the received funds at the beneficiary bank is a minimum of $1,202.00 as
                shown below (we suggest adding a safety round up which in this example will mean Net
                beneficiary funds received is $1,220):
              </li>
            </ul>
            <div className="example">
              <span>
                <div>Invoice Value</div>
                <div>$1,000</div>
              </span>
              <span>
                <div>Logistics</div>
                <div>$200</div>
              </span>
              <span>
                <div>Insurance</div>
                <div>$2</div>
              </span>
              <span style={{ fontWeight: "bold" }}>
                <div>Total Transaction Costs</div>
                <div>$1,202</div>
              </span>
              <span>
                <div>Inbound Bank Fee (0%)</div>
                <div>$0</div>
              </span>
              <span className="total__text ">
                <div> Total NET Funds to Inbound</div>
                <div>$1,202.00</div>
              </span>
            </div>
          </div>
          {/*<div className="text-danger font-weight-bold">
            Important: Please add “DAL {data.walletName}"{" "}
            {document.queryCommandSupported("copy") && (
              <Button
                title="Copy"
                type="primary"
                size="small"
                onClick={() => handleCopy(`DAL ${data.walletName}`)}
                ghost
              >
                <i className={showCopySuccess ? "fe fe-check" : "fe fe-copy"} />
              </Button>
            )}{" "}
            as reference while transferring the funds.
          </div>*/}
          <br />
          <div className="font-weight-bold">
            Copy and paste the details onto your bank's website.
          </div>
        </div>
        <BankDetailsReadonly
          bankDetails={getData(data.walletName)}
          showHeader={false}
          showTitle={false}
          schema={PCC_BANK_DETAILS}
          label={PCC_BANK_DETAILS_LABEL}
          classname="col-12 mb-4"
          handleCopyText={(text) => handleCopy(text)}
          isCopy={true}
        />
        <div>
          <b>NOTE:</b> Transactions over USD 100,000 may require additional information such as 3
          months Bank statement or a Bank reference.{" "}
        </div>
      </div>
    </Fragment>
  );
};

export default AddFundsPage;
