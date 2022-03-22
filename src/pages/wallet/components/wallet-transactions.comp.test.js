import { render, fireEvent } from "@testing-library/react";
import { WalletTransactions } from "./wallet-transactions.comp";
import { transactionData } from "../__mocks__/transactions-data";
import Tooltip from "@mui/material/Tooltip";

jest.mock("@mui/material/Tooltip");
jest.mock("@/utils/config.util");

beforeEach(() => {
  Tooltip.render.mockImplementation(({ children }) => children);
});

test("WalletTransaction should work", async () => {
  const onDownload = jest.fn();
  const { getByText } = render(
    <div style={{ width: 2000, height: 1000 }}>
      <WalletTransactions transactionDetails={transactionData} onDownload={onDownload} />
    </div>
  );

  fireEvent.click(getByText("Download"));
  expect(onDownload).toBeCalled();
});
