import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { ForgotPasswordForm } from "./forgot-pw-form.comp";

jest.mock("utils/config.util");

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

describe("ForgotPasswordForm validations", () => {
  test("should contain error if not fill the email/username", async () => {
    const { getByText } = renderForgotPasswordForm();
    fireEvent.submit(getByText("Send"));
    const errorMsgs = (await screen.findAllByRole("alert")).map((x) => x.textContent);
    expect(errorMsgs).toEqual(["Please enter your E-mail or Username"]);
  });

  test("should not contain error if fill the email/username", async () => {
    const { getByText, getByPlaceholderText } = renderForgotPasswordForm();
    fireEvent.change(getByPlaceholderText("E-mail or Username"), {
      target: { value: "demo@gmail.com" }
    });
    fireEvent.submit(getByText("Send"));
    const errorMsgs = screen.queryAllByRole("alert").map((x) => x.textContent);
    expect(errorMsgs).toEqual([]);
  });
});
