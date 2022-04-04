import { fireEvent, render, waitFor, screen } from "@testing-library/react";

import { AuthService } from "@/services";
import ForgotPasswordPage from "./forgot-password.page";
import React from "react";
import { RouteConst } from "@/commons/consts";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
jest.mock("@/utils/config.util");
jest.mock("../../utils/error-handler.util");

test("redirect to FORGOT_PASSWORD_SUCCESS_ROUTE page after submit form success", async () => {
  AuthService.sendResetPwEmail = jest.fn(() => Promise.resolve(true));
  const history = createMemoryHistory();
  const { container, getByText } = render(
    <QueryClientProvider client={new QueryClient()}>
      <Router history={history}>
        <ForgotPasswordPage />
      </Router>
    </QueryClientProvider>
  );

  expect(container).toHaveTextContent(/Please enter your username or registered email address/);
  expect(container).toHaveTextContent(/Back to Login/);

  fireEvent.click(getByText("Back to Login"));
  expect(history.location.pathname).toEqual(RouteConst.LOGIN_ROUTE);
});

describe("ForgotPasswordPage should show error", () => {
  const testCases = [
    {
      response: {
        errMsg: {
          error_message: "my-message-content"
        }
      },
      expectFn: () => expect(screen.getByText("my-message-content")).toBeInTheDocument()
    },
    {
      response: {},
      expectFn: () =>
        expect(
          screen.getByText(
            "Please enter your username or registered email address. You will receive an email shortly to reset your password."
          )
        ).toBeInTheDocument()
    }
  ];
  for (const testCase of testCases) {
    test(`when ${JSON.stringify(testCase.response)}`, async () => {
      AuthService.sendResetPwEmail.mockRejectedValue(testCase.response);
      const history = createMemoryHistory();
      const { getByText } = render(
        <QueryClientProvider client={new QueryClient()}>
          <Router history={history}>
            <ForgotPasswordPage />
          </Router>
        </QueryClientProvider>
      );
      fireEvent.click(getByText("Send"));
      await waitFor(() => testCase.expectFn());
    });
  }
});
