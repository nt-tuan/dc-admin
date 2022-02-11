import { render } from "@testing-library/react";
import { DTCTable } from "./dtc-table.comp";
import { DataGrid } from "@mui/x-data-grid";

jest.mock("@mui/x-data-grid");
beforeEach(() => {
  DataGrid.type.render.mockImplementation(() => "x-data-grid");
});

test("DTCTable should work", () => {
  const { getByText } = render(<DTCTable />);
  expect(getByText("x-data-grid")).toBeInTheDocument();
});
