import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import ForgotPasswordPage from "./forgot-password.page";
import LoginPage from "../../pages/login/login.page";
import { RouteConst } from "commons/consts";
import ForgotPasswordSuccessPage from "../forgot-password-success/forgot-password-success.page";
import { AuthService } from "services";

jest.mock("utils/config.util");

const renderForgotPasswordPageSuccess = () => {
  return render(
    <BrowserRouter>
      <ForgotPasswordPage />
      <Route path={RouteConst.FORGOT_PASSWORD_SUCCESS_ROUTE}>
        <ForgotPasswordSuccessPage />
      </Route>
    </BrowserRouter>
  );
};

const renderForgotPasswordPageError = () => {
  return render(
    <BrowserRouter>
      <ForgotPasswordPage />
      <Route path={RouteConst.LOGIN_ROUTE}>
        <LoginPage />
      </Route>
    </BrowserRouter>
  );
};

const inputValueAndSubmit = () => {
  fireEvent.change(screen.getByPlaceholderText("E-mail or Username"), {
    target: { value: "user@gmail.com.test" }
  });
  fireEvent.click(screen.queryByRole("button"));
};

test("redirect to FORGOT_PASSWORD_SUCCESS_ROUTE page after submit form success", async () => {
  AuthService.sendResetPwEmail = jest.fn(() => Promise.resolve(true));
  const { container } = renderForgotPasswordPageSuccess();

  await act(async () => {
    inputValueAndSubmit();
  });
  expect(container).toHaveTextContent(
    /We've sent a link to user@gmail.com.test to help you reset your password/
  );
  expect(container).toHaveTextContent(/Return to Login/);
});

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
  assignMock.mockClear();
});

test("redirect to LOGIN_ROUTE page after submit form with api failed", async () => {
  AuthService.sendResetPwEmail = jest.fn(() => {
    throw new Error("401");
  });

  renderForgotPasswordPageError();

  await act(async () => {
    inputValueAndSubmit();
  });
  expect(window.location.href).toEqual(RouteConst.LOGIN_ROUTE);
});
