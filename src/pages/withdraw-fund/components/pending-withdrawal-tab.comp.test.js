import React from "react";
import { DTCTable } from "components/commons";
import { withdrawPendingMapper } from "../withdraw.mapper";
import { handleDownloadExcel, getAllRecordsFromAPI } from "utils/general.util";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { PendingWithdrawalTab } from "./pending-withdrawal-tab.comp";

jest.mock("utils/general.util");
jest.mock("../withdraw.mapper");
jest.mock("components/commons/dtc-table/dtc-table.comp");

beforeEach(() => {
  withdrawPendingMapper.parseDataToGridView.mockImplementation((data) => data);
  DTCTable.mockImplementation(({ dataSource }) => (dataSource.length === 0 ? "no-data" : "data"));
});

test("PendingWithdrawalTab should work", async () => {
  getAllRecordsFromAPI.mockResolvedValue([1]);
  const { getByText } = render(<PendingWithdrawalTab />);
  await waitFor(() => expect(getByText("data")).toBeInTheDocument());

  fireEvent.click(getByText("Download"));
  expect(handleDownloadExcel).toBeCalled();
});
