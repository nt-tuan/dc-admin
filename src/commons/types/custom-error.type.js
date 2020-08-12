export class CustomError extends Error {
  constructor(status, errMsg) {
    super(status);
    this.errMsg = errMsg || undefined;
  }
}
