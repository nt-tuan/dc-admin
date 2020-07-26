import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class ProductService {
  static addProduct = async (data) => {
    const result = await backendAPI.post(ApiPathConsts.ADD_PRODUCT, data);
    return result;
  };
  static getProducts = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCTS);
    return result;
  };
}
