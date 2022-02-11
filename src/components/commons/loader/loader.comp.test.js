import { Loader } from "./loader.comp";
import { render } from "@testing-library/react";
test("Loader should work", () => {
  const { getByRole } = render(<Loader />);
  expect(getByRole("progressbar")).toBeInTheDocument();
});
