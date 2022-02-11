import * as USER_DUCK from "redux/user/user.duck";

import { API_ERRORS, MessageConst } from "commons/consts";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { LoginForm } from "./login-form/login-form.comp";
import React from "react";
import { useSnackbar } from "notistack";

const LoginSuccessAlert = () => {
  return (
    <Alert variant="filled" severity="success">
      <AlertTitle>{MessageConst.LOGIN_SUCCESS_TITLE}</AlertTitle>
      {MessageConst.LOGIN_SUCCESS_MSG}
    </Alert>
  );
};

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.user?.loading);
  const handleSubmit = (values, { setFieldError }) => {
    const onError = (errors) => {
      const errorCode = errors[0][1];
      const serverError = API_ERRORS[errorCode];
      setFieldError("password", serverError);
    };
    const onSuccess = () => {
      enqueueSnackbar(<LoginSuccessAlert />, {
        content: (key, message) => <div key={key}>{message}</div>
      });
    };
    dispatch({ type: USER_DUCK.LOGIN, payload: { values, onError, onSuccess } });
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={loading} />;
};
export default LoginPage;
