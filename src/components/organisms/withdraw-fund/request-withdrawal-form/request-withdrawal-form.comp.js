import React, { Fragment, useState } from "react";
import { Form, Select, Input, Button, Modal, message } from "antd";
import { toCurrency } from "utils/general.util";
import { RegexConst } from "commons/consts";
import { FormError } from "components/atoms";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { FinancialService } from "services";

const { Option } = Select;

export const RequestWithdrawalForm = ({ data, isDisabled, onSubmit }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setIsOpenPopup(true);
  };

  const handleWithdraw = async () => {
    const bankAccount = data.bankDetails.find(
      (account) => account.accountNumber === form.getFieldValue("account")
    );
    const payload = {
      amount: Number(form.getFieldValue("amount")),
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
        layout="inline"
      >
        <div className="row">
          <Form.Item
            colon={false}
            className="col-12 mb-3"
            label="Choose bank account"
            // labelCol={{ xl: 4, lg: 6, md: 7, sm: 7 }}
            // wrapperCol={{ xl: 16, lg: 16, md: 15, sm: 15 }}
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
            label="Enter amount"
            // labelCol={{ xl: 4, lg: 6, md: 7, sm: 7 }}
            // wrapperCol={{ xl: 16, lg: 16, md: 15, sm: 15 }}
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
                  return !isNaN(value) && value > data.available_withdrawal
                    ? Promise.reject(
                        <FormError msg="The withdrawal amount should not exceed the amount of your available funds." />
                      )
                    : Promise.resolve();
                }
              }
            ]}
          >
            <div className="d-lg-flex justify-content-between">
              <Input
                className="col-md-12 col-lg-5"
                placeholder="Enter amount"
                disabled={isDisabled}
              />
              <span className="d-flex justify-content-between">
                <Form.Item shouldUpdate>
                  {() => {
                    const availableAmount = data.available_withdrawal;
                    const inputAmount = form.getFieldValue("amount");
                    return (
                      <Fragment>
                        Remaining Account Balance:
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
            <Button htmlType="submit" type="primary" disabled={isDisabled}>
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