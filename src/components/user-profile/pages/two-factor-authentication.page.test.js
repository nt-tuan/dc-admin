import { TFASettings } from "@/components/auth/components/tfa-settings.comp";
import { render } from "@testing-library/react";
import TwoFactorAuthentication from "./two-factor-authentication.page";

jest.mock("@/components/auth/components/tfa-settings.comp");

test("TwoFactorAuthentication should render", () => {
  TFASettings.mockReturnValue(<div>settings</div>);
  const { getByText } = render(<TwoFactorAuthentication />);
  expect(getByText("settings")).toBeInTheDocument();
});
