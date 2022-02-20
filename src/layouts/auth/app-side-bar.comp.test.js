import { render, fireEvent } from "@testing-library/react";
import { AppSideBar } from "./app-side-bar.comp";
import { useSelector } from "react-redux";
jest.mock("react-redux");
jest.mock("utils/config.util");
jest.mock("./app-left-menu.comp", () => ({
  AppLeftMenu: () => <div>app-left-menu</div>
}));
const mockedMenuData = [
  {
    title: "Orders",
    key: "Orders",
    icon: "layout-icon",
    url: "RouteConst.ORDERS"
  },
  {
    title: "User Management",
    key: "User Management",
    icon: "people-icon",
    children: [
      {
        title: "Users",
        key: "Users",
        url: "RouteConst.USER_MANAGEMENT"
      },
      {
        title: "New User",
        key: "New Users",
        url: "RouteConst.NEW_USER"
      }
    ]
  },
  {
    title: "Dump",
    key: "Dump",
    icon: "dump-icon"
  }
];
const mockInitialValues = { isSettingsMenu: false, menu: mockedMenuData };

jest.mock("hooks/state-provider", () => ({
  useStateProvider: () => [mockInitialValues, jest.fn()]
}));

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/admin/settings/organization-profile" })
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
