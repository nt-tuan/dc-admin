import { render, fireEvent } from "@testing-library/react";
import MuiDrawer from "@mui/material/Drawer";
import { AppLeftMenu } from "./app-left-menu.comp";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockTheme } from "test/mock-theme.comp";
import { getMenuData } from "./menu-data";

jest.mock("@mui/material/Drawer");
jest.mock("utils/config.util");
jest.mock("utils/general.util");
jest.mock("react-redux");
jest.mock("./menu-data");

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
const history = createMemoryHistory();
const setup = (props) => {
  MuiDrawer.render.mockImplementation(({ children }) => <div>{children}</div>);
  getMenuData.mockReturnValue(mockedMenuData);
  jest.spyOn(history, "push");
  return render(
    <MockTheme>
      <Router history={history}>
        <AppLeftMenu {...props} />
      </Router>
    </MockTheme>
  );
};
test("AppLeftMenu should work", () => {
  const { getByText, getByTestId } = setup();
  fireEvent.click(getByTestId("ExpandMoreIcon"));
  expect(getByText("New User")).toBeInTheDocument();
  fireEvent.click(getByText("New User"));
  expect(history.push).toBeCalledWith("RouteConst.NEW_USER");
});

test("AppLeftMenu should show icon only", () => {
  const onExpand = jest.fn();
  const { queryByText } = setup({ collapsed: true, onExpand });
  expect(queryByText("User Management")).not.toBeInTheDocument();
  fireEvent.click(queryByText("people-icon"));
  expect(onExpand).toBeCalled();
});

test("AppLeftMenu should work", () => {
  const { getByText } = setup();
  fireEvent.click(getByText("people-icon"));
  expect(getByText("New User")).toBeInTheDocument();
  fireEvent.click(getByText("Dump"));
  expect(getByText("New User")).toBeInTheDocument();
});
