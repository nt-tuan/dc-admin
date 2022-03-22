import React from "react";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import { UserMenu } from "./user-menu.comp";
import { createMemoryHistory } from "history";

jest.mock("@/utils/config.util");
jest.mock("react-redux");
jest.mock("@mui/material/Menu");

beforeEach(() => {
  useSelector.mockReturnValue("my-user");
  Menu.render.mockImplementation(({ children, onClose, open }) => (
    <>
      <div>{children}</div>
      <span onClick={onClose}>close-menu</span>
      <span>menu-{open ? "open" : "close"}</span>
    </>
  ));
});

test("UserMenu clicking item should work", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <UserMenu />
    </Router>
  );
  jest.spyOn(history, "push");
  fireEvent.click(getByText("User Management"));
  expect(history.push).toBeCalledWith("/admin/users");
});

test("UserMenu.logout should work", () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  const { getByText } = render(<UserMenu />);
  fireEvent.click(getByText("Log Out"));
  expect(dispatch).toBeCalledWith({ type: "@@DTC/USER/LOGOUT" });
});

test("UserMenu can be closed/open", () => {
  const { getByText } = render(<UserMenu />);
  fireEvent.click(getByText("close-menu"));
  expect(getByText("menu-close")).toBeInTheDocument();
});
