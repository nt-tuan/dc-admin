import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import NewWithdrawalCard from "./components/NewWithdrawalCard";
import NewWithdrawalBankCard from "./components/NewWithdrawalBankCard";
import NewWithdrawalTransactionModal from "./components/NewWithdrawalTransactionModal";
import { useMessage } from "@/hooks/use-message";
import { CompanyService, FinancialService } from "@/services";
import { LoadingIndicator } from "@/components/commons";
import { RouteConst } from "@/commons/consts";
import { useHistory } from "react-router-dom";
import { useUserProfile } from "@/components/user-profile/services/use-user-profile";
import { createOTP } from "@/services/user-profile.service";
import { useDispatch, useSelector } from "react-redux";
import * as CONFIGS_DUCK from "@/redux/configs/configs.duck";
import * as WITHDRAW_FUND_ACTIONS from "@/redux/withdraw-fund/withdrawFund.duck";

import _get from "lodash/get";
import { PhoneOTPModal } from "../../components/auth/components/phone-otp-modal";
import { AddPhoneModal } from "@/components/user-profile/components/add-phone-modal/add-phone-modal.comp";

export default function NewWithdrawalPage() {
  const { data } = useUserProfile();
  var verifyWithdrawData = useSelector(WITHDRAW_FUND_ACTIONS.selectVerifyWithdrawData);
  var createWithdrawData = useSelector(WITHDRAW_FUND_ACTIONS.selectCreateWithdrawData);

  const dispatch = useDispatch();
  const message = useMessage();
  const history = useHistory();
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();

  const [isFocus, setIsFocus] = useState(null);
  const [inputCode, setInputCode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState();
  const [amountWithdraw, setAmountWithdraw] = useState(100);
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState({});

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
    setIsOpen(true);
    createOTP();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setAmountWithdraw(e.target.value);
  };

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
    if (verifyWithdrawData.status === "SUCCESS" && selectedBank && amountWithdraw) {
      dispatch(
        WITHDRAW_FUND_ACTIONS.createWithdrawCodeRequest({
          companyBankDetailId: _get(selectedBank, "id"),
          amount: amountWithdraw
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, verifyWithdrawData]);

  useEffect(() => {
    if (transactionOpen) {
      setTransactionOpen(false);
    }
    if (_get(createWithdrawData, "status", "") && !transactionOpen) {
      setTransactionOpen(true);
      setIsOpen(false);
    }

    if (createWithdrawData.isApiFail && !verifyWithdrawData.status && !transactionOpen) {
      message.error("Withdrawal from wallet failed.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createWithdrawData, verifyWithdrawData, message]);

  if (loading)
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingIndicator />
      </Box>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">
          <b>Withdrawal Funds</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          Select a bank account to withdraw funds to:Select a wallet to withdraw funds from:
        </Typography>
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
        <TextField
          variant="outlined"
          label="Amount"
          required
          fullWidth
          onChange={(e) => handleChange(e)}
          value={amountWithdraw}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Withdraw
        </Button>
      </Grid>

      {/* Model : create - verify OTP */}
      {data && data.phone.length > 4 ? (
        <PhoneOTPModal
          open={isOpen}
          onClose={closeModal}
          phone={data.phone}
          onVerify={handleSetInputCode}
        />
      ) : (
        <AddPhoneModal open={isOpen} onClose={closeModal} />
      )}

      {/* Model : Withdraw success noti */}
      <NewWithdrawalTransactionModal
        onSubmit={handleRouter}
        open={transactionOpen}
        onClose={() => setTransactionOpen(false)}
        bankAccount={_get(selectedBank, "accountNumber")}
        amount={amountWithdraw}
        walletName={_get(selectedBank, "name")}
      />
    </Grid>
  );
}
