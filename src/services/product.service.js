import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class ProductService {
  static addProduct = async (data) => {
    const result = await backendAPI.post(ApiPathConsts.ADD_PRODUCT, data);
    return result;
  };

  static editProduct = async (data, id) => {
    const result = await backendAPI.put(ApiPathConsts.EDIT_PRODUCT.replace(":id", id), data);
    return result;
  };

  static getProducts = async ({ params }) => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCTS, params);
    return result;
  };

  static getProductTypes = async (category) => {
    const result = await backendAPI.get(`${ApiPathConsts.GET_PRODUCT_CATEGORIES}/${category}`);
    return result;
  };

  static getProductCategories = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_CATEGORIES);
    return result;
  };

  static getProductSaleChannels = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_SALE_CHANNEL);
    return result;
  };

  static deleteProduct = async (id) => {
    const result = await backendAPI.delete(ApiPathConsts.DELETE_PRODUCT.replace(":id", id));
    return result;
  };

  static getProductDetails = async (id) => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_DETAILS.replace(":id", id));
    return result;
  };
}
