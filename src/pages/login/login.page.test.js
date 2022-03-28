import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, act } from "@testing-library/react";
import LoginPage from "./login.page";
import { TFAModal } from "@/components/auth/components/tfa-modal";
import { useTFAVaildator } from "@/components/auth/controllers/use-tfa-validator";
import { useSelector } from "react-redux";
import { checkTfaLogin } from "@/components/auth/services/auth.service";

jest.mock("@/components/auth/components/tfa-modal");
jest.mock("@/hooks/use-message");
jest.mock("@/components/auth/controllers/use-tfa-validator");
jest.mock("react-redux");
jest.mock("@/components/auth/services/auth.service");
test("LoginPage should show message when checkTfaFail", async () => {
  const storeState = {
    user: {
      authorized: false,
      loading: false
    },
    settings: {}
  };
  useSelector.mockImplementation((fn) => fn(storeState));
  TFAModal.mockReturnValue(null);
  useTFAVaildator.mockReturnValue({});
  checkTfaLogin.mockRejectedValue({
    errors: [["login", "user.disable.true"]]
  });
  const { container, getByText } = render(
    <Router history={createMemoryHistory()}>
      <LoginPage />
    </Router>
  );

  await act(async () => {
    fireEvent.change(container.querySelector("#username-field"), {
      target: {
        value: "admin-user",
        name: "username"
      }
    });
    fireEvent.change(container.querySelector("#password-field-password"), {
      target: {
        value: "admin-password",
        name: "password"
      }
    });
  });
  await act(async () => {
    fireEvent.click(getByText("Log In"));
  });

  expect(
    getByText(
      "Your account has been deactivated, please contact your administrator to reactivate your account."
    )
  ).toBeInTheDocument();
});
