import { transactionData } from "./__mocks__/transactions-data";
import { parseDataToExcel } from "./wallet.mapper";
import { DatetimeUtils } from "@/utils/date-time.util";

jest.mock("@/utils/date-time.util");
jest.mock("@/utils/config.util");
beforeEach(() => {
  DatetimeUtils.formatDateTime.mockReturnValue("formattedDatetime");
});

describe("parseDataToExcel should work", () => {
  test("when wallet is not an array", () => {
    expect(parseDataToExcel({})).toEqual([]);
  });

  test("when wallet is not an empty array", () => {
    expect(parseDataToExcel([])).toEqual([]);
  });

  test("when valid transctions", () => {
    expect(parseDataToExcel(transactionData)).toEqual([
      [
        "Time Stamp",
        "Transaction Type",
        "Order Number",
        "Product Details",
        "Description",
        "Currency",
        "Blocked",
        "Credit",
        "Debit",
        "Total Blocked",
        "Available Balance",
        "Current Total Balance"
      ],
      [
        "formattedDatetime",
        "BILLING_PCC",
        "2750781365266945396",
        "Copy of Bananas5 - yellow banana",
        undefined,
        undefined,
        undefined,
        "120",
        undefined,
        undefined,
        undefined,
        undefined
      ],
      [
        "formattedDatetime",
        "BILLING_PCC",
        "2745791973297231193",
        "Mask - smrithi mask n64",
        undefined,
        undefined,
        undefined,
        "20",
        undefined,
        undefined,
        undefined,
        undefined
      ]
    ]);
  });
});
