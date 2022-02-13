import { render } from "@testing-library/react";
import { LoadingIndicator } from "./loading-indicator.comp";

test("LoadingIndicator should work", () => {
  const { getByRole } = render(<LoadingIndicator />);
  expect(getByRole("progressbar")).toBeInTheDocument();
});
