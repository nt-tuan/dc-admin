import * as USER_DUCK from "redux/user/user.duck";

import { API_ERRORS, MessageConst, RouteConst } from "commons/consts";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginForm } from "./login-form/login-form.comp";
import React from "react";
import { useMessage } from "@/hooks/use-message";

const LoginPage = () => {
  const message = useMessage();
  const user = useSelector(USER_DUCK.selectCurrentUser);
  const isAuthorized = user.authorized;
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.user?.loading);
  const handleSubmit = (values, { setFieldError }) => {
    const onError = (errors) => {
      const errorCode = errors[0][1];
      const serverError = API_ERRORS[errorCode];
      setFieldError("password", serverError);
    };
    const onSuccess = () => {
      history.push(RouteConst.HOME_ROUTE);
      message.success(MessageConst.LOGIN_SUCCESS_MSG);
    };
    dispatch({ type: USER_DUCK.LOGIN, payload: { values, onError, onSuccess } });
  };
  if (!loading && isAuthorized) return <Redirect to={RouteConst.HOME_ROUTE} />;
  return <LoginForm onSubmit={handleSubmit} isLoading={loading} />;
};
export default LoginPage;
