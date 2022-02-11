import { AuthService } from "services";
import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import ResetPasswordPage from "./reset-password.page";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();
jest.mock("utils/config.util");

const renderResetPasswordPage = () => {
  return render(
    <Router history={history}>
      <ResetPasswordPage />
    </Router>
  );
};

describe("renderContent", () => {
  test("not showing reset password form when isTokenValid = false", async () => {
    const { getByText, container } = renderResetPasswordPage();
    await act(async () => {
      AuthService.verifyResetPasswordToken = jest.fn(async () => {
        throw new Error();
      });
    });
    await waitFor(() => {
      expect(container.querySelector(".loader")).not.toBeInTheDocument();
      expect(getByText("Sorry, your link has expired.")).toBeInTheDocument();
    });
  });

  test("showing reset password form when isTokenValid = true", async () => {
    await act(async () => {
      AuthService.verifyResetPasswordToken = jest.fn(() => Promise.resolve(true));
    });

    const { getByRole, container } = renderResetPasswordPage();

    await waitFor(() => {
      expect(container.querySelector(".loader")).not.toBeInTheDocument();
      expect(getByRole("button")).toBeInTheDocument();
    });
  });
});
