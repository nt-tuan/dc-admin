import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AppBar } from "./app-bar.comp";
import { AppFooter } from "./app-footer.comp";
import { AppSideBar } from "./app-side-bar.comp";
import { AuthLayout } from "./auth-layout.comp";

jest.mock("utils/config.util");
jest.mock("./app-bar.comp");
jest.mock("./app-footer.comp");
jest.mock("./app-side-bar.comp");

test("AuthLayout should work", () => {
  const history = createMemoryHistory();
  AppBar.mockImplementation(({ open, onToggle }) => (
    <span onClick={onToggle}>app-bar-{open ? "open" : "close"}</span>
  ));
  AppSideBar.mockImplementation(({ open, onToggle }) => (
    <span onClick={onToggle}>side-bar-{open ? "open" : "close"}</span>
  ));
  AppFooter.mockReturnValue("footer");
  const { getByText } = render(
    <Router history={history}>
      <AuthLayout>children-here</AuthLayout>
    </Router>
  );
  expect(getByText("children-here")).toBeInTheDocument();
  fireEvent.click(getByText("app-bar-open"));
  expect(getByText("app-bar-close")).toBeInTheDocument();
});