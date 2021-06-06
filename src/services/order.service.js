import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";
import dayjs from "dayjs";
const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export class OrderService {
  static getAllActiveOrders = async (options) => {
    const { createdDate } = options;
    const formattedCreatedDate = dayjs(createdDate).utc().format(DATETIME_FORMAT);
    const result = await backendAPI.post(ApiPathConsts.GET_ALL_ACTIVE_ORDERS, undefined, {
      ...options,
      createdDate: formattedCreatedDate
    });
    return result;
  };

  static getAllOrderHistory = async (options) => {
    const { createdDate } = options;
    const formattedCreatedDate = dayjs(createdDate).utc().format(DATETIME_FORMAT);
    const result = await backendAPI.post(ApiPathConsts.GET_ALL_ORDERS_HISTORY, undefined, {
      ...options,
      createdDate: formattedCreatedDate
    });
    return result;
  };
}
