import { fireEvent, render, waitFor } from "@testing-library/react";

import { NotificationDropdown } from "./notification-dropdown.comp";
import { NotificationList } from "components/commons/notification-list/notification-list.comp";
import { Popover } from "@mui/material";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { selectNotificationLoadingState } from "redux/notification/notification.duck";
import { setNotificationsRead } from "services";

jest.mock("utils/config.util");
jest.mock("redux/notification/notification.duck");
jest.mock("components/commons/notification-list/notification-list.comp");
jest.mock("@mui/material/Popover");
jest.mock("react-redux", () => ({
  useSelector: (fn) => fn(),
  useDispatch: () => jest.fn()
}));
jest.mock("services");

beforeEach(() => {
  Popover.render.mockImplementation(({ children }) => children);
  NotificationList.mockImplementation(({ isLoading }) => (
    <span>{isLoading ? "loading" : "notification-list"}</span>
  ));
  selectNotificationLoadingState.mockReturnValue({
    isLoadingMore: false,
    isLoadingNewMessage: false
  });
});

describe("NotificationDropdown should loading", () => {
  const testCases = [
    {
      isLoadingMore: true,
      isLoadingNewMessage: false
    },
    {
      isLoadingMore: false,
      isLoadingNewMessage: true
    }
  ];
  for (const testCase of testCases) {
    test(`when ${JSON.stringify(testCase)}`, () => {
      Popover.render.mockImplementation(({ children }) => children);
      selectNotificationLoadingState.mockReturnValue({
        isLoadingMore: true,
        isLoadingNewMessage: true
      });

      const { getByText } = render(<NotificationDropdown />);
      expect(getByText("loading")).toBeInTheDocument();
    });
  }

  test(`should not loading`, () => {
    Popover.render.mockImplementation(({ children }) => children);
    selectNotificationLoadingState.mockReturnValue({
      isLoadingMore: false,
      isLoadingNewMessage: false
    });

    const { getByText } = render(<NotificationDropdown />);
    expect(getByText("notification-list")).toBeInTheDocument();
  });
});

test("NotificationDropdown can viewAll", async () => {
  const history = createMemoryHistory();
  setNotificationsRead.mockResolvedValue();
  jest.spyOn(history, "push");
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <NotificationDropdown />
    </Router>
  );
  fireEvent.click(getByTestId("NotificationsIcon"));
  await waitFor(() => expect(setNotificationsRead).toBeCalled());

  fireEvent.click(getByText("View All"));
  expect(history.push).toBeCalledWith("/admin/notifications");
});
