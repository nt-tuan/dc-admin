import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class OrderService {
  static getAllActiveOrders = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_ACTIVE_ORDERS);
    return result;
  };

  static getAllOrderHistory = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_ALL_ORDERS_HISTORY);
    return result;
  };
}
