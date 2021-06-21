import { getCompanyName } from "utils/config.util";

export class MessageConst {
  static get LOGIN_SUCCESS_MSG() {
    return `You have successfully logged in to ${getCompanyName()}!`;
  }
  static get LOGIN_SUCCESS_TITLE() {
    return "Logged In";
  }
}
