import { AuthService } from "services";
import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ResetPasswordPage from "./reset-password.page";

jest.mock("utils/config.util");

const renderResetPasswordPage = () => {
  return render(
    <BrowserRouter>
      <ResetPasswordPage />
    </BrowserRouter>
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
    waitFor(() => {
      expect(container.querySelector(".loader")).not.toBeInTheDocument();
      expect(getByText("Sorry, your link has expired.")).toBeInTheDocument();
    });
  });

  test("showing reset password form when isTokenValid = true", async () => {
    const { getByRole, container } = renderResetPasswordPage();
    await act(async () => {
      AuthService.verifyResetPasswordToken = jest.fn(() => Promise.resolve(true));
    });
    waitFor(() => {
      expect(container.querySelector(".loader")).not.toBeInTheDocument();
      expect(getByRole("button")).toBeInTheDocument();
    });
  });
});
