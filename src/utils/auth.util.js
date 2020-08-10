import store from "store";
const AUTH_LOCALSTORAGE_KEY = "auth";

export const getAccessToken = async () => {
  const authCredential = store.get(AUTH_LOCALSTORAGE_KEY);
  if (authCredential === undefined) {
    throw new Error("401");
  }
  return new Promise((r) => r(authCredential.accessToken));
};

export const setAuthCredential = async (credential) => {
  store.set(AUTH_LOCALSTORAGE_KEY, credential);
};

export const removeAuthCredential = async () => {
  store.remove(AUTH_LOCALSTORAGE_KEY);
  return new Promise((r) => r(true));
};
