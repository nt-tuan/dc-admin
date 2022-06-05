import { ProductEntity } from "../model/types";
import { filterProductEntity } from "./filter";

test("filter should work", () => {
  const data: ProductEntity[] = [
    { code: "abc", title: "def" },
    { code: "xyz", title: "uvt" }
  ];
  const testCases = ["ab", "BC", "de"];
  for (const searchText of testCases) {
    expect(filterProductEntity(data, searchText)).toEqual([{ code: "abc", title: "def" }]);
  }
});
