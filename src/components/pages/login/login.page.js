import React from "react";
import { LoginForm } from "components";
import { useDispatch } from "react-redux";
import * as USER_DUCK from "redux/user/user.duck";

export default () => {
  const dispatch = useDispatch();

  const handleSubmit = (loginValue, { onError }) => {
    dispatch({ type: USER_DUCK.LOGIN, payload: { values: loginValue, onError } });
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
