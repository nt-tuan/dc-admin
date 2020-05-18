export class APIError extends Error {
  constructor(errors, status) {
    super("API Error");
    let parsedErrors = [];
    if (errors) {
      // parse the error to another struture for easier usage
      parsedErrors = Object.keys(errors)
        .filter((key) => errors.hasOwnProperty(key))
        .map((key) => {
          return [key, errors[key]];
        });
    }
    this.errors = parsedErrors || undefined;
    this.status = status || undefined;
  }
}
