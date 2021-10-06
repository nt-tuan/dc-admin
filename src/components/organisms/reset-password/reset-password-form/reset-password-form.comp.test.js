import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { ResetPasswordForm } from "./reset-password-form.comp";

jest.mock("utils/config.util");

const renderResetPasswordForm = () => {
  return render(
    <BrowserRouter>
      <ResetPasswordForm />
    </BrowserRouter>
  );
};

describe("ForgotPasswordForm should be rendered correctly", () => {
  test("should render password inputs", () => {
    const { queryByPlaceholderText } = renderResetPasswordForm();
    expect(queryByPlaceholderText("New Password")).toBeInTheDocument();
    expect(queryByPlaceholderText("New Confirm Password")).toBeInTheDocument();
  });

  test("should render update button", () => {
    const { queryByRole, queryByText } = renderResetPasswordForm();
    expect(queryByText("Update")).toBeInTheDocument();
    expect(queryByRole("button")).toBeInTheDocument();
  });
});

describe("ForgotPasswordForm validations", () => {
  test("should contain error if not fill the New Password", async () => {
    const { getByRole } = renderResetPasswordForm();
    fireEvent.submit(getByRole("button"));
    const errorMsgs = (await screen.findAllByRole("alert")).map((x) => x.textContent);
    expect(errorMsgs).toEqual(["Please enter your Password"]);
  });

  test("should contain error if fill the New Password not match the pattern", async () => {
    const { getByRole, queryByPlaceholderText } = renderResetPasswordForm();
    fireEvent.change(queryByPlaceholderText("New Password"), { target: { value: "123456$" } });
    fireEvent.submit(getByRole("button"));
    const errorMsgs = (await screen.findAllByRole("alert")).map((x) => x.textContent);
    expect(errorMsgs).toEqual([
      "• Be within 8-32 characters",
      "• Contain at least 1  lowercase letter",
      "• Contain at least 1 uppercase letter"
    ]);
  });

  test("should not contain error if fill the valid Password", async () => {
    const { getByRole, queryByPlaceholderText } = renderResetPasswordForm();
    fireEvent.change(queryByPlaceholderText("New Password"), { target: { value: "Abc123456$" } });
    fireEvent.change(queryByPlaceholderText("New Confirm Password"), {
      target: { value: "Abc123456$" }
    });
    fireEvent.submit(getByRole("button"));
    const errorMsgs = screen.queryAllByRole("alert").map((x) => x.textContent);
    expect(errorMsgs).toEqual([]);
  });
});
