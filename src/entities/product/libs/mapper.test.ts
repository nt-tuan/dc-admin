import { getHSCodeFromBrick, getAttributeType } from "./mapper";
test("getHSCodeFromBrick should work", () => {
  expect(
    getHSCodeFromBrick({
      hsCode: "my-hs"
    } as never)
  ).toEqual("my-hs");
});

test("getAttributeType should work", () => {
  expect(getAttributeType({} as never)).toEqual("dropdown");
});
