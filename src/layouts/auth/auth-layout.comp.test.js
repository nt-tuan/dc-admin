import { fireEvent, render } from "@testing-library/react";

import { AppBar } from "./app-bar.comp";
import { AppFooter } from "./app-footer.comp";
import { AppSideBar } from "./app-side-bar.comp";
import { AuthLayout } from "./auth-layout.comp";
import { useSelector } from "react-redux";

jest.mock("utils/config.util");
jest.mock("./app-bar.comp");
jest.mock("./app-footer.comp");
jest.mock("./app-side-bar.comp");
jest.mock("react-redux");
test("AuthLayout should work", () => {
  useSelector.mockReturnValue({ authorized: true });
  AppBar.mockImplementation(({ open, onToggle }) => (
    <span onClick={onToggle}>app-bar-{open ? "open" : "close"}</span>
  ));
  AppSideBar.mockImplementation(({ open, onToggle }) => (
    <span onClick={onToggle}>side-bar-{open ? "open" : "close"}</span>
  ));
  AppFooter.mockReturnValue("footer");
  const { getByText } = render(<AuthLayout>children-here</AuthLayout>);
  expect(getByText("children-here")).toBeInTheDocument();
  fireEvent.click(getByText("app-bar-open"));
  expect(getByText("app-bar-close")).toBeInTheDocument();
});
