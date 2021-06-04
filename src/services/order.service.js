import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class OrderService {
  static getAllActiveOrders = async (options) => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_ACTIVE_ORDERS, options);
    return result;
  };

  static getAllOrderHistory = async (options) => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_ORDERS_HISTORY, options);
    return result;
  };
}
