import { render } from "@testing-library/react";
import { expectTexts } from "test";
import { StatisticStat } from "./statistic-stat.comp";

jest.mock("utils/config.util");

test("StatisticStat should render correctly", () => {
  render(<StatisticStat value={221} icon={<span>my-icon</span>} title="my-title" />);
  expectTexts("my-currency 221", "my-icon", "my-title");
});
