import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { CompanyService } from "services/company.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { REQUIRED_ERR } from "commons/consts";
import { createFormErrorComp } from "utils";

function TwoStepsVerifycation({
  isShowModal2Verify,
  setIsShowModal2Verify,
  email,
  handleUpdateBankDetail
}) {
  const [form] = Form.useForm();
  const [isShowFormCode, setIsShowFormCode] = useState(false);

  const handleSendConfirmEmail = () => {
    asyncErrorHandlerWrapper(async () => {
      await CompanyService.sendEmailConfirmBank();
      setIsShowFormCode(true);
    });
  };

  const onFinish = (values) => {
    // handleUpdateBankDetail()
    asyncErrorHandlerWrapper(async () => {
      try {
        const res = await CompanyService.verifyBankConfirmCode(values.code);
        if (res) {
          handleUpdateBankDetail();
        }
      } catch (error) {
        message.error(error);
      }
    });
  };
  return (
    <Modal
      visible={isShowModal2Verify}
      title="2-Steps Verification"
      footer={false}
      onCancel={() => setIsShowModal2Verify(false)}
    >
      {/* Case not input */}
      {!isShowFormCode && (
        <>
          <p>
            Send a verification code to your email <b>{email}</b>
          </p>
          <Button onClick={handleSendConfirmEmail}>Send</Button>
        </>
      )}

      {/* Case is already input */}
      {isShowFormCode && (
        <>
          <p>
            Your verification code has been sent to <b>{email}</b>
          </p>
          <Form form={form} onFinish={onFinish}>
            <div className="d-flex align-items-start mt-2 mb-3">
              <Form.Item
                name="code"
                rules={[{ required: true, message: createFormErrorComp(REQUIRED_ERR("code")) }]}
              >
                <Input placeholder="Enter your code" />
              </Form.Item>
            </div>

            <Form.Item style={{ marginTop: "20px" }}>
              <Button type="primary" htmlType="submit">
                Verify
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
}
TwoStepsVerifycation.propTypes = {};
export default TwoStepsVerifycation;
