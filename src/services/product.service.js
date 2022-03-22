import { backendAPI } from "@/utils/httpAPI.util";
import { ApiPathConsts } from "@/commons/consts/system";

export class ProductService {
  static PRODUCT_CATEGORY = "/products/category";
  static HS_CODE = "/hsCode";

  static addProduct = (data) => {
    const { fileName, productName, typeId, variantList, detail } = data;
    return backendAPI.post(ApiPathConsts.ADD_PRODUCT, {
      detail,
      fileName,
      productName,
      typeId,
      variantList
    });
  };

  static checkDuplicate = (data) => {
    return backendAPI.post(ApiPathConsts.CHECK_DUPLICATE_PRODUCT, data);
  };

  static editProduct = (data, id) => {
    return backendAPI.put(ApiPathConsts.EDIT_PRODUCT.replace(":id", id), data);
  };

  static getProducts = ({ params }) => {
    return backendAPI.get(ApiPathConsts.GET_PRODUCTS, params);
  };

  static getProductTypes = (category) => {
    return backendAPI.get(`${ApiPathConsts.GET_PRODUCT_CATEGORIES}/${category}`);
  };

  static getProductCategories = () => {
    return backendAPI.get(ApiPathConsts.GET_PRODUCT_CATEGORIES);
  };

  static getProductSaleChannels = () => {
    return backendAPI.get(ApiPathConsts.GET_PRODUCT_SALE_CHANNEL);
  };

  static deleteProduct = (id) => {
    return backendAPI.delete(ApiPathConsts.DELETE_PRODUCT.replace(":id", id));
  };

  static getProductDetails = (id) => {
    return backendAPI.get(ApiPathConsts.GET_PRODUCT_DETAILS.replace(":id", id));
  };

  static getProductNameByTypeId = (typeId) => {
    return backendAPI.get(ApiPathConsts.GET_PRODUCT_NAMES_BY_TYPE_ID.replace(":id", typeId));
  };

  static addAvailableProduct = (sourceId, targetId) => {
    return backendAPI.put(
      ApiPathConsts.ADD_AVAILABLE_PRODUCT.replace(":sourceId", sourceId).replace(
        ":targetId",
        targetId
      )
    );
  };

  static getProductCategories = () => {
    return backendAPI.get(this.PRODUCT_CATEGORY);
  };

  static getProductTypeByCategory = (catId) => {
    return backendAPI.get(`${this.PRODUCT_CATEGORY}/${catId}`);
  };

  static getAllHsCode = (search = null, page = 0, size = 100) => {
    return backendAPI.get(
      // eslint-disable-next-line sonarjs/no-nested-template-literals
      `${this.HS_CODE}?page=${page}&size=${size}${search !== null ? `&searchText=${search}` : ""}`
    );
  };

  static getHsCodeDetails = (code) => {
    return backendAPI.get(`/hsCode/${code}`);
  };
}
