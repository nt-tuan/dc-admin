import * as USER_ACTIONS from "redux/user/user.duck";

import { Header, ToggleEditButton } from "components/commons";
import React, { useEffect, useState } from "react";
import {
  createPasscode,
  createSecurityQuestions,
  getSecurityQuestions,
  validateSecurityQuestions
} from "services/user-profile.service";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { PASSCODE_INVALID } from "commons/consts";
import PassCodeForm from "./passcode-form";
import { PassCodeQuestionForm } from "./passcode-form-question";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { selectUsers } from "redux/user/user.duck";
import { useMessage } from "@/hooks/use-message";

PassCode.propTypes = {};

function PassCode() {
  const message = useMessage();
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
  const handleSubmitAnswer = (data) => {
    if (existedPassCode) {
      verifyAnswer(data);
      return;
    }
    setAnswers(data);
  };

  //** Handle Submit PassCode */
  const handleSubmitPassCode = (code) => {
    asyncErrorHandlerWrapper(async () => {
      try {
        if (!existedPassCode) {
          await createSecurityQuestions(answers);
        }
        await createPasscode({ code: code.join("") });
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
    <Box>
      <Header
        variant="h4"
        action={
          <ToggleEditButton variant="contained" isEdit={isShowQuestion} onClick={handleEdit} />
        }
      >
        Passcode
      </Header>

      {isShowQuestion && !answers && (
        <PassCodeQuestionForm onFinish={handleSubmitAnswer} securityQuestions={securityQuestions} />
      )}
      {isShowQuestion && answers && <PassCodeForm handleSubmitPassCode={handleSubmitPassCode} />}
    </Box>
  );
}

export default PassCode;
