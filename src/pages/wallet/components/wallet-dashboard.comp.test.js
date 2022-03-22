import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { expectTexts } from "@/test";
import { WalletDashboard } from "./wallet-dashboard.comp";

jest.mock("@/utils/config.util");

test("WalletDashboard should work", () => {
  render(
    <Router history={createMemoryHistory()}>
      <WalletDashboard
        walletDashboard={{
          totalBalance: 11,
          pendingWithdrawal: 12
        }}
      />
    </Router>
  );
  expectTexts("my-currency 11", "my-currency 12", "Pending Withdrawal", "Current Total Balance");
});
