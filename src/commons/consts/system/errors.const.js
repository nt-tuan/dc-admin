import capitalize from "lodash/capitalize";

export const PW_MIN_MAX_CHARS_ERR = "• Be within 8-32 characters";
export const PW_ATLEAST_1_SPECIAL_ERR = "• Contain al least 1 special character";
export const PW_ATLEAST_1_NUM_ERR = "• Contain at least 1 number";
export const PW_ATLEAST_1_UPPER_ERR = "• Contain at least 1 uppercase letter";
export const PW_ATLEAST_1_LOWER_ERR = "• Contain at least 1  lowercase letter";
export const PW_2_PASSWORD_NOT_THE_SAME_ERR = "Password and Confirm password do not match";
export const PHONE_ONLY_NUMBER_ERR = "Phone is number only";
export const PHONE_CODE_REQUIRED_ERR = "Please select your Phone Code";
export const REQUIRED_ERR = (label) => `Please enter your ${label}`;
export const REQUIRED_ERR_USER_MANAGEMENT = (label) => `Please enter user's ${label}`;
export const COUNTRY_REQUIRED_ERR = "Please select your Country";
export const CAPTCHA_NOT_FINISH_ERR = "Please finish the Captcha";
export const WRONG_USERNAME_OR_PW_ERR = "Your Username and/or password do not match.";
export const INACTIVE_USER = "Please confirm your Email to active your account";
export const USERNAME_ALREADY_USED_ERR =
  "The username already exists. Please use a different username.";
export const USERNAME_NOT_CONTAIN_WHITESPACE_AND_SPECIAL_CHARACTERS_ERR =
  "Username must not contain whitespaces or special characters";
export const EMAIL_NOT_VALID_ERR = "Please enter a valid E-mail.";
export const EMAIL_IS_ALREADY_USED_ERR = "The email is already in use";
//new messages
export const SERVER_UNKNOWN_ERR =
  "There is something wrong with our server, please refresh the page";
export const CUR_PW_SAME_AS_NEW_PW_ERR = "Current Password and New password can't be the same";
export const LOGIN_WRONG_OVER_3_TIMES_ERR = `Your account has been deactivated, please contact your administrator to reactivate your account.`;
export const CUR_PW_IS_NOT_VALID = "The password you entered is incorrect, please try again";
export const WRONG_VERIFICATION_CODE = "Incorrect OTP. Please try again.";
/* user management */
export const COULD_NOT_CREATE_USER =
  "An error occurred while trying to create the new user. Please try again.";
export const COULD_NOT_DELETE_USER =
  "An error occurred while trying to delete a user. Please try again.";
export const COULD_NOT_LOAD_USERS =
  "An error occurred while trying to load users. Please try again.";
export const COULD_NOT_UPDATE_USER =
  "An error occurred while trying to edit the specified user. Please try again.";
export const COULD_NOT_RE_ACTIVE_USER =
  "An error occurred while trying to re active a user. Please try again.";
// review and sell
export const PRICE_TO_SELL_NUMBER_ONLY = "Price is number only";
export const MINIMUM_QUANTITY_NUMBER_ONLY = "Minimum quantity is number only";
export const QUANTITY_NUMBER_ONLY = "Quantity is number only";
export const OFFICE_NUMBER_NUMBER_ONLY = "Office Number is number only";
export const QUANTITY_CANT_BE_LOWER_THAN_MINIMUM = "Quantity cant be lower than minimum quantity";
export const QUANTITY_CANT_BE_GREATER_THAN_SELLER = "Quantity cant be greater than seller quantity";
export const MINIMUM_QUANTITY_CANT_BE_GREATER_THAN_QUANTITY =
  "Minimum Quantity cant be greater than quantity";
export const WORKING_HOURS_WARNING = "The working hours should be at least 8 hours";
export const WORKING_DAYS_WARNING = "The working days should be at least 5 days";
export const MUST_BE_ATLEAST_4_CHARACTERS = (fieldName) =>
  `${fieldName} must be at least 4 characters`;
export const MAX_CHARS = (label, max) => `${capitalize(label)} cannot exceed ${max} characters`;
export const DUPLICATE_ITEM_VALUE = (item, attr) =>
  `Already exists a ${item.toLowerCase()} with the same ${attr.toLowerCase()}`;
export const PASSCODE_INVALID = "The passcode you entered is incorrect. Please try again";
export const getAccountLockMessage = (duration, type) =>
  `Your account has been locked for ${duration} because you have reached the maximum limit of invalid ${type} Attempts.`;
export const getErrorMaxCharactersMessage = (fieldName, numberChar) =>
  `${fieldName} must be under ${numberChar} characters.`;

export const getErrorExistMessage = (fieldName) =>
  `${fieldName} is already a part of this organization.`;
