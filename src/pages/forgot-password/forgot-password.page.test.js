import { fireEvent, render } from "@testing-library/react";

import { AuthService } from "services";
import ForgotPasswordPage from "./forgot-password.page";
import React from "react";
import { RouteConst } from "commons/consts";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("utils/config.util");

test("redirect to FORGOT_PASSWORD_SUCCESS_ROUTE page after submit form success", async () => {
  AuthService.sendResetPwEmail = jest.fn(() => Promise.resolve(true));
  const history = createMemoryHistory();
  const { container, getByText } = render(
    <Router history={history}>
      <ForgotPasswordPage />
    </Router>
  );

  expect(container).toHaveTextContent(/Please enter your username or registered email address/);
  expect(container).toHaveTextContent(/Back to Login/);

  fireEvent.click(getByText("Back to Login"));
  expect(history.location.pathname).toEqual(RouteConst.LOGIN_ROUTE);
});
