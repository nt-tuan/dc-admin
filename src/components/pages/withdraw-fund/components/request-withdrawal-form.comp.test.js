import { RequestWithdrawalForm } from "./request-withdrawal-form.comp";
import { render } from "@testing-library/react";
import { useSnackbar } from "notistack";
jest.mock("notistack");
beforeEach(() => {
  useSnackbar.mockReturnValue({
    enqueueSnackbar: jest.fn()
  });
});
test("RequestWithdrawalForm should render", () => {
  const onSubmit = jest.fn();
  const { getByText } = render(
    <RequestWithdrawalForm data={{ bankDetails: [] }} onSubmit={onSubmit} />
  );
  expect(getByText("Withdraw")).toBeInTheDocument();
});
