import { backendAPI } from "utils/httpAPI.util";
import { API_URI } from "commons/consts/system";

export class UserService {
  static getAllUsers = async () => {
    const result = await backendAPI.get(API_URI.GET_ALL_USERS);
    return result;
  };

  static getAllBuyer = async () => {
    const result = await backendAPI.get(API_URI.GET_ALL_BUYERS);
    return result;
  };

  static getAllSeller = async () => {
    const result = await backendAPI.get(API_URI.GET_ALL_SELLERS);
    return result;
  };
}
