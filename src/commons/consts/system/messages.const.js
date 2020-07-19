export class MessageConst {
  static get LOGIN_SUCCESS_MSG() {
    return `You have successfully logged in to ${process.env.REACT_APP_COMPANY_NAME}!`;
  }
  static get LOGIN_SUCCESS_TITLE() {
    return "Logged In";
  }
}
