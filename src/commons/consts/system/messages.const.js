import { getCompanyName } from "@/utils/config.util";

export class MessageConst {
  static get LOGIN_SUCCESS_MSG() {
    return `You have successfully logged in to ${getCompanyName()}!`;
  }
  static get LOGIN_SUCCESS_TITLE() {
    return "Logged In";
  }
}

export const SETTINGS_MESSAGE = {
  remove: (fieldName) => `Your ${fieldName} is removed.`,
  updateSuccess: (fieldName) => `Your ${fieldName} is updated.`,
  updateFail: (fieldName) => `Your ${fieldName} is failed.`
};
