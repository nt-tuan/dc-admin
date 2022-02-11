import { render, fireEvent } from "@testing-library/react";
import { AppSideBar } from "./app-side-bar.comp";
import { useSelector } from "react-redux";
jest.mock("react-redux");
jest.mock("utils/config.util");
jest.mock("./app-left-menu.comp", () => ({
  AppLeftMenu: () => <div>app-left-menu</div>
}));
beforeEach(() => {
  useSelector.mockReturnValue("my-user");
});

test("AppSideBar should work when open", () => {
  const onToggle = jest.fn();
  const { getByTestId } = render(<AppSideBar open onToggle={onToggle} />);
  fireEvent.click(getByTestId("KeyboardDoubleArrowLeftIcon"));
  expect(onToggle).toBeCalled();
});

test("AppSideBar should work when open", () => {
  const onToggle = jest.fn();
  const { getByTestId } = render(<AppSideBar onToggle={onToggle} />);
  fireEvent.click(getByTestId("MenuIcon"));
  expect(onToggle).toBeCalled();
});
