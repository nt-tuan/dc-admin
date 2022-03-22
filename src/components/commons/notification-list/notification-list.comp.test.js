import { render } from "@testing-library/react";
import { MockTheme } from "@/test/mock-theme.comp";
import { NotificationList } from "./notification-list.comp";
import Skeleton from "@mui/material/Skeleton";

jest.mock("@/utils/config.util");
jest.mock("@mui/material/Skeleton");
jest.mock("@/HOCs/withEnhanceNotification", () => ({
  withEnhanceNotification: () => () => <span>item</span>
}));

beforeEach(() => {
  Skeleton.render.mockReturnValue(<span>skeleton</span>);
});

test("NotificationList should render loading", () => {
  const { getAllByText } = render(
    <MockTheme>
      <NotificationList isLoading />
    </MockTheme>
  );
  expect(getAllByText("skeleton")[0]).toBeInTheDocument();
});

test("NotificationList should render items", () => {
  const { getAllByText } = render(
    <MockTheme>
      <NotificationList listData={[{ createdDate: 1 }, { createdDate: 2 }]} />
    </MockTheme>
  );
  expect(getAllByText("item")[0]).toBeInTheDocument();
});
