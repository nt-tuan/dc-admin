import * as yup from "yup";

import { Form, Formik } from "formik";
import { NumberField, RenderField, SelectField } from "@/components/commons/fields";
import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DTCModal } from "@/components/commons";
import { FinancialService } from "@/services";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import numeral from "numeral";
import { toCurrency } from "@/utils/general.util";
import { useAsyncErrorHandler } from "@/utils/error-handler.util";
import { useMessage } from "@/hooks/use-message";

const validationShema = yup.object({
  amount: yup
    .number()
    .required("Only numberic number greater than 0")
    .min(100, "Minimum withdrawal amount is 100 USD"),
  account: yup.string().required()
});

export const RequestWithdrawalForm = ({ data, isDisabled, onSubmit, onCheckValidate }) => {
  const asyncErrorHandlerWrapper = useAsyncErrorHandler();
  const message = useMessage();
  const [confirmCallback, setConfirmCallback] = useState();

  const handleSubmit = (values, helpers) => {
    onCheckValidate(() => setConfirmCallback({ values, helpers }));
  };

  const validateAmount = async (value) => {
    const amountNum = numeral(value).value();
    if (!isNaN(value)) {
      if (amountNum > data.available_withdrawal) {
        return "The withdrawal amount should not exceed the amount of your available funds.";
      } else if (amountNum < 100) {
        return "Minimum withdrawal amount is 100 USD";
      }
    }
  };

  const handleWithdraw = async () => {
    const {
      values,
      helpers: { resetForm }
    } = confirmCallback;
    const bankAccount = data.bankDetails.find(
      (account) => account.accountNumber === values.account
    );
    const payload = {
      amount: values.amount,
      companyBankDetailId: bankAccount.id
    };
    asyncErrorHandlerWrapper(async () => {
      await FinancialService.postRequestWithdrawal(payload);
      resetForm();
      setConfirmCallback();
      message.success("Withdraw Successfully!");
      onSubmit && onSubmit();
    });
  };

  return (
    <Fragment>
      <Typography mb={2}>
        <Typography component="span" color="primary" fontWeight="bold">
          Fill
        </Typography>{" "}
        in the details below and we'll make a deposit into your bank account
      </Typography>
      <Formik
        validationShema={validationShema}
        initialValues={{ account: "", amount: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Stack spacing={2}>
            <SelectField
              name="account"
              label="Choose Bank Account No:"
              placeholder="Select a bank account"
              fullWidth
              dataSource={data.bankDetails.map(({ accountNumber }) => ({
                value: accountNumber,
                label: accountNumber
              }))}
            />
            <RenderField>
              {({ values, setFieldValue }) => {
                const onBlur = () => {
                  const value = values.amount;
                  if (isNaN(value) || value < 100) {
                    setFieldValue("amount", 100);
                  }
                };
                const amount = values.amount;
                const remainBalance = isNaN(amount)
                  ? data.available_withdrawal
                  : data.available_withdrawal - Number(amount);
                const withdrawable = remainBalance > 0 && amount >= 100 && values.account;
                return (
                  <>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <NumberField
                        name="amount"
                        label="Enter Amount (USD)"
                        onBlur={onBlur}
                        fieldConfig={{
                          validate: validateAmount
                        }}
                      />
                      <Box> Remaining Account Balance: {toCurrency(remainBalance)}</Box>
                    </Stack>
                    <Stack alignItems="center">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isDisabled || !withdrawable}
                      >
                        Withdraw
                      </Button>
                    </Stack>
                  </>
                );
              }}
            </RenderField>
          </Stack>
        </Form>
      </Formik>
      <DTCModal
        open={confirmCallback != null}
        onClose={() => setConfirmCallback(null)}
        content={
          <Box>
            <Box mb={3}>
              Your withdrawal request is successfully submitted. The amount will be deposited in
              your bank account within 3-4 business days.
            </Box>
            <Button variant="contained" onClick={handleWithdraw}>
              Confirm
            </Button>
          </Box>
        }
        title="Confirm withdraw"
      />
    </Fragment>
  );
};
