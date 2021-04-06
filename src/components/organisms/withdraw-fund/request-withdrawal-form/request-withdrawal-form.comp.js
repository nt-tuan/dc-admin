import React, { Fragment, useState } from "react";
import { Form, Select, Input, Button, Modal, message } from "antd";
import { toCurrency } from "utils/general.util";
import { RegexConst } from "commons/consts";
import { FormError } from "components/atoms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { FinancialService } from "services";
import numeral from "numeral";

const { Option } = Select;

export const RequestWithdrawalForm = ({ data, isDisabled, onSubmit }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [form] = Form.useForm();
  const [valueAmount, setValueAmount] = useState(null);
  const [withdrawable, setWithdrawable] = useState(false);

  const handleSubmit = () => {
    setIsOpenPopup(true);
  };

  const validateAmount = async (value) => {
    const amountNum = numeral(value).value();
    if (!isNaN(value)) {
      if (amountNum > data.available_withdrawal) {
        throw new Error(
          "The withdrawal amount should not exceed the amount of your available funds."
        );
      } else if (amountNum < 100) {
        throw new Error("Minimum withdrawal amount is 100 USD");
      }
    }
  };

  const handleWithdraw = async () => {
    const bankAccount = data.bankDetails.find(
      (account) => account.accountNumber === form.getFieldValue("account")
    );
    const payload = {
      amount: numeral(form.getFieldValue("amount")).value(),
      companyBankDetailId: bankAccount.id
    };
    asyncErrorHandlerWrapper(async () => {
      await FinancialService.postRequestWithdrawal(payload);
      form.setFieldsValue({ amount: "", account: "" });
      setIsOpenPopup(false);
      message.success("Withdraw Successfully!");
      onSubmit && onSubmit();
    });
  };
  const onChangeInput = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setValueAmount(value);
      validateAmount(value)
        .then(() => setWithdrawable(true))
        .catch(() => setWithdrawable(false));
    }
  };
  const onBlur = (event) => {
    const value = event.target.value;
    console.log(value, isNaN(value), value < 100);
    if (isNaN(value) || value < 100) {
      setValueAmount("100.00");
      form.setFieldsValue({ amount: "100.00" });
    }
  };

  return (
    <Fragment>
      <p className="font-weight-bold">
        <span className="text-primary">Fill</span> in the details below and we'll make a deposit
        into your bank account
      </p>
      <Form
        form={form}
        scrollToFirstError={true}
        onFinish={handleSubmit}
        hideRequiredMark={true}
        labelCol={{ xl: 4, lg: 6, md: 7, sm: 7 }}
        wrapperCol={{ xl: 16, lg: 16, md: 15, sm: 15 }}
        // layout="inline"
        labelAlign="left"
      >
        <div className="row">
          <Form.Item
            colon={false}
            className="col-12 mb-3"
            label="Choose Bank Account No:"
            labelCol={{ xl: 4, lg: 6, md: 7, sm: 7 }}
            wrapperCol={{ xl: 16, lg: 16, md: 15, sm: 15 }}
            labelAlign="left"
            name="account"
            rules={[
              {
                required: true,
                message: <FormError msg="This field is required" />
              }
            ]}
          >
            <Select placeholder="Select a bank account" className="w-100" disabled={isDisabled}>
              {data.bankDetails.map(({ accountNumber }, index) => (
                <Option value={accountNumber} key={accountNumber}>
                  {accountNumber}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            colon={false}
            className="col-12 mb-3"
            label="Enter Amount (USD)"
            labelCol={{ xl: 4, lg: 6, md: 7, sm: 7 }}
            wrapperCol={{ xl: 16, lg: 16, md: 15, sm: 15 }}
            labelAlign="left"
            name="amount"
            initialValue={0}
            validateFirst
            rules={[
              {
                required: true,
                message: <FormError msg="This field is required" />
              },
              {
                pattern: RegexConst.NUMBER_WITH_ONLY_2_DECIMAL_POSITIONS,
                message: <FormError msg="Only numberic number greater than 0" />
              },
              {
                validator: (rule, value) => {
                  return validateAmount(value);
                }
              }
            ]}
          >
            <div className="d-lg-flex justify-content-between">
              <Input
                className="col-md-12 col-lg-5"
                placeholder="Enter Amount (USD)"
                disabled={isDisabled}
                value={valueAmount}
                onChange={onChangeInput}
                onBlur={onBlur}
              />
              <span className="d-flex justify-content-between">
                <Form.Item shouldUpdate>
                  {() => {
                    const availableAmount = data.available_withdrawal;
                    const inputAmount = numeral(form.getFieldValue("amount")).value();
                    return (
                      <Fragment>
                        Remaining Account Balance: &nbsp;
                        <b>
                          {data &&
                            toCurrency(
                              !isNaN(inputAmount) &&
                                inputAmount > 0 &&
                                inputAmount < availableAmount
                                ? availableAmount - inputAmount
                                : availableAmount
                            )}
                        </b>
                      </Fragment>
                    );
                  }}
                </Form.Item>
              </span>
            </div>
          </Form.Item>
          <div className="col-12 text-center">
            <Button htmlType="submit" type="primary" disabled={isDisabled || !withdrawable}>
              Withdraw
            </Button>
          </div>
        </div>
      </Form>
      <Modal
        visible={isOpenPopup}
        onCancel={() => setIsOpenPopup(false)}
        footer={[
          <Button type="primary" onClick={handleWithdraw}>
            Confirm
          </Button>
        ]}
        title="Confirm withdraw"
      >
        Your withdrawal request is successfully submitted. The amount will be deposited in your bank
        account within 3-4 business days.
      </Modal>
    </Fragment>
  );
};
