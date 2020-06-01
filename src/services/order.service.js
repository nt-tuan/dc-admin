import { backendAPI } from "utils/httpAPI.util";
import { API_URI } from "commons/consts/system";

export class OrderService {
  static getAllActiveOrders = async () => {
    const result = await backendAPI.get(API_URI.GET_ALL_ACTIVE_ORDERS);
    return result;
  };

  static getAllOrderHistory = async () => {
    const result = await backendAPI.get(API_URI.GET_ALL_ORDERS_HISTORY);
    return result;
  };
}
