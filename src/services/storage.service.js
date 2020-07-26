import store from "store";

export class StorageService {
  static saveData = (key, values) => {
    try {
      store.set(key, values);
    } catch (error) {
      throw new Error("Can't save to store!!");
    }
  };

  static getData = (key) => {
    try {
      return store.get(key);
    } catch (error) {
      throw new Error("Can't get data from store!!");
    }
  };

  static clearData = (key) => {
    try {
      return store.remove(key);
    } catch (error) {
      throw new Error(`Can't clear store with key: ${key}!!`);
    }
  };
}
