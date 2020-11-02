import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class ProductRequestsService {
  static getRequestedProducts = async (params) => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCTS_REQUESTS, params);
    return result;
  };

  static rejectProduct = async (id) => {
    const result = await backendAPI.delete(
      ApiPathConsts.DELETE_PRODUCTS_REQUESTS.replace(":id", id)
    );
    return result;
  };
}
