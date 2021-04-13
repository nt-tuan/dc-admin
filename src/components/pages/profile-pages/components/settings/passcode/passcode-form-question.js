import React, { useState } from "react";
import { Select, Input, Button, Form, message } from "antd";
import { REQUIRED_ERR, API_ERRORS } from "commons/consts";
import { createFormErrorComp } from "utils";

PassCodeFormQuestion.propTypes = {};

function PassCodeFormQuestion({ onFinish, securityQuestions }) {
  const [values] = useState({
    question0: {},
    question1: {},
    question2: {}
  });
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [form] = Form.useForm();
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <h6>Update your passcode</h6>
        <p>The passcode will be used to verify your identity while withdrawing the funds</p>
        <Form name="customized_form_controls" form={form} onFinish={onFinish} layout="vertical">
          {Object.keys(values).map((question, index) => (
            <div key={index} className="mt-4">
              <Form.Item
                className="mb-2"
                style={{ width: "100%" }}
                name={`questionId-${index}`}
                rules={[
                  {
                    required: true,
                    message: createFormErrorComp(REQUIRED_ERR("question"))
                  }
                ]}
              >
                <Select
                  placeholder={`Security Question ${index + 1}`}
                  onChange={(value) => {
                    form.setFieldsValue({ [`answer${index}`]: "" });
                    currentQuestions[index] = value;
                    setCurrentQuestions(currentQuestions);
                  }}
                >
                  {securityQuestions
                    .map((question) => question)
                    .filter((question) => !currentQuestions.includes(question.id))
                    .map((question, index) => (
                      <Select.Option value={question.id} key={`${index}-${index}`}>
                        {question.content}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={`answerContent-${index}`}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: createFormErrorComp(REQUIRED_ERR("answer"))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          ))}
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

export default PassCodeFormQuestion;
