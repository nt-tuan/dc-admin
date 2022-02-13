import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AppBar } from "./app-bar.comp";
import { NotificationDropdown } from "./notification-dropdown.comp";
import { UserMenu } from "./user-menu.comp";

jest.mock("utils/config.util");
jest.mock("react-redux");
jest.mock("./notification-dropdown.comp");
jest.mock("./user-menu.comp");

test("AppBar should work", () => {
  NotificationDropdown.mockReturnValue(<span>notification</span>);
  UserMenu.mockReturnValue(<span>user-menu</span>);
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <AppBar open={open} />
    </Router>
  );
  expect(getByText("notification")).toBeInTheDocument();
  expect(getByText("user-menu")).toBeInTheDocument();
});