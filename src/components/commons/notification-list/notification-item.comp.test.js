import { render } from "@testing-library/react";
import { NotificationItem } from "./notification-item.comp";
import { DatetimeUtils } from "utils/date-time.util";
import { MockTheme } from "test/mock-theme.comp";
import { expectTexts } from "test/expectTexts";

jest.mock("utils/date-time.util");
jest.mock("utils/config.util");

beforeEach(() => {
  DatetimeUtils.fromNow.mockReturnValue("fromNow");
});

test("NotificationItem should render", () => {
  render(
    <MockTheme>
      <NotificationItem data={{ message: "my-message" }} size="small" />
    </MockTheme>
  );

  expectTexts("my-message", "fromNow");
});
