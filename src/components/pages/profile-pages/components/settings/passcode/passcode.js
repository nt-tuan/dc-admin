import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import {
  getSecurityQuestions,
  validateSecurityQuestions,
  createPasscode
} from "services/user-profile.service";
import { selectUsers } from "redux/user/user.duck";
import PassCodeFormQuestion from "./passcode-form-question";
import PassCodeForm from "./passcode-form";
import { PASSCODE_INVALID } from "commons/consts";
import * as USER_ACTIONS from "redux/user/user.duck";

PassCode.propTypes = {};

function PassCode() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const { existedPasscode: existedPassCode } = users;
  const [answers, setAnswers] = useState();
  const [isShowQuestion, setIsShowQuestion] = useState(!existedPassCode);
  const [securityQuestions, setSecurityQuestions] = useState([]);

  //** Fetch Question */
  useEffect(() => {
    asyncErrorHandlerWrapper(async () => {
      const questions = await getSecurityQuestions();
      setSecurityQuestions(questions);
    });
  }, []);

  const verifyAnswer = (data) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await validateSecurityQuestions(data);
        setAnswers(data);
      } catch (error) {
        if (error.message === "400") {
          message.error(PASSCODE_INVALID);
        } else {
          throw error;
        }
      }
    });
  };

  //** Handle Submit Question */
  const handleSubmitAnswer = (values) => {
    const data = [];
    Object.keys(values).map((item) => {
      const index = item.substr(item.length - 1);
      const isAnswer = item.includes("answer");
      data[index] = {
        ...data[index],
        [isAnswer ? "answerContent" : "questionId"]: values[item]
      };
    });
    if (existedPassCode) {
      verifyAnswer(data);
      return;
    }
    setAnswers(data);
  };

  //** Handle Submit PassCode */
  const handleSubmitPassCode = (newPasscode) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        await createPasscode({ newPasscode, answers });
        setAnswers(undefined);
        setIsShowQuestion(false);
        dispatch({ type: USER_ACTIONS.LOAD_CURRENT_ACCOUNT });
      } catch (error) {
        if (error.message === "400") {
          message.error(PASSCODE_INVALID);
          return;
        }
        throw error;
      }
    });
  };

  //**  Toggle PassCode Form */
  const handleEdit = React.useCallback(() => {
    if (isShowQuestion) {
      setIsShowQuestion(false);
      setAnswers(undefined);
      return;
    }
    setIsShowQuestion(true);
  }, [isShowQuestion]);

  return (
    <>
      <div className="d-flex align-items-center mt-2 mb-3">
        <h3 className="text-dark mb-0 mr-2 ">Passcode</h3>
        <Button
          className="w-10"
          onClick={handleEdit}
          icon={isShowQuestion ? <CloseOutlined /> : <EditOutlined />}
        />
      </div>
      {isShowQuestion && !answers && (
        <PassCodeFormQuestion onFinish={handleSubmitAnswer} securityQuestions={securityQuestions} />
      )}
      {isShowQuestion && answers && <PassCodeForm handleSubmitPassCode={handleSubmitPassCode} />}
    </>
  );
}

export default PassCode;
