import { DatetimeUtils } from "@/utils/date-time.util";

import { withdrawPendingMapper } from "./withdraw.mapper";

jest.mock("@/utils/date-time.util");

const { parseDataToExcel } = withdrawPendingMapper;

test("parseDataToExcel should return empty", () => {
  DatetimeUtils.formatDateTime.mockImplementation((data) => data);
  expect(parseDataToExcel([])).toEqual([]);
  expect(parseDataToExcel(undefined)).toEqual([]);
  expect(
    parseDataToExcel([
      {
        something: "value",
        timestamp: "my-timestamp",
        accountNumber: "account-1",
        amount: 234
      }
    ])
  ).toEqual([
    ["Date", "Withdrawal Id", "Deposited Bank Account", "Debit", "Currency"],
    ["my-timestamp", undefined, "account-1", "234", undefined]
  ]);
});
