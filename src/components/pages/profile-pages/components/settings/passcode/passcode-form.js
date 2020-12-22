import React from "react";
import { Form, Button, message } from "antd";
import PassCodeItemForm from "./passcode-item-form";

function PassCodeForm({ handleSubmitPassCode }) {
  const [form] = Form.useForm();

  //** Handle Submit Form */
  const onFinish = (values) => {
    const array = [{ code: "" }, { confirmCode: "" }];
    Object.keys(values).map((key) => {
      if (key.includes("passCode")) {
        array[0]["code"] = `${array[0]["code"]}${values[key]}`;
      } else {
        array[1]["confirmCode"] = `${array[1]["confirmCode"]}${values[key]}`;
      }
    });
    if (JSON.stringify(array[0]["code"]) === JSON.stringify(array[1]["confirmCode"])) {
      handleSubmitPassCode(array[0]["code"]);
    } else {
      message.error("Passcode does not match");
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <h6>Select security questions and answers</h6>
        <p>You have to select and answer questions you have set up to update your passcode</p>
        <Form form={form} onFinish={onFinish}>
          <div className="row">
            <div className="col-12 col-sm-6">
              <h6>Enter your passcode</h6>
              <PassCodeItemForm name="passCode" />
            </div>
            <div className="col-12 col-sm-6">
              <h6>Confirm your passcode</h6>
              <PassCodeItemForm name="ConfirmPassCode" />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PassCodeForm;
