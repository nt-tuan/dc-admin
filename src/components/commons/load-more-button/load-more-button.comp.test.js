import { render } from "@testing-library/react";
import { LoadMoreButton } from "./load-more-button.comp";

jest.mock("@mui/lab/LoadingButton", () => () => <div>loading</div>);

test("LoadMoreButton should show loading", () => {
  const { getByText } = render(<LoadMoreButton isLoading />);
  expect(getByText("loading")).toBeInTheDocument();
});

test("LoadMoreButton should work", () => {
  const { getByText } = render(<LoadMoreButton />);
  expect(getByText("Load more")).toBeInTheDocument();
});
