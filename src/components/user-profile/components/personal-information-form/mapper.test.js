import { parseFormValues } from "./mapper";

test.each([
  {
    values: { firstName: "li", lastName: "dan", phone: "+84 something" },
    result: {
      firstName: "li",
      lastName: "dan",
      phone: "+84 something",
      country: "VN"
    }
  },
  {
    values: { firstName: "li", lastName: "dan", phone: "" },
    result: {
      firstName: "li",
      lastName: "dan",
      phone: "",
      country: undefined
    }
  },
  {
    values: { firstName: "li", lastName: "dan", phone: null },
    result: {
      firstName: "li",
      lastName: "dan",
      phone: null,
      country: undefined
    }
  }
])("parseFormValues should work with %j", ({ values, result }) => {
  expect(parseFormValues(values)).toStrictEqual(result);
});
