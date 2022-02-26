import { RequestWithdrawalForm } from "./request-withdrawal-form.comp";
import { render } from "@testing-library/react";
import { useMessage } from "@/hooks/use-message";

jest.mock("@/hooks/use-message");
jest.mock("@/services");
beforeEach(() => {
  useMessage.mockReturnValue({
    success: jest.fn()
  });
});
test("RequestWithdrawalForm should render", () => {
  const onSubmit = jest.fn();
  const { getByText } = render(
    <RequestWithdrawalForm data={{ bankDetails: [] }} onSubmit={onSubmit} />
  );
  expect(getByText("Withdraw")).toBeInTheDocument();
});
