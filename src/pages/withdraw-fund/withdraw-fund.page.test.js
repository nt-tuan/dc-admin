import { DTCTabs, useTabSearchParams } from "components/commons";
import { fireEvent, render } from "@testing-library/react";

import WithdrawFundPage from "./withdraw-fund.page";

jest.mock("components/commons");
beforeEach(() => {
  DTCTabs.mockImplementation(({ onChange }) => (
    <div onClick={() => onChange("new-tab")}>change-tab</div>
  ));
});
test("WithdrawFundPage should work", () => {
  const setFilter = jest.fn();
  useTabSearchParams.mockReturnValue([{ tab: "old-tab" }, setFilter]);
  const { getByText } = render(<WithdrawFundPage />);
  fireEvent.click(getByText("change-tab"));
  expect(setFilter).toBeCalledWith("new-tab");
});
