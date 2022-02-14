import { DatetimeUtils } from "utils/date-time.util";
import { MockTheme } from "test/mock-theme.comp";
import { NotificationItem } from "./notification-item.comp";
import { expectTexts } from "test/expectTexts";
import { render } from "@testing-library/react";
import { useSnackbar } from "notistack";

jest.mock("utils/date-time.util");
jest.mock("utils/config.util");
jest.mock("notistack");

beforeEach(() => {
  DatetimeUtils.fromNow.mockReturnValue("fromNow");
  useSnackbar.mockReturnValue({ enqueueSnackbar: jest.fn() });
});

test("NotificationItem should render", () => {
  render(
    <MockTheme>
      <NotificationItem data={{ message: "my-message" }} size="small" />
    </MockTheme>
  );

  expectTexts("my-message", "fromNow");
});
