export const log = (errMsg) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(errMsg);
  }
};
