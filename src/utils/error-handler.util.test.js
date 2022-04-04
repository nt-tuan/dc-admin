import { parseServerError } from "./error-handler.util";

describe("parseServerError should work", () => {
  const testCases = [
    {
      error: {
        errMsg: {
          error_message: "message-1"
        }
      },
      expect: { message: "message-1" }
    },
    {
      error: {
        errors: { message: "message-2" }
      },
      expect: { message: "message-2" }
    },
    {
      error: { errors: [["field-3", "user.exist.true"]] },
      expect: {
        field: "field-3",
        message: "The username already exists. Please use a different username."
      }
    }
  ];
  for (const testCase of testCases) {
    test(`when ${JSON.stringify(testCase.error)}`, () => {
      expect(parseServerError(testCase.error)).toEqual(testCase.expect);
    });
  }
});
