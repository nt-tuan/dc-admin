import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ForgotPasswordForm } from "./forgot-pw-form.comp";

jest.mock("@/utils/config.util");

const renderForgotPasswordForm = () => {
  return render(
    <BrowserRouter>
      <ForgotPasswordForm />
    </BrowserRouter>
  );
};

describe("ForgotPasswordForm should be rendered correctly", () => {
  test("should render email/username input", () => {
    const { getByPlaceholderText } = renderForgotPasswordForm();
    expect(getByPlaceholderText("E-mail or Username")).toBeInTheDocument();
  });

  test("should render send button", () => {
    const { getByText } = renderForgotPasswordForm();
    expect(getByText("Send")).toBeInTheDocument();
  });

  test("should render back to Login link", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ForgotPasswordForm />
      </BrowserRouter>
    );
    expect(getByText("Back to Login")).toBeInTheDocument();
  });
});
