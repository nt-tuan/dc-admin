import React, { Fragment, useEffect, useState } from "react";

import { BankDetailsReadonly } from "components/bank-details/bank-details-readonly.comp";
import Box from "@mui/material/Box";
import { DTCSection } from "components/commons";
import { FinancialService } from "services";
import { Helmet } from "react-helmet";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { styled } from "@mui/material";
import { toCurrency } from "utils/general.util";

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

const centerContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const RoundedLine = ({ children, index }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        component="span"
        sx={{
          bgcolor: "primary.main",
          color: "common.white",
          width: 30,
          height: 30,
          borderRadius: "100%",
          marginRight: "10px",
          ...centerContentStyles
        }}
      >
        {index}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
const ExampleLine = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
});
const PrimarySpan = ({ children }) => {
  return (
    <Box component="span" sx={{ color: "primary.main" }}>
      {children}
    </Box>
  );
};
const ErrorSpan = ({ children }) => {
  return (
    <Box component="span" sx={{ color: "error.main" }}>
      {children}
    </Box>
  );
};

const ListItem = ({ children }) => {
  return (
    <Box component="li" sx={{ marginLeft: 6, marginBottom: 1, listStyleType: "square" }}>
      {children}
    </Box>
  );
};

const AddFundsPage = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const resWalletDashboard = await FinancialService.getWalletDashboard();
      setData(resWalletDashboard);
    });
  }, []);

  const handleCopy = (text) => {
    if (typeof text === "string") {
      navigator.clipboard.writeText(text);
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(text));
  };

  return (
    <Fragment>
      <Helmet title="Add Fund" />
      <DTCSection>
        <DTCSection.Header>Total Balance: {toCurrency(data.totalBalance)}</DTCSection.Header>
      </DTCSection>
      <DTCSection sx={{ marginTop: (theme) => theme.spacing(2) }}>
        <DTCSection.Header>Add Funds to your wallet</DTCSection.Header>
        <DTCSection.Content>
          <p>To add funds into your wallet, please follow the steps below:</p>
          <RoundedLine index={1}>
            Log in to your bank's website or visit your local branch and make a wire transfer.
          </RoundedLine>
          <Box component="ul" sx={{ listStyleType: "square", paddingLeft: 0 }}>
            <ListItem>
              Only transfer from your registered Business Bank Account. Funds received from any
              other Bank account will not be allowed and will be returned. This will cause a delay
              and you will have to bear any bank charges incurred.
            </ListItem>
          </Box>
          <RoundedLine index={2}>
            Transfer the required amount in USD into your Trading Wallet using the following
            information:
          </RoundedLine>
          <Box component="ul" sx={{ listStyleType: "square", paddingLeft: 0 }}>
            <ListItem>
              Copy and paste the beneficiary details shown below in to your bank's website.
            </ListItem>
            <ListItem>
              <PrimarySpan>Copy</PrimarySpan> and <PrimarySpan>Paste </PrimarySpan> the{" "}
              <b>'Reference number'</b> exactly as shown in 'Payment reference' below.
              <ErrorSpan>
                <strong> This is mandatory</strong>
              </ErrorSpan>{" "}
              and if this is missing or not exactly matching, there will be a delay in your funds
              reaching your Trading Wallet and may well be returned back to your bank. You will have
              to bear any bank charges incurred.{" "}
            </ListItem>
            <ListItem>
              We do not charge any Bank charges for receiving funds in to your Wallet. Please ensure
              you select to pay your local bank's transfer fees so that the net USD amount received
              in your Trading Wallet meets the required amount for the total costs of your order
              transaction(s). If there is any shortage, you will need to submit another transfer to
              make up the shortfall and will cause delay and additional Transfer fees your bank may
              charge. <b>As a Tip</b>, it's always better to add some extra funds as a safety which
              you can always withdraw anytime after the order transaction is settled.
            </ListItem>
            <ListItem>
              <b>Example of Total NET funds:</b> Transaction Invoice = $1,000, Logistics = $200,
              Insurance = $2. For this transaction, you need to specify the received funds at the
              beneficiary bank is a minimum of $1,202.00 as shown below (we suggest adding a safety
              round up which in this example will mean Net beneficiary funds received is $1,220):
            </ListItem>
          </Box>
          <Box sx={{ maxWidth: "450px", marginLeft: 6 }}>
            <ExampleLine>
              <div>Invoice Value</div>
              <div>$1,000</div>
            </ExampleLine>
            <ExampleLine>
              <div>Logistics</div>
              <div>$200</div>
            </ExampleLine>
            <ExampleLine>
              <div>Insurance</div>
              <div>$2</div>
            </ExampleLine>
            <ExampleLine style={{ fontWeight: "bold" }}>
              <div>Total Transaction Costs</div>
              <div>$1,202</div>
            </ExampleLine>
            <ExampleLine>
              <div>Inbound Bank Fee (0%)</div>
              <div>$0</div>
            </ExampleLine>
            <Box
              sx={{
                color: "primary.main",
                marginTop: 1,
                borderTop: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div> Total NET Funds to Inbound</div>
              <div>$1,202.00</div>
            </Box>
          </Box>
          <Box sx={{ marginTop: 4, marginBottom: 2 }}>
            <strong>Copy and paste the details onto your bank's website.</strong>
          </Box>
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
          <Box sx={{ marginTop: 2 }}>
            <b>NOTE:</b> Transactions over USD 100,000 may require additional information such as 3
            months Bank statement or a Bank reference.
          </Box>
        </DTCSection.Content>
      </DTCSection>
    </Fragment>
  );
};

export default AddFundsPage;
