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

  static getRequestedProducts = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_REQUESTED_PRODUCTS);
    return result;
  };

  static rejectProduct = async (id) => {
    const result = await backendAPI.put(ApiPathConsts.REJECT_REQUESTED_PRODUCTS.replace(":id", id));
    return result;
  };

  static getRequestedProductCategories = async () => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_CATEGORIES_SELECT);
    return result;
  };
  static getProductTypesByCategoryId = async (categoryId) => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_TYPES_BY_CATEGORY_ID, {
      categoryId
    });
    return result;
  };
  static getProductNameByTypeId = async (typeId) => {
    const result = await backendAPI.get(ApiPathConsts.GET_PRODUCT_NAMES_BY_TYPE_ID, { typeId });
    return result;
  };
  static addAvailableProduct = async (sourceId, targetId) => {
    const result = await backendAPI.put(
      ApiPathConsts.ADD_AVAILABLE_PRODUCT.replace(":sourceId", sourceId).replace(
        ":targetId",
        targetId
      )
    );
    return result;
  };
}
