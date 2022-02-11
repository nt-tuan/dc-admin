import { render } from "@testing-library/react";
import { PageHeader } from "./page-header.comp";

test("PageHeader should render correct", () => {
  const { getByText } = render(<PageHeader>my-header</PageHeader>);
  expect(getByText("my-header")).toBeInTheDocument();
});
