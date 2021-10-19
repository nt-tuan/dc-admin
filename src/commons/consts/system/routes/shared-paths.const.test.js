const { SharedPaths } = require("./shared-paths.const");

test("should return url of HOME_ROUTE correctly", () => {
  expect(SharedPaths.HOME_ROUTE).toBe("/admin");
});

test("should return url of FORGOT_PASSWORD_ROUTE correctly", () => {
  expect(SharedPaths.FORGOT_PASSWORD_ROUTE).toBe("/admin/forgot-password");
});

test("should return url of RESET_PASSWORD_ROUTE correctly", () => {
  expect(SharedPaths.RESET_PASSWORD_ROUTE).toBe("/admin/reset-password");
});

test("should return url of EMAIL_VERIFICATION correctly", () => {
  expect(SharedPaths.EMAIL_VERIFICATION).toBe("/admin/email-verification");
});

test("should return url of REGISTER_ROUTE correctly", () => {
  expect(SharedPaths.REGISTER_ROUTE).toBe("/admin/register");
});

test("should return url of NOT_FOUND_ERROR_ROUTE correctly", () => {
  expect(SharedPaths.NOT_FOUND_ERROR_ROUTE).toBe("/admin/404");
});

test("should return url of UNEXPECTED_ERROR_ROUTE correctly", () => {
  expect(SharedPaths.UNEXPECTED_ERROR_ROUTE).toBe("/admin/500");
});

test("should return url of FEATURE_TOGGLES correctly", () => {
  expect(SharedPaths.FEATURE_TOGGLES).toBe("/configuration/feature-toggles");
});

test("should return url of ORDERS correctly", () => {
  expect(SharedPaths.ORDERS).toBe("/admin/orders");
});

test("should return url of USER_MANAGEMENT correctly", () => {
  expect(SharedPaths.USER_MANAGEMENT).toBe("/admin/user-management");
});

test("should return url of NEW_USER correctly", () => {
  expect(SharedPaths.NEW_USER).toBe("/admin/new-user");
});

test("should return url of SERVICE correctly", () => {
  expect(SharedPaths.SERVICE).toBe("/admin/services");
});

test("should return url of WALLET correctly", () => {
  expect(SharedPaths.WALLET).toBe("/admin/wallet");
});

test("should return url of ACCOUNT_SUMMARY correctly", () => {
  expect(SharedPaths.ACCOUNT_SUMMARY).toBe("/admin/account-summary");
});

test("should return url of WITHDRAW_FUND correctly", () => {
  expect(SharedPaths.WITHDRAW_FUND).toBe("/admin/withdraw-funds");
});

test("should return url of ADD_FUNDS correctly", () => {
  expect(SharedPaths.ADD_FUNDS).toBe("/admin/add-funds");
});
