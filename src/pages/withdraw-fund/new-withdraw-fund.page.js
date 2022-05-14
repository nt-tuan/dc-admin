import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import NewWithdrawalCard from "./components/NewWithdrawalCard";
import NewWithdrawalBankCard from "./components/NewWithdrawalBankCard";
import NewWithdrawalTransactionModal from "./components/NewWithdrawalTransactionModal";
import { useMessage } from "@/hooks/use-message";
import { CompanyService, FinancialService } from "@/services";
import { LoadingIndicator } from "@/components/commons";
import { RouteConst } from "@/commons/consts";
import { useHistory } from "react-router-dom";
import { createOTP, getUserProfile } from "@/services/user-profile.service";
import { useDispatch, useSelector } from "react-redux";
import * as CONFIGS_DUCK from "@/redux/configs/configs.duck";
import * as WITHDRAW_FUND_ACTIONS from "@/redux/withdraw-fund/withdrawFund.duck";

import _get from "lodash/get";
import { PhoneOTPModal } from "../../components/auth/components/phone-otp-modal";
import { AddPhoneModal } from "@/components/user-profile/components/add-phone-modal/add-phone-modal.comp";
import { NumberField, RenderField } from "@/components/commons/fields";
import { Form, Formik } from "formik";

export default function NewWithdrawalPage() {
  const dispatch = useDispatch();
  const message = useMessage();
  const history = useHistory();
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const verifyWithdrawData = useSelector(WITHDRAW_FUND_ACTIONS.selectVerifyWithdrawData);
  const createWithdrawData = useSelector(WITHDRAW_FUND_ACTIONS.selectCreateWithdrawData);
  const [isFocus, setIsFocus] = useState(null);
  const [inputCode, setInputCode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [amountWithdraw, setAmountWithdraw] = useState(100);
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState({});
  const [checkCreateWithdraw, setCheckCreateWithdraw] = useState();
  const [userData, setUserData] = useState();

  const handleSetInputCode = (code) => {
    setInputCode(code);
    setIsOpen(false);
  };

  const getData = useCallback(() => {
    setLoading(true);

    asyncErrorHandlerWrapper(async () => {
      const [resWalletDashboard, resBankDetails] = await Promise.all([
        FinancialService.getWalletDashboard(),
        CompanyService.getBankDetails()
      ]);
      setAccountData(resWalletDashboard);
      setBankDetails(resBankDetails);

      setLoading(false);
    });
  }, [asyncErrorHandlerWrapper]);

  const handleIsFocus = (index) => {
    setIsFocus(index);
  };

  const openModal = () => {
    if (selectedBank && amountWithdraw && amountWithdraw >= 100) {
      setIsOpen(true);
      createOTP();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (value) => {
    setAmountWithdraw(value);
  };

  const isInvalidField = useMemo(() => {
    return (
      !amountWithdraw ||
      amountWithdraw === "-" ||
      amountWithdraw < 100 ||
      amountWithdraw > accountData?.availableBalance
    );
  }, [amountWithdraw, accountData?.availableBalance]);

  const errorMessage = useMemo(() => {
    if (!amountWithdraw || amountWithdraw === "-") {
      return "Only numeric number greater than 0.";
    }
    if (amountWithdraw < 100) {
      return "Minimum withdrawal amount is 100.00 USD.";
    }
    if (amountWithdraw > accountData?.availableBalance) {
      return "The withdrawal amount should not exceed the amount of your available funds.";
    }
    return "";
  }, [amountWithdraw, accountData?.availableBalance]);

  const handleRouter = () => {
    history.push(RouteConst.WALLET);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch({ type: CONFIGS_DUCK.LOAD_ASSETS });
  }, [dispatch]);

  useEffect(() => {
    if (inputCode) {
      dispatch(WITHDRAW_FUND_ACTIONS.verifyWithdrawCodeRequest(inputCode));
    }
  }, [dispatch, inputCode]);

  useEffect(() => {
    if (
      verifyWithdrawData.verifyWithdrawCode.status === "SUCCESS" &&
      selectedBank &&
      amountWithdraw &&
      !checkCreateWithdraw
    ) {
      setCheckCreateWithdraw(true);
      dispatch(
        WITHDRAW_FUND_ACTIONS.createWithdrawCodeRequest({
          companyBankDetailId: _get(selectedBank, "id", bankDetails[0].id),
          amount: amountWithdraw
        })
      );
    }

    if (verifyWithdrawData.verifyWithdrawCode.status === "INVALID") {
      message.error("Invalid verification code.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyWithdrawData]);

  useEffect(() => {
    try {
      setLoading(true);
      asyncErrorHandlerWrapper(async () => {
        const user = await getUserProfile();
        setUserData(user);
      });
    } finally {
      setLoading(false);
    }
  }, [asyncErrorHandlerWrapper]);

  useEffect(() => {
    if (transactionOpen) {
      setTransactionOpen(false);
    }
    if (createWithdrawData.isCreateSuccess) {
      setTransactionOpen(true);
      setIsOpen(false);
      setCheckCreateWithdraw(false);
    }
    if (createWithdrawData.isCreateFail) {
      message.error("Withdrawal from wallet failed.");
      setCheckCreateWithdraw(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createWithdrawData]);

  useEffect(() => {
    if (bankDetails) {
      handleIsFocus(0);
      setSelectedBank(bankDetails[0]);
    }
  }, [bankDetails]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200
        }}
      >
        <LoadingIndicator />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">
          <b>Withdrawal Funds</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Select a wallet to withdraw funds from:</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <NewWithdrawalCard balance={accountData.availableBalance} />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Select a bank account to withdraw funds to:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {bankDetails.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={index.toString()}>
              <Box
                onClick={() => {
                  handleIsFocus(index);
                  setSelectedBank(item);
                }}
              >
                <NewWithdrawalBankCard
                  selectedBank={selectedBank}
                  isFocus={(isFocus === index).toString()}
                  name={item.name}
                  accountNumber={item.accountNumber}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">Enter the amount you wish to withdraw:</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Formik initialValues={{ amount: "" }}>
          <Form>
            <RenderField>
              {({ values, setFieldValue }) => {
                const onBlur = () => {
                  const value = values.amount;
                  if (isNaN(value) || value < 100) {
                    setFieldValue("amount", 100);
                  }
                };
                return (
                  <NumberField
                    name="amount"
                    size="small"
                    variant="outlined"
                    fullWidth
                    label="Amount"
                    value={amountWithdraw}
                    onBlur={onBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    error={isInvalidField}
                    helperText={errorMessage}
                  />
                );
              }}
            </RenderField>
          </Form>
        </Formik>
      </Grid>

      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => openModal()}
          disabled={isInvalidField}
        >
          Withdraw
        </Button>
      </Grid>

      {/* Model : create - verify OTP */}
      {userData && userData?.phone?.length > 4 ? (
        <PhoneOTPModal
          open={isOpen}
          onClose={closeModal}
          phone={userData.phone}
          onVerify={handleSetInputCode}
        />
      ) : (
        <AddPhoneModal open={isOpen} onClose={closeModal} />
      )}

      {/* Model : Withdraw success noti */}
      <NewWithdrawalTransactionModal
        onSubmit={handleRouter}
        open={transactionOpen}
        onClose={() => {
          setTransactionOpen(false);
          getData();
        }}
        bankAccount={_get(selectedBank, "accountNumber")}
        amount={amountWithdraw}
        walletName={_get(selectedBank, "name")}
      />
    </Grid>
  );
}
