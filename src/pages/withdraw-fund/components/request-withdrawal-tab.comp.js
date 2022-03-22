import { CompanyService, FinancialService } from "@/services";
import { DTCSection, LoadingIndicator } from "@/components/commons";
import React, { useCallback, useEffect, useState } from "react";
import { RouteConst, USER_TABS_NAME } from "@/commons/consts";

import Alert from "@mui/material/Alert";
import { BankDetailsReadonly } from "@/components/bank-details/bank-details-readonly.comp";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { RequestWithdrawalForm } from "./request-withdrawal-form.comp";
import { WithdrawDashboard } from "./withdraw-dashboard.comp";
import { areObjectValuesUndefined } from "@/utils/general.util";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";

const defaultThreeStepState = { open: false };

export const RequestWithdrawalTab = () => {
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const [data, setData] = useState({});
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threeStepVerify, setThreeStepVerify] = React.useState(defaultThreeStepState);

  const isDisabled =
    bankDetails.filter((account) => areObjectValuesUndefined(account) === false).length === 0;

  const getData = useCallback(() => {
    setLoading(true);
    asyncErrorHandlerWrapper(async () => {
      const [resWalletDashboard, resBankDetails] = await Promise.all([
        FinancialService.getWalletDashboard(),
        CompanyService.getBankDetails()
      ]);
      setData(resWalletDashboard);
      setBankDetails(resBankDetails);

      setLoading(false);
    });
  }, [asyncErrorHandlerWrapper]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleWithdrawal = () => {
    if (threeStepVerify?.callback) {
      threeStepVerify.callback();
    }
    setThreeStepVerify(defaultThreeStepState);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingIndicator />
      </Box>
    );

  return (
    <Box>
      <div>
        {isDisabled && (
          <Alert sx={{ marginBottom: (theme) => theme.spacing(2) }} severity="error">
            {" "}
            Some infomation in your bank account requires review, please{" "}
            <Link to={`${RouteConst.PROFILE}/${USER_TABS_NAME.bankDetails}`} className="mx-1">
              click here{" "}
            </Link>
            to review them before requesting withdrawal
          </Alert>
        )}

        <WithdrawDashboard sx={{ marginBottom: (theme) => theme.spacing(2) }} data={data} />

        {!isDisabled && (
          <DTCSection sx={{ marginBottom: (theme) => theme.spacing(2) }}>
            <DTCSection.Header>Bank Account Details</DTCSection.Header>
            <DTCSection.Content>
              <BankDetailsReadonly showHeader={false} bankDetails={bankDetails || []} />
            </DTCSection.Content>
          </DTCSection>
        )}
        <DTCSection>
          <DTCSection.Content>
            <RequestWithdrawalForm
              data={{ bankDetails, available_withdrawal: data.availableBalance }}
              isDisabled={isDisabled}
              onSubmit={getData}
              onCheckValidate={(callback) => {
                setThreeStepVerify({ open: true, callback });
                handleWithdrawal();
              }}
            />
          </DTCSection.Content>
        </DTCSection>
      </div>
    </Box>
  );
};
