import { render, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { DTCTable } from "components/commons";
import { withdrawHistoryMapper } from "../withdraw.mapper";
import { handleDownloadExcel, getAllRecordsFromAPI } from "utils/general.util";
import { HistoryWithdrawalTab } from "./history-withdrawal-tab.comp";

jest.mock("../withdraw.mapper");
jest.mock("services");
jest.mock("utils/general.util");
jest.mock("components/commons/dtc-table/dtc-table.comp");

beforeEach(() => {
  handleDownloadExcel.mockReturnValue();
  DTCTable.mockImplementation(({ dataSource }) => (
    <span>{dataSource.length > 0 ? "data" : "no-data"}</span>
  ));
  withdrawHistoryMapper.parseDataToGridView.mockImplementation((data) => data);
});

test("HistoryWithdrawalTab should show data", async () => {
  getAllRecordsFromAPI.mockResolvedValue([1]);
  const { getByText } = render(<HistoryWithdrawalTab />);
  await waitFor(() => expect(getByText("data")).toBeInTheDocument());

  fireEvent.click(getByText("Download"));
  expect(handleDownloadExcel).toBeCalled();
});

test("HistoryWithdrawalTab should show no data", () => {
  getAllRecordsFromAPI.mockResolvedValue();
  const { getByText } = render(<HistoryWithdrawalTab />);
  expect(getByText("no-data")).toBeInTheDocument();
});
