import { getWalletDescriptions, WALLET_TRANSACTION_TYPES } from "./wallet.schema";

jest.mock("utils/config.util");

test("getWalletDescriptions should return correct BILLING_DC description", () => {
  expect(getWalletDescriptions()[WALLET_TRANSACTION_TYPES.BILLING_DC]).toContain("HSB2B");
});
