import store from "store";
import moment from "moment-timezone";
const AUTH_LOCALSTORAGE_KEY = "auth";

export const getAccessToken = async () => {
  const authCredential = store.get(AUTH_LOCALSTORAGE_KEY);
  if (authCredential) {
    const { rememberMe, createdDate } = authCredential;
    if (!rememberMe) {
      const curDate = moment();
      let expiredDate = moment(createdDate).add(2, "days");
      if (expiredDate < curDate) {
        throw new Error("401");
      }
    }
  }
  return new Promise((r) => r(authCredential ? authCredential.accessToken : undefined));
};

export const setAuthCredential = async (credential) => {
  store.set(AUTH_LOCALSTORAGE_KEY, credential);
};

export const removeAuthCredential = async () => {
  store.remove(AUTH_LOCALSTORAGE_KEY);
  return new Promise((r) => r(true));
};
