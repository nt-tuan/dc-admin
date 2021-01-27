import React, { useState, useEffect, message } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import {
  getSecurityQuestions,
  createSecurityQuestions,
  validateSecurityQuestions,
  createPasscode
} from "services/user-profile.service";
import { selectUsers } from "redux/user/user.duck";
import PassCodeFormQuestion from "./passcode-form-question";
import PassCodeForm from "./passcode-form";

PassCode.propTypes = {};

function PassCode() {
  const users = useSelector(selectUsers);
  const { existedPasscode } = users;
  const [isShowQuestion, setIsShowQuestion] = useState(existedPasscode);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [isShowPassCode, setIsShowPassCode] = useState(false);

  //** Fetch Question */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const questions = await getSecurityQuestions();
      setSecurityQuestions(questions);
    });
  }, []);

  //** Handle Submit Question */
  const onFinish = (values) => {
    const data = [];
    Object.keys(values).map((item) => {
      const index = item.substr(item.length - 1);
      const isAnswer = item.includes("answer");
      data[index] = {
        ...data[index],
        [isAnswer ? "answerContent" : "questionId"]: values[item]
      };
    });
    if (existedPasscode) {
      //** Validate Question */
      asyncErrorHandlerWrapper(async () => {
        await validateSecurityQuestions(data);
        setIsShowPassCode(true);
        setIsShowQuestion(!isShowQuestion);
      });
    } else {
      //** Create question */
      asyncErrorHandlerWrapper(async () => {
        await createSecurityQuestions(data);
        setIsShowQuestion(!isShowQuestion);
        setIsShowPassCode(true);
      });
    }
  };

  //** Handle Submit PassCode */
  const handleSubmitPassCode = (code) => {
    asyncErrorHandlerWrapper(async () => {
      const res = await createPasscode({ code });
      setIsShowPassCode(false);
    });
  };

  //**  Toggle PassCode Form */
  const handleEdit = () => {
    setIsShowQuestion(!isShowQuestion);
  };

  return (
    <>
      <div className="d-flex align-items-center mt-2 mb-3">
        <h3 className="text-dark mb-0 mr-2 ">Passcode</h3>
        <Button
          className="w-10"
          onClick={handleEdit}
          icon={!isShowQuestion ? <CloseOutlined /> : <EditOutlined />}
        />
      </div>
      {!isShowQuestion && (
        <PassCodeFormQuestion onFinish={onFinish} securityQuestions={securityQuestions} />
      )}
      {isShowPassCode && <PassCodeForm handleSubmitPassCode={handleSubmitPassCode} />}
    </>
  );
}

export default PassCode;
