const PUBLIC_PREFIX = "/public";
const USER_PREFIX = "/me";
const USER_MANAGEMENT_PREFIX = "/users";
const ORDER_PREFIX = "/orders";

export const GET_CURRENT_USER = `${USER_PREFIX}`;
export const UPDATE_USER_INFO = `${USER_PREFIX}`;
export const CHANGE_PASSWORD = `${USER_PREFIX}/password`;

export const GET_ALL_USERS = `${USER_MANAGEMENT_PREFIX}/all`;
export const GET_ALL_BUYERS = `${USER_MANAGEMENT_PREFIX}/seller`;
export const GET_ALL_SELLERS = `${USER_MANAGEMENT_PREFIX}/buyer`;
export const SUSPEND_USER = `${USER_MANAGEMENT_PREFIX}/:companyId/suspend`;
export const UNSUSPEND_USER = `${USER_MANAGEMENT_PREFIX}/:companyId/unsuspend`;
export const ASSIGN_BADGE_TO_USER = `${USER_MANAGEMENT_PREFIX}/:companyId/assign/badge/type`;
export const GET_AVAILABLE_BADGES = `${USER_MANAGEMENT_PREFIX}/:companyId/badge/type`;

export const LOGIN = `${PUBLIC_PREFIX}/login`;
export const REGISTER = `${PUBLIC_PREFIX}/register`;
export const RESET_PW = `${PUBLIC_PREFIX}/resetPassword`;
export const SUGGEST_USERNAME = `${PUBLIC_PREFIX}/username`;
export const CHECK_RESET_PW_TOKEN = `${PUBLIC_PREFIX}/tokens/password`;
export const CHECK_EMAIL_CONFIRM_TOKEN = `${PUBLIC_PREFIX}/tokens/registration`;
export const SEND_RESET_PW_LINK = `${PUBLIC_PREFIX}/sendResetPasswordLink`;

export const GET_ALL_ACTIVE_ORDERS = `${ORDER_PREFIX}/active`;
export const GET_ALL_ORDERS_HISTORY = `${ORDER_PREFIX}/history`;
