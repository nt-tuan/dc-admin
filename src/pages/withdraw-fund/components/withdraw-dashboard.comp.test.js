import { render } from "@testing-library/react";
import { expectTexts } from "@/test";
import { WithdrawDashboard } from "./withdraw-dashboard.comp";

test("WithdrawDashboard should render", () => {
  render(<WithdrawDashboard data={{ pendingInBound: 1, pendingWithdrawal: 2 }} />);
  expectTexts("my-currency 1", "my-currency 2");
});
