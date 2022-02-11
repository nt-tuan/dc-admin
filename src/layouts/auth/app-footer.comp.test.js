const { render } = require("@testing-library/react");
const { AppFooter } = require("./app-footer.comp");

jest.mock("utils/config.util");

test("AppFooter should work", () => {
  const { getByText } = render(<AppFooter />);
  expect(getByText("Version: my-version")).toBeInTheDocument();
});
